import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext=createContext();
const ChatProvider=({children})=>{
    const [user,setuser]=useState();
    const [selectedchat,setselectedchat]=useState();
    const [chats,setchats]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
 const userinfo=JSON.parse(localStorage.getItem("userinfo"));
 setuser(userinfo);
 if(!userinfo){
    navigate("/");
 }
    },[navigate]);
    return (
        <ChatContext.Provider value={{user,setuser,selectedchat,setselectedchat,chats,setchats}}>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState=()=>{
    return useContext(ChatContext);
}
export default ChatProvider;