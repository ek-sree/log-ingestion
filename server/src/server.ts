import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import logsRouter from './app/router/logs.router.js';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';


const app = express();
const port = config.port || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.CORS_KEY,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('io', io);

  
  //  Middleware
  app.use(express.json());
  app.use(cors({
    origin: config.CORS_KEY,                      
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204 
  }));
  
// Routes
app.use('/api/logs', logsRouter)


io.on('connection', (socket:Socket) => {
  console.log('✅ Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
})

server.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});

export default app;
