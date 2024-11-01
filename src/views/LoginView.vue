<script setup lang="ts">
import type { LoginForm } from '@/helpers/types'
import type { FormInstance, FormRules } from 'element-plus'

const form = ref<LoginForm>({
  username: 'emilys',
  password: 'emilyspass'
})

const formRef = ref<FormInstance>()

const validateField =
  (fieldName: string) =>
  (_: any, value: string, callback: (...args: any[]) => void) => {
    if (value.trim() === '') {
      callback(new Error(`Please input ${fieldName}`))
    } else {
      callback()
    }
  }

const rules = reactive<FormRules<typeof form>>({
  username: [{ validator: validateField('username'), trigger: 'blur' }],
  password: [{ validator: validateField('password'), trigger: 'blur' }]
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitHandler = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!')
      useAuthStore().signIn(form.value)
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<template>
  <div class="page-container">
    <el-form :model="form" ref="formRef" :rules>
      <h2>Sign in</h2>

      <el-form-item label="Usermane" prop="username">
        <el-input v-model="form.username" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm(formRef)">Reset</el-button>
        <el-button type="primary" @click="submitHandler(formRef)">
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
}

.el-form {
  width: min(450px, 95%);
  background-color: white;
  padding: 30px;
  border-radius: 20px;

  h2 {
    font-size: 2em;
    margin-bottom: 25px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .el-button:last-child {
    margin-left: auto;
  }
}
</style>
