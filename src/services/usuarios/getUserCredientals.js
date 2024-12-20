import mssql from 'mssql'
import { getConnection } from '../../db/context.js'

const getUserCredentials = async (usuario) => {
  const connection = await getConnection()
  const query = await connection
    .request()
    .input('usuario', mssql.VarChar, usuario)
    .query(
    `
    SELECT usuario, passwd
    FROM Usuarios
    WHERE usuario = @usuario
    `
    )
  return query.recordset
}

export { getUserCredentials }
