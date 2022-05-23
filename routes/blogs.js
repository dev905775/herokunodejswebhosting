//blog routes

const express = require('express');
const Blog = require('./../models/Blog');
const router = express.Router();
const multer = require('multer');

//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, './public/uploads/images');
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get('/new', (request, response) => {
  response.render('new');
});

//view route
router.get('/:slug', async (request, response) => {
  let blog = await Blog.findOne({ slug: request.params.slug });

  if (blog) {
    response.render('show', { blog: blog });
  } else {
    response.redirect('/');
  }
});


router.use(express.json());
//route that handles new post

// router.post('/', upload.single('image'), async (request, response) => {
//   console.log(request.file);
//   // console.log(request.body);
//   let blog = new Blog({
//     title: request.body.title,
//     author: request.body.author,
//     description: request.body.description,
//     img: request.file.filename,
//     views: request.body.views,
//   });
//   try {
//     blog = await blog.save();
//     response.redirect(`blogs/${blog.slug}`);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post('/', upload.single('image'), async (request, response) => {
router.post('/new', async (request, response) => {
  try {
    const addingMensRecords = new Blog(request.body)
    // const ad = addingMensRecords.title
    // console.log(`title :- ${ad}`)
    if (!addingMensRecords.title) {
      // console.log(`title null `);
      // response.status(422).send({ error: "Titel saknas!!!" })
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The Title !',
        'data' : {error : 'fill the title !'}
      });  
    } else if (!addingMensRecords.author) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The author !',
        'data' : {error : 'fill the author !'}
      });       
    } else if (!addingMensRecords.description) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The description !',
        'data' : {error : 'fill the description !'}
      });      
    } else if (!addingMensRecords.img) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The img !',
        'data' : {error : 'fill the img !'}
      });      
    } else if (!addingMensRecords.views) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The views !',
        'data' : {error : 'fill the views !'}
      });      
    } else {

    // me new add ....
    //creating new object with all details
    // const newUser={
    //   title: title,
    //   author: author,
    //   description: description,
    //   // img: filename,
    //   views: views,
    // }
    // module.exports(newUser, async (err,newlyCreatedUser) => {
    //     if(err)
    //     {res.send("Unable to create new user");}
    //     else
    //     {res.send(newlyCreatedUser); }
    // });

      console.log(request.body);
      const insertMens = await addingMensRecords.save()
      // const insertMens = await addingMensRecords.save(error, result), {
      //   // console.log(`first`);
      //   if(error){
      //     console.log(error)
      //     // console.log(error.errors['title'].message)
      //   }
      //   response.status(201).post({message:'added',record:result})
      // };  
      // response.status(201).send(insertMens);
      response.status(201).send({
        'success' : 'true',
        'message' : 'Data, Successfully Add !',
        'data' : insertMens
      });
    }
    // const message = {};
  } catch (error) {
    // response.status(400).send(error);    
    response.status(400).send({
      'success' : 'false',
      'message' : 'Data, Do not Successfully Add !',
      'data' : error
    });    
  }
//   // console.log(request.file);
//   // console.log(request.body);
//   let blog = new Blog({
//     title: request.body.title,
//     author: request.body.author,
//     description: request.body.description,
//     img: request.file.filename,
//     views: request.body.views,
//   });
//   try {
//     blog = await blog.save();
//     response.redirect(`blogs/${blog.slug}`);
//   } catch (error) {
//     console.log(error);
//   }
});


// route that handles edit view
router.get('/edit/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id);
  response.render('edit', { blog: blog });
});

//route to handle updates

// router.put('/:id',(request, response, next)=>{
//   console.log(request.params.id);
//   Product.findOneAndUpdate({_id:request.params.id},{
//     $set:{
//       title : request.body.title,
//       author : request.body.author,
//       description : request.body.description,
//       views : request.body.views 
//     }
//   })
//   .then(result=>{
//     response.status(200).json({
//       updated_product:result
//     })
//   })
//   .catch(error=>{
//     console.log(error); 
//     response.status(500).json({
//       error:error
//     })
//   })
// })

// router.put('/:id', async (request, response) => {
//   request.blog = await Blog.findById(request.params.id);
//   let blog = request.blog;
//   blog.title = request.body.title;
//   blog.author = request.body.author;
//   blog.description = request.body.description;
//   // blog.img = request.body.img;          // check
//   // blog.img = request.body.filename;          // check
//   // blog.img = request.file.filename;          // check
//   blog.views = request.body.views;
//   try {
//     blog = await blog.save();
//     //redirect to the view route
//     response.redirect(`/blogs/${blog.slug}`);
//   } catch (error) {
//     console.log(error);
//     response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
//   }
// });

// router.put('/:id', async (request, response) => {
router.put('/edit/:id', async (request, response) => {
  try {
    const _id = request.params.id;
    const updateId = await Blog.findByIdAndUpdate(_id , request.body ,{new : true});
    // response.status(201).send(updateId);  

    // console.log(`data :- ${updateId.title}`)
    if (!updateId.title) {
      // response.status(422).send({ error: "Titel saknas!!!" })
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The Title !',
        'data' : {error : 'fill the title !'}
      });  
    } else if (!updateId.author) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The author !',
        'data' : {error : 'fill the author !'}
      });       
    } else if (!updateId.description) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The description !',
        'data' : {error : 'fill the description !'}
      });            
    } else if (!updateId.views) {
      response.status(400).send({
        'success' : 'false',
        'message' : 'Please, Fill The views !',
        'data' : {error : 'fill the views !'}
      });      
    } else {   
      console.log(updateId);
      response.status(201).send({
        'success' : 'true',
        'message' : 'Data Successfully Update !',
        'data' : updateId
      });  
    } 
  } catch (error) {
    // response.status(400).send(error);
    response.status(400).send({
      'success' : 'false',
      'message' : 'Data, Do not Successfully Update !',
      'data' : error
    });
  }
  // request.blog = await Blog.findById(request.params.id);
  // let blog = request.blog;
  // blog.title = request.body.title;
  // blog.author = request.body.author;
  // blog.description = request.body.description;
  // // blog.img = request.body.img;          // check
  // // blog.img = request.body.filename;          // check
  // // blog.img = request.file.filename;          // check
  // blog.views = request.body.views;
  // try {
  //   blog = await blog.save();
  //   //redirect to the view route
  //   response.redirect(`/blogs/${blog.slug}`);
  // } catch (error) {
  //   console.log(error);
  //   response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
  // }
});


///route to handle delete

// router.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndDelete(request.params.id);
//   response.redirect('/');
// });
//      ....... ya ...............
router.delete('/:id', async (request, response) => {
  try {
    const ckid = await Blog.findById(request.params.id);
    if(ckid != null){
    const deleteId = await Blog.findByIdAndDelete(request.params.id);
    // if(!request.params.id){ 
      // return response.status(400).send("error");
      response.status(201).send({
        'success' : 'true',
        'message' : 'Data, Successfully Delete !',
        'data' : deleteId
      })    
    }else{
      response.status(500).send({
        'success' : 'false',
        'message' : 'Data, Do not Successfully Delete & Data Allready Deleted !',
        'data' : error
      }); 
    }
    // response.status(201).send(deleteId)
    // response.status(201).send({
    //   'success' : 'true',
    //   'message' : 'Data, Successfully Delete !',
    //   'data' : deleteId
    // })
    // response.redirect('/');
  } catch (error) {
    // response.status(500).send(error);    
    response.status(500).send({
      'success' : 'false',
      'message' : 'Data, Do not Successfully Delete & Data Allready Deleted !',
      'data' : error
    });    
  }
});

module.exports = router;



// Only me check :- 

// success 
// message 
// data

// REST API validation in nodejs
// Node.js, Express and Mongoose | CRUD APIs + JOI Validation [Episode 3]
// Validation in Express - Node js

// controller model view in node js
// https://www.youtube.com/watch?v=D1JCCBic-t0