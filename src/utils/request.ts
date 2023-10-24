import { API_ADDRESS } from "@/config/api";

export default function Request<T>(
  url: string,
  method: any = "get",
  data: any,
): Promise<T> {
  // 返回promise
  return new Promise((resolve) => {
    // 请求
    uni.request({
      url: API_ADDRESS + url,
      data,
      method: method.toLowerCase(),
      header: {
        "Content-Type": "application/json",
        Authorization: uni.getStorageSync("appToken") || "",
      },
      success: (res: any) => {
        // 判断 请求api 格式是否正确
        if (res.statusCode !== 200 || res?.data.code !== 200) {
          uni.showToast({
            title: res.data.message || "服务器维护中",
            icon: "none",
            duration: 3000,
            success: () => {
              if (res.data.code === 403 || res.data.code === 401) {
                setTimeout(() => {
                  uni.reLaunch({
                    url: "/pages/Login",
                    success: () => {},
                  });
                }, 2000);
              }
            },
          });
          return;
        }
        // 将结果抛出
        resolve(res.data);
      },
      // 请求失败
      fail: () => {
        uni.showToast({
          title: "当前无网络",
          icon: "none",
          success: () => {},
        });
      },
    });
  });
}

export function RequestFile(url: string) {
  return new Promise((resolve) => {
    uni.downloadFile({
      url: API_ADDRESS + url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Access-Token": uni.getStorageSync("appToken"),
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          uni.showToast({
            title: "下载失败",
            icon: "none",
            success: () => {},
          });
        }
      },
      fail: () => {
        uni.showToast({
          title: "文件异常",
          icon: "none",
          success: () => {},
        });
      },
    });
  });
}
