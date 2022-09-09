require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')


exports.deleteDataAgen = (req, res) => {
  const { id } = req.params

  try {
    client.query('delete from data_agen where id = $1',[id], (error, result) => {
      if (result) {
        res.status(200).send({
          success: true,
          data: 'Data Berhasil Dihapus'
        })
      } else {
        res.status(500).send({
          success: false,
          data: 'Data Gagal Dihapus'
        })
      }
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      data: err
    })
  }
}