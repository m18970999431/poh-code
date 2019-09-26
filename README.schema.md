# 特殊数据类型字段设计
## date-from-to
- 如报名时间：2019年4月开始，2019年5月截止
- 字段名称：signFromTo
- 字段属性：Object
``` js
{
    "from":"2019-05-29T03:44:18.940Z",
    "to":"2019-06-29T03:44:18.940Z"
}
```
- 查询场景（查询2019年5月后开始报名的课程）
``` js
let query = new Parse.Query("Xiaofang_class")
query.greaterThan("signFromTo.from", "2019-05-00T03:44:18.940Z");
query.find().then(data=>{
    console.log("GreaterThan")
    console.log(data)
})
```