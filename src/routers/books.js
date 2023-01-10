const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM books')
  res.json({ data: result.rows })
})

router.post('/', async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body
  const result = await db.query(
    `INSERT INTO books (title, type, author, topic, "publicationDate", pages) 
    VALUES ('${title}', '${type}','${author}', '${topic}','${publicationDate}', ${pages})
    RETURNING *
    `
  )
  res.json({ book: result.rows[0] })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query(`SELECT * FROM books
  WHERE id = ${id}
  `)
  res.json({ data: result.rows })
})

module.exports = router
