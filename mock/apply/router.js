var Router = require("express").Router;

var router = new Router();

router.get("/rise/business/load/questions", (req, res) => {
  setTimeout(() => {
  res.status(200).json({"msg":[{"series":1,"questions":[{"id":1,"sequence":1,"series":1,"question":"1. 请选择你目前从事的行业：","tips":null,"placeholder":null,"type":1,"request":true,"preChoiceId":null,"choices":[{"id":1,"subject":"互联网/电子商务","questionId":1,"sequence":1,"defaultSelected":false,"del":false},{"id":2,"subject":"IT/软硬件服务","questionId":1,"sequence":2,"defaultSelected":false,"del":false},{"id":3,"subject":"医疗健康","questionId":1,"sequence":3,"defaultSelected":false,"del":false},{"id":4,"subject":"快速消费品(食品/饮料/化妆品)","questionId":1,"sequence":4,"defaultSelected":false,"del":false},{"id":5,"subject":"耐用消费品(服饰家居/工艺玩具)","questionId":1,"sequence":5,"defaultSelected":false,"del":false},{"id":6,"subject":"贸易零售","questionId":1,"sequence":6,"defaultSelected":false,"del":false},{"id":7,"subject":"汽车及零配件制造","questionId":1,"sequence":7,"defaultSelected":false,"del":false},{"id":8,"subject":"工业设备制造","questionId":1,"sequence":8,"defaultSelected":false,"del":false},{"id":9,"subject":"通信电子","questionId":1,"sequence":9,"defaultSelected":false,"del":false},{"id":10,"subject":"物流交通","questionId":1,"sequence":10,"defaultSelected":false,"del":false},{"id":11,"subject":"能源化工","questionId":1,"sequence":11,"defaultSelected":false,"del":false},{"id":12,"subject":"金融行业","questionId":1,"sequence":12,"defaultSelected":false,"del":false},{"id":13,"subject":"管理咨询","questionId":1,"sequence":13,"defaultSelected":false,"del":false},{"id":14,"subject":"法律","questionId":1,"sequence":14,"defaultSelected":false,"del":false},{"id":15,"subject":"教育培训","questionId":1,"sequence":15,"defaultSelected":false,"del":false},{"id":16,"subject":"餐饮娱乐","questionId":1,"sequence":16,"defaultSelected":false,"del":false},{"id":17,"subject":"建筑地产","questionId":1,"sequence":17,"defaultSelected":false,"del":false},{"id":18,"subject":"中介/猎头/认证服务","questionId":1,"sequence":18,"defaultSelected":false,"del":false},{"id":19,"subject":"其他行业","questionId":1,"sequence":19,"defaultSelected":false,"del":false}],"del":false},{"id":2,"sequence":2,"series":1,"question":"2. 请选择你目前从事的职业：","tips":null,"placeholder":null,"type":1,"request":true,"preChoiceId":null,"choices":[{"id":20,"subject":"互联网运营","questionId":2,"sequence":1,"defaultSelected":false,"del":false},{"id":21,"subject":"互联网产品","questionId":2,"sequence":2,"defaultSelected":false,"del":false},{"id":22,"subject":"研发/技术人员","questionId":2,"sequence":3,"defaultSelected":false,"del":false},{"id":23,"subject":"销售","questionId":2,"sequence":4,"defaultSelected":false,"del":false},{"id":24,"subject":"市场/公关","questionId":2,"sequence":5,"defaultSelected":false,"del":false},{"id":25,"subject":"客户服务","questionId":2,"sequence":6,"defaultSelected":false,"del":false},{"id":26,"subject":"人力资源","questionId":2,"sequence":7,"defaultSelected":false,"del":false},{"id":27,"subject":"财务审计","questionId":2,"sequence":8,"defaultSelected":false,"del":false},{"id":28,"subject":"行政后勤","questionId":2,"sequence":9,"defaultSelected":false,"del":false},{"id":29,"subject":"生产运营","questionId":2,"sequence":10,"defaultSelected":false,"del":false},{"id":30,"subject":"咨询顾问","questionId":2,"sequence":11,"defaultSelected":false,"del":false},{"id":31,"subject":"律师","questionId":2,"sequence":12,"defaultSelected":false,"del":false},{"id":32,"subject":"教师","questionId":2,"sequence":13,"defaultSelected":false,"del":false},{"id":33,"subject":"全日制学生","questionId":2,"sequence":14,"defaultSelected":false,"del":false},{"id":34,"subject":"专业人士(如记者、摄影师、医生等)","questionId":2,"sequence":15,"defaultSelected":false,"del":false},{"id":35,"subject":"其他职业","questionId":2,"sequence":16,"defaultSelected":false,"del":false}],"del":false}]},{"series":2,"questions":[{"id":4,"sequence":3,"series":2,"question":"3. 是否有工作经验？","tips":null,"placeholder":null,"type":2,"request":true,"preChoiceId":null,"choices":[{"id":42,"subject":"是","questionId":4,"sequence":1,"defaultSelected":false,"del":false},{"id":43,"subject":"否","questionId":4,"sequence":2,"defaultSelected":false,"del":false}],"del":false},{"id":3,"sequence":4,"series":2,"question":"3.1 请选择你的职位层级：","tips":null,"placeholder":null,"type":1,"request":true,"preChoiceId":42,"choices":[{"id":36,"subject":"普通员工","questionId":3,"sequence":1,"defaultSelected":false,"del":false},{"id":37,"subject":"承担管理权限的资深员工","questionId":3,"sequence":2,"defaultSelected":false,"del":false},{"id":38,"subject":"一线主管","questionId":3,"sequence":3,"defaultSelected":false,"del":false},{"id":39,"subject":"部门负责人","questionId":3,"sequence":4,"defaultSelected":false,"del":false},{"id":40,"subject":"公司高管","questionId":3,"sequence":5,"defaultSelected":false,"del":false},{"id":41,"subject":"CEO/公司创始人/董事","questionId":3,"sequence":6,"defaultSelected":false,"del":false}],"del":false},{"id":5,"sequence":5,"series":2,"question":"3.2 请填写你的首次工作年份：","tips":null,"placeholder":null,"type":1,"request":true,"preChoiceId":42,"choices":[{"id":44,"subject":"1960","questionId":5,"sequence":1,"defaultSelected":false,"del":false},{"id":45,"subject":"1961","questionId":5,"sequence":2,"defaultSelected":false,"del":false},{"id":46,"subject":"1962","questionId":5,"sequence":3,"defaultSelected":false,"del":false},{"id":47,"subject":"1963","questionId":5,"sequence":4,"defaultSelected":false,"del":false},{"id":48,"subject":"1964","questionId":5,"sequence":5,"defaultSelected":false,"del":false},{"id":49,"subject":"1965","questionId":5,"sequence":6,"defaultSelected":false,"del":false},{"id":50,"subject":"1966","questionId":5,"sequence":7,"defaultSelected":false,"del":false},{"id":51,"subject":"1967","questionId":5,"sequence":8,"defaultSelected":false,"del":false},{"id":52,"subject":"1968","questionId":5,"sequence":9,"defaultSelected":false,"del":false},{"id":53,"subject":"1969","questionId":5,"sequence":10,"defaultSelected":false,"del":false},{"id":54,"subject":"1970","questionId":5,"sequence":11,"defaultSelected":false,"del":false},{"id":55,"subject":"1971","questionId":5,"sequence":12,"defaultSelected":false,"del":false},{"id":56,"subject":"1972","questionId":5,"sequence":13,"defaultSelected":false,"del":false},{"id":57,"subject":"1973","questionId":5,"sequence":14,"defaultSelected":false,"del":false},{"id":58,"subject":"1974","questionId":5,"sequence":15,"defaultSelected":false,"del":false},{"id":59,"subject":"1975","questionId":5,"sequence":16,"defaultSelected":false,"del":false},{"id":60,"subject":"1976","questionId":5,"sequence":17,"defaultSelected":false,"del":false},{"id":61,"subject":"1977","questionId":5,"sequence":18,"defaultSelected":false,"del":false},{"id":62,"subject":"1978","questionId":5,"sequence":19,"defaultSelected":false,"del":false},{"id":63,"subject":"1979","questionId":5,"sequence":20,"defaultSelected":false,"del":false},{"id":64,"subject":"1980","questionId":5,"sequence":21,"defaultSelected":false,"del":false},{"id":65,"subject":"1981","questionId":5,"sequence":22,"defaultSelected":false,"del":false},{"id":66,"subject":"1982","questionId":5,"sequence":23,"defaultSelected":false,"del":false},{"id":67,"subject":"1983","questionId":5,"sequence":24,"defaultSelected":false,"del":false},{"id":68,"subject":"1984","questionId":5,"sequence":25,"defaultSelected":false,"del":false},{"id":69,"subject":"1985","questionId":5,"sequence":26,"defaultSelected":false,"del":false},{"id":70,"subject":"1986","questionId":5,"sequence":27,"defaultSelected":false,"del":false},{"id":71,"subject":"1987","questionId":5,"sequence":28,"defaultSelected":false,"del":false},{"id":72,"subject":"1988","questionId":5,"sequence":29,"defaultSelected":false,"del":false},{"id":73,"subject":"1989","questionId":5,"sequence":30,"defaultSelected":false,"del":false},{"id":74,"subject":"1990","questionId":5,"sequence":31,"defaultSelected":false,"del":false},{"id":75,"subject":"1991","questionId":5,"sequence":32,"defaultSelected":false,"del":false},{"id":76,"subject":"1992","questionId":5,"sequence":33,"defaultSelected":false,"del":false},{"id":77,"subject":"1993","questionId":5,"sequence":34,"defaultSelected":false,"del":false},{"id":78,"subject":"1994","questionId":5,"sequence":35,"defaultSelected":false,"del":false},{"id":79,"subject":"1995","questionId":5,"sequence":36,"defaultSelected":false,"del":false},{"id":80,"subject":"1996","questionId":5,"sequence":37,"defaultSelected":false,"del":false},{"id":81,"subject":"1997","questionId":5,"sequence":38,"defaultSelected":false,"del":false},{"id":82,"subject":"1998","questionId":5,"sequence":39,"defaultSelected":false,"del":false},{"id":83,"subject":"1999","questionId":5,"sequence":40,"defaultSelected":false,"del":false},{"id":84,"subject":"2000","questionId":5,"sequence":41,"defaultSelected":true,"del":false},{"id":85,"subject":"2001","questionId":5,"sequence":42,"defaultSelected":false,"del":false},{"id":86,"subject":"2002","questionId":5,"sequence":43,"defaultSelected":false,"del":false},{"id":87,"subject":"2003","questionId":5,"sequence":44,"defaultSelected":false,"del":false},{"id":88,"subject":"2004","questionId":5,"sequence":45,"defaultSelected":false,"del":false},{"id":89,"subject":"2005","questionId":5,"sequence":46,"defaultSelected":false,"del":false},{"id":90,"subject":"2006","questionId":5,"sequence":47,"defaultSelected":false,"del":false},{"id":91,"subject":"2007","questionId":5,"sequence":48,"defaultSelected":false,"del":false},{"id":92,"subject":"2008","questionId":5,"sequence":49,"defaultSelected":false,"del":false},{"id":93,"subject":"2009","questionId":5,"sequence":50,"defaultSelected":false,"del":false},{"id":94,"subject":"2010","questionId":5,"sequence":51,"defaultSelected":false,"del":false},{"id":95,"subject":"2011","questionId":5,"sequence":52,"defaultSelected":false,"del":false},{"id":96,"subject":"2012","questionId":5,"sequence":53,"defaultSelected":false,"del":false},{"id":97,"subject":"2013","questionId":5,"sequence":54,"defaultSelected":false,"del":false},{"id":98,"subject":"2014","questionId":5,"sequence":55,"defaultSelected":false,"del":false},{"id":99,"subject":"2015","questionId":5,"sequence":56,"defaultSelected":false,"del":false},{"id":100,"subject":"2016","questionId":5,"sequence":57,"defaultSelected":false,"del":false},{"id":101,"subject":"2017","questionId":5,"sequence":58,"defaultSelected":false,"del":false}],"del":false}]},{"series":3,"questions":[{"id":6,"sequence":6,"series":3,"question":"4. 请选择你的最高学历：","tips":null,"placeholder":null,"type":1,"request":true,"preChoiceId":null,"choices":[{"id":102,"subject":"专科及以下","questionId":6,"sequence":1,"defaultSelected":false,"del":false},{"id":103,"subject":"本科","questionId":6,"sequence":2,"defaultSelected":false,"del":false},{"id":104,"subject":"硕士","questionId":6,"sequence":3,"defaultSelected":false,"del":false},{"id":105,"subject":"博士及以上","questionId":6,"sequence":4,"defaultSelected":false,"del":false}],"del":false},{"id":7,"sequence":7,"series":3,"question":"5. 请填写你所毕业的最高学历院校名称：","tips":null,"placeholder":null,"type":3,"request":true,"preChoiceId":null,"choices":null,"del":false}]},{"series":4,"questions":[{"id":8,"sequence":8,"series":4,"question":"6 请选择你所在的城市：","tips":"说明：方便我们邀请您加入校友会和当地活动","placeholder":null,"type":5,"request":true,"preChoiceId":null,"choices":null,"del":false}]},{"series":5,"questions":[{"id":15,"sequence":10,"series":5,"question":"7. 你目前在国内吗？","tips":null,"placeholder":null,"type":2,"request":true,"preChoiceId":null,"choices":[{"id":113,"subject":"是","questionId":15,"sequence":1,"defaultSelected":true,"del":false},{"id":114,"subject":"否","questionId":15,"sequence":2,"defaultSelected":false,"del":false}],"del":false},{"id":12,"sequence":11,"series":5,"question":"7.1 请输入你的手机号码：","tips":"说明：仅用于电话面试，不会泄露给第三方或用于其他商业用途","placeholder":"请填写手机号码","type":6,"request":true,"preChoiceId":113,"choices":null,"del":false},{"id":16,"sequence":11,"series":5,"question":"7.2 请输入你的微信号：","tips":"说明：请填写你的微信号（在\"微信\"-\"我\"中可查询），用于微信语音面试，该信息不会泄露给第三方或用于其他商业用途","placeholder":"请填写微信号","type":3,"request":true,"preChoiceId":114,"choices":null,"del":false},{"id":14,"sequence":12,"series":5,"question":"8. 请选择你方便的时间段，以便进行远程面试：","tips":"提示：海外用户请选择对应的北京时间","placeholder":null,"type":1,"request":true,"preChoiceId":null,"choices":[{"id":108,"subject":"09:00 - 12:00","questionId":14,"sequence":1,"defaultSelected":false,"del":false},{"id":109,"subject":"12:00 - 15:00","questionId":14,"sequence":2,"defaultSelected":false,"del":false},{"id":110,"subject":"15:00 - 18:00","questionId":14,"sequence":3,"defaultSelected":false,"del":false},{"id":111,"subject":"18:00 - 21:00","questionId":14,"sequence":4,"defaultSelected":false,"del":false},{"id":112,"subject":"21:00 - 23:00","questionId":14,"sequence":5,"defaultSelected":false,"del":false}],"del":false}]},{"series":6,"questions":[{"id":17,"sequence":13,"series":6,"question":"https://www.baidu.com","tips":null,"placeholder":null,"type":7,"request":false,"preChoiceId":null,"choices":null,"del":false}]}],"code":200})
}, Math.random() * 1500);
});

router.post("/rise/business/submit/apply", (req, res) => {
  setTimeout(() =>{
  res.status(200).json(
    {"msg":"ok","code":200}
  )}, Math.random() * 1500);
});

router.get("/rise/business/check/submit/apply", (req, res) => {
  setTimeout(() =>{
  res.status(200).json(
    {"msg":"ok","code":200}
  )}, Math.random() * 1500);
});

module.exports = router;