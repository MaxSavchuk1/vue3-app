<script setup lang="ts">
import UserEntity from '@/entites/User.entity'

const form = ref<UserEntity>(useUserStore().userData!.clone())
const isDisabledEditing = ref(true)
</script>

<template>
  <!-- TODO: decompose this template -->

  <div class="page-container">
    <template v-if="form">
      <el-form :model="form" label-position="top">
        <h2>User details</h2>

        <el-alert
          v-if="isDisabledEditing"
          title="Editing information is temporary unavailable."
          type="warning"
          :closable="false"
        />

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="First name" prop="firstName">
              <el-input
                v-model="form.firstName"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>

            <el-form-item label="Last name" prop="lastName">
              <el-input
                v-model="form.lastName"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>

            <el-form-item label="Maiden name" prop="maidenName">
              <el-input
                v-model="form.maidenName"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Birth date" prop="birthDate">
              <el-date-picker
                v-model="form.birthDate"
                type="date"
                placeholder="Pick a date"
                format="DD-MM-YYYY"
                value-format="YYYY-M-DD"
                :disabled="isDisabledEditing"
              />
            </el-form-item>

            <el-form-item label="Phone" prop="phone">
              <el-input
                v-model="form.phone"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>

            <el-form-item label="Email" prop="email">
              <el-input
                v-model="form.email"
                type="email"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider />

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Country" prop="country">
              <el-input
                v-model="form.address.country"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>

            <el-form-item label="State" prop="state">
              <el-input
                v-model="form.address.state"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="City" prop="city">
              <el-input
                v-model="form.address.city"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>

            <el-form-item label="Postal code" prop="postalCode">
              <el-input
                v-model="form.address.postalCode"
                type="text"
                autocomplete="off"
                :disabled="isDisabledEditing"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.el-form {
  width: min(800px, 95%);
  background-color: white;
  padding: 30px;
  border-radius: 20px;

  & > * + * {
    margin-top: 25px;
  }

  h2 {
    font-size: 2em;
  }

  :deep(.el-date-editor) {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .el-row {
    flex-direction: column;
  }
  .el-col {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .el-form {
    padding: 0;
  }
}
</style>
