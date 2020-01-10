<template>
  <div class="login">
    <a-spin tip=" 登录中...">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Spin, Icon } from "ant-design-vue";
import axios from "axios";
@Component({
  name: "QQ_LoginModule",
  components: {
    "a-spin": Spin,
    "a-icon": Icon
  }
})
export default class QQ_LoginModule extends Vue {
  /**
   * 根据access-token获取用户信息
   */
  private getUserInfoByAccessToken(access_token: string) {
    axios({
      method: "GET",
      url: "/githubUserInfo",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
        Authorization: `token ${access_token}`
      }
    }).then(res => {
      if (res && res.data) {
        localStorage.setItem("user", res.data);
        this.$router.push("/");
      } else {
        this.$router.push("/signin");
      }
    });
  }
  /**
   * 根据code请求token
   */
  private async getAccessTokenByCode() {
    const client_id = "e8066bfd81332a5fd345";
    const client_secret = "dbd033bca15cd61b1b8b5666dfe41f2d50581bc1";
    const code = this.$route.query.code;

    // axios({
    //   method: "get",
    //   url:
    //     "/githubAccessToken?client_id=" +
    //     client_id +
    //     "&client_secret=" +
    //     client_secret +
    //     "&code=" +
    //     code,
    //   headers:{

    //   }
    // }).then(response => {
    //   console.log(1111111111)
    //   console.log(response); //打印下 github 返回的 结果,包含 token
    // });
    const tokenResponse = await axios({
      method: "get",
      url: "/githubAccessToken",
      params: {
        client_id,
        client_secret,
        code
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json"
      }
    });
    if (tokenResponse) {
      this.getUserInfoByAccessToken(tokenResponse.data.access_token);
    }
  }
  mounted() {
    this.getAccessTokenByCode();
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 200px;
  background: rgba(0, 0, 0, 0.7);
}
</style>