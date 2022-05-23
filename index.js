// now start :- https://www.youtube.com/watch?v=Dzb7WS8-Jh0
// login system :- https://www.youtube.com/watch?v=bQZB4DD1Sc4&t=1239s
// pagination :- https://www.youtube.com/watch?v=HKiYJX3BxMc

// Imports
const express = require("express");
const Blog = require('./models/Blog');
const app = express();
const port = 3000

// login the use
// import web from './routes/web.js';
const web = require('./routes/web.js');


require('dotenv').config({ path: './config.env' });


//bring in mongoose
const mongoose = require('mongoose');
//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const res = require("express/lib/response");

//connect to mongoose
const URI = process.env.crudblog;
// mongoose.connect('mongodb://localhost/crudblog', {
mongoose.connect(URI, {
    // useCreateIndex: true, 
    // useFindAndModify: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
 })
// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/fontawesome', express.static(__dirname + 'public/fontawesome'));
app.use('/video', express.static(__dirname + 'public/video'));

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));





// app.get('/', (req, res) => {
//     // res.render('index')
//     res.render('index', { text: 'This is index.ejs'})
// })

app.get('/', async(req, res) => {
    let blogs = await Blog.find().sort({ timeCreated: 'desc'});
   
    // res.render('index')
    res.render('index', { blogs: blogs})
});

app.get('/about', (req, res) => {
    // res.render('about')
    res.render('about', { text: 'This is about.ejs'})
})

app.get('/contact', (req, res) => {
    // res.render('contact')
    res.render('contact', { text: 'This is contact.ejs'})
})

app.get('/photo-detail', (req, res) => {
    // res.render('photo-detail')
    res.render('photo-detail', { text: 'This is photo-detail.ejs'})
})

app.get('/video-detail', (req, res) => {
    // res.render('video-detail')
    res.render('video-detail', { text: 'This is video-detail.ejs'})
})

app.get('/videos', (req, res) => {
    // res.render('videos')
    res.render('videos', { text: 'This is videos.ejs'})
})

app.get('/login', (req, res) => {
    // res.render('login')
    res.render('login', { text: 'This is login.ejs'})
})

app.get('/registration', (req, res) => {
    // res.render('registration')
    res.render('registration', { text: 'This is registration.ejs'})
})

app.get('/data', (req, res) => {
    // res.render('data')
    res.render('data', { text: 'This is data.ejs'})
})



app.use('/blogs', blogRouter);


// login the use
// Load Routes
app.use('/', web);





// read the data of registered Students
app.get("/blogs", async (req, res) => {

    try {
        const blogsdata = await Blog.find();        
        // res.status(201).send(blogsdata);
        res.status(201).send({
            'success' : 'true',
            'message' : 'Data, Successfully Show !',
            'data' : blogsdata            
        });
    } catch(e) {
        res.status(400).send({
            'success' : 'false',
            'message' : 'Data, Do not Successfully Show !',
            'data' : e
        });        
    }
})

// get the indivisual data using id
app.get("/blogs/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const blogData = Blog.findById({_id:_id});
        res.send(blogsdata)
    } catch(e) {
        res.send(e);        
    }
})



// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))





// // Http module
// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// const app = http.createServer((req, res) => {
    
//     res.writeHead(200, {
//         'Context-type': 'text/html'
//     })   

//     // console.log(req.url)

//     // if(req.url === '/'){
//     //     fs.readFile(path.join(__dirname, 'view', 'index.html'), (err, content) => {
//     //         if(err){
//     //             throw err
//     //         }
//     //         res.end(content)
//     //     })
//     // } else if(req.url === '/about' ){
//     //     fs.readFile(path.join(__dirname, 'view', 'about.html'), (err, content) => {
//     //         if(err){
//     //             throw err
//     //         }
//     //         res.end(content)
//     //     })
//     // }

//     let filePath = path.join(__dirname,  'view', req.url === '/' ? 'index.ejs' : req.url ) 

//     let contentType = 'text/html'

//     let ext = path.extname(filePath)
//     if(!ext){
//         filePath += '.html'
//     }

//     switch(ext) {
//         case '.css':
//             contentType = 'text/css'
//             break
//         case '.js':
//             contentType = 'text/javascript'
//             break
//         default:
//             contentType = 'text/html'
//     }

//     fs.readFile(filePath, (err, content) => {
//         if(err){
//             fs.readFile(path.join(__dirname, 'view', 'error.html'), (err, data) => {
//                 if(err){
//                     res.writeHead(500)
//                     res.end('Error!!!')
//                 }else{
//                     res.writeHead(404, {
//                         'Content-Type': contentType
//                     })
//                     res.end(data)
//                 }
//             })

//         }else{
//             res.writeHead(200, {
//                 'Content-Type': contentType
//             })
//             res.end(content)
//         }


//     })

 
// })

// app.set('view engine', 'ejs');

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })







// const dotenv = require("dotenv");
// const mongoose = require('mongoose');
// const express = require('express');
// const nodemon = require("nodemon");
// // const res = require('express/lib/response');
// const app = express();

// dotenv.config({ path: './config.env' });

// // require('./db/conn');
// // const User = require('./model/userSchema');

// app.use(express.json());

// const PORT = process.env.PORT;


// //new
// // link the router files to make route
// // app.use(require('./router/auth'));

// // Middleware
// // const middleware = (req, res, next) => {
// //     console.log('Hello my Middleware');
// //     next();
// // }
// // middleware();


// app.get('/', (req, res) => {
//     // res.send('Home Page!!!, app.js');
//     res.send(index);
// });

// // app.get('/about', middleware, (req, res) => {
// //     console.log('Hello my About');
// //     res.send('About Page!!!');
// // });

// // app.get('/contact', (req, res) => {
// //     res.send('Contact Page!!!');
// // });

// // app.get('/users', (req ,res) => {
// //     res.send('Users Page');
// // })

// app.listen(PORT, () => {
//     console.log(`server is running at port no ${PORT}`);
// });