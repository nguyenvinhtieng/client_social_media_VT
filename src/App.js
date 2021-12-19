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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GLOBAL_TYPES } from './redux/actions/constants';
function App() {
  const { auth, loading, toasting } = useSelector(state => state)
  const dispatch = useDispatch()
  if (toasting?.hasToast) {
    toast[toasting.type](toasting.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({ type: GLOBAL_TYPES.TOAST, payload: { hasToast: false } })
  }
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
      {/* Same as */}
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
