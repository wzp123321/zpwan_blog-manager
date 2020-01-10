declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

/**
 * 索引
 */
type tplotOptions = {
  [key: string]: Function;
};

interface ApiResponse<T> {
  code: number,
  data: T,
  message: string
}

interface ListResponse<T> {
  data: T,
  total: number
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
 * 列数据
 */
interface ColumnsInfo {
  key: string,
  title: string,
  dataIndex?: string,
  width?: number,
  fixed?: string,
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
 * 文件信息
 */
interface FileInfo {
  id: string,
  fileName: string,
  md5: string,
  url: string,
  length: number,
  create_time: number,
}

/**
 * 字典模块
 */
declare namespace DictionaryModule {
  interface DictionaryInfo {
    id: number,
    code: string,
    value: string,
    type: number,
    description: string,
    pid: number,
    pcode: string,
    create_time: number,
    modify_time: number,
  }

  interface SearchParamsInfo {
    page?: number,
    limit?: number,
    type?: number
  }

  interface TagInfo {
    id: number,
    code: string,
    value: string,
    create_time: number,
    modify_time: number
  }
}

/**
 * 文章模块
 */
declare namespace ArticleModule {
  interface CatalogArray {
    firstCatalogs: Array<DictionaryModule.DictionaryInfo>;
    secondCatalogs: Array<DictionaryModule.DictionaryInfo>;
  }

  interface ArticleInfo {
    id?: string,
    title?: string,
    imgUrl?: string,
    content?: string,
    description?: string,
    author?: string,
    tags?: string,
    first_catalogId?: number,
    first_catalogName?: string,
    second_catalogId?: number,
    second_catalogName?: string,
    isRecommend?: number,
    isTop?: number,
    visitCount?: number,
    likeCount?: number,
    create_time?: number,
    modify_time?: number,
  }

  interface SearchParams {
    first_catalogId?: number,
    second_catalogId?: number,
    title?: string,
    isShelves?: number,
  }
}

/**
 * banner模块
 */
declare namespace BannerModule {
  interface BannerInfo {
    id: number,
    title: string,
    imgUrl: string,
    url: string,
    isShelves: number | boolean,
    create_time: number,
    modify_time: number
  }
}