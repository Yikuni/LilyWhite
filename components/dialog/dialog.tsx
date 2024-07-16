import {useState} from "react";
import {Avatar, Button, Space, Input, Alert, Tooltip} from "antd";
import {PlusOutlined, SendOutlined, UserOutlined} from "@ant-design/icons";
import styles from './dialog.module.css'
const { TextArea } = Input;
import context from "@/public/config";
export default function Dialog(){
    let initialMessages = [context.chat.AIMessageHint]
    const [messages, setMessages] = useState(initialMessages)
    const [message, setMessage] = useState('')
    const [finished, setFinished] = useState(true)
    const [isError, setIsError] = useState(false)   // 显示报错
    const [errMsg, setErrMsg] = useState('')
    const handleInputChange = (event: any) => {
        setMessage(event.target.value);
    }
    function handleError(errStr: string, prevMessages: string[]){
        console.log("error", errStr)
        setMessages(prevMessages)
        setErrMsg(errStr)
        setIsError(true)
        setTimeout(()=>setIsError(false), 5000)
    }

    function askQuestion(){
        let prevMessages = [...messages, message]
        setMessages(prevMessages)
        let reply = ''
        let queryMessages = {
            messages: [context.chat.AIPrompt, ...prevMessages.slice(1, prevMessages.length)]
        }
        fetch(context.chat.chatUrl,{
            method: 'post',
            headers: {"Content-Type": "text/event-stream"},
            body: JSON.stringify(queryMessages)
        }).then(async (response) =>{
            setFinished(false)
            let _finished = false
            console.log(finished)
            if (response.body == null){
                handleError("response body is null", prevMessages)
                return
            }
            if(response.status != 200){
                const reader = response.body.getReader();
                const {value } = await reader.read();
                let msg = new TextDecoder().decode(value)
                handleError(msg, prevMessages)
                return
            }

            setMessage('')  // 清空输入栏
            let endIndex = 0
            // 一点点地显示文字
            const typeMessage = setInterval(()=>{
                if (endIndex < reply.length){
                    endIndex ++
                    setMessages([...prevMessages, reply.slice(0, endIndex)]);
                }
                if (_finished && endIndex >= reply.length){
                    console.log("clear interval")
                    clearInterval(typeMessage)
                }
            }, 20)

            const reader = response.body.getReader();
            const decoder = new TextDecoder()
            // 处理以流的形式返回的数据
            while (true){
                const { done, value } = await reader.read();
                if (done){
                    setFinished(true)
                    _finished = true
                    break
                }
                let msg = decoder.decode(value)
                console.log(msg)
                reply += msg
            }
        }).catch((e)=>{
            handleError(e.toString(), prevMessages)
            setFinished(true)

        })

    }
    return(
        <>
            <Space size={"middle"} direction="vertical" style={{
                display: 'flex', overflowY: 'auto', height: 290,
                marginTop: -30
            }}>
            {isError?<Alert message={errMsg} type="error"/>:''}
            {messages.map((msg, index)=> (
                <div>
                    {index % 2 == 1 ?
                        <div className={styles.right}>
                            <Space>
                                {msg}
                                <Avatar size={32} icon={<UserOutlined/>} className={styles.avater}/>
                            </Space>
                        </div> :
                        <div className={styles.left}>
                            <Space>
                                <Avatar size={32} icon={<UserOutlined/>} className={styles.avater}/>
                                {msg}
                            </Space>
                        </div>}
                    {/*底部的输入栏*/}
                    <div style={{
                        position: 'absolute',
                        bottom: 10,
                        marginLeft: 10,
                        marginRight: 20,
                        width: '95%',
                        display: "flex"
                    }}>
                        <TextArea rows={1} placeholder="请输入您的问题" value={message}
                                  onChange={handleInputChange} onKeyDown={(e)=>{if(e.key == "Enter") askQuestion()}}/>

                        <Tooltip title={"新建对话"}>
                            <Button type='text' size='large' icon={<PlusOutlined/>}
                                    onClick={()=>{setMessages(initialMessages)}}/>
                        </Tooltip>
                        <Tooltip title={"发送"}>
                            <Button type='text' size='large' icon={<SendOutlined/>} onClick={askQuestion}/>
                        </Tooltip>

                    </div>

                </div>



            ))}
            </Space>
        </>
    )
}