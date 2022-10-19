import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { sequelize } from './db/client.js';
import managementRoutes from "./routes/operationRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { corsOptions } from './utils/corsOptions.js';



const app = express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/operation', managementRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/category', categoryRoutes)


sequelize.sync({ force: false });
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))