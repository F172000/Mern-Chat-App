import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import {Modal,ModalBody,ModalCloseButton,ModalContent,ModalOverlay,ModalHeader,ModalFooter,Button, useToast, Spinner} from '@chakra-ui/react';
import { IconButton,Box, FormControl,Input } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../Context/chatProvider';
import axios from 'axios';
import UserBadgeItem from '../components/Authentication/UserAvatar/UserBadgeItem';
import UserListItem from '../components/Authentication/UserAvatar/UserListItem';
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
export default function UpdateGroupChatModal({fetchagain,setfetchagain}) {
    console.log(fetchagain);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupchatName,setgroupchatName]=useState();
    const {selectedchat,setselectedchat,user}=ChatState();
    const [loading,setloading]=useState(false);
    const [search,setsearch]=useState("");
    const [searchResult,setsearchResult]=useState([]);
    const [renameloading,setRenameloading]=useState(false);
   const toast= useToast();
   const handleRemove=async(user1)=>{
    if(selectedchat.groupAdmin._id!==user._id && user1._id!==user._id){
        toast({
            title:"Only Admins can remove someone",
            status:'error',
            duration:5000,
            isClosable:true,
            position:"bottom",
        });
        return;
    }
    try{
        setloading(true);
        const config={
            headers:{
                "Authorization":`Bearer ${user.token}`,
            }
        };
        const data=await axios.put('/api/chat/groupremove',{
        chatId:selectedchat._id,
        userId:user1._id,
        },config);
        console.log(data);
        user1.id==user.id? setselectedchat():setselectedchat(data);
        setfetchagain(!fetchagain);
        console.log("after",fetchagain);
        setloading(false);
           }catch(error){
        toast({
            title:"Error Ocurred!",
            description: error.response,
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom",
        });
        setloading(false);
           }
           setgroupchatName("");
   }
   const handleRename=async()=>{
   if(!groupchatName) return 
   try{
setRenameloading(true);
const config={
    headers:{
        "Authorization":`Bearer ${user.token}`,
    }
};
const {data}=await axios.put('/api/chat/rename',{
chatId:selectedchat._id,
chatName:groupchatName,
},config);
console.log(data._id);
setselectedchat(data);
setfetchagain(!fetchagain);
setRenameloading(false);
   }catch(error){
toast({
    title:"Error Ocurred!",
    description: error.response,
    status:"error",
    duration:5000,
    isClosable:true,
    position:"bottom",
});
setRenameloading(false);
setgroupchatName("");
   }

   }
   const handleSearch=async(query)=>{
setsearch(query);
if(!query){
    return;
};
try{
    setloading(true);
    const config={
        headers:{
            "Authorization":`Bearer ${user.token}`,
        }
    };
    const {data}=await axios.get(`/api/user?search=${search}`,config);
    console.log(data);
    setloading(false);
    setsearchResult(data);
}catch(error){
   toast({
    title:"Error Occured!",
    description:"Failed to load the search result",
    status:"error",
    duration:5000,
    isClosable:true,
    position:"bottom-left",
   });
   setloading(false);
}

   }
   const handleAddUser=async(user1)=>{
if(selectedchat.users.find((u)=>u._id===user1._id)){
    toast({
        title:"user is already in the group",
        status:'error',
        duration:5000,
        isClosable:true,
        position:"bottom",
    });
    return;
}
if(selectedchat.groupAdmin._id!==user._id){
toast({
    title:"Only Group Admin can add user",
    status:"error",
    duration:5000,
    isClosable:true,
    position:"bottom",
});
return;
}
try{
setloading(true);
const config={
    headers:{
        'Authorization':`Bearer ${user.token}`
    }
};
const {data}=await axios.put('/api/chat/groupadd',{chatId:selectedchat._id,userId:user1._id},config);
console.log(data);
setselectedchat(data);
setfetchagain(!fetchagain);
setloading(false);
}catch(error){
toast({
    title:'Error Occured',
    description:error.response,
    status:'error',
    duration:5000,
    isClosable:true,
    position:"bottom",
});
setloading(false);
}
   }
  return (
    <>
       <IconButton d={{base:'flex'}} icon={<ViewIcon/>} onClick={onOpen}>Open Modal</IconButton>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedchat.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     <Box className="updategroupchat" >
        {selectedchat.users.map(u=>(
            <UserBadgeItem key={user.id}
            user={u}
            handleFunction={()=>handleRemove(u)}
            >
            </UserBadgeItem>
        ))}
     </Box>
     <FormControl display='flex'>
                <Input placeholder='Chat Name' mb={3}
                onChange={(e)=>setgroupchatName(e.target.value)}
                ></Input>
                <Button
                variant="solid"
                colorScheme='teal'
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
                >update</Button>
               </FormControl>
               <FormControl display='flex'>
                <Input placeholder='Add user to group' mb={1}
                onChange={(e)=>handleSearch(e.target.value)}
                ></Input></FormControl>
                {loading?(
                    <Spinner size="lg"/>
                ):(
                    searchResult?.map(user=>(
                        <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)} />
                    ))
                )}
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3} onClick={(e)=>handleRemove(user)}>
        Leave Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}
