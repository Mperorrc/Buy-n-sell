import { Alert, AlertIcon, AlertTitle, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { signIn, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Pagediv from './UserLogin/Pagediv';

const Login:React.FC= () => {
    const session=useSession();
    const [loginForm,setLoginForm]=useState({
        username:"",
        password:""
    });
    const router=useRouter();
    const [error,setError]=useState("");
    const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm(prev=>({
            ...prev,
            [event.target.name]:event.target.value,
        }))
    }

    const onSubmit=async()=>{
        if(error){setError("");}
        try {
            if(loginForm.username.length==0||loginForm.password.length==0){
                setError("Please enter your Username and Password");
                return;
            }
            const userData= await axios.get(`/api/username/${loginForm.username}`)
            if(!userData.data.length){
                setError("Invalid Username or Password");
                return;
            }
            if(userData.data[0].password!==loginForm.password){
                setError("Invalid Username or Password");
                return;
            }

            const res= await signIn("credentials",{
                email:userData.data[0].email,
                username:userData.data[0].username,
                id:userData.data[0].id,
                numberOfPosts:userData.data[0].numberOfPosts,
                redirect:false,
            });
            setLoginForm(prev=>({
                ...prev,
                username:"",
                password:"",
            }));
            router.push("/dashboard");
        } catch (error) {
            console.log("onSubmit Login error",error);
        }
    }

    useEffect(() => {
        if(session.data?.user){
            router.push("/dashboard")
        }
    }, [session])

    return(
        <Pagediv>
            <>
                <Flex height="100%" width="100%" direction="column">
                    <Flex
                        height="100%"
                        width="100%"
                        bg="blue.400"
                        justify="center"
                        align="center"
                        display=" grid"
                        grid-template-columns= "repeat(auto-fit, min(400px, 100%))"
                        gap= "1rem"
                        align-items= "center"
                        justify-content= "center"
                        background= "linear-gradient(45deg,violet,cyan)"
                        background-attachment= "fixed"
                        inset="0"
                        background-image= "var(--dottedBackground)"
                        background-size= "var(--bgSize, 1rem) var(--bgSize, 1rem)"
                        background-repeat= "round"
                        background-position= "0 0, var(--bgPosition) var(--bgPosition)"
                        mask-image= "var(--mask)"
                    >
                        <Text
                            textShadow={"0 0 10px white"}
                            fontFamily={"cursive"}
                            fontWeight="800"
                            fontSize={"60px"}
                            color="black"
                        >Buy-n-Sell @ BPHC</Text>
                    </Flex>
                </Flex>
            </>
            <> 
                <form>
                <Flex
                    direction="column"
                    color="black"
                    align="center"
                    justify="center"
                    width="100%"
                >
                    <Flex
                        fontSize={"35px"}
                        fontWeight="800"
                        width="100%"
                        align="center"
                        justify={"center"}
                    >
                        Login
                    </Flex>
                    <Flex
                        mt={4}
                        align="center"
                        direction={"row"}
                        justify="center"
                        width="100%"
                    >
                        <Flex align="center" direction="column" >
                            <Flex mt={2} mb={2} >
                                Username
                            </Flex>
                            <Flex mt={2} mb={2} >
                                Password
                            </Flex>
                        </Flex>
                        <Flex align="center" direction="column" ml={4} >
                            <Input
                                required
                                name="username"
                                type="text"
                                width="330px"
                                height="30px"
                                bg="gray.300"
                                color="black"
                                cursor={"text"}
                                border="1px solid black"
                                placeholder='username'
                                _hover={{
                                    bg:"blue.50",
                                    border:"2px solid green"
                                }}
                                _placeholder={{
                                    color:"white"
                                }}
                                mt={2}
                                mb={2}
                                onChange={onChange}
                            />
                            <Input
                                required
                                name="password"
                                type="password"
                                width="330px"
                                height="30px"
                                bg="gray.300"
                                color="black"
                                placeholder='Password'
                                cursor={"text"}
                                border="1px solid black"
                                _hover={{
                                    bg:"blue.50",
                                    border:"2px solid green"
                                }}
                                _placeholder={{
                                    color:"white"
                                }}
                                mt={2}
                                mb={2}
                                onChange={onChange}
                            />
                        </Flex>
                    </Flex>
                    <Flex
                        width="100%"
                        direction={"row"}
                        mt={2}
                        mb={2}
                        align={"center"}
                        fontSize="16px"
                        justify={"center"}
                    >
                        <Flex>Do not have an account?</Flex>
                        <Link href="/Signup">
                            <Button ml={4} variant="outline" size="sm" >
                                Signup
                            </Button>
                        </Link>
                    </Flex>
                    <Flex
                        width="100%"
                        direction={"row"}
                        mt={2}
                        mb={2}
                        align={"center"}
                        fontSize="16px"
                        justify={"center"}
                    >
                        <Flex>Forgot Password?</Flex>
                        <Link href="/ResetPassword">
                        <Button ml={4} variant="outline" size="sm" >Reset</Button>
                        </Link>
                    </Flex>
                    {error&&(<Flex
                        width="80%"
                        justify={"center"}
                        align="center"
                        mt={2}
                        p={2}
                    >
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    </Flex>)}
                    <Flex
                        width="100%"
                        justify={"center"}
                        align="center"
                        mt={2}
                    >
                        <Button
                            width="150px"
                            fontSize={"20px"}
                            fontWeight="600"
                            onClick={onSubmit}
                        >Submit</Button>
                    </Flex>
                </Flex>
                </form>
            </>
        </Pagediv>
    )
}
export default Login;
