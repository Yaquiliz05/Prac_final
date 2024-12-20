import express from 'express'
import { addNewUsuario } from '../services/usuarios/addNewUsuario.js'
import bcrypt from 'bcrypt'
import { getUserCredentials } from '../services/usuarios/getUserCredientals.js'
import jwt from 'jsonwebtoken'

const authRoutes = express.Router()

authRoutes.get('/register', (req, res) => {
  return res.render('auth/register.ejs')
})

authRoutes.post('/register', async (req, res) => {
  try {
    const { nombre, usuario, passwd } = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(passwd, 12)
    const query = await addNewUsuario(nombre, usuario, hashedPassword)
    console.log(query)
    if (query.includes(1)) {
      return res.redirect('/')
    } else {
      return res.redirect('/auth/register')
    }
  } catch (error) {
    console.log(error)
    return res.json(error.message)
  }
})
authRoutes.get('/login', (req, res) => {
  return res.render('auth/login.ejs')
})

authRoutes.post('/login', async (req, res) => {
  const { usuario, passwd } = req.body
  const query = await getUserCredentials(usuario)
  if (query.length === 0) {
    return res.json('Usuario y/o contraseña invalidos')
  }
  const comparePasswd = await bcrypt.compare(passwd, query[0].passwd)

  if (comparePasswd) {
    // logica de jwt y cookis
    const jwtPassword = 'secret'
    const token = jwt.sign({ usuario }, jwtPassword, { expiresIn: '1h' })
    res.cookie('jwt', token, { httpOnly: true })
    return res.redirect('/escritores')
  }
  return res.json('usuario y/o contraseña invalidos')
})

export { authRoutes }
