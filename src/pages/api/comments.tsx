import nc from "next-connect";
import {CreateComment} from "../../../controller/user";

const handler =nc();

handler.post(CreateComment);

export default handler;