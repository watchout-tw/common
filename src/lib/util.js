export function jwtTokenIsExist () {
  return !!localStorage.getItem('watchout-token')
}
