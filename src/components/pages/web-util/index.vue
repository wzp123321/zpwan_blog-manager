<template>
  <div class="pictuer-canvas frsart">
    <!-- /**
    2.颜色选择
    3.完成撤销
    4.完成恢复
    5.生成图片
    6.完成一键清空(只清空鼠标画的)
    7.完成画布删除(清空画布包括图片以及鼠标画的)
    */-->
    <!-- https://juejin.im/post/5e717376e51d4526dd1ec2e6?utm_source=gold_browser_extension#heading-14 -->
    <!-- https://www.jianshu.com/p/a84e8b760ed1 -->
    <div class="canvas-wrapper">
      <canvas
        width="800"
        height="400"
        id="pic_canvas"
        ref="pic_canvas"
        @mousedown="handleCanvasMouseDown"
      ></canvas>
    </div>
    <div class="operation-wrapper">
      <p>图片选择:</p>
      <UploadHandler :imgUrl="current_imgUrl" @change="handleImgUploader"></UploadHandler>
      <p>画布操作:</p>
      <div class="operation-icon">
        <svg
          :class="['icon',!isClear ? 'clear-active' : '']"
          aria-hidden="true"
          @click="handleMouseModeChange(false)"
        >
          <use xlink:href="#icon-pencil" />
        </svg>
        <svg
          :class="['icon',isClear ? 'clear-active' : '']"
          aria-hidden="true"
          @click="handleMouseModeChange(true)"
        >
          <use xlink:href="#icon-xiangpica1" />
        </svg>
        <i class="iconfont icon-houtui-shi"></i>
        <i class="iconfont icon-qianjin-shi"></i>
      </div>
      <p>颜色选取:</p>
      <div class="color-choose">
        <span
          v-for="(item,index) in colors"
          :key="index"
          :style="`background:${item}`"
          :class="['color-span',colorIndex===index?'color-span-active':'']"
          @click="handleColorChoose(index)"
        ></span>
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
  // 画布对象
  private theCanvas: any = null;
  // 2d对象
  private context: any = null;
  // 当前操作的图片地址
  private current_imgUrl: string = "";
  // 选中橡皮擦
  private isClear: boolean = false;
  // 是否拖动鼠标
  private isdragging: boolean = false;
  // 鼠标图片地址
  private mouseImg: string = "http://cdn.algbb.cn/pencil.ico"; // 默认
  // 选取颜色数组
  private colors: string[] = [
    "#333333",
    "#fa4b2c",
    "#feff02",
    "#ee01ee",
    "#1890ff",
    "#fff",
    "#31c27c"
  ];
  // 当前颜色索引
  private colorIndex: number = 0;
  // 图片上传
  private handleImgUploader(url: string) {
    this.current_imgUrl = url;
    let img = new Image();
    img.src = url;
    img.onload = () => {
      this.context.drawImage(img, 0, 0, 800, 400);
    };
  }
  // 鼠标图标选择
  private handleMouseModeChange(value: boolean) {
    this.isClear = value;
    switch (value) {
      case false:
        this.theCanvas.style.cursor = `url('http://cdn.algbb.cn/pencil.ico') 8 26, pointer`;
        break;
      case true:
        this.theCanvas.style.cursor = `url('http://cdn.algbb.cn/eraser.ico') 6 26, pointer`;
        break;
    }
  }
  // 颜色选取
  private handleColorChoose(index: number) {
    this.colorIndex = index;
    this.context.beginPath();
  }
  // 获取鼠标相对于canvas的坐标
  windowToCanvas(x: number, y: number) {
    const { theCanvas } = this;
    //获取canvas元素距离窗口的一些属性，MDN上有解释
    let rect = theCanvas.getBoundingClientRect();
    //x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。
    return {
      x: x - rect.left * (theCanvas.width / rect.width),
      y: y - rect.top * (theCanvas.height / rect.height)
    };
  }
  // canvas 鼠标按下事件
  private handleCanvasMouseDown(e: any) {
    const { theCanvas, context, colors, colorIndex } = this;
    // 初始化判断是否支持canvas
    if (!theCanvas || !theCanvas.getContext) {
      //不兼容canvas
      console.warn("暂不支持canvas");
      return false;
    } else {
      this.isdragging = true;
      //获得鼠标按下的点相对canvas的坐标。
      let ele = this.windowToCanvas(e.clientX, e.clientY);
      //es6的解构赋值
      let { x, y } = ele;
      //绘制起点。
      context.moveTo(x, y);
      document.onmousemove = (el: any) => {
        if (this.isdragging) {
          //移动时获取新的坐标位置，用lineTo记录当前的坐标，然后stroke绘制上一个点到当前点的路径
          let ele = this.windowToCanvas(el.clientX, el.clientY);
          let { x, y } = ele;
          if (this.isClear) {
            context.save(); //入栈
            this.clearCanvas(x, y);
            context.restore();
          } else {
            context.lineTo(x, y);
            context.strokeStyle = colors[colorIndex];
            context.stroke();
          }
        }
      };
      // 鼠标抬起
      document.onmouseup = (el: any) => {
        this.isdragging = false;
      };
    }
  }
  // 清除功能
  clearCanvas(x: number, y: number) {
    const { context } = this;
    context.beginPath(); //  我们在创建一个集合图形之前，都应当先调用该方法，该方法会清除上一次绘制时留下的路径，并将本次绘制的路径作为 ~当前路径~。
    context.clearRect(x, y, 20, 20);
  }
  mounted() {
    this.theCanvas = document.querySelector("#pic_canvas");
    this.context = this.theCanvas.getContext("2d");
    this.handleMouseModeChange(false);
  }
}
</script>
<style lang="less" scoped>
.pictuer-canvas {
  position: relative;
  background: #f1f1f1;
  .canvas-wrapper {
    flex: 1;
    background: #fff;
    border: 1px solid #eee;
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
      svg:first-child {
        margin-right: 10px;
      }
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
    .color-choose {
      .color-span {
        cursor: pointer;
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 0 4px;
      }
      .color-span-active {
        border: 1px solid #000;
      }
    }
  }
}
</style>