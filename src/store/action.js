import { login } from '../api/login'
export const Login = function ({ commit }, userInfo) {
  console.log(userInfo)
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    login(username, userInfo.password).then(res => {
      const data = res;
      console.log(data)
    })
  })
}

