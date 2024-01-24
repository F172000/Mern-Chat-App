import React from 'react'
import { ChatState } from '../Context/chatProvider'
import {Box} from '@chakra-ui/react';
import SingleChat from '../components/Authentication/SingleChat';
export default function ChatBox({fetchagain,setfetchagain}) {
  const {selectedchat}=ChatState();
  return (
    <Box
    d={{base:selectedchat? "flex":"none",md:"flex"}}
    className='chatbox'
    w={{base:"100%",md:'68%'}}
    borderRadius="lg"
    borderWidth='1px'
    >
      <SingleChat fetchagain={fetchagain} setfetchagain={setfetchagain}/>
    </Box>
  )
}
