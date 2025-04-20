<script setup lang="ts">
import { ref, reactive, onMounted, toRefs } from "vue";

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

// const queryParams = ref({}); // 查询参数
// const loading = ref(false); // 加载状态
// const tableData = ref([{ name: "张三", age: 18, address: "北京市" }]); // 表格数据
// const pagination = reactive({
//   currentPage: 1, // 当前页码
//   pageSize: 10, // 每页显示条数
//   total: 0, // 总条数
//   pageSizes: [10, 20, 50, 100], // 每页显示条数的选项
//   layout: "total, sizes, prev, pager, next, jumper",
//   size: "default", // 分页组件的尺寸
//   background: true, // 是否显示背景色
//   disabled: false, // 是否禁用
// }); // 分页信息

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
    type: Object,
    default: () => ({}),
  },
  pagination: {
    type: Object,
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

const emit = defineEmits(["query"]);

// 每页显示条数
const handleSizeChange = (val: number) => {
  console.log(`每页${val} 条数据`);
  pagination!.pageSize = val;
};

// 当前页
const handleCurrentChange = (val: number) => {
  console.log(`当前页码: ${val}`);
  pagination!.currentPage = val;
};
// 查询
const handleQuery = () => {
  console.log("查询");
  emit("query", queryParams);
};

// 重置
const handleReset = () => {
  console.log("重置");
  queryParams.value = {};
  emit("query", queryParams);
};

onMounted(() => {
  console.log("onMounted");
});
</script>

<template>
  <div>
    <!-- 查询区域 -->
    <el-form :inline="true" :model="queryParams" class="el-form--inline">
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
      </el-form-item>
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
        <template #default="scope"></template>
      </el-table-column>

      <el-table-column label="操作" fixed="right">
        <component
          v-for="btn in columnButtons"
          :key="btn.label"
          :is="btn.btnType"
          v-bind="btn"
          :style="btn.style"
        >
          <el-popconfirm
            v-if="btn.label === '删除'"
            title="确定删除这条记录吗？"
            @confirm="btn?.onClick"
          >
            <template #reference>
              <!-- <el-button>删除</el-button> -->
              <component :is="btn.btnType" v-bind="btn" :style="btn.style">{{
                btn.label
              }}</component>
            </template>
          </el-popconfirm>

          <div v-else>{{ btn.label }}</div>
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

<style scoped></style>
