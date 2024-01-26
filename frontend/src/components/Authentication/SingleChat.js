import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/chatProvider'
import { IconButton,Box,Text, Spinner, FormControl,Input, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {getsender,getsenderFull} from '../../config/ChatLogics';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import Profile from '../../Miscellaneous/Profile';
import UpdateGroupChatModal from '../../Miscellaneous/updateGroupChatModal';
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
export default function SingleChat({fetchagain,setfetchagain}) {
  const [messages,setmessages]=useState([]);
  const [loading,setloading]=useState(false);
  const [newMessage,setNewMessage]=useState();
  const toast=useToast();
    const {user,selectedchat,setselectedchat}=ChatState();
    const fetchMessages=async()=>{
if(!selectedchat) return;
try{
const config={
  headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${user.token}`,
  },
};
setloading(true);
const {data}=await axios.get(`api/message/${selectedchat._id}`,config);
console.log(messages);
setmessages(data);
setloading(false);
}catch(error){
  toast({
    title:"Error Occured!",
    description:'Failed to load messages!',
    status:"error",
    duration:5000,
    isClosable:true,
    position:"bottom",
      });
}
    }
    useEffect(()=>{
      fetchMessages();
    },[selectedchat])
const sendMessage=async(event)=>{
if(event.key==='Enter'&& newMessage){
try{
const config={
  headers:{
    "Content-Type":'application/json',
    Authorization:`Bearer ${user.token}`
  },
  };
  const {data}=await axios.post(`api/message`,{
    content:newMessage,
    chatId:selectedchat._id,
  },config);
  console.log(data);
  setNewMessage('');
  setmessages([...messages,data]);
}catch(error){
  toast({
title:"Error Occured!",
description:'Failed to send Message',
status:"error",
duration:5000,
isClosable:true,
position:"bottom",
  });
}
}
}
const typehandler=(e)=>{
setNewMessage(e.target.value);
//typing indicator logic
}
  return (
    <>
    {
        selectedchat?(
<>
<Text
fontSize={{base:"28px",md:"30px"}}
pb={3}
px={2}
w="100%"
fontFamily="Work sans"
className='singlechat'
><IconButton
d={{base:"flex",md:"none"}}
icon={<ArrowBackIcon/>}
onClick={()=>setselectedchat("")}
></IconButton>
{!selectedchat.Groupchat?(
    <>
    {getsender(user,selectedchat.users)}
    <Profile user={getsenderFull(user,selectedchat.users)}></Profile>
    </>
):(
    <>
    {selectedchat.chatName.toUpperCase()}
    <UpdateGroupChatModal fetchagain={fetchagain} setfetchagain={setfetchagain} fetchMessages={fetchMessages}/>
    </>
)}
</Text>
<Box className='stylesinglechat' bg='#E8E8E8' w='100%' h='90%' borderRadius="lg" overflowY='hidden'>
 {loading?(
<Spinner
size="xl"
w={20}
h={20}
className='stylespinner'
/>
 ):(
  <div className='messages'>
<ScrollableChat messages={messages}/>
  </div>
 )}
 <FormControl onKeyDown={sendMessage} isRequired mt={3}>
  <Input
  variant='filled'
  bg="#E0E0E0"
  placeholder='Type a message...'
  onChange={typehandler}
  value={newMessage}
  />
 </FormControl>
</Box>
</>
        ):(
<Box>

</Box>
        )
    }
    </>
  )
}
