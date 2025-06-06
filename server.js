import express from "express";
import authRoutes from "./app/auth/auth.routes.js";
import userRoutes from "./app/user/user.routes.js";
import 'dotenv/config';
import morgan from "morgan";
import { prisma } from "./app/prisma.js";


const app = express();

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  //подключаю middleware
  app.use(express.json());

  app.use('/api', authRoutes);
  app.use('/api', userRoutes);


  const PORT = 5000;

  app.listen(
    PORT,
    console.log('Server running')
  );
}

main().then(async () => {
  await prisma.$disconnect();
})
  .catch(async e => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });