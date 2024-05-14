/**
 * 检查对象的值是否为合法值（非 null、''、undefined 或 NaN）
 * @param {Object} value 检查的值
 * @returns {boolean} 是否为正常参数
 */
export const isValidValue=(val) =>{
  if(val === 'null' || val === null || val === 'undefined' || val === undefined || val === ''||val.trim() === ''){
    return false;
  }
  // 其他情况都认为是有效值
  return true;
}

/**
 * 检查对象的所有值是否为合法值（非 null、''、undefined 或 NaN）
 * @param {Object} obj 要检查的对象
 * @returns {boolean} 如果所有值都合法，则返回true；否则返回false
 */
export const checkObjectValue=(obj)=>{
  for (const key in obj) {
    if (!isValidValue(obj[key])) {
      return false;
    }
  }
  return true;
}

export const validatenull=(val)=> {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
    return false
  }
  return false
}