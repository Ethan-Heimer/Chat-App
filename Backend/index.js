const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Server} = require("socket.io");

const conversationEvents = require("./Routes/conversations.routes");
const messageEvents = require("./Routes/messages.routes");

require("dotenv");

const PORT = process.env.PORT;

const app = express();

const server = require("http").createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const corsOptions = {
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    methods: ["GET", "POST"]
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}))   

mongoose.connect(MONGO_URL)
.then((x) => {
    console.log('connected to db');
}).catch(err => {
    console.error(`Error connecting to database: ${err}`);
})

io.on("connection", (socket) => {
    conversationEvents(io, socket);
    messageEvents(io, socket);
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

