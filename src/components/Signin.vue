<template>
  <div class="signin-panel">
    <div class="login-content">
      <div class="login-header">管理后台登录</div>
      <Form layout="horizontal" :form="form">
        <p class="errormsg">{{ errorTip }}</p>
        <FormItem label="用户名" :label-col="{span:4}" :wrapper-col="{span:20}" :required="false">
          <Input
            style="height:40px"
            @focus="()=>{errorTip = ''}"
            :class="{'haserror':errorTip.length>0}"
            v-decorator="[
              'username',
              {
              rules: [{ required: true, message: '请输入用户名'},{whitespace:true ,message:'请输入用户名'}]
              }
            ]
            "
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem label="密码" :label-col="{span:4}" :wrapper-col="{span:20}" :required="false">
          <Input
            type="password"
            style="height:40px"
            :class="{'haserror':errorTip.length>0}"
            @focus="()=>{errorTip = ''}"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码' },{whitespace:true ,message:'请输入密码'}]
              }
            ]"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem label="验证码" :label-col="{span:4}" :wrapper-col="{span:20}" :required="false">
          <div class="identifycode-div">
            <Input
              class="identityinput"
              style="height:40px"
              v-decorator="[
                'identifycode',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码'
                    },
                    {
                      whitespace: true,
                      message: '请输入验证码'
                    }
                  ]
                }
              ]"
              placeholder="请输入验证码"
            />
            <IdentifyCode @codeChange="getIdenCode" ref="idenCode"></IdentifyCode>
          </div>
        </FormItem>
        <FormItem
          class="loginbtn"
          :label-col="{span:4}"
          :wrapper-col="{span:20}"
          style="margin-bottom:0"
        >
          <Button :loading="loading" type="primary" @click="handleSubmit">登录</Button>
        </FormItem>
        <FormItem label="您还可以通过以下方式登录:" :label-col="{span:13}" :wrapper-col="{offset:1,span:5}">
          <svg
            class="icon"
            aria-hidden="true"
            style="display: inline-block;margin-right: 10px;"
            @click="()=>{$router.push('/signin_qq')}"
          >
            <use xlink:href="#icon-QQ" />
          </svg>
          <svg class="icon" aria-hidden="true" @click="handleGithubLogin">
            <use xlink:href="#icon-github" />
          </svg>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Form, Button, Input, message, notification } from "ant-design-vue";
import IdentifyCode from "./IdentifyCode.vue";
import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "Signin",
  components: {
    Form,
    Button,
    Input,
    FormItem: Form.Item,
    IdentifyCode
  }
})
export default class Signin extends Vue {
  public $refs!: {
    idenCode: IdentifyCode;
  };
  // 错误提示
  private errorTip: string = "";
  private form: any;
  // 生成的验证码
  private nativeIdentityCode: string = "";
  // 加载开关
  private loading: boolean = false;
  /**
   * github登录
   * https://github.com/settings/applications/1199418
   * http://www.ruanyifeng.com/blog/2019/04/github-oauth.html
   * https://www.jianshu.com/p/0842b888d94a
   * https://www.zhyd.me/article/141
   * https://lyci.xyz/article/6578502487528599552
   *
   */
  private handleGithubLogin() {
    window.location.href =
      "/githubAuthorize?client_id=e8066bfd81332a5fd345&redirect_uri=http://localhost:8080/signin_github";
  }
  /**
   * 初始化
   */
  private created() {
    this.form = this.$form.createForm(this);
    this.$nextTick(() => {
      window.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
          this.handleSubmit();
        }
      });
    });
  }
  // 获取生成的验证码
  private getIdenCode(code: string) {
    this.nativeIdentityCode = code;
  }
  // 检验验证码
  private checkIdentityCode(code: string): boolean {
    if (code && code.toUpperCase() !== this.nativeIdentityCode.toUpperCase()) {
      this.form.setFields({
        identifycode: { errors: [new Error("验证码输入错误")] }
      });
      this.$refs.idenCode.drawPic();
      return false;
    }
    return true;
  }
  /**
   *  登录表单提交
   */
  private handleSubmit() {
    this.form.validateFields(async (err: any, values: any) => {
      if (!err && this.checkIdentityCode(values.identifycode)) {
        this.loading = true;
        const { username, password } = values;
        const res: ApiResponse<
          string
        > = await HttpRequest.AdminModule.getAdminLogin({ username, password });
        if (res && res.data) {
          this.loading = false;
          localStorage.setItem("token", res.data);
          localStorage.setItem("name", username);
          this.$router.push("/app");
          notification.success({
            message: "登录成功",
            description: "恭喜你登录成功，欢迎回来！"
          });
        } else {
          this.form.setFields({
            username: { value: "", errors: [new Error("用户名或密码错误")] },
            password: { value: "", errors: [new Error("用户名或密码错误")] }
          });
          this.loading =false;
        }
      }
    });
  }
}
</script>
<style lang="less" scoped>
.signin-panel {
  position: relative;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  .login-content {
    position: fixed;
    width: 440px;
    height: 410px;
    right: 50%;
    top: 55%;
    transform: translate3d(50%, -65%, 0);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: "0, 0, 5px #eee";
    padding: 25px 49px 85px 49px;
    .errormsg {
      color: red;
      margin: 3px 0 6px 60px;
      text-align: left;
    }
    .haserror {
      border: 1px solid red;
    }
    .login-header {
      text-align: center;
      font-size: 24px;
      margin-bottom: 24px;
    }
    .identifycode-div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .identityinput {
        width: 180px;
      }
    }
    .loginbtn {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      button {
        width: 100%;
      }
    }
  }
}
</style>
