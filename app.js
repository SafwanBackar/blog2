const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const res = require('express/lib/response')
const req = require('express/lib/request')


mongoose.connect('mongodb://localhost/blogApp2');
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
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err)
        } else {
            res.render('home', { blogs: blogs })
        }
    })
})

// new post

app.get('/blogs/new', (req, res) => {
    res.render('new')
})

app.post('/blogs', (req, res) => {
    // let author = req.body.author
    // let title = req.body.title
    // let newStuff = ({ author: author, title: title })
    Blog.create(req.body.blog, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/blogs')
        }
    })
})

// Show route

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.render('show', { blog: foundBlog })
        }
    })
})

// Edit Route

app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, editBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.render('edit', { blog: editBlog })
        }
    })
})

app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, editedBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
})

// Delete Route
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err, deleteBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blogs')
        }
    })
})



app.listen(4545, () => {
    console.log('Server started');
})
