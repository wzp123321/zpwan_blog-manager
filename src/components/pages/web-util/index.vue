<template>
  <div class="pictuer-canvas frsart">
    /**
    1.完成橡皮擦
    2.颜色选择
    3.完成撤销
    4.完成恢复
    5.生成图片
    6.完成一键清空(只清空鼠标画的)
    7.完成画布删除(清空画布包括图片以及鼠标画的)
    */
    <!-- https://juejin.im/post/5e717376e51d4526dd1ec2e6?utm_source=gold_browser_extension#heading-14 -->
    <div class="canvas-wrapper">
      <canvas width="800" height="400" id="pic_canvas" @mousedown="handleCanvasMouseDown"></canvas>
    </div>
    <div class="operation-wrapper">
      <p>图片选择:</p>
      <UploadHandler :imgUrl="current_imgUrl" @change="handleImgUploader"></UploadHandler>
      <p>画布操作:</p>
      <div class="operation-icon">
        <svg
          :class="['icon',isClear ? 'clear-active' : '']"
          aria-hidden="true"
          @click="()=>{isClear = !isClear}"
        >
          <use xlink:href="#icon-xiangpica1" />
        </svg>
        <i class="iconfont icon-houtui-shi"></i>
        <i class="iconfont icon-qianjin-shi"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Input, message, Button } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
import HttpRequest from "@/assets/api/modules/index";
Vue.prototype.$message = message;
@Component({
  name: "UtilModule",
  components: {
    Input,
    Button,
    UploadHandler
  }
})
export default class UtilModule extends Vue {
  // 当前操作的图片地址
  private current_imgUrl: string = "";
  // 选中橡皮擦
  private isClear: boolean = false;
  // 图片上传
  private handleImgUploader(url: string) {
    this.current_imgUrl = url;
    let img = new Image();
    img.src = url;
    img.onload = () => {
      let theCanvas: any = document.querySelector("#pic_canvas");
      let context: any = theCanvas.getContext("2d");
      context.drawImage(img, 0, 0, 800, 400);
    };
  }
  // 获取鼠标相对于canvas的坐标
  windowToCanvas(canvas: any, x: number, y: number) {
    //获取canvas元素距离窗口的一些属性，MDN上有解释
    let rect = canvas.getBoundingClientRect();
    //x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。
    return {
      x: x - rect.left * (canvas.width / rect.width),
      y: y - rect.top * (canvas.height / rect.height)
    };
  }
  // canvas 鼠标按下事件
  private handleCanvasMouseDown(e: any) {
    // 初始化判断是否支持canvas
    let theCanvas: any = document.querySelector("#pic_canvas");
    if (!theCanvas || !theCanvas.getContext) {
      //不兼容canvas
      console.warn("暂不支持canvas");
      return false;
    } else {
      // 获取2d对象
      let context: any = theCanvas.getContext("2d");
      //获得鼠标按下的点相对canvas的坐标。
      let ele = this.windowToCanvas(theCanvas, e.clientX, e.clientY);
      //es6的解构赋值
      let { x, y } = ele;
      //绘制起点。
      context.moveTo(x, y);
      document.onmousemove = (el: any) => {
        //移动时获取新的坐标位置，用lineTo记录当前的坐标，然后stroke绘制上一个点到当前点的路径
        let ele = this.windowToCanvas(theCanvas, el.clientX, el.clientY);
        let { x, y } = ele;
        context.lineTo(x, y);
        context.stroke();
      };
      document.onmouseup = (el: any) => {
        document.onmousemove = null;
      };
    }
  }
}
</script>
<style lang="less" scoped>
.pictuer-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f1f1f1;
  .canvas-wrapper {
    flex: 1;
    background: #fff;
    border: 1px solid #eee;
    #pic_canvas {
      cursor: crosshair;
    }
  }
  .operation-wrapper {
    padding: 0 5px;
    width: 250px;
    p {
      font-size: 14px;
      color: #999;
      margin: 5px;
    }
    .operation-icon {
      padding: 2px;
      .iconfont {
        font-size: 20px;
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
      }
      .iconfont:last-child {
        margin-left: 0;
      }
      .no-click {
        color: #a7a7a7;
      }
    }
    .clear-active {
      background: #fff;
      border: 1px solid #06a5ff;
    }
  }
}
</style>