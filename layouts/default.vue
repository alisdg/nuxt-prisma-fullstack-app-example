<template>
    <n-layout has-sider class="h-screen">
      <n-layout-sider content-style="padding: 24px;" class="bg-red-400">
        Handian Bridge
      </n-layout-sider>
      <div class="h-full w-full flex flex-col">
        <app-header/>
        <main class="flex flex-grow overflow-auto dark:bg-gray-700 bg-gray-200">
          <n-message-provider>
            <nuxt-page/>
          </n-message-provider>
        </main>
        <footer class="p-5 text-center">Footer</footer>
      </div>
    </n-layout>

</template>

