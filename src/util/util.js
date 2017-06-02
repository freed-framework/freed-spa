/**
 * @file util.js
 * 
 * @author shijh
 * 公共工具
 */


/**
 * 拼接查询字符串
 * 
 * @param {Object} obj 查询数据对象
 * @return {string} 拼接后的字符串
 */
export const parseQuerystring = (obj) => {
    let result = '';
    if (obj) {
        let tmp = [];
        for (var key in obj) {
            //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
            if (obj.hasOwnProperty(key) === true) {
                let value = obj[key];
                if (value instanceof Array && value.length) {
                    value.forEach((v) => {
                        tmp.push(`${key}=${encodeURIComponent(v)}`);
                    })
                } else {
                    tmp.push(`${key}=${encodeURIComponent(value)}`);
                }
            }
        }
        result = tmp.join('&');
    }

    return result;
}
