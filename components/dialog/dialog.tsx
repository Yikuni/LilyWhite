import {useState} from "react";
import {Avatar, Button, Space, Input} from "antd";
import {PlusOutlined, SendOutlined, UserOutlined} from "@ant-design/icons";
import styles from './dialog.module.css'
const { TextArea } = Input;

export default function Dialog(){
    let initialMessages = ['我是AI助理，有什么需要帮助的吗？']
    const [messages, setMessages] = useState(initialMessages)
    const [message, setMessage] = useState('')
    const handleInputChange = (event: any) => {
        setMessage(event.target.value);
    }
    function askQuestion(){
        setMessages(prevMessages => [...prevMessages, message]);
        setMessages(prevMessages => [...prevMessages, message]); // 回复
        // let prevMessages = messages
        // let msg = ''
        // let history: any[] = [{"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},]
        // for (let i = 1; i < prevMessages.length; i++) {
        //     history.push({
        //         "role": i % 2 == 1? "user": "assistant",
        //         "content": prevMessages[i],
        //     })
        // }
        // kimi(history, (msgSlice: string)=>{
        //     msg += msgSlice
        //     setMessages([...prevMessages, msg]);    // answer
        // }).then(()=>{
        //     // 回复完毕
        //     console.log("回复完毕")
        // })
    }
    return(
        <>
            <Space size={"middle"} direction="vertical" style={{
                display: 'flex', overflowY: 'auto', height: 290,
                marginTop: -30
            }}>
            {messages.map((msg, index)=> (
                <div>
                    {index % 2 == 1 ?
                        <div className={styles.right}>
                            <Space>
                                {msg}
                                <Avatar size={32} icon={<UserOutlined/>} style={{
                                    marginTop: 0
                                }}/>
                            </Space>
                        </div> :
                        <div className={styles.left}>
                            <Space>
                                <Avatar size={32} icon={<UserOutlined/>}/>
                                {msg}
                            </Space>
                        </div>}
                    <div style={{
                        position: 'absolute',
                        bottom: 10,
                        marginLeft: 10,
                        marginRight: 20,
                        width: '95%',
                        display: "flex"
                    }}>
                        <TextArea rows={1} placeholder="请输入您的问题" value={message}
                                  onChange={handleInputChange}/>

                        <Button type='text' size='large' icon={<PlusOutlined/>}
                                onClick={()=>{setMessages(initialMessages)}}/>
                        <Button type='text' size='large' icon={<SendOutlined/>} onClick={askQuestion}/>

                    </div>

                </div>


            ))}
            </Space>
        </>
    )
}