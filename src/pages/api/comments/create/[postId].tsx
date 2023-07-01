import nc from "next-connect";
import {getCommentsByPostId} from "../../../../../controller/user";

const handler =nc();

handler.get(getCommentsByPostId);
export default handler;
