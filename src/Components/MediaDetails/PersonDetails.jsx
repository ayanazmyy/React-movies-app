import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const PersonDetails = () => {

  const params = useParams();
  const [personDetails, setPersonDetails] = useState(null);
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
    const {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=286c842c55d3dc4fb82f38d2fe5c14a6&language=en-US`);
    callback(data)
  }

  useEffect(() => {
    getMedia(params.id, setPersonDetails)
  }, []);


  return (
    <>
    {screenLoading && <div className="loading w-100 vh-100 d-flex align-items-center justify-content-center">
        <div className="loading-text text-white"><i className='fas fa-spin fa-spinner fa-3x'></i></div>
      </div>}
    {personDetails? <div className="container mt-5 pt-5">
       <div className="row justify-content-center">
        <div className="col-md-3 mx-3 mb-4">
          <div className="poster">
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`} alt="" />
          </div>
        </div>
        <div className="col-md-6 mx-3">
          <h2>{personDetails.name}</h2>
          <p className='text-muted'>{personDetails.biography}</p>
          <ul className="list-unstyled">
            <li>Birth date: {personDetails.birthday}</li>
            <li>Place of birth: {personDetails.place_of_birth}</li>
            <li>Known for: {personDetails.known_for_department}</li>
          </ul>
        </div>
       </div>
    </div>: ''}
    </>
  )
}

export default PersonDetails;