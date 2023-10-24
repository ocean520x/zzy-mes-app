import Request from "@/utils/request";

//登陆的接口
export const loginAPI = (data: any) => {
  return Request<Record<string, any>>("/authenticate", "post", data);
};
