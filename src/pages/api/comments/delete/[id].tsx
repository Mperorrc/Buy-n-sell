import nc from "next-connect";
import {DeleteCommentById} from "../../../../../controller/user";

const handler =nc();

handler.delete(DeleteCommentById);

export default handler;
