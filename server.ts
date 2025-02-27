import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {serviceRoute} from "./routes/service-route";
import {appointmentRoute} from "./routes/appointment-route";
import {customerRoute} from "./routes/customer-route";


const app=express();
const prisma = new PrismaClient();
dotenv.config();

app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.use('/service',serviceRoute)
app.use('/customer',customerRoute)
app.use('/appointment',appointmentRoute)

async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}

connectDatabase();


app.listen(3000,(err)=>{
    console.log("Server running on port 3000")
})