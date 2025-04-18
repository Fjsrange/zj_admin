<script setup lang="ts">
import { ref, reactive } from "vue";
import { LoginApi } from "@/apis/api";
import { useRouter } from "vue-router";
import { showMessage } from "@/utils/message";

const form = reactive({ username: "", password: "" });
const router = useRouter();

const onSubmit = async () => {
  try {
    const { data } = await LoginApi(form.username, form.password);
    // 处理登录成功逻辑
    console.log("data", data);
    return;
    if (data.code === 200) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("admin", JSON.stringify(data.data.admin));
      localStorage.setItem("authList", JSON.stringify(data.data.authList));
      showMessage("success", "登录成功");
      setTimeout(() => {
        // 跳转到首页
        router.push("/");
      }, 500);
    } else {
      showMessage("error", data.msg);
    }
  } catch (error: object | any) {
    // 处理登录失败逻辑
    console.error("登录失败", error);
    showMessage("error", error.message);
  }
};
</script>

<template>
  <div class="bj">
    <!-- <img src="@/assets/img/bj.jpg" alt="" class="bj" style="width: 100%; height: 100%" /> -->
  </div>
  <el-form :model="form" label-width="auto" class="login-form">
    <el-form-item label="账号">
      <el-input
        v-model="form.username"
        placeholder="请输入账号"
        style="width: 240px"
      />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="form.password"
        style="width: 240px"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-form-item class="box">
      <el-button type="primary" @click="onSubmit" style="padding: 10px 40px"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.bj {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url("@/assets/img/bj.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.login-form {
  width: 300px;
  height: auto;
  padding: 60px 100px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 37%;
}
.box {
  margin-top: 40px;
  margin-left: 92px;
}
</style>
