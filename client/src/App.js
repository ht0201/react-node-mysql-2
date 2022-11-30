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
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false
  });

  useEffect(() => {
    axios.get('http://localhost:7000/auth/auth', { headers: { accessToken: localStorage.getItem('accessToken')} } ).then(res =>
      {
        if (res.data.error) {
          setAuthState({
            ...authState,
            status: false
         })
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true
         })
        }
      }).catch(error => {
        console.log(error); 
      })
  }, []);

  const onLogout = () =>
  {
    localStorage.removeItem('accessToken')
    setAuthState({...authState, status: false})
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to='/'> Home Page</Link>
            <Link to='/createpost'> Create A Post</Link>
            {authState.status ?
              <button onClick={onLogout}> Log out</button>
              :
              <>
                <Link to='/registration'> Register</Link>
                <Link to='/login'> Login</Link>
              </>
            }
            {authState.status && <h3>{ authState.username }</h3>}
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
