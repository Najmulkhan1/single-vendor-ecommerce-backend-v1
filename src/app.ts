import express, { type Application, type Request, type Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routers/router'
import notFound from './app/middleware/notFound'
import { globalError } from './app/middleware/globalError'

const app: Application = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", router)

app.get('/', (req: Request, res: Response) => {
    res.json("Server is running")
})

app.use(notFound)
app.use(globalError)

export default app;
