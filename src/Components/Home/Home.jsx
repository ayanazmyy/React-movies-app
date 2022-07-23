import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const api_Key = '286c842c55d3dc4fb82f38d2fe5c14a6';
  const img = "https://image.tmdb.org/t/p/w500/"

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);
  const [screenLoading, setScreenLoading] = useState(true)

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setScreenLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeOutID);
    }
  }, [])

  const getTrending = async (mediaType, callback) => {
    const { data } = await Axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=286c842c55d3dc4fb82f38d2fe5c14a6`);
    callback(data.results);
  }

  useEffect(() => {
    getTrending('movie', setTrendingMovies);
    getTrending('tv', setTrendingTv);
    getTrending('person', setTrendingPerson);
  }, []);


  const moviesContent = trendingMovies.slice(0, 10).map((movie, i) => (
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

  const tvContent = trendingTv.slice(0, 10).map((tv, i) => (
    <div key={i} className='col-md-2 gy-5 scale'>
      <Link to={`/tvdetails/${tv.id}`}>
        <div className="tv position-relative">
          <div className='layer pointer position-absolute top-0 bottom-0 start-0 end-0 text-white text-center'>Click to see more</div>
          <div className="rating position-absolute top-0 end-0 bg-info p-1">{tv.vote_average.toFixed(1)}</div>
          <img className='w-100 pointer' src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="" />
        </div>
        <h3 className='h6 mt-2'>{tv.name}</h3>
      </Link>
    </div>
  ));

  const peopleContent = trendingPerson.slice(2, 12).map((person, i) => (
    <div key={i} className='col-md-2 gy-5 scale'>
      <Link to={`/persondetails/${person.id}`}>
        <div className="person position-relative">
          <div className='layer pointer position-absolute top-0 bottom-0 start-0 end-0 text-white text-center'>Click to know more</div>
          <img className='w-100 pointer' src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt="" />
        </div>
        <h3 className='h6 mt-2'>{person.name}</h3>
      </Link>
    </div>
  ));

  return (
    <>
      {screenLoading && <div className="loading w-100 vh-100 d-flex align-items-center justify-content-center">
        <div className="loading-text text-white"><i className='fas fa-spin fa-spinner fa-3x'></i></div>
      </div>}
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="border-line mb-3 w-25"></div>
              <h2>Trending <br /> movies <br /> to watch now!</h2>
              <p className='text-muted'>Most watched movies today</p>
              <div className="border-line mt-3"></div>
            </div>
          </div>
          {moviesContent}

          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="border-line mb-3 w-25"></div>
              <h2>Trending <br />TV shows <br /> to watch now!</h2>
              <p className='text-muted'>Most watched TV shows today</p>
              <div className="border-line mt-3"></div>
            </div>
          </div>
          {tvContent}

          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="border-line mb-3 w-25"></div>
              <h2>See trending people now! </h2>
              <p className='text-muted'>Trending people today</p>
              <div className="border-line mt-3"></div>
            </div>
          </div>
          {peopleContent}
        </div>
      </div>
    </>
  )
}

export default Home