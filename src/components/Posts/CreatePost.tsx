import {  Flex, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const CreatePost:React.FC = () => {
    const router=useRouter();
    return(
        <Flex  justify="center" align="center"  width="100%" direction="row" color="gray.600" >
            <Text fontSize={"15px"} fontWeight="400" mr={4} >New Post?</Text>
            <Input
                name="text"
                type="text"
                width="300px" 
                height="30px" 
                bg="blue.400" 
                color="black"
                cursor={"text"}
                borderRadius={"15px"}
                border="1px solid black"
                placeholder= 'Write Something ...' 
                _hover={{
                    bg:"gray.300",
                    border:"2px solid green"
                }}
                _placeholder={{
                    color:"white"
                }}
                mt={2} 
                mb={2}
                onClick={()=>{router.push("/NewPost")}}
            />
        </Flex>
    )
}
export default CreatePost;