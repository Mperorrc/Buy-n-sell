import nc from "next-connect";
import {getChatByUsername,updateUserPosts} from "../../../../controller/user";

const handler =nc();

handler.get(getChatByUsername);
// handler.put(updateUserPosts);
export default handler;
