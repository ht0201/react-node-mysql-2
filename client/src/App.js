import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from 'react';
import axios from "axios";

function App()
{
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:7000/auth/auth', { headers: { accessToken: localStorage.getItem('accessToken') } } ).then(res =>
      {
        if (res.data.error) {
         setAuthState(false)
        } else {
         setAuthState(true)
        }
      }).catch(error => {
        console.log(error); 
      })
  }, []);

  const onLogout = () =>
  {
    localStorage.removeItem('accessToken')
    setAuthState(false)
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to='/'> Home Page</Link>
            <Link to='/createpost'> Create A Post</Link>
            {authState ?
              <Link to='/' onClick={onLogout}> Log out</Link>
              :
              <>
                <Link to='/registration'> Register</Link>
                <Link to='/login'> Login</Link>
              </>
            }
           
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
