import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Image, Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button
  } from '@chakra-ui/react'
import React from 'react'

export default function Profile({user,children}) {
    const {isOpen,onOpen,onClose}=useDisclosure();
  return (
    <>
      {children?<span onClick={onOpen}>{children}</span>:(<IconButton d={{base: "flex"}}
      icon={<ViewIcon/>}
      onClick={onOpen}
      ></IconButton>)}
      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height='410px'>
          <ModalHeader className='modalheader'>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          className='profilebody'
          >
          <Image
          borderRadius='full'
          boxSize='150px'
          src={user.pic}
          alt={user.name}
          ></Image>
          <Text
          fontSize={{base:"28px",md:"30px"}}
          fontFamily="Work sans"
          >Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
