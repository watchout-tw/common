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
  toggleModalLostPwd({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_LOST_PWD, reqObj)
  },
  toggleModalResetPwd({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_RESET_PWD, reqObj)
  },
  toggleModalIdentity({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_IDENTITY, reqObj)
  },
  toggleModalTermsOfSvc({ commit }, reqObj) {
    commit(types.TOGGLE_MODAL_TERMS_OF_SVC, reqObj)
  }
}
