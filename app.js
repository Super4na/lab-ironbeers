const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //Promises 
  //are js objects that might or not have a value in the near future

  //how to consume a promise
  punkAPI.getBeers(`/`).then(beers =>{
    /* console.log(beers); */
    res.render(`index`,{beers})
  })

  /* .catch( error => {
    console.log(error);
  }); */

  
});

app.get(`/beers`,(req,res)=>{
  punkAPI.getBeers().then(beers=> {
    /* console.log(beers); */
    res.render("beers", {beers});
  });

 // or
 /* app.get(`/beers`,async(req,res)=>{
  const beers = await punkAPI.getBeers();
    res.render("beers", {beers});
  }); */
});

app.get(`/random-beer`, (req,res)=> {
  punkAPI.getRandom().then(beer =>{
    console.log(beer);
    res.render(`random-beers`,{beer})
})
}); 

app.listen(3000, () => console.log('🏃‍ on port 3000'));