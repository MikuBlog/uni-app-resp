const 
  state = {
    isLoginPage: false
  },
  mutations = {
    // 设置登录页状态
    SET_LOGIN_STATUS(state, bool) {
			console.log(bool)
    	state.isLoginPage = bool
    }
  }

export default {
  state,
  mutations
}