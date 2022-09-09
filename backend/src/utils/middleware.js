const client = require('../config/dbconfig')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
      const jwt_token = req.headers['authorization'].substr(7)
      req.headers.auth_token = jwt_token
      client.query('select* from revoked_token where token = $1 and is_revoked = 1', [jwt_token], (error, result) => {
        if (result) {
          if (result?.rows.length > 0) {
            res.send({
              success: false,
              message: 'session expired'
            })
          } else {
            try {
              const user = jwt.verify(jwt_token, 'admin' )
              req.auth = user
              next()
            } catch (e) {
              res.status(400).send({
                success: false,
                message: e
              })
            }
          }
        } else {
          console.log(error)
            res.status(500).send({
              success: false,
              message: error
            })
        }
      })
    } else {
        res.status(500).send({
          success: false,
          message: 'Akses Tidak diizinkan'
        })
    }
  }
  
module.exports = { auth }