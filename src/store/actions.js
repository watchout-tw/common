import * as types from './mutation-types'

export default {
  toggleIsAuthenticated({ commit }, reqObj) {
    commit(types.TOGGLE_IS_AUTHENTICATED, reqObj)
  },
  toggleModalAuth({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_AUTH, reqObj)
  },
  toggleModalAuthActiveCard({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_AUTH_ACTIVE_CARD, reqObj)
  },
  toggleModalResetPassword({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_RESET_PASSWORD, reqObj)
  },
  toggleModalIdentity({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_IDENTITY, reqObj)
  }
}
