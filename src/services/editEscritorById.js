import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const editEscritorById = async (id, nombre, alias, fechaNacimiento, biografia) => {
  try {
    const connection = await getConnection()

    // Actualización de datos del escritor
    const query = await connection
      .request()
      .input('id', mssql.Int, id)
      .input('nombre', mssql.VarChar, nombre)
      .input('alias', mssql.VarChar, alias)
      .input('fechaNacimiento', mssql.Date, fechaNacimiento)
      .input('biografia', mssql.VarChar, biografia)
      .query(
        `
          UPDATE Escritores
          SET 
            nombre = @nombre, 
            alias = @alias, 
            fechaNacimiento = @fechaNacimiento, 
            biografia = @biografia
          WHERE id = @id;
        `
      )

    // Verificar si se realizó la actualización
    if (query.rowsAffected[0] === 0) {
      throw new Error(`Escritor con ID ${id} no encontrado.`)
    }

    return { success: true, message: `Escritor con ID ${id} actualizado con éxito.` }
  } catch (error) {
    console.error('Error al actualizar el escritor:', error.message)
    throw new Error('No se pudo actualizar el escritor.')
  }
}

export { editEscritorById }
