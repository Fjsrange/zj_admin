<script setup lang="ts">
import { ref } from "vue";
import ListPage from "@/components/ListPage/ListPage.vue";

type TopButtons = {
  label: string;
  type?: string;
  btnType?: string;
  icon?: string;
  style?: object;
  onClick?: (row?: any) => void;
};

const tableData = ref([
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
]);
const loading = ref(false);
const queryParams = ref({
  name: "",
});
const pagination = ref({
  currentPage: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  total: 0, // 总条数
  pageSizes: [10, 20, 50, 100], // 每页显示条数的选项
  layout: "total, sizes, prev, pager, next, jumper",
  size: "default", // 分页组件的尺寸
  background: true, // 是否显示背景色
  disabled: false, // 是否禁用
});
const columns = ref([
  {
    prop: "date",
    label: "日期",
  },
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "address",
    label: "地址",
  },
]);
const topButtons = ref<TopButtons[]>([
  {
    label: "新增",
    type: "primary",
    icon: "Plus",
    onClick: (row: any) => {
      console.log("新增", row);
    },
  },
  {
    label: "删除",
    type: "danger",
    icon: "Delete",
    onClick: (row: any) => {
      console.log("删除", row);
    },
  },
]); // 顶部按钮区域
const columnButtons = ref<TopButtons[]>([
  {
    label: "详情",
    type: "info",
    btnType: "el-button",
    icon: "Edit",
    onClick: (row: any) => {
      console.log("编辑", row);
    },
  },
  {
    label: "编辑",
    type: "primary",
    btnType: "el-button",
    icon: "Edit",
    onClick: (row: any) => {
      console.log("编辑", row);
    },
  },
  {
    label: "删除",
    type: "danger",
    btnType: "el-button",
    icon: "Delete",
    onClick: (row: any) => {
      console.log("删除", row);
    },
  },
]); // 列表操作按钮区域

const currentPage = ref(1);
const pageSize = ref(10);
const size = ref("default");
const disabled = ref(false);
const background = ref(true);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<template>
  <div class="">
    <!-- 课程
    <div style="display: flex; justify-content: center; align-items: center">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 100]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
    <ListPage
      :tableData="tableData"
      :loading="loading"
      :queryParams="queryParams"
      :pagination="pagination"
      :columns="columns"
      :topButtons="topButtons"
      :columnButtons="columnButtons"
    ></ListPage>
  </div>

  <!-- <div style="display: flex; justify-content: center; align-items: center">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 100]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div> -->
</template>

<style scoped lang="scss"></style>
