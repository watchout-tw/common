import * as types from './mutation-types'

export default {
  [types.TOGGLE_IS_AUTHENTICATED](state, mutateObj) {
    state.isAuthenticated = mutateObj.value
  },
  [types.TOGGLE_MODAL_AUTH](state, mutateObj) {
    state.modalAuthIsShown = mutateObj.value
  },
  [types.TOGGLE_MODAL_AUTH_ACTIVE_CARD](state, mutateObj) {
    state.modalAuthActiveCard = mutateObj.value
  },
  [types.TOGGLE_MODAL_LOST_PWD](state, mutateObj) {
    state.modalLostPwdIsShown = mutateObj.value
  },
  [types.TOGGLE_MODAL_RESET_PWD](state, mutateObj) {
    state.modalResetPwdIsShown = mutateObj.value
  },
  [types.TOGGLE_MODAL_IDENTITY](state, mutateObj) {
    state.modalIdentityIsShown = mutateObj.value
  }
}
