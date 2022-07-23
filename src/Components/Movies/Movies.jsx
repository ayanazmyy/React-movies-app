import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';


const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [screenLoading, setScreenLoading] = useState(true)

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setScreenLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeOutID);
    }
  }, [screenLoading])

  const getTrending = async (page) => {
    const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=286c842c55d3dc4fb82f38d2fe5c14a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
    setTrendingMovies(data.results);
  }

  useEffect(() => {
    getTrending(1);
  }, []);

  const moviesContent = trendingMovies.map((movie, i) => (
    <div key={i} className='col-md-2 gy-5 scale'>
      <Link to={`/moviedetails/${movie.id}`}>
        <div className="movie position-relative">
          <div className='layer pointer position-absolute  bottom-0 start-0 end-0 text-white text-center'>Click to see more</div>
          <div className="rating position-absolute top-0 end-0 bg-info p-1">{movie.vote_average.toFixed(1)}</div>
          <img className='w-100 pointer' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
        </div>
        <h3 className='h6 mt-2'>{movie.title}</h3>
      </Link>
    </div>
  ));

  const pageNums = new Array(10).fill(1).map((el, i) => i + 1);


  return (
    <>
      {screenLoading && <div className="loading w-100 vh-100 d-flex align-items-center justify-content-center">
        <div className="loading-text text-white"><i className='fas fa-spin fa-spinner fa-3x'></i></div>
      </div>}
      <div className="container py-5 my-5">
        <div className="row justify-content-center text-center">
          {moviesContent}

          <ul className="pagination d-flex justify-content-center mt-5">
            <li className="page-item"><a className="page-link">Previous</a></li>
            {pageNums.map((el, i) => <li onClick={() => {
              setScreenLoading(true);
              getTrending(i + 1)}}
              key={i} className="page-item">
              <a className="page-link">{i + 1}</a>
            </li>)}
            <li className="page-item"><a className="page-link">Next</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Movies