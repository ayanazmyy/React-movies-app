import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';


const People = () => {
  const [trendingPeople, setTrendingPeople] = useState([]);
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
    getTrending('person', setTrendingPeople);
  }, []);

  const peopleContent = trendingPeople.slice(2).map((person, i) => (
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
          {peopleContent}
        </div>
      </div>
    </>
  )
}

export default People