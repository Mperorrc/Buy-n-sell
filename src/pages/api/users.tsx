import nc from "next-connect";
import {getAllusers,CreateUserById} from "../../../controller/user";

const handler =nc();

handler.get(getAllusers);
handler.post(CreateUserById);

export default handler;
