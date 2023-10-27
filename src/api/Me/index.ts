import Request from "@/utils/request";

//获取用户信息权限接口
export const getUserInfoAPI = (data: any) => {
  return Request<Record<string, any>>("/getQx", "post", data);
};
