import { NextApiRequest, NextApiResponse } from "next";
const multer=require("multer");
import path from "path";

let fileNameTobeUploaded = "";

const storage = multer.diskStorage({
    destination:'public/uploads',
    filename: function (req:any, file:any, cb:any){
      const filename =  file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase();
      fileNameTobeUploaded=filename;
      cb(null, filename);
    },
});

const upload = multer({ 
    storage,
    fileFilter: function(req:any,file:any,cb:any){
        const filetypes=/jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase(),
        );
        if(mimetype&&extname){
            return cb(null,true);
        }
        cb(new Error("Only images are allowed"));
    }
});

export const config = {
    api:{
        bodyParser:false,
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    upload.single('file')(req, res, function (err:any) {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
  
      res.status(200).json({ message: `${fileNameTobeUploaded}` });
    });
}


