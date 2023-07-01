import { Button, Flex, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiSearchCircle } from 'react-icons/hi';
import Post from './Post';
import PostLoader from './postLoader';

type postsProps = {
    username:string,
    userEmail:string,
};

const posts:React.FC<postsProps> = ({username,userEmail}) => {
    const [loadingPosts,setLoadingPosts]=useState(false);
    const[posts,setPosts]=useState<{
        id:string,
        title:string,
        body:string,
        author:string,
        postType:string,
        created_at:string,
        imageUrls:string[],
        amount:string,
    }[]>([]);
    const [search,setSearch]=useState("");

    async function getPosts(){
        const res=await axios.get("/api/posts");
        const postData=[];
        for(let i=0;i<res.data.length;i++){
            const imageRes = await axios.get(`api/images/${res.data[i].id}`);
            const imgUrls=[];
            for(let j=0;j<imageRes.data.length;j++){
                imgUrls.push(imageRes.data[0].image);
            }
            postData.push({
                id:res.data[i].id,
                title:res.data[i].postTitle,
                body:res.data[i].postBody,
                author:res.data[i].author,
                postType:res.data[i].postType,
                created_at:res.data[i].created_at,
                imageUrls:imgUrls,
                amount:res.data[i].amount
            });
        }
        setPosts(postData);
    }

    const onDeletePost=async(id:string, images:string[])=>{
        try {
            setLoadingPosts(true);
            const deletedPostData=await axios.delete(`/api/posts/${id}`);
            getPosts();
        } catch (error) {
            console.log("DeletePost error",error);
        }
        setLoadingPosts(false);
    }

    useEffect(() => {    
        setLoadingPosts(true);
        getPosts();
        setLoadingPosts(false);
    }, [])

    return(
        <Flex width="100%" direction="column">
            <Flex bg="white" pt={3} pb={1} align="center" mb={4} borderRadius="15px" >
                <Flex color="black" flexGrow={1} width="600px" ml={6} align={"center"}>
                <InputGroup height="40px">
                    <InputLeftElement
                        pointerEvents='none'
                    >
                        <Icon as={HiSearchCircle} color='gray.400' boxSize={"24px"} mb={1}/>
                    </InputLeftElement>
                    <Input 
                        type='tel' 
                        placeholder='Search' 
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
                        height="34px"
                        bg="gray.50"
                        onChange={(e)=>{setSearch(e.target.value)}}
                        value={search}
                    />
                </InputGroup>
                <Button 
                    height="35px" 
                    position={"relative"}
                    borderRadius="0px 5px 5px 0px" 
                    left="-80px"
                    top="-2.5px"
                    _hover={{
                        bg:"gray.700"
                    }}
                >Search</Button>
            </Flex>
            </Flex>
            {loadingPosts?(
                <PostLoader/>
            ):(posts.map((post,index)=>(
                <Post username={username} userEmail={userEmail} key={index} posts={post} onDeletePost={onDeletePost} />
            )))}
        </Flex>
    )
}
export default posts;