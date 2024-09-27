import { PrismaClient } from '@prisma/client';
import { Router } from 'express';


const prisma = new PrismaClient();
const UserRouter = Router();

UserRouter.post('/', async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  });
UserRouter.get("/", async (req, res) => {
  
    
    try {
        const usersAll = await prisma.user.findMany();
        res.status(200).json(usersAll);
    } catch {
        res.status(500).json({ err: "Internal Server Error" });
    }
})



export default UserRouter;