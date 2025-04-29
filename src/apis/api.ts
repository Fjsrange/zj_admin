// 接口
import request from '@/request/index';


/**
 * 登录
 */
// 第一种
export const LoginApi = (username: string, password: string) => {
  return request.post('admin/user/login', {username, password});
};

/**
 * 获取课程信息
 */
export const getCourseListApi = (data: object) => {
  return request('admin/course/listPage', data);
};
// export default {
//   getCourseListApi: {
//     url: 'admin/course/listPage',
//     method: 'get',
//     data: {
//       page: 10,
//       limit: 10
//     }
//   }
// }

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
