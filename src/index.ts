import cors from "cors";
import "dotenv/config";
import express from "express";


import { PrismaClient } from "@prisma/client";
import { kebabRouter } from "./router/kebabs";


export const prisma = new PrismaClient();


const app = express();


app.use(cors()); 
app.use(express.json());

const apiRouter = express.Router();


apiRouter.use("/kebabs", kebabRouter)




app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
