import nc from "next-connect";
import {CreatePostById,getPosts} from "../../../controller/user";

const handler =nc();
 
handler.post(CreatePostById);
handler.get(getPosts);

export default handler;
