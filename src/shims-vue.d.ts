declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface MenuInfo{
  name?:string,
  en_name?:string,
  url?:string,
  children?:Array<MenuInfo>
}
