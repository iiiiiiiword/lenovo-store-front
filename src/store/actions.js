import {STORE_USER_INFO} from './mutations-type'

export default {

  storeUserInfo(context,payload) {
    context.commit(STORE_USER_INFO,payload);
  }
}
