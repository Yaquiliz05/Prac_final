import { getConnection } from '../../db/context.js'
import mssql from 'mssql'

const addNewUsuario = async (nombre, usuario, passwd) => {
  const connection = await getConnection()
  const query = await connection
    .request()
    .input('nombre', mssql.VarChar, nombre)
    .input('usuario', mssql.VarChar, usuario)
    .input('passwd', mssql.VarChar, passwd)
    .query(
      `
        INSERT INTO Usuarios(nombre, usuario, passwd)
        VALUES(@nombre, @usuario, @passwd);
      `
    )
  return query.rowsAffected
}

export { addNewUsuario }
