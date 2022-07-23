import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const MovieDetails = () => {

  const params = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const [screenLoading, setScreenLoading] = useState(true)

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setScreenLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeOutID);
    }
  }, [])
  

  const getMedia = async (id , callback) => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=286c842c55d3dc4fb82f38d2fe5c14a6&language=en-US`);
    callback(data)
  }

  useEffect(() => {
    getMedia(params.id, setMovieDetails)
  }, []);


  return (
    <>
    {screenLoading && <div className="loading w-100 vh-100 d-flex align-items-center justify-content-center">
        <div className="loading-text text-white"><i className='fas fa-spin fa-spinner fa-3x'></i></div>
      </div>}
    {movieDetails? <div className="container mt-5 pt-5">
       <div className="row justify-content-center">
        <div className="col-md-3 mx-3 mb-4">
          <div className="poster">
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="" />
          </div>
        </div>
        <div className="col-md-6 mx-3">
          <h2>{movieDetails.title}</h2>
          <p className='text-muted'>{movieDetails.overview}</p>
          <ul className="list-unstyled">
            <li>Budget: {movieDetails.budget}</li>
            <li>Release date: {movieDetails.release_date}</li>
            <li>Language: {movieDetails.spoken_languages[0].english_name}</li>
            <li>Rating: {movieDetails.vote_average.toFixed(1)}</li>
          </ul>
        </div>
       </div>
    </div>: ''}
    </>
  )
}

export default MovieDetails;