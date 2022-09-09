require('dotenv').config()
const client = require('../../config/dbconfig')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

exports.login = (req, res) => {
  const { email, password } = req.body

  try {
    client.query("select * from data_user where email = $1", [email], (error, result) => {
      if (result?.rows.length > 0) {
        const id = result.rows[0].id_user
        const username = result.rows[0].username

        if (password === result.rows[0].password) {
          const token = jwt.sign({id, username, email}, 'admin')
          const revoked = 0
          const id_token = uuid.v4()
          const body = [id_token, token, revoked]

          client.query('insert into revoked_token (id_token, token, is_revoked) values ($1, $2, $3)', body, (error1, result1) => {
            if (result1) {
              res.status(200).send({
                success: true,
                message: 'Login Berhasil',
                data: token
              })
            } else {
              console.log(error),
              res.status(500).send({
                success: false,
                data: error1
              })
            }            
          })
        } else {
          res.status(500).send({
            success: false,
            message: "Password Salah"
          })
        }
      } else {
        res.status(500).send({
          success: false,
          message: 'Email Belum Terdaftar'
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