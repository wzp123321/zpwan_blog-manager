<template>
  <div class="pictuer-canvas frsart">
    <!-- 
      CanvasRenderingContext2D.restore() 是 Canvas 2D API 通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。
CanvasRenderingContext2D.save() 是 Canvas 2D API 通过将当前状态放入栈中，保存 canvas 全部状态的方法。
    -->
    <!-- /**
    5.生成图片
    */-->
    <!-- https://juejin.im/post/5e717376e51d4526dd1ec2e6?utm_source=gold_browser_extension#heading-14 -->
    <!-- https://www.jianshu.com/p/a84e8b760ed1 -->
    <div class="canvas-wrapper">
      <canvas
        :width="WIDTH"
        :height="HEIGHT"
        id="pic_canvas"
        ref="pic_canvas"
        @mousedown="handleCanvasMouseDown"
      ></canvas>
    </div>
    <div class="operation-wrapper">
      <p>图片选择:</p>
      <UploadHandler :imgUrl="current_imgUrl" @change="handleImgUploader"></UploadHandler>
      <p>绘制文字:</p>
      <div class="text-input">
        <Input v-model="canvasText" placeholder="请输入文字" />
        <Button type="primary" @click="handleCanvasText">绘制</Button>
      </div>
      <p>画布操作:</p>
      <div class="operation-icon">
        <Tooltip placement="bottomLeft">
          <template slot="title">
            <span>画笔</span>
          </template>
          <svg
            :class="['icon',!isClear ? 'clear-active' : '']"
            aria-hidden="true"
            @click="handleMouseModeChange(false)"
          >
            <use xlink:href="#icon-pencil" />
          </svg>
        </Tooltip>
        <Tooltip placement="bottomLeft">
          <template slot="title">
            <span>橡皮擦</span>
          </template>
          <svg
            :class="['icon',isClear ? 'clear-active' : '']"
            aria-hidden="true"
            @click="handleMouseModeChange(true)"
          >
            <use xlink:href="#icon-xiangpica1" />
          </svg>
        </Tooltip>
        <Tooltip placement="bottomLeft">
          <template slot="title">
            <span>撤销</span>
          </template>
          <i
            :class="['iconfont','icon-houtui-shi',canvasHistoryList.length<2 ? 'no-click' : '']"
            @click="handleCanvasGoBack"
          ></i>
        </Tooltip>
        <Tooltip placement="bottomLeft">
          <template slot="title">
            <span>恢复</span>
          </template>
          <i
            :class="['iconfont','icon-qianjin-shi',cancelHistoryList.length<1 ? 'no-click' : '']"
            @click="handleCanvasForward"
          ></i>
        </Tooltip>
        <Tooltip placement="bottomLeft">
          <template slot="title">
            <span>清空画布</span>
          </template>
          <i class="iconfont icon-qingkonglishijilu" @click="clearAllData"></i>
        </Tooltip>
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
      <p>画笔尺寸:</p>
      <Slider :value="pencilSize" :max="10" :min="0" @change="(value)=>{pencilSize= value}" />
      <p>橡皮尺寸:</p>
      <Slider :value="clearSize" :max="50" :min="0" @change="(value)=>{clearSize= value}" />
      <div class="clear-size"></div>
      <Button type="default" @click="handleImageCreate" class="create-image">生成图片</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Input, message, Button, Tooltip, Slider } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
import HttpRequest from "@/assets/api/modules/index";
import html2canvas from "html2canvas";
Vue.prototype.$message = message;

@Component({
  name: "UtilModule",
  components: {
    Input,
    Button,
    UploadHandler,
    Tooltip,
    Slider
  }
})
export default class UtilModule extends Vue {
  private WIDTH: number = 800;
  private HEIGHT: number = 400;
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
  // 每次画完之后存储canvas数组
  private canvasHistoryList: ImageData[] = [];
  // 撤销的imageData数组
  private cancelHistoryList: ImageData[] = [];
  // 画笔尺寸
  private pencilSize: number = 1;
  // 橡皮擦尺寸
  private clearSize: number = 20;
  // 需要绘制的文字
  private canvasText: string = "";
  // 图片上传
  private handleImgUploader(url: string) {
    this.current_imgUrl = url;
    let img = new Image();
    img.src = url;
    img.onload = () => {
      this.context.drawImage(img, 0, 0, this.WIDTH, this.HEIGHT);
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
      // 打开拖拽开关
      this.isdragging = true;
      //获得鼠标按下的点相对canvas的坐标。
      let ele = this.windowToCanvas(e.clientX, e.clientY);
      let { x, y } = ele;
      //绘制起点。
      context.beginPath();
      context.moveTo(x, y);
      context.lineWidth = this.pencilSize;
      document.onmousemove = (el: any) => {
        if (this.isdragging) {
          //移动时获取新的坐标位置，用lineTo记录当前的坐标，然后stroke绘制上一个点到当前点的路径
          let ele = this.windowToCanvas(el.clientX, el.clientY);
          let { x, y } = ele;
          if (this.isClear) {
            // 橡皮擦
            this.clearCanvas(x, y, this.clearSize, this.clearSize);
          } else {
            context.lineTo(x, y);
            context.strokeStyle = colors[colorIndex];
            context.stroke();
          }
        }
      };
      // 鼠标抬起
      document.onmouseup = (el: any) => {
        if (this.isdragging) {
          this.isdragging = false;
          // 每次鼠标抬起 就存下当前绘制的内容
          const imageData: ImageData = context.getImageData(
            0,
            0,
            this.WIDTH,
            this.HEIGHT
          );
          this.canvasHistoryList.push(imageData);
          // putImageData 通过这个来
        }
      };
    }
  }
  // 清除功能
  clearCanvas(x: number, y: number, width: number, height: number) {
    const { context } = this;
    context.save(); //入栈
    context.beginPath(); //  我们在创建一个集合图形之前，都应当先调用该方法，该方法会清除上一次绘制时留下的路径，并将本次绘制的路径作为 ~当前路径~。
    context.clearRect(x, y, width, height);
    context.restore();
  }
  // 清空全部数据
  private clearAllData() {
    this.clearCanvas(0, 0, 800, 400);
    this.cancelHistoryList = [];
    this.canvasHistoryList = [];
    this.initData();
    this.$message.success("清空画布成功");
  }
  // 撤销
  private handleCanvasGoBack() {
    const { canvasHistoryList, cancelHistoryList } = this;
    if (canvasHistoryList.length === 1) {
      return;
    }
    let newImgData = canvasHistoryList[canvasHistoryList.length - 1];
    cancelHistoryList.push(newImgData);
    canvasHistoryList.pop();
    newImgData = canvasHistoryList[canvasHistoryList.length - 1];
    this.context.beginPath();
    this.context.putImageData(newImgData, 0, 0);
  }
  // 恢复
  private handleCanvasForward() {
    const { canvasHistoryList, cancelHistoryList } = this;
    if (cancelHistoryList.length === 0) {
      return;
    }
    let newImgData = cancelHistoryList[cancelHistoryList.length - 1];
    canvasHistoryList.push(newImgData);
    cancelHistoryList.pop();
    newImgData = canvasHistoryList[canvasHistoryList.length - 1];
    this.context.beginPath();
    this.context.putImageData(newImgData, 0, 0);
  }
  // 生成图片
  private handleImageCreate() {
    const canvas_pic: any = document.getElementById("pic_canvas");
    html2canvas(canvas_pic, {
      logging: false
    }).then((canvas: any) => {
      let img = new Image();
      const imgUrl = canvas.toDataURL("image/png");
      img.src = imgUrl;
      let a = document.createElement("a");
      a.href = imgUrl;
      a.download = "canvas";
      a.click();
    });
  }
  // 绘制文字
  private handleCanvasText() {
    const { WIDTH, HEIGHT } = this;
    this.context.beginPath();
    this.context.font = "36px serif"
    this.context.fillStyle = this.colors[this.colorIndex]
    this.context.fillText(
      this.canvasText,
      Math.random() * (WIDTH-100),
      Math.random() * (HEIGHT-50)
    );
    this.canvasText = "";
  }
  // 初始化
  private initData() {
    /**
     * 初始化画布 绘制一个白色背景 将内容存进imageData
     */
    const { WIDTH, HEIGHT } = this;
    this.theCanvas = document.querySelector("#pic_canvas");
    this.context = this.theCanvas.getContext("2d");
    // this.context.fillStyle = "#fff";
    // this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    const imageData: ImageData = this.context.getImageData(0, 0, WIDTH, HEIGHT);
    this.canvasHistoryList.push(imageData);
    this.handleMouseModeChange(false);
  }
  mounted() {
    this.$nextTick(() => {
      this.initData();
    });
  }
}
</script>
<style lang="less" scoped>
.pictuer-canvas {
  position: relative;
  background: #f1f1f1;
  .canvas-wrapper {
    background: #fff;
    border: 1px solid #eee;
  }
  .operation-wrapper {
    flex: 1;
    padding: 0 5px;
    p {
      font-size: 14px;
      color: #999;
      margin: 15px 5px 5px 0;
    }
    .text-input {
      display: flex;
      flex-direction: row;
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
    .create-image {
      margin: 15px 0;
      padding: 0 30px;
      color: #06a5ff;
      border: none;
    }
  }
}
</style>