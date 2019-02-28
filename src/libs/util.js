import Cookies from 'js-cookie'

// set token
export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
}
// get token
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}
// 时间格式化
export const formateDate = (datetime,type) =>{
    var year = datetime.getFullYear(),
        month = ("0" + Number(datetime.getMonth() + 1)).slice(-2),
        date = ("0" + datetime.getDate()).slice(-2),
        hour = ("0" + datetime.getHours()).slice(-2),
        minute = ("0" + datetime.getMinutes()).slice(-2),
        second = ("0" + datetime.getSeconds()).slice(-2);
    if(type === "Y-M-D h:min:s"){
        var result = year + "-"+ month +"-"+ date +" "+ hour +":"+ minute +":" + second;
    }else if(type === "Y-M-D"){
        var result = year + "-"+ month +"-"+ date;
    }if(type === "h:min:s"){
        var result = hour +":"+ minute +":" + second;
    }
    return result;
}
// 从URL中解析参数
export const getParams = (url) =>{
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj;
}
// js判断数据类型
export const getType = (obj) => {
    var type = typeof obj;
    if (type !== 'object') {
      return type;
    }
    return Object.prototype.toString.call(obj).replace(/^[object (S+)]$/, '$1');
}
// 正则
export const pattphone = /^1[34578]\d{9}$/;
export const pattemail = /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/;    
export const pattcard = /^((d{18})|([0-9x]{18})|([0-9X]{18}))$/;    
export const pattuser = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/; 
export const pattmoney = /^d+(.d+)?$/;



