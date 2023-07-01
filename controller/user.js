import {executeQuery} from "../config/db"

const getAllusers = async(req,res)=>{
    try {
        const userData=await executeQuery("select * from users",[]);
        res.send(userData);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getPosts = async(req,res)=>{
    try {
        const userData=await executeQuery("select * from posts limit 10",[]);
        res.send(userData);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserByUsername =async(req,res)=>{
    const username=req.query.username;
    try {
        const userData = await executeQuery(`select * from users where username=?`,[username])
        res.status(200).json(userData)
    } catch (error){
        res.status(500).json(error);
    }
}

const getImagesByPostId = async(req,res)=>{
    const postId=req.query.postId;
    console.log(postId)
    try {
        const ImagesData = await executeQuery(`select * from images where postId=?`,[postId])
        res.status(200).json(ImagesData)
    } catch (error){
        res.status(500).json(error);
    }
}

const getCommentsByPostId = async(req,res)=>{
    const postId=req.query.postId;
    console.log(postId)
    try {
        const CommentsData = await executeQuery(`select * from comments where postId=?`,[postId])
        res.status(200).json(CommentsData)
    } catch (error){
        res.status(500).json(error);
    }
}

const getChatByUsername = async(req,res)=>{
    const username=req.query.username;
    try {
        const chatsData = await executeQuery(`select * from chats where senderUsername=? || receiverUsername = ?`,[username,username])
        res.status(200).json(chatsData)
    } catch (error){
        res.status(500).json(error);
    }
}

const getUserByEmail =async(req,res)=>{
    const email=req.query.email;
    try {
        const userData = await executeQuery(`select * from users where email=?`,[email])
        res.status(200).json(userData)
    } catch (error){
        res.status(500).json(error);
    }
}

const CreateUserById = async(req,res)=>{
    try {
        const dataToBeAdded=req.body;
        const numberOfPosts=0;
        const {username,email,password,IDnumber}=dataToBeAdded;
        const userData = await executeQuery("insert into users(username,email,password,IDnumber,numberOfPosts) values(?,?,?,?,?)",
            [username,email,password,IDnumber,numberOfPosts]
        );
        res.status(201).json(userData);    
    } catch (error) {
        res.status(400).json(error);
    }
} 

const CreatePostById = async(req,res)=>{
    try {
        const dataToBeAdded=req.body;
        const {postTitle,postBody,postType,author,id,amount}=dataToBeAdded;
        const postData = await executeQuery("insert into posts(postTitle,postBody,postType,author,id,amount) values(?,?,?,?,?,?)",
            [postTitle,postBody,postType,author,id,amount]
        );
        res.status(201).json(postData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const CreateComment = async(req,res)=>{
    try {
        const dataToBeAdded=req.body;
        const {postId,commentBody,username}=dataToBeAdded;
        const CommentData = await executeQuery("insert into comments(postId,commentBody,username) values(?,?,?)",
            [postId,commentBody,username]
        );
        res.status(201).json(CommentData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const DeletePostById = async(req,res)=>{
    try {
        const id=req.query.id;
        const postData = await executeQuery("delete from posts where id = ?",
            [id]
        );
        res.status(201).json(postData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const DeleteCommentById = async(req,res)=>{
    try {
        const id=req.query.id;
        const postData = await executeQuery("delete from comments where id = ?",
            [id]
        );
        res.status(201).json(postData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateUserPosts = async(req,res)=>{
    try {
        const dataToBeUpdated=req.body;
        const {numberOfPosts,email}=dataToBeUpdated;
        const postData = await executeQuery("update users set numberOfPosts = ? where email = ? ",
            [numberOfPosts,email]
        );
        res.status(201).json(postData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const AddImage=async(req,res)=>{
    try {
        const dataToBeAdded=req.body;
        const {postId,image}=dataToBeAdded;
        const ImgData = await executeQuery("insert into images(postId,image) values(?,?)",
            [postId,image]
        );
        res.status(201).json(ImgData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const AddChat=async(req,res)=>{
    try {
        const dataToBeAdded=req.body;
        const {senderUsername,receiverUsername,body}=dataToBeAdded;
        const chatData = await executeQuery("insert into chats(senderUsername,receiverUsername,body) values(?,?,?)",
            [senderUsername,receiverUsername,body]
        );
        res.status(201).json(chatData);    
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateUserById = async(req,res)=>{
    const id=req.query.id;
    const {username,email,password,IDnumber}=req.body;
    try {
        let userData=await executeQuery(`select * from users where id=?`,[id]);
        if(userData.length>0){
            userData=await executeQuery("update users set username=?,email=?,password=?,IDnumber=? where id=? ",
            [username,email,password,IDnumber,id])
            res.status(200).json(userData)
        }
        else{
            res.status(400).json(`user not found on id=${id}`)
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export{
    getAllusers,
    CreateUserById,
    updateUserById, 
    getUserByUsername,
    getUserByEmail,
    CreatePostById,
    AddImage,
    updateUserPosts,
    getPosts,
    getImagesByPostId,
    getChatByUsername,
    AddChat,
    DeletePostById,
    CreateComment,
    getCommentsByPostId,
    DeleteCommentById,

};
