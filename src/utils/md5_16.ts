import md5 from "js-md5";
const md5_16 = function (st: any) {
  let str = md5(st);
  //去掉前后8位就是16位小写了
  str = str.slice(8); //去掉前8位，
  str = str.substring(0, str.length - 8); //去掉后8位
  return str;
};
export default md5_16;
