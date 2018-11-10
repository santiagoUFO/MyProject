import { getToken } from '../utils/auth'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}
export default state
