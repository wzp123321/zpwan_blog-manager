import Mock from 'mockjs' //引入mock.js模块
import {
  stringify
} from 'querystring';

const Random = Mock.Random;

let data = {
  'id': () => Random.string('lower', 20),
  "title": () => Random.string('lower', 5, 10),
  'imgUrl': () => Random.image(),
  'content': () => Random.string('lower', 100, 1000),
  'description': () => Random.cparagraph(1),
  'author': () => Random.cname(),
  'tags': () => Random.string('lower', 5, 10),
  'catalogId': () => Random.string('lower', 20),
  'catalogName': () => Random.string('lower', 20),
  'isShelves': () => Random.integer(0, 1),
  'isRecommend': () => Random.integer(0, 1),
  'isTop': () => Random.integer(0, 1),
  'visitCount': () => Random.integer(0, 1000),
  'likeCount': () => Random.integer(0, 1000),
  'createTime': () => Random.integer(0, 1000000000),
  'modifyTime': () => Random.integer(0, 1000000000),
}

Mock.mock('/mock/test', 'get', {
  code: 200,
  "data|20": [data],
  message: "SUCCESS"
});
