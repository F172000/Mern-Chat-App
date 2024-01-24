import { Tooltip,Button,Box, Text, Menu, MenuButton, MenuList,Avatar, MenuItem, MenuDivider, useToast } from '@chakra-ui/react';
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons';
import UserListItem from '../components/Authentication/UserAvatar/UserListItem';
import axios from 'axios';
import { Spinner } from '@chakra-ui/spinner';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/chatProvider';
import Profile from './Profile';
import ChatLoading from './ChatLoading';
import { useDisclosure } from '@chakra-ui/hooks';
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
export default function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate();
  const [search,setsearch]=useState("");
  const [researchresult,setresearchresult]=useState([]);
  const [loading,setLoading]=useState(false);
  const [loadingchat,setloadingchat]=useState(false);
  const {user,setselectedchat,chats,setchats}=ChatState();
  console.log("user in sidedrawer",user);
  const logouthandler=()=>{
    localStorage.removeItem('userinfo');
    navigate('/');
  }
  const toast=useToast();
  const handlesearch=async()=>{
    if(!search){
      toast({
        title: 'Please enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      return;    
    }
    try{
    setLoading(true);
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`,

      },
    };
    const {data}=await axios.get(`/api/user?search=${search}`,config);
    console.log('data',data);
    setLoading(false);
setresearchresult(data);
console.log(researchresult);
    }catch(error){
      toast({
        title: 'Error Ocurred!',
        description:'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      setLoading(false);
    }
  }
  const accessChat=async(userId)=>{
    console.log(userId);
try{
setloadingchat(true);
const config={
  headers:{
    "Content-type":"application/json",
    Authorization:`Bearer ${user.token}`,
  }
}
const {data}=await axios.post('/api/chat',{userId},config);
console.log("data",data);
if(!chats.find((c)=>c._id===data._id)){
  setchats([data,...chats]);
}
setselectedchat(data);
setloadingchat(false);
onclose();
}catch(error){
  toast({
    title: 'Error Fetching the chat',
    description:error.message,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: "bottom-left"
  });
}
  }
  return (
    <>
   <Box 
   className='header'
   >
    <Tooltip label='search users to chat' hasArrow placement='bottom-end'>
      <Button variant='ghost' onClick={onOpen}>
      <i class="fas fa-search"></i>
      <Text d={{base:"none",md:"flex"}} px={4}>Search user</Text>
      </Button>
    </Tooltip>
    <Text fontSize='2xl' fontFamily='Work sans'>ChitChat</Text>
    <div>
      <Menu>
        <MenuButton p={1}>
        <BellIcon fontSize="2xl" m={1}/>
        </MenuButton>
        {/* <MenuList></MenuList> */}
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
        <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}></Avatar>
        </MenuButton>
        <MenuList>
          <Profile user={user}>
          <MenuItem>My Profile</MenuItem>
          </Profile>
          <MenuDivider/>
          <MenuItem onClick={logouthandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
   </Box>
   <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay/>
    <DrawerContent>
      <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
      <DrawerBody>
      <Box style={{display:'flex'}} pb={2}>
      <Input
      placeholder='Search by name or email'
      mr={2}
      value={search}
      onChange={(e)=>setsearch(e.target.value)}
      ></Input>
      <Button
       onClick={handlesearch}
       >Go</Button>
      </Box>
      {loading? (
       <ChatLoading/>
      ):(
researchresult?.map((data)=>(
  <UserListItem key={data._id} user={data} handleFunction={()=>accessChat(data._id)}/>
))
      )}
      {loadingchat && <Spinner ml="auto" d='flex'/>}
    </DrawerBody>
    </DrawerContent>
   </Drawer>
   </>
  );
}
