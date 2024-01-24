import { FormControl, FormLabel,useToast, VStack,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
export default function Login() {
  const navigate=useNavigate();
  const toast=useToast();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setloading]=useState(false);
    const [show,setshow]=useState(false);
    const handleClick=()=>setshow(!show);
    const submitHandler=async()=>{
      setloading(true);
      if(!email || !password){
        toast({
          title: 'Please Fill all the Fields',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        setloading(false);
        return;
      }
      try{
      const config={
        headers:{
          "Content-type":"application/json",
        }
      };
      const {data}=await axios.post(
        "/api/user/login",
        {email,password},
        config);
      toast({
        title:"Login Successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:'bottom',
      });
      localStorage.setItem("userinfo",JSON.stringify(data));
      setloading(false);
      navigate('/chats');
      }
      catch(err){
      toast({
        title:'Error Occured!',
        description:err.response.data.message,
      status:'error',
      duration:5000,
      isClosable:true,
      position:'bottom'
      });
      setloading(false);
      }
    }
  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
      </FormControl>
      <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
      <Input placeholder='Enter Password' value={password} type={show ? "text": "password"} onChange={(e)=>setPassword(e.target.value)}></Input>
      <InputRightElement width="4.5rem">
      <Button h="1.75rem" mr={"2px"} sm="sm" onClick={handleClick}>
        {show ? "Hide":"Show"}
      </Button>
      </InputRightElement>
      </InputGroup>
      </FormControl>
      <Button colorScheme='purple' width="100%" style={{marginTop:15}} isLoading={loading} onClick={submitHandler}>Sign In</Button>
      <Button variant="solid" colorScheme='red' width="100%" style={{marginTop:15}}  onClick={()=>{
        setEmail("guest@gmail.com");
        setPassword("123456");
      }}>Get Guest User Credentials</Button>
    </VStack>
  )
}
