const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://65196acd8d97924bb270f5b8--creative-tapioca-e03226.netlify.app/",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("server_id:" + socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
    });
    socket.on("sending_msg", (data) => {

        socket.to(data.room).emit("return_msg", data.msg);
    });

    socket.on("gridValueEmit", (data) => {

        socket.to(data.room).emit("gridValueReturn", data.mat);
    })

    socket.on("gridValueEmit1", (data) => {

        socket.to(data.room).emit("gridValueReturn1", data.mat1);
    })
    socket.on("gridValueEmit2", (data) => {

        socket.to(data.room).emit("gridValueReturn2", data.mat2);
    })


})

server.listen(3001, () => {
    console.log("server started at 3001");
})