const express = require('express');
const mongoose = require('mongoose');
const Book = require('./Books')
const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb://127.0.0.1/bookshelf", () =>
{
    console.log("connected")
},
e => console.error(e)
)

// let bookList = [
//     {
//         "_id": {
//           "$oid": "63b90c8ea59a2bb672769306"
//         },
//         "title": "New Book",
//         "author": "New Author",
//         "release": {
//           "$date": {
//             "$numberLong": "1669766400000"
//           }
//         },
//         "pages": 200,
//         "__v": 0
//       },
//       {
//         "_id": {
//           "$oid": "63b90cd078ee887365c4bdb5"
//         },
//         "title": "New Book",
//         "author": "New Author",
//         "release": {
//           "$date": {
//             "$numberLong": "1669766400000"
//           }
//         },
//         "pages": 200,
//         "__v": 0
//       }
// ]

app.get('/', (req, res) => {
    run()
async function run() {
    try {
        const bookList = await Book.find()
          console.log(bookList)
          res.render("index", {bookList: bookList})
          console.log(Book.find())
    }
    catch (e) {
        console.log(e.message)
    }
}
})

app.get('/add', (req, res) => {
    res.render("addBook")
})

app.post('/add', (req, res) => {
const book = new Book(
    {
        title: req.body.title,
        author: req.body.author,
        release: req.body.release,
        pages: req.body.pages
    }
)
book.save().then(() => console.log("Book Saved"))
res.redirect('/')
console.log(book._id)
})

app.get('/update/:id', (req, res) => {
run()
async function run() {
    try {
        const selectedBook = await Book.findOne({"_id": `${req.params.id}`})
          console.log("update page")
          res.render("updateBook", {selectedBook: selectedBook })
    }
    catch (e) {
        console.log(e.message)
    }
}
})

app.post('/update/:id', (req, res) => {
    run()
    async function run() {
        try {
            const selectedBook = await Book.findOneAndUpdate({"_id": `${req.params.id}`}, {title: req.body.title, author: req.body.author, release: req.body.release, pages: req.body.pages})
              console.log("book has been updated")
              res.redirect('/')
        }
        catch (e) {
            console.log(e.message)
        }
    }
    })

    app.get('/delete/:id', (req, res) => {
        run()
        async function run() {
            try {
                const selectedBook = await Book.findOne({"_id": `${req.params.id}`})
                  console.log(selectedBook._id)
                  res.render("deleteBook", {selectedBook: selectedBook })
            }
            catch (e) {
                console.log(e.message)
            }
        }
        })

    app.delete('/delete/:id', (req, res) => {
        Book.deleteOne({"_id": `${req.params.id}`}).then(function(){
            console.log("Data deleted")
        })
        res.send('book has been deleted')
        res.redirect('http://localhost:3000/')
        })

app.listen(3000)

