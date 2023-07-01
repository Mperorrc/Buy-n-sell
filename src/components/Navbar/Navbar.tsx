import { Button, Flex,Icon, Text, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import {TbMessageCircle } from "react-icons/tb"
import {BsFillFilePersonFill } from "react-icons/bs"
import {ChevronDownIcon} from "@chakra-ui/icons"
import {useSession} from "next-auth/react"
import {signOut} from "next-auth/react"
import { useRouter } from 'next/router';

const Navbar:React.FC = () => { 
    const session=useSession();
    const router=useRouter();
    const onClick=()=>{
      try {
        signOut();
        router.push("/");
      } catch (error) {
        console.log("signout error",error);
      }
    }
    return(
        <Flex
            width="100%"
            bg="black"
            direction={"row"}
            height="10vh"
            align="center"
            justify="center"
            flex-direction={"row"}
        >
            <Flex pl={6} justify={"center"} align="center" width="30%" fontSize={"26px"} fontWeight="700" fontFamily={"georgia"} color="white" textShadow={"0 0 6px blue"}  >
                Buy-n-Sell
                <Image ml={8} pl={4} bg="blue.100" width="45%" height="100%" src="images/bits-logo.gif"/>
            </Flex>
            <Flex width="50%">
                
            </Flex>
            <Flex justify={"flex-end"} align="center" width="10%">
                <Icon as={TbMessageCircle} onClick={()=>router.push("/chats/chats")} cursor="pointer" boxSize="40px" borderRadius={"full"} />
            </Flex>
            <Flex justify={"center"} align="center" width="10%">
                <Menu>
                    <MenuButton as={Button} height="100%" variant="logout" rightIcon={<ChevronDownIcon/>}>
                        <Icon as={BsFillFilePersonFill} boxSize="50px" cursor="pointer"/>
                    </MenuButton>
                    <MenuList>
                        <Text pl={3} pr={3} mt={2} mb={2} align="center" fontSize={"18px"} fontFamily="georgia" color="black" >{session.data?.user?.email}</Text>
                        <MenuItem pl={3} color="black" onClick={onClick} >Logout</MenuItem>
                        <MenuItem pl={3} color="black" onClick={()=>router.push("/chats/chats")} >View your messages</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}
export default Navbar;
