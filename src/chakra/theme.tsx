import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react"
import {Button} from './buttons'

export const theme = extendTheme({
  fonts: {
    body :"Open Sans, sans-serif",
  },
  styles:{
    global:()=>({
        body: {
            bg:"gray.300",
            color:"white",
        },
    }),
  },
  components:{
    Button,
  }
})