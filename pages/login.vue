<template>
  <div>
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="username" label="username">
        <n-input v-model:value="model.username" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter="handleValidateButtonClick"
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: space-between">
            <div class="text-sm">Not registered ? <n-button text text-color="#17aafe">Create account now</n-button> </div>
            <n-button
                round
                type="primary"
                @click="handleValidateButtonClick"
            >
              Login
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script setup lang="ts">
interface ModelType {
  username: string | null
  password: string | null
}

import {FormInst, FormRules, FormValidationError} from "naive-ui";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})
const { signIn } = useAuth()

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = ref<ModelType>({
  username: null,
  password: null
})
const rules: FormRules = {
  username: [
    {
      required: true,
      message: 'Username is required'
    }
  ],
  password: [
    {
      required: true,
      message: 'Password is required'
    }
  ],
}
function handleValidateButtonClick (e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
      async (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
          const {error, url} = await signIn('credentials', { username: model.value.username, password: model.value.password, redirect: false })
          if (error){
            message.error(error)
          }else {
            const {callbackUrl} = useRoute().query
            navigateTo(callbackUrl, { external: true })
          }
        }
      }
  )
}


</script>
