import nc from "next-connect";
import {getUserByUsername} from "../../../../controller/user";

const handler =nc();

handler.get(getUserByUsername);
// handler.delete(deleteUserById);
// handler.put(updateUserById);
export default handler;
