// // import { Server } from 'socket.io';

// // export const config = {
// //   api: {
// //     bodyParser: false, 
// //   },
// // };

// // let io;

// // export default function handler(req, res) {
// //   if (!res.socket.server.io) {
// //     console.log('Setting up Socket.IO server...');
// //     io = new Server(res.socket.server);
// //     res.socket.server.io = io;

// //     io.on('connection', (socket) => {
// //       console.log('A user connected!');

// //       socket.on('notification', (data) => {
// //         console.log('Notification received:', data);
// //         io.emit('notification', data); 
// //       });

// //       socket.on('disconnect', () => {
// //         console.log('A user disconnected');
// //       });
// //     });
// //   } else {
// //     console.log('Socket.IO server already running');
// //   }
// //   res.end();
// // }


// // server.js

// import { createServer } from "node:http"; // Import the http module from Node.js
// import next from "next"; // Import the Next.js module
// import { Server } from "socket.io"; // Import the Socket.IO server

// const dev = true // Check if in development mode
// const hostname = "localhost"; // Define the hostname
// const port = 3000; // Define the port

// // Initialize the Next.js app
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler(); // Get the Next.js request handler

// app.prepare().then(() => {
//   const httpServer = createServer(handler); // Create an HTTP server with Next.js request handler

//   const io = new Server(httpServer, {
//     path: "/api/socket", // Define the Socket.IO path
//   });

//   // Listen for new socket connections
//   io.on("connection", (socket) => {
//     console.log("New client connected:", socket.id);

//     // Handle notifications or other events
//     socket.on("notification", (data) => {
//       console.log("Notification received:", data);
//       // Emit the notification to all connected clients
//       io.emit("notification", data);
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       console.log("Client disconnected:", socket.id);
//     });
//   });

//   // Start the HTTP server
//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });

import { Server } from "socket.io"




export default function SocketHandler(_req, res) {
 if (res.socket.server.io) {
    res.end();
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const io = new Server(res.socket.server);

  // Event handler for client connections
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log(`client connected. ID: ${clientId}`);
    // Event handler for receiving messages from the client
    socket.on("message", (data) => {
      console.log("Received message From Client:", data);
    });

        socket.on("notification", (data) => {
      console.log("Notification received:", data);
      // Emit the notification to all connected clients
      io.emit("notification", data);
    });


    // eslint-disable-next-line @typescript-eslint/dot-notation

    // Event handler for client disconnections
    socket.on("disconnect", () => {
      console.log("client disconnected.");
    });
  });

  // Monkey patching to access socket instance globally.
  (global).io = io
  res.socket.server.io = io;
  res.end();



  res.send({})
}