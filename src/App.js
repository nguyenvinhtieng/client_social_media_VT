import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import HomePage from './pages/Home/HomePage'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import PostDetail from './pages/PostDetail/PostDetail'
import { getMethod } from './utils/fetchData';
import Loading from './components/alert/Loading/Loading'
import { TOKEN_NAME } from './credentials'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HOST } from './credentials'
import io from "socket.io-client";
import { GLOBAL_TYPES } from './redux/actions/constants';
import showToast from './utils/showToast';
const socketClient = io.connect(HOST);
function App() {
  const { auth, loading, socket } = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(socket)
  useEffect(() => {
    socketClient.on("has-user-post", data => {
      showToast("info", `Has user ${data.name_user} just posted new post!`)
    })
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: { socket: socketClient } })
  }, [dispatch])

  useEffect(() => {
    async function checkLoginUser() {
      return await getMethod("")
    }
    checkLoginUser()
      .then(res => res.data)
      .then(result => {
        if (result.success) {
          dispatch({ type: 'AUTH', payload: { isAuthenticated: true, user: result.user } })
        } else {
          localStorage.removeItem(TOKEN_NAME)
          dispatch({ type: 'AUTH', payload: { isAuthenticated: false, user: null } })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [dispatch])

  return (
    <>
      {loading && <Loading />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path='/user/:slug' element={<Profile />} />
          <Route exact path='/' element={auth.isAuthenticated ? <HomePage /> : <Navigate to='/login' />} />
          <Route exact path='/login' element={!auth.isAuthenticated ? <Login /> : <Navigate to='/' />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/post/:post_id' element={<PostDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
