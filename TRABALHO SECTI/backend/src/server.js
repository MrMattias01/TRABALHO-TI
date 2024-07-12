const { WebSocketServer } = require("ws");
const dotenv = require("dotenv");

dotenv.config();

// Pega a porta do arquivo .env ou usa 3000 como padrão
const port = parseInt(process.env.PORT, 10) || 3000;

// Certifica-se de que a porta está no intervalo válido
const validPort = port >= 0 && port < 65536 ? port : 3000;

const wss = new WebSocketServer({ port: validPort });

wss.on("connection", (ws) => {
    ws.on("error", (error) => console.error(error));

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
        ws.send(data);
    });

    console.log("client connected");
});

console.log(`WebSocket server is listening on port ${validPort}`);
