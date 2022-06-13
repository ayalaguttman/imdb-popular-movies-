const express = require('express')
const app = express()

const axios = require('axios'); 

app.get('/getMovies', async (req, res, next) => {
  
  let result = await axios.get(`http://www.omdbapi.com/?t=${req.query.movieName}&apikey=ec899cd8`);
  return res.status(200).json(
      result.data
  ); 
});

app.get('/getPopMovies', async (req, res, next) => {
  
  let result1 = await axios.get(`http://www.omdbapi.com/?t=Gladiator&apikey=ec899cd8`);
  let result2 = await axios.get(`http://www.omdbapi.com/?t=Dear john&apikey=ec899cd8`);
  let result3 = await axios.get(`http://www.omdbapi.com/?t=wonder&apikey=ec899cd8`);
  let result4 = await axios.get(`http://www.omdbapi.com/?t=game of thrones&apikey=ec899cd8`);
  let result5 = await axios.get(`http://www.omdbapi.com/?t=titanic&apikey=ec899cd8`);
  let result6 = await axios.get(`http://www.omdbapi.com/?t=troy&apikey=ec899cd8`);
  let result7 = await axios.get(`http://www.omdbapi.com/?t=Me Before You&apikey=ec899cd8`);
  let result8 = await axios.get(`http://www.omdbapi.com/?t=twilight&apikey=ec899cd8`);
  let result9 = await axios.get(`http://www.omdbapi.com/?t=Blood Diamond&apikey=ec899cd8`);
  let result10 = await axios.get(`http://www.omdbapi.com/?t=the godfather&apikey=ec899cd8`);

  
  return res.status(200).json(
  {"results" : [result1.data,result2.data,result3.data,result4.data,result5.data,result6.data,result7.data,result8.data,result9.data,result10.data]}
  ); 
});

app.listen(5000, () => { console.log("server started on port 5000");})