import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { ChatState } from '../Context/chatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../Miscellaneous/SideDrawer';
import MyChats from '../Miscellaneous/MyChats';
import ChatBox from '../Miscellaneous/ChatBox';
export default function Chat() {
 const {user}=ChatState();
 const [fetchagain,setfetchagain]=useState(false);

 console.log(user);
  return (
    <div style={{width:"100%"}}>
     {user && <SideDrawer/>}
     <Box className='bodystyle' >
      {user && (<MyChats fetchagain={fetchagain}/>)}
      {user && (<ChatBox fetchagain={fetchagain} setfetchagain={setfetchagain}/>)}
     </Box>
    </div>
  )
}
