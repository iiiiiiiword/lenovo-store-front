import {STORE_USER_INFO} from '@/store/mutations-type'

export default {
  [STORE_USER_INFO](state,userInfo) {
    state.userInfo = userInfo
  }
}
