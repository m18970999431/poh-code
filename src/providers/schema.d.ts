/*===================CHANGELOG==================
    * 2017-08-18 0.6 刘雨飏
                为Schema新增name字段
                为Field新增required字段
                为Field新增show字段
    * 2017-08-11 初始化版本 0.5 刘雨飏
    * 2017-08-10 创建声明文件 刘雨飏
*/

interface Schemas{
    [schemaName:string]:Schema
}
interface Schema{
    className:string
    name:string
    displayedOperators:Array<string>
    displayedColumns:Array<string>
    detailPage?:string
    detailTitle?:string
    editPage?:string
    uniqueIndex?:{}
    typeName?:{
        [propName:string]:string
    }
    desc?:string
    apps?:Array<string>
    include?:Array<string> // 需要加载内容的关联对象列表
    order?:Object // 表单默认的数据加载排序方式
    fields:{
        [fieldName: string]: Field
    }
}

interface Field{
    type: string
    name: string
    desc?: string
    default?: any
    icon?: string
    color?: string
    col?: number // 编辑栏目占用列宽
    view?: string // 指定专用的查看与编辑组件
    options?: Array<any>
    className?: string
    targetClass?: string
    targetType?: string
    required?:boolean // 是否必填项
    disabled?:boolean // 是否允许编辑
    show?:boolean // 是否显示
}

interface ParseObject{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    className: string;
    [fieldName:string]: any;
}