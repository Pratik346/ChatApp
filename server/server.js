import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import {Server} from "socket.io"
//create app by http
const app=express();
const server=http.createServer(app);
//intialize socket.io server
export const io=new Server(server,{
    cors:{origin:"*"}
});
//store online users
export const userSocketMap={};//{userId:socketId}
//socket.io connection handler
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id;
    //emit online users to all connected clients send to frontend
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});
//middleware
app.use(express.json({limit:"4mb"}));
app.use(cors());
app.use("/api/status",(req,res)=>{
    res.send("Server is live");
});
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);
//connect to mongodb
await connectDB();
if(process.env.NODE_ENV!="production"){
    const PORT=process.env.PORT || 5000;
    server.listen(PORT,()=>{
        console.log("Server is listening to port 5000");
    });
}
export default server;
