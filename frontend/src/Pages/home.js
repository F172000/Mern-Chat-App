import React from 'react'
import {Container,Box,Text, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import Login from '../components/Authentication/login';
import Signup from '../components/Authentication/signup';
import { Navigate,useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
export default function Home() {
  const navigate=useNavigate();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userinfo"));
    if(user){
      navigate('/chats');
    }
       },[navigate]);
  return (
    <>
    <Container maxW='xl' centerContent>
    <Box d='flex' justifyContent="center" p={3} bg='white' w='100%' m='40px 0 15px 0px' borderRadius='lg' borderWidth='1px' >
      <Text fontSize='4xl' fontFamily='work sans' color='black' textAlign='center'>ChitChat</Text>
    </Box>
    <Box  bg='white' p={4} w='100%' borderRadius='lg' borderWidth='1px' color='black'>
    <Tabs variant='soft-rounded' colorScheme='purple'>
  <TabList mb='1em'>
    <Tab w='50%'>Sign In</Tab>
    <Tab w='50%'>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
     <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
    </>
  );
}
