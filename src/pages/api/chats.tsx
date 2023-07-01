import nc from "next-connect";
import {AddChat} from "../../../controller/user";

const handler =nc();

handler.post(AddChat);

export default handler;
