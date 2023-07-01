import { Alert, AlertIcon, AlertTitle, Button, Flex, Image, Input, Link, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Pagediv from './UserLogin/Pagediv';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const router=useRouter();
    const [error,setError]=useState("");
    const [signupForm,setSignupForm]=useState({
        username:"",
        email:"",
        IDnumber:"",
        password:"",
        confirmPassword:"",
    });

    const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setSignupForm(prev=>({
            ...prev,
            [event.target.name]:event.target.value,
        }))
    }
    
    const onSubmit=async()=>{
        try {
            if(error) setError('');
            if(signupForm.IDnumber.length==0||signupForm.username.length==0||signupForm.email.length==0||signupForm.password.length==0||signupForm.confirmPassword.length==0){
                setError("All the fields are required")
                return;
            }
            if(signupForm.email.length < 37 ||signupForm.email.length >37 || signupForm.email.substring(9)!=="@hyderabad.bits-pilani.ac.in"){
                setError("Invalid email")
                return;
            }
            if(signupForm.IDnumber.length<13||signupForm.IDnumber.length>13||signupForm.IDnumber[12]!=='H'){
                setError("Invalid ID number")
                return;
            }
            if(signupForm.email.substring(1,5)!==signupForm.IDnumber.substring(0,4)||signupForm.email.substring(5,9)!==signupForm.IDnumber.substring(8,12)){
                setError("Invalid email or ID number")
                console.log(signupForm.email.substring(1,5),signupForm.IDnumber.substring(0,4),signupForm.email.substring(5,4),signupForm.IDnumber.substring(8,4))
                return;
            }
            if(signupForm.password.length<6){
                setError("Password is too short")
                return;
            }
            if(signupForm.password.length>20){
                setError("Password is too long")
                return;
            }
            if(signupForm.password!==signupForm.confirmPassword){
                setError("Passwords do not match");
                return;
            }
            let userData=await axios.get(`/api/username/${signupForm.username}`);
            console.log(userData.data.length)
            if(userData.data.length){
                setError("Username Taken");
                return;
            }
            userData=await axios.get(`/api/email/${signupForm.email}`);
            if(userData.data.length){
                setError("Email is already in use");
                return;
            }
            userData=await axios.post("/api/users",signupForm);
            setSignupForm(prev=>({
                ...prev,
                username:"",
                email:"",
                password:"",
                confirmPassword:"",
                IDnumber:"",
            }));
            router.push("/Login");
        } catch (error) {
            console.log("onSubmit error",error);
        }
    }
    return (
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
                        SignUp
                    </Flex>
                    <Flex mt={4} mb={2} width="100%" justify={"center"} align="center">
                        <Flex width="100%" direction="column" justify={"center"} align="center">
                            <Flex direction="row" mt={1} mb={1} width="100%">
                                <Flex width="35%" justify={"center"} align="center">
                                    <Text fontSize={"16px"} fontWeight="400">Username</Text>
                                </Flex>
                                <Flex width="65%" justify={"center"} align="center">
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
                                    placeholder="Username" 
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
                            <Flex direction="row"  mt={1} mb={1} width="100%">
                                <Flex width="35%" justify={"center"} align="center">
                                    <Text fontSize={"16px"} fontWeight="400">Email</Text>
                                </Flex>
                                <Flex width="65%" justify={"center"} align="center">
                                <Input
                                    required
                                    name="email"
                                    type="text"
                                    width="330px" 
                                    height="30px" 
                                    bg="gray.300" 
                                    color="black"
                                    cursor={"text"}
                                    border="1px solid black"
                                    placeholder="f20xxxxxx@hyderabad.bits-pilani.ac.in" 
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
                            <Flex direction="row"  mt={1} mb={1} width="100%">
                                <Flex width="35%" justify={"center"} align="center">
                                    <Text  fontSize={"16px"} fontWeight="400">ID number</Text>
                                </Flex>
                                <Flex width="65%" justify={"center"} align="center">
                                <Input
                                    required
                                    name="IDnumber"
                                    type="text"
                                    width="330px" 
                                    height="30px" 
                                    bg="gray.300" 
                                    color="black"
                                    cursor={"text"}
                                    border="1px solid black"
                                    placeholder="e.g. : 2020B4A4xxxxH" 
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
                            <Flex direction="row"  mt={1} mb={1} width="100%">
                                <Flex width="35%" justify={"center"} align="center">
                                    <Text fontSize={"16px"} fontWeight="400">Password</Text>
                                </Flex>
                                <Flex width="65%" justify={"center"} align="center">
                                <Input
                                    required
                                    name="password"
                                    type="password"
                                    width="330px" 
                                    height="30px" 
                                    bg="gray.300" 
                                    color="black"
                                    cursor={"text"}
                                    border="1px solid black" 
                                    placeholder="Password"
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
                            <Flex direction="row"  mt={1} mb={1} width="100%">
                                <Flex width="35%" justify={"center"} align="center">
                                    <Text fontSize={"14px"} fontWeight="400">Confirm Password</Text>
                                </Flex>
                                <Flex width="65%" justify={"center"} align="center">
                                <Input
                                    required
                                    name="confirmPassword"
                                    type="password"
                                    width="330px" 
                                    height="30px" 
                                    bg="gray.300" 
                                    color="black"
                                    cursor={"text"}
                                    border="1px solid black" 
                                    placeholder="Confirm Password"
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
                        <Flex>Already have an account?</Flex>
                        <Link href="/Login">
                            <Button ml={4} variant="outline" size="sm">Login</Button> 
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
                        <Button width="150px" fontSize={"20px"} fontWeight="600" onClick={onSubmit} >
                            Submit
                        </Button>
                    </Flex>
                    
                </Flex>
                
            </>
        </Pagediv>
    )
}
export default Signup;