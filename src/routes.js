const express = require('express')
const mysql = require('mysql')
const router = express.Router()
require("dotenv").config()

const con = getConnection()
const suppCon = getSupplierConnection()

let suppliers = []

function getConnection() {
  return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "postcode"
  })
}

function getSupplierConnection() {
  return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "show_suppliers"
  })
}

function getLatLong(supplier) {
    const queryString = "SELECT latitude, longitude FROM postcodelatlng \
                        WHERE postcode = ?"
    con.query(queryString, [supplier.postcode], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for getLatLong: " + err)
      }
      try {
        console.log(rows[0])
        const sup = {
          acc_code: supplier.acc_code,
          name: supplier.name,
          postcode: supplier.postcode,
          lat: rows[0].latitude,
          long: rows[0].longitude
        }
        suppliers.push(sup)
      }
      catch(e) {
        console.log(e)
      }
    })
}

router.get("/suppliers", (req, res) => {
  const queryString = "SELECT acc_code, name, postcode FROM supplier_data \
                      WHERE CHAR_LENGTH(postcode) > 5"
  suppCon.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for getSuppliers: " + err)
    }
    for (let row of rows) {
      getLatLong(row)
    }
    res.send(suppliers)
  })
})

router.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

module.exports = router
