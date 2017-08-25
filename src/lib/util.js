import axios from 'axios'

export function handleThatError(error) {
  console.error(error)
  if(error.response) {
    if(error.response.data) {
      console.log(error.response.data)
    }
  }
}
export function jwtTokenIsHere() {
  return !!localStorage.getItem('watchout-token')
}
export function isAdmin() {
  const adminRoles = ['god', 'editor']
  const roleString = getCitizenRoleString()
  return !adminRoles.reduce(function(flag, role) {
    return flag && roleString.indexOf(role) < 0
  }, true)
}
export function getCitizenHandle() {
  return localStorage.getItem('watchout-citizen-handle')
}
export function getCitizenFirstEmail() {
  return localStorage.getItem('watchout-citizen-first-email')
}
export function getCitizenRoleString() {
  return localStorage.getItem('watchout-citizen-roles')
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
export function makeCitizenRoleString(roles) {
  return roles.map(role => role.channel + '.' + role.name).join(',')
}
