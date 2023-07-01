import NextAuth,{NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "name"},
                id: {label:"Id",type:"number"},
                email:{label:"Email",type:"email"},
            },
            authorize: (credentials)=>{
                return {
                    id:credentials?.id,
                    email:credentials?.email,
                    username:credentials?.username,
                } as any ;
            },
        }),
    ],
    session:{
        strategy:"jwt",
        maxAge:  24 * 60 * 60,
    },
}

export default NextAuth(authOptions);