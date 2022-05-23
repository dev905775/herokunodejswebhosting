const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');
// const { stripHtml } = require("string-strip-html");


//initialize slug
mongoose.plugin(slug);
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Title is required ! hi dev "],
    // unique: true,
    unique: [true, "Title is required ! hi dev "],
    
  },
  author: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  timeCreated: {
    type: Date,
    default: () => Date.now(),
  },
  snippet: {
    type: String,
  },
  img: {
    type: String,
    default: 'placeholder.jpg',
    // required: true,
  },
  views: {
    type: String,  
    // required: true,  
  },
  slug: { type: String, slug: 'title', unique: true, slug_padding_size: 2 }, 
  // slug: { type: String, slug: 'title', slug_padding_size: 2 }, // me
});

blogSchema.pre('validate', function (next) {
  //check if there is a description
  if (this.description) {
    this.description = htmlPurify.sanitize(this.description);
    this.snippet = stripHtml(this.description.substring(0, 200)).result;
  }
  // if (this.title) {
  //   this.title = unique:true
  // } else {    
  // }

  next();
});

module.exports = mongoose.model('Blog', blogSchema);
