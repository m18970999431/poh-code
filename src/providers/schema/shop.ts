let ShopSchemas: any = {}
// 对应人人商城 ims_ewei_shop_goods表，待检查完善
/*
ShopSchemas.ShopGoods = {
  "className": "ShopGoods",
  "desc": "货物，商铺售卖货物信息。",
  "apps": ['shop'],
  "fields": {
    "name": {
      "type": "String",
      "name": "名称"
    },
    "subtitle": {
      "type": "String",
      "name": "副标题"
    },
    "short": {
      "type": "String",
      "name": "短标题"
    },
    "index": {
      "type": "Number",
      "name": "排序"
    },
    "type": {
      "type": "Array",
      "name": "商品类型",
      "view": "anas-edit-radio",
      "options": ["实体商品", "虚拟商品", "虚拟物品(卡密)"]
    },
    "tag": {
      "type": "Array",
      "name": "标签",
      "view": "anas-edit-tag"
    },
    "cate": {
      "type": "Array",
      "name": "商品分类",
      "view": "anas-edit-tag"
    },
    "property": {
      "type": "Object",
      "name": "商品属性",
      "options": {
        "isrecommand": "推荐",
        "isnew": "新品",
        "ishot": "热卖",
        "issendfree": "包邮",
        "isnodiscount": "不参与会员折扣"
      }
    },
    "price": {
      "type": "Object",
      "name": "商品属性",
      "options": {
        "sellprice": "售价",
        "maxprice": "原价",
        "minprice": "进价"
      }
    },
    "images": {
      "type": "Object",
      "name": "商品图片",
      "view": "anas-uploader"
    },
    "thumb_first": {
      "type": "Boolean",
      "name": "详情显示首图"
    },
    "sales": {
      "type": "Number",
      "name": "已出售数"
    },
    "dispatchid": {
      "type": "Pointer",
      "targetClass": "ShopDispatch",
      "name": "运费设置"
    },
    "area": {
      "type": "String",
      "name": "所在地"
    },
    "cash": {
      "type": "Boolean",
      "name": "活动付款"
    },
    "invoice": {
      "type": "Boolean",
      "name": "发票"
    },
    "status": {
      "type": "Boolean",
      "name": "上架"
    },
    "refund": {
      "type": "Boolean",
      "name": "是否支持退换货"
    },
    "autoreceive": {
      "type": "Number",
      "name": "确认收货时间",
      "help": "0读取系统设置 -1为不自动收货"
    },
    "goodssn": {
      "type": "String",
      "name": "编码"
    },
    "productsn": {
      "type": "String",
      "name": "条码"
    },
    "weight": {
      "type": "Number",
      "name": "重量"
    },
    "total": {
      "type": "Number",
      "name": "库存数"
    },
    "totalcnf": {
      "type": "Number",
      "name": "库存",
      "view": "anas-edit-radio",
      "options": ["拍下减库存", "付款减库存", "永不减库存"]
    },
    "parameter": {
      "type": "String",
      "name": "参数",
      "subname": ["参数名称", "参数值"],
      "view": "textarea"
    },
    "details": {
      "type": "String",
      "name": "详情",
      "view": "textarea",
    },
    "singlemaxpurchase": {
      "type": "String",
      "name": "单次最多购买"
    },
    "singleminpurchase": {
      "type": "String",
      "name": "单次最少购买"
    },
    "maxpurchase": {
      "type": "String",
      "name": "最多购买"
    },
    "viplookacl": {
      "type": "String",
      "name": "会员等级浏览权限",
      "view": "anas-edit-radio",
      "options": ["等级一", "等级二", "等级三"]
    },
    "vippurchaseacl": {
      "type": "String",
      "name": "会员等级购买权限",
      "view": "anas-edit-radio",
      "options": ["等级一", "等级二", "等级三"]
    },
    "vipslookacl": {
      "type": "String",
      "name": "会员组浏览权限",
      "view": "anas-edit-radio",
      "options": ["等级一", "等级二", "等级三"]
    },
    "vipspurchaseacl": {
      "type": "String",
      "name": "会员组购买权限",
      "view": "anas-edit-radio",
      "options": ["等级一", "等级二", "等级三"]
    },
    "marketway": {
      "type": "String",
      "name": "促销方式",
    },
    "returnsett": {
      "type": "String",
      "name": "满返设置",
    },
    "Deductible": {
      "type": "String",
      "name": "抵扣设置",
    },
    "packetcondition": {
      "type": "String",
      "name": "包邮条件",
    },
    "vipdiscount": {
      "type": "String",
      "name": "会员折扣",
    },
    "vipprice": {
      "type": "String",
      "name": "会员价",
    },
    "ordernotice": {
      "type": "String",
      "name": "下单通知",
    },
    "offlineverificatio": {
      "type": "String",
      "name": "线下核销",
    },
    "storelogo": {
      "type": "Object",
      "name": "店铺LOGO",
      "view": "anas-uploader"
    },
    "storename": {
      "type": "String",
      "name": "店铺名称",
    },
    "storedescribe": {
      "type": "String",
      "name": "店铺描述",
    },
    "repeatpurchasediscount": {
      "type": "Number",
      "name": "重复购买折扣",
    },
    "iscontinueuse": {
      "type": "Boolean",
      "name": "是否持续使用",
    },
    "usecondition": {
      "type": "String",
      "name": "使用条件",
      "view": "anas-edit-radio",
      "options": ["条件一", "条件二", "条件三"]
    },
    "isusediscount": {
      "type": "Boolean",
      "name": "是否使用优惠",
    }
  }
}
*/
export {ShopSchemas}
