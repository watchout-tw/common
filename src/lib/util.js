import axios from 'axios'

export function jwtTokenIsHere() {
  return !!localStorage.getItem('watchout-token')
}
export function authenticateAxios() {
  const token = localStorage.getItem('watchout-token')
  if(token) {
    axios.defaults.headers.common['Authorization'] = token
  }
}
export function handleThatError(error) {
  console.error(error)
  console.log(error.response.data)
}
