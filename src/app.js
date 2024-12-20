import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { authRoutes } from './routes/auth.js'
import cookieParser from 'cookie-parser'
import { authMiddleware } from './middlewars/authMiddlewars.js'
import escritoresRouters from './routes/escritoresRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.set('view engine', 'ejs')
server.use(express.static('public'))
server.set('views', join(__dirname, 'views'))
server.use(cookieParser())

server.use('/auth', authRoutes)
server.use('/escritores', escritoresRouters)

server.get('/', authMiddleware, (req, res) => {
  return res.json('Ok')
})

server.listen(3005, () => {
  console.log('server on => http://localhost:3005')
})
