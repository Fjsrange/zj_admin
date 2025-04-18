import { ElMessage } from 'element-plus';

/**
 * 消息提示
 * @param message 消息内容
 * @param type 消息类型
 */
export const showMessage = (type: 'success' | 'warning' | 'info' | 'error' = 'info',message: string ) => {
  ElMessage({
    message,
    type,
    duration: 2000,
    showClose: true,
  });
};