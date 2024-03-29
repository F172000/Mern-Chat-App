import React, { useState } from 'react'
import { FormControl, FormLabel,useToast, VStack,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
export default function Signup() {
  const navigate=useNavigate();
  const [show,setshow]=useState(false);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmpassword,setConfirmpassword]=useState('');
  const [pic,setPic]=useState('');
  const [loading,setloading]=useState(false);
  const toast=useToast();
  const handleClick=()=>setshow(!show);
  const postdetails=(pics)=>{
    setloading(true);
if(pics===undefined){
  toast({
    title: 'Please select an Image!',
    status: 'warning',
    duration: 5000,
    isClosable: true,
    position: "bottom"
  });
  return;
}
if(pics.type==="image/jpeg" || pics.type==="image/png"){
  const data=new FormData();
  data.append("file",pics);
  data.append("upload_preset","ChitChat");
  data.append("cloud_name","dzhvjtoot");
  fetch("https://api.cloudinary.com/v1_1/dzhvjtoot/image/upload",{
    method:"post",
    body:data
  }).then((res)=>res.json()).then(data=>{
    setPic(data.url.toString());
    console.log(data);
    setloading(false);
  }).catch((err)=>{
    console.log(err);
    setloading(false);
  });
}else{
  toast({
    title: 'Please select an Image!',
    status: 'warning',
    duration: 5000,
    isClosable: true,
    position: "bottom"
  });
  setloading(false);
  return;
}
  }
  const submitHandler=async()=>{
setloading(true);
if(!name || !email || !password || !confirmpassword){
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
if(password!==confirmpassword){
  toast({
    title: 'Password Do Not Match',
    status: 'warning',
    duration: 5000,
    isClosable: true,
    position: "bottom"
  });
  return;
}
try{
const config={
  headers:{
    "Content-type":"application/json",
  }
};
const {data}=await axios.post(
  "/api/user",
  {name,email,password,pic},
  config);
toast({
  title:"Registration successful",
  status:"success",
  duration:5000,
  isClosable:true,
  position:'bottom',
});
localStorage.setItem("userinfo",JSON.stringify(data));
setloading(false);
navigate('/');
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
  };
  return (
    <VStack spacing='5px' color='black'>
    <FormControl id='first-name' isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}></Input>
    </FormControl>
    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}></Input>
    </FormControl>
    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
      <Input placeholder='Enter Password' type={show ? "text": "password"} onChange={(e)=>setPassword(e.target.value)}></Input>
      <InputRightElement width="4.5rem">
      <Button h="1.75rem" mr={"2px"} sm="sm" onClick={handleClick}>
        {show ? "Hide":"Show"}
      </Button>
      </InputRightElement>
      </InputGroup>
    </FormControl>
    <FormControl id='confirmpassword' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
      <Input placeholder='Enter Confirm Password' type={show ? "text": "password"} onChange={(e)=>setConfirmpassword(e.target.value)}></Input>
      <InputRightElement width="4.5rem">
      <Button h="1.75rem" mr={"2px"} sm="sm" onClick={handleClick}>
        {show ? "Hide":"Show"}
      </Button>
      </InputRightElement>
      </InputGroup>
    </FormControl>
    <FormControl id='pic' isRequired>
      <FormLabel>Upload your Picture</FormLabel>
      <Input type='file' p={1.5} accept='image/*' onChange={(e)=>postdetails(e.target.files[0])}></Input>
    </FormControl>
    <Button colorScheme='purple' width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
  </VStack>
  )
}
