import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const deleteEscritorById = async (id) => {
  try {
    const connection = await getConnection()

    const result = await connection
      .request()
      .input('idEscritor', mssql.Int, id)
      .query(`
        DELETE FROM Escritores
        WHERE id = @idEscritor;
      `)

    if (result.rowsAffected[0] === 0) {
      throw new Error(`Escritor con ID ${id} no encontrado.`)
    }

    return { success: true, message: `Escritor con ID ${id} eliminado con éxito.` }
  } catch (error) {
    console.error('Error al eliminar el escritor:', error.message)
    throw new Error('No se pudo eliminar el escritor.')
  }
}

export { deleteEscritorById }
