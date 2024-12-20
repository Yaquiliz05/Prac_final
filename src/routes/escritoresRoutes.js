import express from 'express'
import { authMiddleware } from '../middlewars/authMiddlewars.js'
import { createEscritor } from '../services/createEscritor.js'
import { deleteEscritorById } from '../services/deleteEscritorById.js'
import { editEscritorById } from '../services/editEscritorById.js'
import { getAllEscritor } from '../services/getAllEscritor.js'
import { getEscritorById } from '../services/getAuthorById.js'
import { getDateFormatView } from '../utils/getDateFormat.js'

const escritoresRouters = express.Router()

escritoresRouters.use(authMiddleware)

escritoresRouters.get('/crear', async (req, res) => {
  try {
    return res.render('escritores/crear.ejs')
  } catch (error) {
    return res.json(error)
  }
})

escritoresRouters.post('/crear', async (req, res) => {
  try {
    const { nombre, alias, fechaNacimiento, img, biografia } = req.body
    await createEscritor(nombre, alias, fechaNacimiento, img, biografia)
    return res.redirect('/escritores')
  } catch (error) {
    return res.json(error)
  }
})

escritoresRouters.get('/', async (req, res) => {
  try {
    const escritores = await getAllEscritor()
    console.log(escritores)
    return res.render('escritores/index.ejs', { escritores })
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.json(error)
  }
})

escritoresRouters.get('/editar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const escritor = await getEscritorById(id)
    const fechaFormateada = getDateFormatView(escritor[0].id)
    return res.render('escritores/editar.ejs', { escritor: escritor[0], fechaFormateada })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

escritoresRouters.post('/editar', async (req, res) => {
  try {
    const { id, nombre, alias, fechaNacimiento, img, biografia } = req.body
    await editEscritorById(id, nombre, alias, fechaNacimiento, img, biografia)
    return res.redirect('/escritores')
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

escritoresRouters.post('/delete/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await deleteEscritorById(id)
    return res.redirect('/escritores')
  } catch (error) {
    return res.json(error)
  }
})

export default escritoresRouters
