import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const createEscritor = async (nombre, alias, fechaNacimiento, img, biografia) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('nombre', mssql.VarChar, nombre)
      .input('alias', mssql.VarChar, alias)
      .input('fechaNacimiento', mssql.Date, fechaNacimiento)
      .input('img', mssql.VarBinary, img)
      .input('biografia', mssql.Text, biografia)
      .query(
        `
          INSERT INTO Escritores(nombre, alias, fechaNacimiento, img, biografia)
          VALUES(@nombre, @alias, @fechaNacimiento, @img, @biografia);
        `
      )
    return query
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { createEscritor }
