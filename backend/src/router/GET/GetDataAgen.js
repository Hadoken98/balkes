require('dotenv').config()
const client = require('../../config/dbconfig')

exports.getDataAgen = (req, res) => {
  const { limit, page, nama_agen } = req.query
  const newPage = page === '0' ? page : (page - 1) * limit
  let sql = ''
  let parameter = []

  if (nama_agen) {
    console.log(nama_agen)
    sql = 'select * from data_agen where nama_agen like $1 limit $2 offset $3'
    parameter = [nama_agen, limit, newPage]
  } else {
    sql = 'select * from data_agen limit $1 offset $2'
    parameter = [limit, newPage]
  } 

  try {
    client.query(sql,parameter, (error, result) => {
      if (result) {
        res.status(200).send({
          success: true,
          data: result.rows
          // data: temp,
          // pages: page,
          // total: result1.rows[0].count
        })
      } else {
        console.log({error})
        res.status(500).send({
          success: false,
          data: error
        })
      }
    })
  } catch (err) {
    console.log({err})
  }
}