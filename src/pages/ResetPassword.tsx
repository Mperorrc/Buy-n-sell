import { Button, Text, Flex, Image, Input } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Pagediv from './UserLogin/Pagediv';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
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
                        Reset Password
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
                                Email
                            </Flex>
                        </Flex>
                        <Flex align="center" direction="column" ml={4} >
                            <Input
                                name="text"
                                type="text"
                                width="330px" 
                                height="30px" 
                                bg="gray.300" 
                                color="black"
                                cursor={"text"}
                                border="1px solid black"
                                placeholder='Email' 
                                _hover={{
                                    bg:"blue.50",
                                    border:"2px solid green"
                                }}
                                _placeholder={{
                                    color:"white"
                                }}
                                mt={2} 
                                mb={2}
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
                        <Flex>Go back to login page?</Flex>
                        <Link href="/Login">
                            <Button ml={4} variant="outline" size="sm" >
                                Login
                            </Button>
                        </Link> 
                    </Flex>
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
                        >Reset</Button>
                    </Flex>
                </Flex>
                </form>
            </>
        </Pagediv>
    )
}
export default Login;