import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入模块
import { IUserState } from "./module/user"

interface IRootState{
  user:IUserState
}

export default new Vuex.Store<IRootState>({})
