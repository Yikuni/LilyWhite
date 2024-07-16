
const context = {
    chat :{
        chatUrl: "http://localhost:5005/chat",  // 后端kimi-backend的接口url
        AIMessageHint: "我是AI助理，有什么需要帮助的吗？", // 在用户界面显示的，AI的第一句话
        AIPrompt: "你是 Kimi，一个人工智能助手。"   // 实际的AI的prompt
    }
}

export default context;