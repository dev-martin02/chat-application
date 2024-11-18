# Real-Time Encrypted Chat Application

A secure, real-time chat application built with Node.js that enables multiple users to communicate through an encrypted connection. The application features custom encryption for messages, real-time message broadcasting, and an interactive command-line interface.

## 🚀 Features

- **Real-time Communication**: Instant message delivery using TCP sockets
- **Message Encryption**: Custom encryption protocol for secure message transmission
- **Multiple User Support**: Handles concurrent user connections
- **User Presence**: Join/Leave notifications for all chat participants
- **Interactive CLI**: Smooth command-line interface with real-time updates
- **Error Handling**: Robust connection and error management

## 🛠️ Technologies Used

- Node.js
- Net module (TCP sockets)
- Readline/Promises
- Buffer manipulation
- Event-driven architecture

## 📋 Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## 💻 Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:

```bash
cd real-time-chat
```

3. Install dependencies:

```bash
npm install
```

## 🔧 Usage

1. Start the server:

```bash
node server.js
```

2. In a separate terminal, start a client:

```bash
node client.js
```

3. Follow the prompts to:
   - Enter your username
   - Start chatting with other connected users

## 🏗️ Architecture

### Server (`server.js`)

- Creates TCP server
- Manages client connections
- Handles message encryption/decryption
- Broadcasts messages to all connected clients
- Manages user join/leave events

### Client (`client.js`)

- Establishes connection with server
- Handles user input
- Manages message encryption
- Provides interactive CLI interface
- Handles connection errors and server responses

## 📊 Technical Details

### Message Protocol

Messages are formatted as:

- Username Registration: `username - [name]`
- Chat Messages: `[username]-message-[message content]`

### Encryption

- Custom encryption algorithm using Buffer manipulation
- Character-based encryption for secure transmission
- Bidirectional encryption/decryption between client and server

### Error Handling

- Connection error management
- Graceful disconnection handling
- User leave notifications
- Server-side error recovery

## 🔐 Security Features

- Message encryption for secure communication
- Server-side message validation
- Protected user disconnection handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
