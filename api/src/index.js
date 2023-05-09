const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const { connectToIoServer } = require("./socket");

app.use(cors());
app.use("/", require("./router"));
app.use(express.json());

const server = http.createServer(app);
connectToIoServer(server);
server.listen(process.env.PORT || 5000, () => console.log("server has started on port : 5000"));