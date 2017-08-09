export function jwtTokenIsHere () {
  return !!localStorage.getItem('watchout-token')
}
