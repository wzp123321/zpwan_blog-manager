# zpwan_blog_manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


多条件查询
@Select(" <script> SELECT id,"      
        "p_t pT," +
        " WHERE " +
        "1+1"+
        " and s = #{pa.s}"+
        " <if test=\"#{pa.d} != null\">and uid = #{pa.d} </if> "+
        " <if test=\"#{pa.d} != null \">and brand_id = #{pa.d} </if> "+
        " <if test=\"#{pa.d1} != null \">and id limit #{pa.d1},#{pa.d2} </if> </script>")
List<CpMsgPayDetail> findByid1Andid3 (@Param("pa") Map<String, Object> pa);
https://www.cnblogs.com/DawnCHENXI/p/9221653.html
swagger
https://abelyang.blog.csdn.net/article/details/89296273