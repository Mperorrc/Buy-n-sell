import {Flex, Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/Posts/CreatePost";
import Posts from "../components/Posts/Posts";
import Login from ".";
import {useSession} from "next-auth/react"
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router=useRouter();
  const { data : session }=useSession();  
  const [username,setUsername]=useState("");
  const [useremail,setUserEmail]=useState("");
  const [loading,setLoading]=useState(false);

  const getUserData=async()=>{
    const userData= await axios.get(`/api/email/${session?.user?.email}`);
    setUserEmail(userData.data[0].email);
    setUsername(userData.data[0].username);
  }
  useEffect(() => {
    if(session?.user){
      getUserData();
    }
    else{
      router.push("/");
    }
    setLoading(true);
  }, [session])
  

  return (
    <>
    {loading &&(  <Flex width="100%" direction="row">
      <Flex
        ml="10%"
        width="45%"
        align="center"
        justify="center"
        mt="10"
      >
        <Posts username={username} userEmail={useremail} />
      </Flex>
      <Flex position="fixed" mt="50px" left="55%"  ml="5%" width="37.5%" direction={"column"}>
          <Flex borderRadius={"30px"} bg="white" width="100%" pt="1" pb="1">
            <CreatePost/>
          </Flex>
          <Flex borderRadius={"30px"} direction="column" color="black" mt={"6"} bg="white" align="center" justify="center" >
            <Flex pt={2} fontSize={"24px"} fontFamily="georgia" fontWeight={"800"}>
              Community Rules
            </Flex>
            <Flex direction="column" fontSize="15px" color="gray.400" fontFamily={"Calibiri"} >
              <Text pl={1} pt={3} pb={1} >Posts should be relevant to this group</Text>
              <Text pl={1} pt={1} pb={1} >Every Post gets automatically deleted after a year to keep search results relevant</Text>
              <Text pl={1} pt={1} pb={4} >Delete your post after the item has been sold</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>)}
    </>
  )
}
