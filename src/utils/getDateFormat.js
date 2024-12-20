const getDateFormatView = (fecha) => {
  const date = new Date(fecha)
  const anio = date.getFullYear()
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const dia = String(date.getDate()).padStart(2, '0')
  const fechaFormateada = `${anio}-${mes}-${dia}`
  return fechaFormateada
}

export { getDateFormatView }
