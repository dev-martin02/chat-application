const { write } = require("fs");
const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => resolve());
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => resolve());
  });
};

function encryptMessage(message) {
  const buff = Buffer.from(message);
  for (let i = 0; i < buff.length; i++) {
    buff[i]++;
  }
  return buff;
}

let username;
// Join to the sever
const clientSocket = net.createConnection(
  { host: "127.0.0.1", port: 3002 },
  async () => {
    console.log("Connected to the server");

    //Write your Name
    async function askForName() {
      const username = await rl.question("What is your name ? >> ");
      await moveCursor(0, -1); // move cursor one line up
      await clearLine(0); // Clear the entre line that the cursor is in
      const sendName = `username - ${username}`;
      clientSocket.write(encryptMessage(sendName));
    }

    askForName(); //ask for the user name as soon as he log in

    //Message function
    async function ask() {
      const message = await rl.question("Enter a message -> "); //What is rl?
      await moveCursor(0, -1); //move cursor one line up
      await clearLine(0); //Clear the entre line that the cursor is in
      const userMessage = `${username}-message-${message}`;
      clientSocket.write(encryptMessage(userMessage)); // send the whole message to the server
    }

    clientSocket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1); //move cursor one line up
      await clearLine(0);
      //Check the first 2 letter to see if is the ID
      if (data.toString("utf-8").substring(0, 4) === "name") {
        username = data.toString("utf-8").substring(5); //Grab the content of the ID string
        console.log("Welcome", username);
        console.log();
      } else {
        console.log(data.toString("utf-8")); // return the text message
      }
      ask(); // display the message prompt in the console
    });
  }
);

clientSocket.on("error", () => {
  console.log("the server was ended");
});

clientSocket.on("close", () => {
  console.log("There was an error on the server side We're sorry :(");
});
