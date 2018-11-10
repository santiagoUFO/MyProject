import { getToken } from '../utils/auth'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  showLogin: true,
}
export default state
