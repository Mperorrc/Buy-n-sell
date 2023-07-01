import nc from "next-connect";
import {getUserByEmail,updateUserPosts} from "../../../../controller/user";

const handler =nc();

handler.get(getUserByEmail);
handler.put(updateUserPosts);
export default handler;
