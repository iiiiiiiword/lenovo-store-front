import { getItem } from '@/storage'
import { USER_INFO_KEY } from '@/config/constants'

const state = {
  userInfo: getItem(USER_INFO_KEY) ? JSON.parse(getItem(USER_INFO_KEY)) : {
    userId: -1,
    userName: ''
  }
}

export default state
