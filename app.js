const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const res = require('express/lib/response')
const req = require('express/lib/request')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// mongoose config

let blogSchema = new mongoose.Schema({
    author: String,
    title: String
})
let Blog = mongoose.model('Blog', blogSchema)



app.get('/', (req, res) => {
    res.render('home')
})

app.get('/blogs', (req, res) => {
    res.render('home')
})

// new post

app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/new', (req, res) => {
    let author = req.body.author
    let title = req.body.title
    Blog.create(author, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved");
        }
    })
})


app.get('/edit', (req, res) => {
    res.render('edit')
})

app.listen(4545, () => {
    console.log('Server started');
})