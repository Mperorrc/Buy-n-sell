import {ComponentStyleConfig} from '@chakra-ui/theme'

export const Button : ComponentStyleConfig = {
    baseStyle: {
        borderRadius: '60px',
        color:"white",
        border:"2px solid blue.600",
    },
    variants:{
        solid:{
            color:"white",
            bg:"blue.500",
            border:"1px solid",
            borderColor:"blue.900",
            _hover:{
                bg:"blue.400",
            },
        },
        outline:{
            color:"blue.500",
            border:"1px solid",
            borderColor:"blue.900",
        },
        logout:{
            color:"white",
            border:"none",
        }
    },
}