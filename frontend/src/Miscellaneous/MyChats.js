import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { useToast,Box,Button, Stack,Text } from '@chakra-ui/react';
import { getsender } from '../config/ChatLogics';
import ChatLoading from './ChatLoading';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import GroupChatModal from './GroupChatModal';
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
export default function MyChats({fetchagain}) {
  console.log(fetchagain);
  const [loggeduser,setloggeduser]=useState();
  const {user,selectedchat,setselectedchat,chats,setchats}=ChatState();
  const toast=useToast();
  const fetchChats=async()=>{
    try{
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`,

      },
    };
    const {data}=await axios.get('/api/chat',config);
    console.log('data',data);
setchats(data);
    }catch(error){
      toast({
        title: 'Error Ocurred!',
        description:'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }
  useEffect(()=>{
setloggeduser(JSON.parse(localStorage.getItem('userinfo')));
fetchChats();
  },[fetchagain])
  return (
    <Box
    d={{base:selectedchat? "none":"flex",md:"flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%",md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
    <Box
     fontSize={{base:"28px",md:"30px"}}
     fontFamily="Work sans"
    className='mychats'
    >Chats
    <GroupChatModal>
    <Button
    d='flex'
    bgColor='#BC9AF2'
    color="white"
    fontSize={{base:'17px',md:'10px',lg:'17px'}}
    rightIcon={<AddIcon/>}
    >New Group Chat</Button>
    </GroupChatModal>
    </Box>
    <Box
    borderRadius='lg'
    className='chats'
    >
{chats?(
<Stack overflowY='scroll'>
{chats.map((chat)=>(
  <Box
  onClick={()=>setselectedchat(chat)}
  cursor="pointer"
  bg={selectedchat===chat? "#BC9AF2":"#E8E8E8"}
  color={selectedchat===chat? "white":"black"}
  px={3}
  py={2}
  borderRadius='lg'
  key={chat._id}
  >
    <Text>
{!chat.Groupchat?
getsender(loggeduser,chat.users)
: chat.chatName
}
</Text>
  </Box>
))}
</Stack>
):(
  <ChatLoading/>
)}
    </Box>
    </Box>
  )
}
