import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from "@/store"


export interface IUserState {
    userInfo: WebManagerModule.UserInfo
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public userInfo!:WebManagerModule.UserInfo ;

    @Mutation
    private SET_USER_INFO(data: WebManagerModule.UserInfo) {
        console.log(data)
        this.userInfo = data
    }

    @Action
    public async setUserInfo(userInfo: WebManagerModule.UserInfo) {
        this.SET_USER_INFO(userInfo);
    }
}

export const UserModule = getModule(User);