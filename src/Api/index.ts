import server from './server';
import 'dotenv/config';

const PORT = process.env.PORT as string;

server.startServer(PORT);
