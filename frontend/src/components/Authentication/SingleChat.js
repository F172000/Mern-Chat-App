import React from 'react'
import { ChatState } from '../../Context/chatProvider'
import { IconButton,Box,Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {getsender,getsenderFull} from '../../config/ChatLogics';
import Profile from '../../Miscellaneous/Profile';
import UpdateGroupChatModal from '../../Miscellaneous/updateGroupChatModal';

export default function SingleChat({fetchagain,setfetchagain}) {
    const {user,selectedchat,setselectedchat}=ChatState();

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
    <UpdateGroupChatModal fetchagain={fetchagain} setfetchagain={setfetchagain}/>
    </>
)}
</Text>
<Box d="flex" flexDir="column" justifyContent="flex-end" p={3} bg='#E8E8E8' w='100%' h='90%' borderRadius="lg" overflowY='hidden'>
  Messages Here 
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
