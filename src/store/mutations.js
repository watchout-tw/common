import * as types from './mutation-types'

export default {
  [types.TOGGLE_IS_AUTHENTICATED](state, mutateObj) {
    state.isAuthenticated = mutateObj.value
  },
  [types.TOGGLE_MODAL_AUTH](state, mutateObj) {
    state.modalAuthIsShown = mutateObj.value
  },
  [types.TOGGLE_MODAL_RESET_PASSWORD](state, mutateObj) {
    state.modalResetPasswordIsShown = mutateObj.value
  },
  [types.TOGGLE_MODAL_IDENTITY](state, mutateObj) {
    state.modalIdentityIsShown = mutateObj.value
  }
}
