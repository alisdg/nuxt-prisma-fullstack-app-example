<template>
  <div>
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="name" label="name">
        <n-input v-model:value="model.name" @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item
          path="username"
          label="username"
      >
        <n-input
            v-model:value="model.username"
            @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
        />
      </n-form-item>

      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
                round
                type="primary"
                @click="handleValidateButtonClick"
            >
              Submit
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>

</template>

<script lang="ts">
import  {defineComponent, ref} from 'vue'
import {
  FormInst,
  FormValidationError,
  useMessage,
  FormRules
} from 'naive-ui'
import {definePageMeta} from "#imports";

interface ModelType {
  name: string | null
  password: string | null
  username: string | null
}

export default defineComponent({
  setup() {
    definePageMeta({
      layout: 'auth',
      auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
      }
    })
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      name: null,
      password: null,
      username: null
    })

    const rules: FormRules = {
      password: [
        {
          required: true,
          message: 'Password is required'
        }
      ],
      username: [
        {
          required: true,
          message: 'username is required',
          trigger: ['input', 'blur']
        }
      ]
    }
    return {
      formRef,
      model: modelRef,
      rules,

      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate(
            async (errors: Array<FormValidationError> | undefined) => {
              if (!errors) {
                const res = await $fetch('/api/user/store', {method: 'post', body: modelRef.value})
                console.log(res)
              } else {
                message.error('Invalid')
              }
            }
        )
      }
    }
  }
})
</script>

<style scoped>

</style>
