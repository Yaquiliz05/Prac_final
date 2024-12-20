import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const getEscritorById = async (id) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('id', mssql.Int, id)
      .query(
        `
          SELECT id, nombre, alias, fechaNacimiento, biografia
          FROM Escritores
          WHERE id = @id;
        `
      )

    // Verificar si se encontró el escritor
    if (query.recordset.length === 0) {
      throw new Error(`Escritor con ID ${id} no encontrado.`)
    }

    return query.recordset[0]
  } catch (error) {
    console.error('Error al obtener el escritor:', error.message)
    throw new Error('No se pudo obtener el escritor.')
  }
}

export { getEscritorById }
