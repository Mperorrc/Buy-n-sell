import { Button, Flex, Icon, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { HiSearchCircle } from 'react-icons/hi';

type chatsProps = {
    
};

const chats:React.FC<chatsProps> = () => {
    const {data:session}=useSession();
    const router=useRouter();
    const [loading,setLoading]=useState(true);
    const [rightload,setRightLoad]=useState(true);
    const [users,setusers]=useState<string[]>([]);
    const [username,setUsername]=useState("");
    const [currentlyTalkingToUser,setCurrentlyTalkingToUser]=useState("");
    const [newMessage,setNewMessage]=useState("");
    const [reducerVaue,forceUpdate] = useReducer(x => x+1,0);
    const [chatMsgs,setChatMsgs]=useState<{
        chatWithUsername:string,
        sentByUser:boolean,
        sent_at:string,
        chatBody:string,
    }[]>([]);
    const [chats,setChats]=useState<{
        chatWithUsername:string,
        sentByUser:boolean,
        sent_at:string,
        chatBody:string,
    }[]>([]);
    const getChat= async()=>{
        const userData= await axios.get(`/api/email/${session?.user?.email}`);
        setUsername(userData.data[0].username);
        const chatData= await axios.get(`/api/chats/${userData.data[0].username}`);
        console.log("getchatRan");
        for(let i=0;i<chatData.data.length;i++){
            const findingName=chatData.data[i].senderUsername===userData.data[0].username?chatData.data[i].receiverUsername:chatData.data[i].senderUsername;
            chats.push({
                chatWithUsername:chatData.data[i].senderUsername===userData.data[0].username?chatData.data[i].receiverUsername:chatData.data[i].senderUsername,
                sentByUser:chatData.data[i].senderUsername===userData.data[0].username?true:false,
                sent_at:chatData.data[i].sent_at,
                chatBody:chatData.data[i].body
            });
            if(!users.find(user => user===findingName)){    
                users.push(chatData.data[i].senderUsername===userData.data[0].username?chatData.data[i].receiverUsername:chatData.data[i].senderUsername)
            }
        }
        setLoading(false);
    }

    const getRightContent = async(secondName:string)=>{
        try {
            setRightLoad(true);
            if(!currentlyTalkingToUser){
                setCurrentlyTalkingToUser(secondName);
            }
            const chatMessages=[];
            for(const chat of chats){
                if(chat.chatWithUsername===secondName){
                    chatMessages.push(chat);
                }
            }
            console.log("getRCRan");
            console.log("cc",chatMessages);
            setChatMsgs(chatMessages);
            setRightLoad(false);    
        } catch (error) {
            console.log("getRightcontent error",error)
        }
        
    }

    const onSend=async()=>{
        if(newMessage.length===0){
            return;
        }
        try {
            setRightLoad(true);
            const reqData = {
                body:newMessage,
                senderUsername:username,
                receiverUsername:currentlyTalkingToUser
            };
            setChats([]);
            setChatMsgs([]);
            setNewMessage("");
            const tempChat=[],tempchatMsgs=[];
            const newMsgData=await axios.post(`/api/chats`,reqData);
            console.log(currentlyTalkingToUser);
            const userData= await axios.get(`/api/email/${session?.user?.email}`);
            const chatData= await axios.get(`/api/chats/${userData.data[0].username}`);
            for(let i=0;i<chatData.data.length;i++){
                tempChat.push({
                    chatWithUsername:chatData.data[i].senderUsername===userData.data[0].username?chatData.data[i].receiverUsername:chatData.data[i].senderUsername,
                    sentByUser:chatData.data[i].senderUsername===userData.data[0].username?true:false,
                    sent_at:chatData.data[i].sent_at,
                    chatBody:chatData.data[i].body
                });
            }

            for(const chat of tempChat){
                if(chat.chatWithUsername===currentlyTalkingToUser){
                    tempchatMsgs.push(chat);
                }
            }
            setChats(tempChat);
            setChatMsgs(tempchatMsgs);
        } catch (error) {
            console.log("onSend Message Error",error)
        }        
        setRightLoad(false);
    }
    useEffect(()=>{
        getChat();
    },[])

    return(
        <Flex bg="blackAlpha.800" direction={"row"} height="90vh" width="100%">
            <Flex  width="35%" overflow={"auto"} align="center" direction={"column"} color="black">
                <Flex width="100%" pt={4} pb={4} fontSize={"24px"} fontWeight={600} fontFamily={"helvetica"} justify="center" align="center" bg="#FF00FF" color="white">
                    Your Messages
                </Flex>
                {(!loading && chats.length>0) && (
                    users.map((user,idx)=>(
                        <Flex 
                            cursor="pointer" 
                            width="100%" 
                            pt={4} pb={4} 
                            fontSize={"20px"} 
                            fontWeight={400} 
                            align="center" 
                            justify={"center"} 
                            bg="white" 
                            color="black" 
                            pl={4} 
                            border="1px solid black" 
                            onClick={()=>{getRightContent(user)}} 
                        >
                            <Text key={idx} >{user}</Text>
                        </Flex>
                        
                    ))
                )}
                <Flex width="100%" mt={8} align="center" justify="center">
                    <Button onClick={()=>{console.log(chats,users,chatMsgs)}} >Start a New Chat</Button>
                </Flex>
            </Flex>
            <Flex  width="65%" bg="#212331" borderLeft="1px solid white" justify={"center"} align="center" >
                {rightload?(
                    <Flex width="100%" fontSize={"40px"} justify="center" align="center" fontWeight={800} height="100px" color="white">
                        Select a person to chat with
                    </Flex>
                ):(
                    <Flex color="white" width="100%" height="100%" direction="column">            
                        <Flex width="100%" height="94%" direction="column"
                        overflow="auto"
                        >
                            {chatMsgs.map((chat,idx)=>(
                                <Flex 
                                    key={idx}
                                    width="100%"
                                    align={chat.sentByUser===true?"flex-end":"flex-start"}
                                    height="100%"
                                    direction="column"
                                >
                                    <Flex
                                        bg="black"
                                        maxWidth="40%"
                                        direction={"column"}
                                        borderRadius={"10px"}
                                        p={4}
                                        m={4}
                                    >
                                        <Flex justify={chat.sentByUser===true?"flex-end":"flex-start"}
                                            flexBasis={"40%"}
                                            wordBreak="break-word"
                                            pb={4}
                                        >
                                            {chat.chatBody}
                                        </Flex>
                                        <Flex justify={"flex-end"} fontSize="8pt" fontWeight={100} color="white" >
                                            {moment(new Date(chat.sent_at)).fromNow()}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                        <Flex width="100%" height="6%" bg="white" color="black" align="center">
                            <InputGroup height="100%">
                                <InputLeftElement
                                    pointerEvents='none' 
                                    alignItems="center"
                                >
                                    <Icon as={HiSearchCircle} color='gray.400' boxSize={"28px"}/>
                                </InputLeftElement>
                                <Input 
                                    type='tel' 
                                    placeholder='Message ...' 
                                    value={newMessage}
                                    fontSize={'10pt'} 
                                    _placeholder={{color:"gray.500"}}
                                    _hover={{
                                        bg:'white',
                                        border:"1px solid",
                                        borderColor:"blue.500",
                                    }} 
                                    _focus={{
                                        outline:'none',
                                        border:'1px solid',
                                        borderColor:"blue.500",
                                    }}
                                    bg="gray.50"
                                    onChange={(e)=>{setNewMessage(e.target.value);console.log(newMessage)}}
                                />
                            </InputGroup>
                            <Button 
                                height="100%" 
                                position={"relative"}
                                borderRadius="5px 0px 0px 5px" 
                                onClick={onSend}
                                _hover={{
                                    bg:"gray.700"
                                }}
                            >Send message</Button>
                        </Flex>

                    </Flex>
                )}
                </Flex>
        </Flex>
    )
}

export default chats;

