import { Divider, Flex, Icon, Stack,Text,Image, Input, Box, Skeleton, SkeletonText, Button } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

type PostProps = {
    posts:{ id:string,
            title:string,
            body:string,
            author:string,
            postType:string,
            created_at:string,
            imageUrls:string[],
            amount:string,
    },
    username:string,
    userEmail:string,
    onDeletePost:(id:string,images:string[])=>Promise<void>;
};

const Post:React.FC<PostProps> = ({posts,onDeletePost,username,userEmail}) => {
    const [comments,setComments]=useState<{
        username:string,
        commentBody:string,
        created_at:string,
        commentId:number,
    }[]>([]);
    const [disp,setDisp]=useState(false);
    const [loadComment,setLoadComment]=useState(false);
    const [newComment,setNewComment]=useState("");
    const getComments=async()=>{
        try {
            const commentData=await axios.get(`/api/comments/create/${posts.id}`);
            const tempComment=[];
            for(let i=0;i<commentData.data.length;i++){
                const comment={
                    username:commentData.data[i].username,
                    commentBody:commentData.data[i].commentBody,
                    created_at:commentData.data[i].created_at,
                    commentId:commentData.data[i].id,
                };
                tempComment.push(comment);
            }
            setComments(tempComment);
        } catch (error) {
            console.log("getComments error",error);
        }
    }

    const onClickDisplay=()=>{
        try {
            if(disp){
                setDisp(!disp);
                return;
            }
            setLoadComment(true);
            setDisp(!disp);
            getComments();
            
        } catch (error) {
            console.log("onClickDisplay error",error);
        }
        setLoadComment(false);
    }

    const onSubmit=async()=>{
        if(newComment.length===0){
            return;
        }
        try {
            setLoadComment(true);
            const formData={
                username:username,
                commentBody:newComment,
                postId:posts.id,
            };
            const commentData=await axios.post("/api/comments/",formData);
            getComments();
        } catch (error) {
           console.log("onSubmit error for creating comment",error) 
        }
        setNewComment("");
        setLoadComment(false);
    }

    const onDeleteComment=async(commentId:number)=>{
        try {
            setLoadComment(true);
            const commentData=await axios.delete(`/api/comments/delete/${commentId}`);
            getComments();
        } catch (error) {
           console.log("onDeleteComment error for deleting comment",error) 
        }
        setLoadComment(false);
    }

    return (
        <>
            <Flex align="center" direction="column" width="100%" pl={4} bg="white" color="black" mb={8} pr={4} borderRadius="16px">
                <Flex pb={3} align="center" pt={3} direction="row" fontSize="10px" width="100%" color="gray.500">
                    <Flex width="10%" >
                        <Text 
                            fontSize="20px" 
                            fontWeight={700} 
                            bg="black"
                            color="white"
                            align="center"
                            pl={2}
                            pr={2}
                            pt={1}
                            pb={1}
                            borderRadius={"50%"}
                        >{posts.author.slice(0,1)}</Text>
                    </Flex>
                    <Stack width="20%" spacing={"0.2"} direction = "column">
                        <Text fontSize="8pt" fontWeight={100} color="gray.500">Posted by {posts.author}</Text>
                        <Text fontSize="8pt" fontWeight={100} color="gray.500" >{moment(new Date(posts.created_at)).fromNow()}</Text>
                    </Stack>            
                    <Text width="30%" pl={3} pr={3} align="center" fontSize="14pt" fontFamily={"georgia"} fontWeight={600} color="gray.700" >{posts.postType.toUpperCase()}</Text>
                    {posts.postType==="selling"&&(
                        <Flex border="1px solid black" pl={3} pr={3} align="center" fontSize="10pt" fontWeight={400} color="gray.700" >
                            <Text pl={3} pr={3} >Amount : </Text>
                            <Text pr={3}>{posts.amount}</Text>
                        </Flex>
                    )}
                </Flex>
                <Divider/>
                <Flex fontSize={"20px"} align="center" fontWeight="600" pb={1} pt={2} width="100%">
                    {posts.title}
                </Flex>
                <Divider/>
                <Flex fontSize={"14px"} pt={4} align="center" pb={4} width="100%">
                    {posts.body}
                </Flex>
                {posts.imageUrls.length>0 && (
                    <Flex width="80%" mt={4} mb={8} justify="center" align="center" direction="row" >
                        <Carousel
                            autoPlay={true}
                            showThumbs={false}
                            infiniteLoop={true}
                            width={450}
                        >
                            {posts.imageUrls.map((img,idx)=>(
                                <Image key={idx} ml={1} mr={1} src={`/uploads/${img}`} alt="images" height="300px" width="450px"/>
                            ))}
                        </Carousel>
                    </Flex>
                )}
                <Divider/>
                <Flex mt={1} mb={2} width="100%" align="center" direction={"row"}>
                    {username===posts.author && (<Flex align="center" cursor="pointer" onClick={()=>{onDeletePost(posts.id,posts.imageUrls)}} direction="row" _hover={{border:"1px solid gray.300",bg:"blue.50"}} >
                        <Text fontSize="8pt" fontWeight={100} color="gray.500"  >Delete Post</Text>
                        <Icon pl={1} as={AiFillDelete} boxSize="24px" color="gray.500" borderRadius={"full"} />
                    </Flex>)}
                    <Flex pl={2} align="center" cursor="pointer" onClick={onClickDisplay} direction="row" _hover={{border:"1px solid gray.300",bg:"blue.50"}} >
                        <Text fontSize="8pt" fontWeight={100} color="gray.500" >Comments</Text>
                        <Icon pl={1} as={GoComment} boxSize="24px" color="gray.500" borderRadius={"full"} />
                    </Flex>
                </Flex>
                {disp && (<Flex mt={1} mb={2} width="100%" align="center" direction={"column"}>
                    <Flex width="100%" direction={"column"} border="1px solid" borderColor={"gray.300"} boxShadow="lg" borderRadius={4} >
                        <Flex mt={1} align="center" justify={"center"} width="30%" fontSize="10pt" fontWeight={400} color="gray.500" >
                            Create Comment
                        </Flex>
                        <Flex pl={"5%"} mt={4} mb={4} width="90%" color="white" >
                            <Input 
                                borderRadius={"15px"} 
                                placeholder='Add Comment ...' 
                                fontSize={"10pt"} 
                                _placeholder={{color:"white"}} 
                                bg="blue.500" 
                                value={newComment}
                                onChange={(e)=>{setNewComment(e.target.value)}}
                            />
                        </Flex>
                        <Flex width="100%" mb={4} pr="10%" justify="flex-end" align="center">
                            <Button onClick={onSubmit} bg="black" height="30px">Add</Button>
                        </Flex>
                    </Flex>
                    {loadComment?(
                        <Stack spacing={6} width="100%" direction={"column"} >
                            <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
                                <SkeletonText mt="4" noOfLines={2} width="80%" spacing="4" />
                                <Skeleton mt="4" height="40px" />
                            </Box>
                            <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
                                <SkeletonText mt="4" noOfLines={2} width="80%" spacing="4" />
                                <Skeleton mt="4" height="40px" />
                            </Box>
                        </Stack>
                    ):(
                        <>
                        <Divider/>
                        <Stack mt={3} mb={2} spacing={6} width="100%" direction={"column"}>
                            {comments.map((comment,idx)=>(
                                <Flex direction="column" border="1px solid" borderColor={"gray.300"} width="100%" key={idx} padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
                                    <Flex mb={2} width="100%" fontSize="10pt" fontWeight={400} color="black"> 
                                        {comment.username}
                                    </Flex>
                                    <Divider/>
                                    <Flex mt={2} mb={2} width="100%" fontSize="8pt" fontWeight={400} color="gray.500">
                                        {comment.commentBody}
                                    </Flex>
                                    <Divider/>
                                    <Flex mt={2} width="100%" align="center" direction={"row"}>
                                        <Flex width="80%" align="center" cursor="pointer" direction="row" _hover={{border:"1px solid gray.300",bg:"blue.50"}} >
                                            { username===comment.username && (<><Text fontSize="8pt" fontWeight={100} color="gray.500" align="center" onClick={()=>{onDeleteComment(comment.commentId)}} >Delete Comment</Text>
                                            <Icon pl={1} as={AiFillDelete} boxSize="24px" color="gray.500" borderRadius={"full"} /></>)}
                                        </Flex>
                                        <Flex mt={1} mb={1} width="20%" fontSize="10pt" fontWeight={400} color="gray.500" justify={"flex-end"} align="center">
                                            {moment(new Date(comment.created_at)).fromNow()}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))}
                        </Stack>
                        </>
                    )}
                </Flex>)}
            </Flex>
        </>
    )
}

export default Post;