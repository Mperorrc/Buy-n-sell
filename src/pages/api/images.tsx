import nc from "next-connect";
import {AddImage} from "../../../controller/user";

const handler =nc();

handler.post(AddImage);

export default handler;