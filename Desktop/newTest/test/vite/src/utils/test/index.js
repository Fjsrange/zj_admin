import { ref, watch } from "vue";

export const root = ref([]);

watch(
  () => root.value,
  (newVal) => {
    console.log("newVal", newVal);
  },
  { deep: true, immediate: true }
);

/**
 * 异步函数，处理文件系统目录句柄
 */
async function processHandle(handle) {
  // 添加判断，终止递归，返回文件
  if (handle.kind === "file") {
    return handle;
  }

  handle.expanded = false; // 设置文件夹是否展开
  handle.children = []; // 设置文件夹的子文件
  const iter = await handle.entries(); // 获取文件夹中所有内容

  for await (const info of iter) {
    const subHandle = await processHandle(info[1]); // 返回的是一个数组，返回的内容格式如上所述。通过递归的思想一直获取文件夹内的内容
    handle.children.push(subHandle);
  }

  return handle;
}

/*
 * 导出一个异步函数，用于显示目录选择器
 */
export const showDirectoryPickerFn = async () => {
  try {
    // @ts-ignore
    const handle = await showDirectoryPicker();
    const data = await processHandle(handle); // 将获取到的句柄传递给processHandle函数，处理句柄
    root.value = data.children;
  } catch (err) {
    console.log("err", err);
  }
};

export const changeExpanded = (handle) => {
  console.log("handle", handle);
  console.log("root.value", root.value);
  for (let i = 0; i < root.value.length; i++) {
    if (root.value[i].name === handle.name) {
      root.value[i].expanded = !root.value[i].expanded;
      break;
    }
  }
  console.log("root.value", root.value);
};

export default {
  root,
  showDirectoryPickerFn,
  changeExpanded,
};
