const express = require("express");
const app = express();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const { Novu } = require("@novu/node");
const novu = new Novu("7c691fabe0bbd15f60ab9ff1672f23c0");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let posts = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("newPost", (data) => {
    posts.unshift(data);
  });
  socket.on("newPost", (data) => {
    socket.emit("posts", posts);
  });
  socket.on("postLiked", (postId) => {
    increaseLikes(postId, posts);
    socket.emit("posts", posts);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

// Increment Like
const increaseLikes = (postId, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === postId) {
      array[i].likes += 1;
    }
  }
};

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.post("/notify", async (req, res) => {
  const { username } = req.body;

  novu.trigger("demo", {
    to: {
      subscriberId: "63fa0240bdd3d94974a05059",
    },
    payload: {
      username: username,
    },
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
