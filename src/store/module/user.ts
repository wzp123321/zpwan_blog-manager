import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from "@/store"


export interface IUserState {
    userInfo: UserInfo
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public userInfo!:UserInfo ;

    @Mutation
    private SET_USER_INFO(data: UserInfo) {
        console.log(data)
        this.userInfo = data
    }

    @Action
    public async setUserInfo(userInfo: UserInfo) {
        this.SET_USER_INFO(userInfo);
    }
}

export const UserModule = getModule(User);