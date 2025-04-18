// 接口
import request from '@/request/index';


/**
 * 登录
 */
// 第一种
export const LoginApi = (username: string, password: string) => {
  return request.post('admin/user/login', {username, password});
};

// 第二种
// type LoginApi = {
//   url: string;
//   method: string;
//   file?: string;
//   // data?: Login;
//   data?: object;
// }

// export const loginApi: LoginApi = {
//   url: 'admin/user/login',
//   method: 'post',
//   file: '',
//   data: {}
// }

// export default {
//   login: {
//     url: 'admin/user/login',
//     method: 'post',
//     data: {
//       username: 'admin',
//       password: '123456'
//     }
//   }
// }
