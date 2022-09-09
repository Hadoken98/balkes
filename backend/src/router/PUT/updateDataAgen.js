require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.updateDataAgen = (req, res) => {
  const { id } = req.params
  const { nama_agen, alamat_agen, jumlah_gudang } = req.body

  try {
    client.query('update data_agen set nama_agen = $2, alamat_agen = $3, jumlah_gudang = $4 where id = $1',
    [id, nama_agen, alamat_agen, jumlah_gudang], (error, result) => {
      if (result) {
        console.log(error)
        res.status(200).send({
          success: true,
          data: 'Data Berhasil Diubah'
        })
      } else {
        res.status(500).send({
          success: false,
          data: 'Data Gagal Diubah'
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