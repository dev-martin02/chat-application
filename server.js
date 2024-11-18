const net = require("net");
const server = net.createServer();

const clientsArr = []; //holds all the users
let userName;

function decryptMessage(message) {
  for (let i = 0; i < message.length; i++) {
    message[i]--;
  }
  return message.toString();
}
server.on("connection", (socket) => {
  // Once we get data from the user
  socket.on("data", (data) => {
    const dataString = decryptMessage(data);

    if (
      dataString.substring(0, dataString.indexOf("-")).trim() === "username"
    ) {
      const name = dataString.substring(11, dataString.length);

      clientsArr.push({ socket, userName: name });
      userName = name;
      socket.write(`name-${userName}`); // Send back the name

      // Inform everybody someone has join the chat
      clientsArr.map((client) =>
        client.socket.write(`USER ${userName} HAS JOINED THE CHAT`)
      );
    } else {
      const name = dataString.substring(0, dataString.indexOf("-")); // get the name of the user
      const message = dataString.substring(dataString.indexOf("-message-") + 9); // get the actual message of the user
      clientsArr.map((clientData) => {
        clientData.socket.write(`> User ${name}: ${message}`);
      });
    }
  });

  socket.on("error", () => {
    clientsArr.map((client) => {
      client.socket.write(`User ${userName} left the chat`);
    });
  });
});

server.listen(3002, "127.0.0.1", () => {
  console.log("The server was opened on", server.address());
});
