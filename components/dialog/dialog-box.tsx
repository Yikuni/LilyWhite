'use client'
import {Button, FloatButton, Typography, Divider} from "antd";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {useState} from "react";
import Dialog from "@/components/dialog/dialog";
const { Title } = Typography;
export default function DialogBox(){
    const [showButton, setShowButton] = useState(true)

    return(
        <>
            {showButton?
                <FloatButton icon={<SearchOutlined />} onClick={()=>{setShowButton(false)}}/>:''
            }
            {
                !showButton?
                    <div style={{
                        position: "fixed", zIndex: 90 ,top: '50%', left: '75%',
                        width: 360,
                        height: 450,
                        backgroundColor: '#ffffff',
                        borderRadius: 20,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1',
                        marginTop: 20,
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                        <div style={{
                            marginTop: 20
                        }}>
                            <Button shape='circle' icon={<CloseOutlined />}
                                    onClick={()=>{setShowButton(true)}}
                                    style={{
                                        position: "absolute",
                                        right: 20
                                    }}/>
                            <Title level={3} style={{
                                textAlign: 'center'
                            }}>
                                AI助理
                            </Title>
                        </div>
                        <Divider />
                        <br/>
                            <Dialog/>

                    </div>: ''
            }
        </>
    )
}