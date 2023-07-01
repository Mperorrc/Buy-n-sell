import { Flex } from '@chakra-ui/react';
import React from 'react';

type PagedivProps = {
    children:any;
};

const Pagediv:React.FC<PagedivProps> = ({children}) => {
    return (
        <Flex width="100vw" height="100vh">
            <Flex width="60%" justify="center" bg="gray.200" direction={"column"}>
                {children&&children[0] as keyof typeof children}
            </Flex>
            <Flex width="40%" justify="center" bg="gray.100" direction={"column"}>
                {children && children[1] as keyof typeof children}
            </Flex>
        </Flex>
    )
}
export default Pagediv;