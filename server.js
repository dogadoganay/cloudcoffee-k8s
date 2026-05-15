var express = require('express')
var fs = require('fs')
var path = require('path')

var app = express()
var PORT = 8080

var DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data')
var REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

if (!fs.existsSync(REVIEWS_FILE)) {
  fs.writeFileSync(REVIEWS_FILE, '[]')
}

app.get('/api/reviews', function (req, res) {
  var reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE))
  res.json(reviews)
})

app.post('/api/reviews', function (req, res) {
  var reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE))

  var newReview = {
    id: Date.now(),
    name: req.body.name || 'Anonymous',
    message: req.body.message || '',
    createdAt: new Date().toISOString()
  }

  reviews.push(newReview)
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2))

  res.json(newReview)
})

app.delete('/api/reviews/:id', function (req, res) {
  var reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE))
  reviews = reviews.filter(function (review) {
    return String(review.id) !== String(req.params.id)
  })

  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2))
  res.json({ success: true })
})

app.listen(PORT, function () {
  console.log('CloudCoffee running on http://localhost:' + PORT)
})