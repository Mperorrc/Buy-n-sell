import nc from "next-connect";
import {getImagesByPostId} from "../../../../controller/user";

const handler =nc();

handler.get(getImagesByPostId);
export default handler;
