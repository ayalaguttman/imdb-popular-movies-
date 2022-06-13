import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const axios = require('axios');


function App() {

  const [backendData, setBackendData] = useState(null);
  const [popularMovies, setPopularMovies] = useState([{}]);
  const [movieName, setMovieName] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/getPopMovies`).then(res => {
      console.log(res.data);
      setPopularMovies(res.data)
    }


    )

  }, [])

  const submit = () => {


    axios.get(`http://localhost:5000/getMovies?movieName=${movieName}`).then((res) => {
      console.log(res.data);
      setBackendData(res.data);
    });


  };

  return (
    <div >

      <div style={{ marginTop: '2%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Paper>
          <InputBase
            sx={{ ml: 15, flex: 1 }}
            placeholder="Search for movie"

            type="text"
            onChange={(event) => {
              setMovieName(event.target.value);

            }}
          />

          <IconButton onClick={submit} type="submit" sx={{ p: '10px' }} aria-label="search"><SearchIcon /></IconButton>
        </Paper>
      </div>
      {(backendData == null) ? (
        <p style={{ textAlign: 'center' }}></p>
      ) : (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: ' 2rem', justifyContent: 'center' }}>

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="500"
              image={backendData.Poster}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {backendData.Title}
              </Typography>
              <Rating name="customized-10" defaultValue={backendData.imdbRating} precision={0.1} readOnly max={10} />

              <Typography gutterBottom variant="h7" component="div">
                imbd rating: {backendData.imdbRating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {backendData.Plot}
              </Typography>

            </CardContent>

          </Card>

        </div>

      )}

      <div>

        {(typeof popularMovies.results === 'undefined') ? (
          <p>Loading...</p>
        ) : (

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: ' 2rem', justifyContent: 'center' }}>
            {popularMovies.results.map((i, n) => (
              <div data-by={i.title} key={n} className="card" style={{ width: '15rem' }}>
                <div className="card-body">

                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={i.Poster}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {i.Title}
                      </Typography>

                      <Typography gutterBottom variant="h7" component="div">
                        imbd rating: {i.imdbRating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {i.Genre}
                      </Typography>

                    </CardContent>
                    <CardActions>

                      <Button onClick={() => {
                        setModalData({ title: i.Title, imdbRating: i.imdbRating, genre: i.Genre, year: i.Year, plot: i.Plot, actors: i.Actors });
                        setOpen(true);
                      }} >more</Button>

                    </CardActions>
                  </Card>
                </div>


              </div>
            ))
            }
            <Modal
              open={open}

              onClose={handleClose}

              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography gutterBottom variant="h5" component="div">
                  {modalData.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {modalData.year}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  imbd rating: {modalData.imdbRating}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                  {modalData.genre}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                  Actors: {modalData.actors}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {modalData.plot}
                </Typography>
              </Box>
            </Modal>

          </div>

        )}



      </div>

    </div>
  );
}

export default App;

