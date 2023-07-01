import React from 'react';
import Navbar from './Navbar/Navbar';
import {useSession} from "next-auth/react"

type LayoutProps = {
    children:any
};

const Layout:React.FC<LayoutProps> = ({children}) => {
    const {data:session}=useSession();
    return(
        <>
            {session &&(
                <Navbar/>
            )}
            <main>{children}</main>
        </>
    )
}
export default Layout;