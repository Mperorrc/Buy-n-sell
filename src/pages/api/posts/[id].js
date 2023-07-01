import nc from "next-connect";
import {DeletePostById} from "../../../../controller/user";

const handler =nc();

handler.delete(DeletePostById);

export default handler;
