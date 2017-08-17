import axios from 'axios'

export function handleThatError(error) {
  console.error(error)
  console.log(error.response.data)
}
export function jwtTokenIsHere() {
  return !!localStorage.getItem('watchout-token')
}
export function getCitizenHandle() {
  return localStorage.getItem('watchout-citizen-handle')
}
export function getCitizenFirstEmail() {
  return localStorage.getItem('watchout-citizen-first-email')
}
export function authenticateAxios() {
  const token = localStorage.getItem('watchout-token')
  if(token) {
    axios.defaults.headers.common['Authorization'] = token
  }
}
export function getCitizen($store) { // FIXME: seems like a bad idea to pass $store around
  if(jwtTokenIsHere()) {
    const handle = getCitizenHandle()
    const email = getCitizenFirstEmail()
    if(handle && !email) {
      axios.get(`/citizen/${handle}/emails`).then(response => {
        let emails = response.data.rows
        if(emails.length > 0) {
          localStorage.setItem('watchout-citizen-first-email', emails[0].email)
        }
      }).catch(handleThatError)
    }
  }
}
