// import axios from 'axios'
import { TOKEN_NAME } from '../credentials'
// import setAuth from './setAuth'
function checkAuthentication() {
    const token = localStorage.getItem(TOKEN_NAME)
    // setAuth(token)
    // const result = await axios.get(`${SERVER_URL}`)
    // if (result.data.success)
    if (token) return true
    return false
}
export default checkAuthentication