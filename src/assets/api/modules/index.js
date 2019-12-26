const AdminModule = () => import("./admin.js")
const ArticleModule = () => import("./article.js")
const BannerModule = () => import("./banner.js")
const DictionaryModule = () => import("./dictionary.js")
const UploaderModule = () => import("./uploader.js")

export default {
  AdminModule,
  ArticleModule,
  BannerModule,
  DictionaryModule,
  UploaderModule
}
