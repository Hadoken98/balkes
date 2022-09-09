require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')


exports.insertDataAgen = (req, res) => {
  const id = uuid.v4()
  const { nama_agen, alamat_agen, jumlah_gudang } = req.body

  try {
    client.query('insert into data_agen (id, nama_agen, alamat_agen, jumlah_gudang) values ($1, $2, $3, $4)',
    [id, nama_agen, alamat_agen, jumlah_gudang], (error, result) => {
      if (result) {
        res.status(200).send({
          success: true,
          value: req.body,
          data: 'Data Berhasil ditambah'
        })
      } else {
        console.log(error)
        res.status(500).send({
          success: false,
          value: req.body,
          data: 'Data gagal ditambah'
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