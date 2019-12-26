declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface MenuInfo {
  name?: string,
  en_name?: string,
  icon?: string,
  url?: string,
  children?: Array<MenuInfo>
}

/**
 * admin信息
 */
interface UserInfo {

}

/**
 * markdown 配置
 */
interface markdownOption {
  bold?: boolean, // 粗体
  italic?: boolean, // 斜体
  header?: boolean, // 标题
  underline?: boolean, // 下划线
  strikethrough?: boolean, // 中划线
  mark?: boolean, // 标记
  superscript?: boolean, // 上角标
  subscript?: boolean, // 下角标
  quote?: boolean, // 引用
  ol?: boolean, // 有序列表
  ul?: boolean, // 无序列表
  link?: boolean, // 链接
  imagelink?: boolean, // 图片链接
  code?: boolean, // code
  table?: boolean, // 表格
  fullscreen?: boolean, // 全屏编辑
  readmodel?: boolean, // 沉浸式阅读
  htmlcode?: boolean, // 展示html源码
  help?: boolean, // 帮助
  /* 1.3.5 */
  undo?: boolean, // 上一步
  redo?: boolean, // 下一步
  trash?: boolean, // 清空
  save?: boolean, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation?: boolean, // 导航目录
  /* 2.1.8 */
  alignleft?: boolean, // 左对齐
  aligncenter?: boolean, // 居中
  alignright?: boolean, // 右对齐
  /* 2.2.1 */
  subfield?: boolean, // 单双栏模式
  preview?: boolean, // 预览
}

/**
 * 列数据
 */
interface ColumnsInfo {
  key: string,
  title: string,
  dataIndex?: string,
  width?: number,
  scopedSlots?: { customRender: string },
  customRender?: Function,
}

/**
 * 分页数据
 */
interface PaginationInfo {
  current: number,
  total: number,
  pageSize?: number
}

/**
 * 路由模块
 */
interface RouteInfo {
  path: string,
  meta: { name: string }
  children?: Array<RouteInfo>,
}

/**
 * 字典模块
 */
declare namespace DictionaryModule {
  interface DictionaryInfo {
    id?: string
  }
}

/**
 * 文章模块
 */
declare namespace ArticleModule {
  interface ArticleInfo {
    id?: string,
    title?: string,
    imgUrl?: string,
    content?: string,
    description?: string,
    author?: string,
    tags?: string,
    catalogId?: string,
    catalogName?: string,
    isRecommend?: number,
    isTop?: number,
    visitCount?: number,
    likeCount?: number,
    createTime?: number,
    modifyTime?: number,
  }
}

/**
 * banner模块
 */
declare namespace BannerModule{
  interface BannerInfo{
    
  }
}