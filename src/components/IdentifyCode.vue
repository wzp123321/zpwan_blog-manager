<template>
  <div class="s-canvas" @click="changeHandler">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "IdentifyCode"
})
export default class IdentifyCode extends Vue {
  @Prop({ default: 24 }) private fontSizeMin!: number;

  @Prop({ default: 34 }) private fontSizeMax!: number;

  @Prop({ default: 200 }) private backgroundColorMin!: number;

  @Prop({ default: 220 }) private backgroundColorMax!: number;

  @Prop({ default: 0 }) private colorMin!: number;

  @Prop({ default: 100 }) private colorMax!: number;

  @Prop({ default: 100 }) private lineColorMin!: number;

  @Prop({ default: 180 }) private lineColorMax!: number;

  @Prop({ default: 200 }) private dotColorMin!: number;

  @Prop({ default: 255 }) private dotColorMax!: number;

  @Prop({ default: 90 }) private contentWidth!: number;

  @Prop({ default: 40 }) private contentHeight!: number;

  private identifyCode: string = "";

  // 生成一个随机数
  randomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // 生成一个随机的颜色
  randomColor(min: number, max: number) {
    var r = this.randomNum(min, max);
    var g = this.randomNum(min, max);
    var b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  drawPic() {
    //获取验证码字符串
    this.identifyCode = this.getRanNum();
    this.$emit("codeChange", this.identifyCode);

    var canvas: any = document.getElementById("s-canvas");
    var ctx = canvas.getContext("2d");
    ctx.textBaseline = "bottom";
    // 绘制背景
    ctx.fillStyle = this.randomColor(
      this.backgroundColorMin,
      this.backgroundColorMax
    );
    ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
    // 绘制文字
    for (let i = 0; i < this.identifyCode.length; i++) {
      this.drawText(ctx, this.identifyCode[i], i);
    }
    this.drawLine(ctx);
    this.drawDot(ctx);
  }
  drawText(ctx: any, txt: string, i: number) {
    ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
    ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei";
    var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 2));
    x = i === 2 ? x + 15 : x + 5;
    var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
    // var deg = this.randomNum(-45, 45);
    var deg = i % 2 === 0 ? this.randomNum(-45, 0) : this.randomNum(0, 45);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  }
  drawLine(ctx: any) {
    // 绘制干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
      ctx.beginPath();
      ctx.moveTo(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight)
      );
      ctx.lineTo(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight)
      );
      ctx.stroke();
    }
  }
  drawDot(ctx: any) {
    // 绘制干扰点
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }
  getRanNum() {
    var result = [];
    for (var i = 0; i < 4; i++) {
      var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
      //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
      result.push(String.fromCharCode(65 + ranNum));
    }
    return result.join("");
  }
  /**
   * 点击更新验证码
   */
  changeHandler() {
    this.drawPic();
  }
  mounted() {
    this.drawPic();
  }
}
</script>
