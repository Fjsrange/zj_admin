<script setup lang="ts">
import { ref, reactive, onMounted, toRefs, watch, watchEffect } from "vue";

// 查询参数类型
interface QueryProps {
  title: string;
  label: string;
  value?: string | number | boolean | Array<string | number | boolean>;
  type: string;
  placeholder: string;
  min?: number;
  max?: number;
  clearable?: boolean;
  rangeSeparator?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}
interface QueryMethods {
  change?: (params: any) => void;
}
interface QueryParams {
  elementType: string;
  props: QueryProps;
  methods?: QueryMethods;
}

interface Column {
  prop: string;
  label: string;
}

// 定义 Button 接口
interface Button {
  label: string; // 按钮名称
  type?: string; // 按钮类型 info | warning | ...
  btnType?: string; // 按钮类型 el-button
  icon?: string; // 按钮图标
  size?: string; // 按钮尺寸
  disabled?: boolean; // 按钮是否禁用
  link?: string; // 文字按钮(旧版)
  text?: string; // 文字按钮(新版)
  style?: object; // 按钮样式
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

/* const queryParams = ref({}); // 查询参数
const loading = ref(false); // 加载状态
const tableData = ref([{ name: "张三", age: 18, address: "北京市" }]); // 表格数据
const pagination = reactive({
  currentPage: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  total: 0, // 总条数
  pageSizes: [10, 20, 50, 100], // 每页显示条数的选项
  layout: "total, sizes, prev, pager, next, jumper",
  size: "default", // 分页组件的尺寸
  background: true, // 是否显示背景色
  disabled: false, // 是否禁用
}); // 分页信息 */

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  queryParams: {
    type: Array as () => QueryParams[],
    default: () => [],
  },
  pagination: {
    type: Object as () => Pagination,
    default: () => ({}),
  },
  columns: {
    type: Array as () => Column[], // 类型断言，指定columns的类型为Column[]
    default: () => [],
  },
  topButtons: {
    type: Array as () => Button[],
    default: () => [],
  },
  columnButtons: {
    type: Array as () => Button[],
    default: () => [],
  },
});

const {
  tableData,
  loading,
  queryParams,
  pagination,
  columns,
  topButtons,
  columnButtons,
} = toRefs(props);
const formData = ref<Record<string, any>>({}); // 查询表单数据
let isInitialized = ref<boolean>(false);

const value = ref("");
const cities = [
  {
    value: "Beijing",
    label: "Beijing",
  },
  {
    value: "Shanghai",
    label: "Shanghai",
  },
  {
    value: "Nanjing",
    label: "Nanjing",
  },
  {
    value: "Chengdu",
    label: "Chengdu",
  },
  {
    value: "Shenzhen",
    label: "Shenzhen",
  },
  {
    value: "Guangzhou",
    label: "Guangzhou",
  },
];

const emit = defineEmits(["query"]);

// 每页显示条数
const handleSizeChange = (val: number) => {
  console.log(`每页${val} 条数据`);
  pagination.value.pageSize = val;
};

// 当前页
const handleCurrentChange = (val: number) => {
  console.log(`当前页码: ${val}`);
  pagination!.currentPage = val;
};
// 查询
const handleQuery = () => {
  console.log("查询", formData.value);
  // 将查询参数传递给父组件
  emit("query", {
    formData: formData.value,
    pagination: pagination.value,
  });
};

// 重置
const handleReset = () => {
  console.log("重置");
  formData.value = {};
  queryParams.value.forEach((config) => {
    formData.value[config.props.label] = config.props.value;
  });
};
// 监听queryParams变化，更新formData
// watch(
//   () => props.queryParams,
//   (newQueryParams) => {
//     console.log("newQueryParams", newQueryParams);
//     newQueryParams.forEach((config) => {
//       formData.value[config.props.label] = config.props.value || "";
//     });
//   },
//   { deep: true }
// );
// onMounted(() => {
//   console.log("onMounted");
//   // 初始化formData
//   props.queryParams.forEach((config) => {
//     formData.value[config.props.label] = config.props.value || "";
//   });
// });

// watchEffect(() => {
//   props.queryParams.forEach((config) => {
//     console.log("config", config);
//     if (config.elementType === "el-input-number") {
//       formData.value[config.props.label] = config.props.value || null; // 初始化数字类型为0
//     } else {
//       formData.value[config.props.label] = config.props.value || "";
//     }
//   });
// });
const initFormData = () => {
  props.queryParams.forEach((config) => {
    if (config.elementType === "el-input-number") {
      formData.value[config.props.label] = config.props.value || null; // 初始化数字类型为0
    } else {
      formData.value[config.props.label] = config.props.value || "";
    }
  });
};
onMounted(() => {
  initFormData();
});

// // 监听queryParams的变化，并更新formData
watch(
  () => formData.value,
  (newQueryParams) => {
    if (!isInitialized.value) {
      isInitialized.value = true;
      return;
    }
    console.log("newQueryParams", newQueryParams);
    initFormData();
  },
  { deep: true }
);
</script>

<template>
  <div>
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

      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="primary" @click="handleReset">重置</el-button>
    </el-form>

    <!-- 操作区域 -->
    <div style="margin: 20px 0">
      <el-button
        v-for="btn in topButtons"
        :key="btn"
        v-bind="btn"
        :icon="btn.icon"
      >
        {{ btn.label }}
      </el-button>
    </div>

    <!-- 表格区域 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      height="500"
      style="width: 100%; height: 100%"
    >
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

      <!-- <el-table-column :label="'图片'" width="100">
        <template #default="scope">
          <img :src="scope.row.img" style="width: 40px; height: 40px" alt="" />
        </template>
      </el-table-column> -->

      <!-- 插槽 -->
      <el-table-column>
        <template slot="imgSlot" slot-scope="text"> </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right">
        <component
          v-for="btn in columnButtons"
          :key="btn.label"
          :is="btn.btnType"
          v-bind="btn"
          :style="btn.style"
          v-show="btn.label !== '删除'"
        >
          <div v-if="btn.label !== '删除'">{{ btn.label }}</div>
        </component>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 40px;
        left: 43%;
        margin-top: 20px;
      "
    >
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes"
        :size="pagination.size"
        :disabled="pagination.disabled"
        :background="pagination.background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-form--inline {
  display: flex;
}
</style>
