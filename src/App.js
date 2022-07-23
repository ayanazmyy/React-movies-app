import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Components/Home/Home'
import Movies from './Components/Movies/Movies'
import People from './Components/People/People'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/Signup/SignUp'
import TV from './Components/TV/TV'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import Protectedroute from './Components/ProtectedRoute/Protectedroute';
import MovieDetails from './Components/MediaDetails/MovieDetails';
import TvDetails from './Components/MediaDetails/TvDetails';
import PersonDetails from './Components/MediaDetails/PersonDetails';
import NotFound from './Components/NotFound/NotFound';



function App() {
  const [userData, setUserData] = useState(null);
  const saveUserData = () => {
    const encodedToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUserData();
    }
  }, [])

  const navigate = useNavigate();

  const logoutHandler = () => {
    setUserData(null);
    localStorage.removeItem('token');
    navigate('/signin')
  }


  useEffect(()=> {
    const timeOutID = setTimeout(()=> {
      document.body.style.overflowY = 'auto'
    }, 1000)

    return ()=> {
      clearTimeout(timeOutID);
    }
  }, [])

  return (
    <>
      <Navbar userData={userData} logoutHandler={logoutHandler} />
      <Routes>
        <Route path='home' element={<Protectedroute><Home /></Protectedroute>} />
        <Route path='/' element={<SignIn />} />
        <Route path='*' element={<NotFound />} />
        <Route path='movies' element={<Protectedroute><Movies /></Protectedroute>} />
        <Route path='moviedetails' element={<Protectedroute><MovieDetails /></Protectedroute>}>
          <Route path=':id' element={<Protectedroute><MovieDetails /></Protectedroute>} />
        </Route>
        <Route path='tvdetails' element={<Protectedroute><TvDetails /></Protectedroute>}>
          <Route path=':id' element={<Protectedroute><TvDetails /></Protectedroute>} />
        </Route>
        <Route path='persondetails' element={<Protectedroute><PersonDetails /></Protectedroute>}>
          <Route path=':id' element={<Protectedroute><PersonDetails /></Protectedroute>} />
        </Route>
        <Route path='people' element={<Protectedroute><People /></Protectedroute>} />
        <Route path='signin' element={<SignIn saveUserData={saveUserData} />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='tv' element={<Protectedroute><TV /></Protectedroute>} />
      </Routes>
    </>
  );
}

export default App;
