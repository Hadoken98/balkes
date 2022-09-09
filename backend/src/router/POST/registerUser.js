require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')


exports.registerUser = (req, res) => {
  const id_user = uuid.v4()
  const { username, email, password } = req.body

  try {
    client.query('insert into data_user (id_user, username, email, password) values ($1, $2, $3, $4)',
    [id_user, username, email, password], (error, result) => {
      if (result) {
        res.status(200).send({
          success: true,
          value: req.body,
          data: 'User Berhasil ditambah'
        })
      } else {
        console.log(error)
        res.status(500).send({
          success: false,
          value: req.body,
          data: 'User gagal ditambah'
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