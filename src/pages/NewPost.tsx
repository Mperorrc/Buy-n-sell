import { Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Icon, Image, Input, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const NewPost:React.FC = () => {
    const [textInputs,setTextInputs]=useState({
        title:"",
        body:"",
        amount:"",
    });
    const [load,setLoad]=useState(false);
    const [value, setValue] = React.useState('1')
    const {data:session}=useSession();
    const [error,setError]=useState("");
    const [selected,setSelected]=useState(false);
    const onChange=(event:any)=>{
        setTextInputs(prev=>({
            ...prev,
            [event.target.name]:event.target.value,
        }))
    }
    const router=useRouter();
    const [imagePreviewUrls,setImagePreviewUrls]=useState([] as string[]);
    let [files,setFiles]=useState([] as File[]);
    
    const onSelectFile=(event:any)=>{
        try {
            const selectedFiles = event.target.files;
            const newFiles : File[] =[...files];
            const newImgePreviewUrls:string[]=[...imagePreviewUrls];
            for(let i=0;i<selectedFiles.length;i++){
                const file = selectedFiles[i];
                newFiles.push(file);
                const reader=new FileReader();
                reader.onload=(e)=>{
                    newImgePreviewUrls.push(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
            setFiles(newFiles);    
            setImagePreviewUrls(newImgePreviewUrls);
        } catch (error) {
            console.log("Cant select images right now",error);
        }
        
    }
      
    const onSubmit=async()=>{
        try {
            setError("");
            if(textInputs.title.length===0||textInputs.body.length===0){
                setError("Post must contain a title and a body");
                return;
            }
            if(value!=="1"&&textInputs.amount.length===0){
                setError("Post in which you are selling a product must contain amount information")
                return;
            }
            if(value==="1"&&textInputs.amount.length!==0){
                setError("Post in which you are requesting for a product must not contain an amount entry")
                return;
            }
            if(textInputs.amount.length>5){
                setError("The amount of your product(s) is too large")
                return;
            }
            const regex = /^[0-9]+$/
            if (!regex.test(textInputs.amount)){
                setError("Invalid Amount");
                return;
            }
            const userData= await axios.get(`/api/email/${session?.user?.email}`);
            if(!userData.data.length){
                setError("Error creating Post, please login again");
                return;
            }
            const PostForm={
                postTitle:textInputs.title,
                postBody:textInputs.body,
                author:userData.data[0].username,
                postType:value==="1"?"request":"selling",
                amount:textInputs.amount,
                id:userData.data[0].username + (parseInt(userData.data[0].numberOfPosts)+1).toString(),
            }
            const PostRes=await axios.post("/api/posts",PostForm);
            const updateUser=await axios.put(`/api/email/${session?.user?.email}`,{
                numberOfPosts:parseInt(userData.data[0].numberOfPosts)+1,
                email:userData.data[0].email,
            });
            if (files.length===0||imagePreviewUrls.length===0) {
                router.push("/dashboard");
                return; 
            }

            const ImageData=[];

            for(let i=0;i<files.length;i++){
                const uploadImgData = new FormData();
                uploadImgData.append("file",files[i]);
                const uploadres=await axios.post("/api/uploadImage",uploadImgData)
                const ImageDataEl={
                    image:uploadres.data.message,
                    postId:userData.data[0].username + (parseInt(userData.data[0].numberOfPosts)+1).toString(),
                }
                ImageData.push(ImageDataEl);
            }
            for(let i=0;i<ImageData.length;i++){
                const ImageRes = await axios.post("/api/images",ImageData[i]);
            }
            router.push("/")
        } catch (error) {
            console.log("Post onSubmit Error",error);
        }
    }

    useEffect(() => {
        setSelected(false);
    }, [files])
    

    return(
        <Flex position={"absolute"} borderRadius={8} mt="5%" left="20%" color="black" direction="column" height="100%" width={"60%"} bg="white">
            <Flex direction="row">
                <Flex 
                    justify={"center"}
                    fontWeight={400} 
                    align="center" 
                    flexGrow={1} 
                    p="14px 0px" 
                    cursor="pointer" 
                    onClick={()=>{setSelected(false)}}
                    borderRightColor="gray.200"
                >
                    <Flex>
                        <Icon fontSize={20} as={IoDocumentText} />
                    </Flex>
                    <Text pl={4} fontFamily="sans-serif" fontSize={"10pt"}>Post</Text>
                </Flex>
                <Flex 
                    justify={"center"}
                    fontWeight={400}  
                    align="center" 
                    flexGrow={1}
                    onClick={()=>{setSelected(true)}}
                    p="14px 0px" 
                    cursor="pointer" 
                    _hover={{bg:"gray.50"}} 
                    borderRightColor="gray.200"
                >
                    <Flex>
                        <Icon fontSize={20} as={IoImageOutline} />
                    </Flex>
                    <Text pl={4} fontFamily="sans-serif" fontSize={"10pt"}>Images & Video</Text>
                </Flex>
            </Flex>
            {!selected?(
                <Flex pl={4} borderRadius={8} pr={4} pb={4} bg="white">
                    <Stack spacing={3} width="100%">
                        <Input
                            name="title"
                            value={textInputs.title}
                            onChange={onChange}
                            fontSize="10pt"
                            borderRadius={4}
                            placeholder="Title"
                            _placeholder={{color:"gray.500"}}
                            _focus={{
                                outline:"none",
                                bg:"white",
                                border:"1px solid blue.600"
                            }}
                        />
                        <Textarea
                            name="body"
                            value={textInputs.body}
                            fontSize="10pt"
                            borderRadius={4}
                            onChange={onChange}
                            placeholder="Text"
                            height="240px"
                            _placeholder={{color:"gray.500"}}
                            _focus={{
                                outline:"none",
                                bg:"white",
                                border:"1px solid blue.600"
                            }}
                        />
                        <Flex width="100%" align="center">
                            <Text pl={4} pr={4} >Amount</Text>
                            <Input
                                name="amount"
                                width="400px"
                                value={textInputs.amount}
                                onChange={onChange}
                                fontSize="10pt"
                                borderRadius={4}
                                placeholder="Amount in Rs."
                                _placeholder={{color:"gray.500"}}
                                _focus={{
                                    outline:"none",
                                    bg:"white",
                                    border:"1px solid blue.600"
                                }}
                            />
                        </Flex>
                        
                        <Flex direction="row" justify="center" align="center">
                            <Flex width="70%" height="100%" direction="row" justify="center" align="center">
                                <Flex width="40%">
                                    Type of Post
                                </Flex>
                                <Flex width="30%">
                                <RadioGroup onChange={setValue} value={value}>
                                    <Stack direction='row'>
                                    <Radio  pr={4} value='1'>Buying</Radio>
                                    <Radio value='2'>Selling</Radio>
                                    </Stack>
                                </RadioGroup>
                                </Flex>
                            </Flex>
                            <Flex width="30%" align="center" justify="center">
                                <Button 
                                    height="34px" 
                                    padding="0px 30px" 
                                    mt={2.5}
                                    onClick={onSubmit}
                                >
                                    Post
                                </Button>
                            </Flex>                
                        </Flex>
                        {error && (
                            <Flex width="100%" justify={"center"} align="center" mt={2}>
                                <Alert status='error'>
                                <AlertIcon />
                                <Text mr={2} fontWeight={900}>{error}</Text>
                                </Alert>
                            </Flex>
                        )}
                    </Stack>
                </Flex>
            
            ):(
                <Flex bg="white" borderRadius={8} direction="column" justify="center" align="center" width="100%">
                    {imagePreviewUrls.length?(
                        <>
                            <Flex direction="row" width="100%" overflow-x="scroll" justify="center" align="center" pt={4} pb={4}>
                            <Carousel
                                autoPlay={true}
                                showThumbs={false}
                                width={450}
                            >
                                {imagePreviewUrls.map((url,index)=>(
                                    <Image ml={1} mr={1} key={index} src={url} alt="images" height="300px" width="450px"/>
                                ))}
                            </Carousel>
                            </Flex>
                            <Stack direction="row" mt={4}>
                                <Button
                                    height="30px"
                                    fontWeight={600}
                                    onClick={()=>{setSelected(false),console.log(files,imagePreviewUrls)}}
                                    mb={4} mr={4}
                                >Back to Post</Button>
                                <Button
                                    height="30px"
                                    fontWeight={600}
                                    onClick={()=>{setFiles([]),setImagePreviewUrls([])}}
                                    mb={4}
                                    variant="outline"
                                >Remove All Images</Button>
                            </Stack>
                        </>
                    ):
                    (<Box pt="100px" height="300px" justifyItems="center" alignItems="center">
                        <FormControl justifyItems={"center"} alignItems="center">
                          <Flex align="center" width="100%">
                          <FormLabel>Upload Images</FormLabel>
                          </Flex>
                          <Flex pl={2} width="100%" align="center">
                          <Input
                            type="file"
                            multiple
                            onChange={onSelectFile}
                            display="none"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload">
                            <Button as="span">Upload</Button>
                          </label>
                          </Flex>
                        </FormControl>
                      </Box>)}
                </Flex>
            )}
        </Flex>
    )
}
export default NewPost;