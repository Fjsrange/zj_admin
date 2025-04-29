<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import ListPage from "@/components/ListPage/ListPage.vue";
import { getCourseListApi } from "@/apis/api.ts";

// 按钮类型
type TopButtons = {
  label: string;
  type?: string;
  btnType?: string;
  icon?: string;
  style?: object;
  onClick?: (row?: any) => void;
};
// 查询参数类型
interface QueryParams {
  elementType: string;
  props: {
    title: string;
    label: string;
    value?: string | number;
    type: string;
    placeholder: string;
    min?: number;
    max?: number;
    clearable?: boolean;
    rangeSeparator?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
  };
  methods?: {
    change: (params: any) => void;
  };
}
// 分页参数类型
type Pagination = {
  currentPage: number;
  pageSize: number;
  total: number;
  pageSizes: number[];
  layout: string;
  size: string;
  background: boolean;
  disabled: boolean;
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
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
]);
const loading = ref(false);
const queryParams = ref<QueryParams[]>([
  {
    elementType: "el-input",
    props: {
      title: "姓名",
      label: "name",
      value: "",
      type: "text",
      placeholder: "请输入姓名",
    },
    methods: {
      change: (params: any) => {
        console.log("姓名", params);
      },
    },
  },
  {
    elementType: "el-date-picker",
    props: {
      title: "日期",
      label: "date",
      value: "",
      type: "daterange",
      placeholder: "请选择日期",
      rangeSeparator: "-",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
    methods: {
      change: (params: any) => {
        console.log("日期", params);
      },
    },
  },
  {
    elementType: "el-input",
    props: {
      title: "地址",
      label: "address",
      value: "",
      type: "text",
      placeholder: "请输入地址",
    },
    methods: {
      change: (params: any) => {
        console.log("地址", params);
      },
    },
  },
  {
    elementType: "el-input-number",
    props: {
      title: "年龄",
      label: "age",
      value: 0,
      type: "number",
      placeholder: "请输入年龄",
      min: 1,
    },
    methods: {
      change: (params: any) => {
        console.log("年龄", params);
      },
    },
  },
]);
const pagination = ref<Pagination>({
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
const formData = ref<Record<string, any>>({}); // 查询表单数据

const currentPage = ref(1);
const pageSize = ref(10);
const size = ref("default");
const disabled = ref(false);
const background = ref(true);

// 设置每页条数
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  pagination.value.pageSize = val;
};

// 选择页码
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  pagination.value.currentPage = val;
  initData();
};

// 接收子组件emit过来的query事件
const handleQuery = (params: any) => {
  console.log("接收子组件查询到的数据", params);
};
// 重置
const handleReset = () => {
  console.log("重置");
  formData.value = {};
  queryParams.value.forEach((config) => {
    formData.value[config.props.label] = config.props.value;
  });
};
// 初始化列表数据
const initData = () => {
  loading.value = true; // 模拟异步请求
  setTimeout(() => {
    pagination.value.total = tableData.value.length;
    loading.value = false;
  }, 1000);
};
const pagin = computed(() => {});

const getList = async () => {
  let data = {
    page: pagination.value.currentPage,
    limit: pagination.value.pageSize,
  };
  let res = await getCourseListApi(data);
  console.log("res", res);
};
onMounted(() => {
  getList();
  initData();
});
</script>

<template>
  <div class="" style="height: 100%">
    <el-container>
      <el-header style="height: auto">
        <!-- 查询区域 -->
        <el-form :inline="true" :model="formData" class="el-form--inline">
          <el-form-item
            :label="config.props.title + ':'"
            v-for="(config, index) in queryParams"
            :key="index"
          >
            <component
              :is="config.elementType"
              v-model="formData[config.props.label]"
              v-bind="config.props"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>

        <el-divider style="margin: 10px 0" />

        <!-- 操作区域 -->
        <div>
          <el-button
            v-for="btn in topButtons"
            :key="btn"
            v-bind="btn"
            :icon="btn.icon"
          >
            {{ btn.label }}
          </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          height="500"
        >
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column
            v-if="columns.length > 0"
            v-for="col in columns"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
          >
            <template #default="scope">
              {{ scope.row[col.prop] }}
            </template>
          </el-table-column>

          <el-table-column :label="'图片'" width="100">
            <template slot="imgSlot" slot-scope="text"> </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right"> </el-table-column>
        </el-table>
        <!-- <ListPage
      :tableData="tableData"
      :loading="loading"
      :queryParams="queryParams"
      :pagination="pagination"
      :columns="columns"
      :topButtons="topButtons"
      :columnButtons="columnButtons"
      @query="handleQuery"
    ></ListPage> -->
      </el-main>
      <el-footer>
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="pagination.pageSizes"
            :size="pagination.size"
            :disabled="pagination.disabled"
            :background="pagination.background"
            :layout="pagination.layout"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped lang="scss"></style>
