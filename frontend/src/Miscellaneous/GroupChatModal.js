import React, { useState } from 'react'
import { useDisclosure, useToast,Box } from '@chakra-ui/react'
import UserBadgeItem from '../components/Authentication/UserAvatar/UserBadgeItem';
import UserListItem from '../components/Authentication/UserAvatar/UserListItem';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input
  } from '@chakra-ui/react'
  import { FormControl } from '@chakra-ui/form-control';
import { ChatState } from '../Context/chatProvider';
export default function GroupChatModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName,setgroupChatName]=useState();
    const [selectedusers,setselectedusers]=useState([]);
    const [search,setsearch]=useState('');
    const [searchResult,setsearchResult]=useState([]);
    const [loading,setloading]=useState(false);
    const toast=useToast();
    const {user,chats,setchats}=ChatState();
    console.log("user",user);
    const handleGroup=async(usertoAdd)=>{
      if(selectedusers.includes(usertoAdd)){
          toast({
              title:'User is already added',
              status:"warning",
              duration:5000,
              isClosable:true,
              position:"top",
          });
          return;
      }
      setselectedusers([...selectedusers,usertoAdd])
          }
    const handleSearch=async(query)=>{
         setsearch(query);
         if(!query){
            return;
         }
         try{
          setloading(true);
          const config={
            headers:{
                Authorization: `Bearer ${user.token}`
            }
          };
          const {data}=await axios.get(`api/user?search=${search}`,config);
          console.log(data);
          setloading(false);
          setsearchResult(data);
         }catch(error){
           toast({
            title:"Error Occured!",
            description:"Failed to load the Search Results",
            status:"error",
            duration:5000,
            isClosable: true,
            position: "bottom-left",
           })
         }
    }
    const handleSubmit=async()=>{
if(!groupChatName||!selectedusers){
    toast({
        title:'Please fill all the fields',
        status:"warning",
        duration:5000,
        isClosable:true,
        position:'top'
    });
    return;
}
try{
const config={
    headers:{
        Authorization:`Bearer ${user.token}`,
    },
};
const {data}=await axios.post(`/api/chat/group`,{
    name:groupChatName,
    users: JSON.stringify(selectedusers.map((u)=>u._id)),
},
config
);
console.log(data);
setchats([data,...chats]);
onClose();
toast({
    title:'New Group Chat is Created',
    status:"success",
    duration:5000,
    isClosable:true,
    position:'bottom'
});
setselectedusers([]);
setsearchResult([]);
}catch(error){
toast({
    title:'Failed to Create the Chat!',
    description:error.response,
    status:'error',
    duration:5000,
    isClosable:true,
    position:'bottom'
});
}
    }
    const handleDelete=(u)=>{
setselectedusers(selectedusers.filter((sel)=>sel._id!==u._id));
    }
  return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
              >Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody
              d="flex"
              flexDir="column"
              alignItems="center"
              >
               <FormControl>
                <Input placeholder='Chat Name' mb={3}
                onChange={(e)=>setgroupChatName(e.target.value)}
                ></Input>
               </FormControl>

               <FormControl>
                <Input placeholder='Add Users eg: John, Piyush, Jane' mb={1}
                onChange={(e)=>handleSearch(e.target.value)}
                ></Input>
               </FormControl>
               {/*selected users */}
               {/*render searched users */}
               <Box className="updategroupchat">
               {selectedusers.map(u=>(
                <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>
               ))}
               </Box>
               {loading? <div>loading</div>:searchResult?.slice(0,4).map(user=>(
                <UserListItem key={user._id} user={user} handleFunction={()=>{
                    handleGroup(user)
                }}/>
               ))}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='purple' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}
