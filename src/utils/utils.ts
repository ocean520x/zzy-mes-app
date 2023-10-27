/**
 * 提示方法
 * @param {String} title 提示文字
 * @param {String}  icon icon图片
 * @param {Number}  duration 提示时间
 */
export function toast(
  title: string,
  icon: any = "none",
  duration: number = 1500,
) {
  if (title) {
    (uni.showToast as (options: any) => void)({
      title,
      icon,
      duration,
    });
  }
}

/**
 * 设置缓存
 * @param {String} key 键名
 * @param {String} data 值
 */
export function setStorageSync(key: string, data: any) {
  uni.setStorageSync(key, data);
}

/**
 * 获取缓存
 * @param {String} key 键名
 */
export function getStorageSync(key: string) {
  return uni.getStorageSync(key);
}

/**
 * 删除缓存
 * @param {String} key 键名
 */
export function removeStorageSync(key: string) {
  return uni.removeStorageSync(key);
}

/**
 * 清空缓存
 * @param {String} key 键名
 */
export function clearStorageSync() {
  return uni.clearStorageSync();
}

/**
 * 页面跳转
 * @param {'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack' | number } url  转跳路径
 *  navigateTo: 用于跳转到应用内的新页面，保留当前页面。新页面将被加入到页面栈中，可以通过返回按钮回到上一个页面。
 *  redirectTo: 用于关闭当前页面并跳转到应用内的新页面。新页面将替换当前页面，当前页面将被销毁。
 *  reLaunch: 关闭所有页面并跳转到应用内的新页面。新页面将成为应用的首页。
 *  switchTab: 用于跳转到应用内的 TabBar 页面（底部导航栏页面）。新页面必须是 TabBar 页面之一。
 *  navigateBack: 返回上一个页面。可以通过指定 delta 参数返回多级页面。
 * @param deltaNum 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
 * @param {String} params 跳转时携带的参数
 * @param {String} type 转跳方式
 **/
export function useRouter(
  url: string,
  type:
    | "navigateTo"
    | "redirectTo"
    | "navigateBack"
    | "reLaunch"
    | "switchTab" = "navigateTo",
  deltaNum: number = 1,
  params: any = {},
) {
  try {
    if (Object.keys(params).length)
      url = `${url}?data=${JSON.stringify(params)}`;
    if (type === "navigateBack") {
      (uni[type] as (options: { delta: number }) => void)({
        delta: deltaNum,
      });
    } else {
      (uni[type] as (options: { url: string }) => void)({
        url,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 深拷贝
 * @param {Object} data
 **/
export const clone = (data: any) => JSON.parse(JSON.stringify(data));

/**
 * 等待时长
 * @param {Object} ms 等待的时间毫秒数
 **/
export const waitingTime = (ms: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
