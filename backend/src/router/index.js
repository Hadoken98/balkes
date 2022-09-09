const router = require('express').Router() // import Router from express
const auth = require('../utils/middleware').auth

const getDataAgen = require('./GET/GetDataAgen').getDataAgen //import function get agen
const insertDataAgen = require('./POST/insertDataAgen').insertDataAgen
const login = require('./POST/Login').login
const registerUser = require('./POST/registerUser').registerUser
const updateDataAgen = require('./PUT/updateDataAgen').updateDataAgen
const logout = require('./PUT/Logout').logout
const deleteDataAgen = require('./DELETE/deleteDataAgen').deleteDataAgen

router.get('/get-data-agen', auth, getDataAgen) // GET method jangan lupa auth
router.post('/insert-data-agen', insertDataAgen)
router.post('/login', login)
router.post('/register-user', registerUser)
router.put('/update-data-agen/:id', updateDataAgen)
router.put('/logout', logout)
router.delete('/delete-data-agen/:id', deleteDataAgen)

module.exports = router; // export router