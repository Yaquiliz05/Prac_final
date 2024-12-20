import { getConnection } from '../db/context.js'

const getAllEscritor = async () => {
  try {
    const connection = await getConnection()
    const query = await connection.request().query(
      `
        SELECT id, nombre, alias, fechaNacimiento, biografia
        FROM Escritores;
      `
    )
    return query.recordset
  } catch (error) {
    console.error('Error al obtener los escritores:', error.message)
    throw new Error('No se pudieron obtener los escritores.')
  }
}

export { getAllEscritor }
