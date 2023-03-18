<script setup>
import Layout from '../../../layouts/Main.vue'
import {onMounted, ref} from "vue";
import {useGlobalStore} from "../../../stores/globalStore.js";

const data = ref({});

onMounted(async () => {
  const response = await useGlobalStore().dashboard()
  if (response.status) {
    data.value = response.data
  }
})
</script>

<template>

  <Layout>
    <main class="main-content w-full px-[var(--margin-x)] pb-8">
      <div
          class="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6"
      >
        <div
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          <div class="card flex-row justify-between p-4">
            <div>
              <p class="text-xs+ uppercase">Tasks</p>
              <div class="mt-8 flex items-baseline space-x-1">
                <p
                    class="text-2xl font-semibold text-slate-700 dark:text-navy-100"
                >
                  {{ data.tasks }}
                </p>
<!--                <p class="text-xs text-success">+21%</p>-->
              </div>
            </div>
            <div
                class="mask is-squircle flex h-10 w-10 items-center justify-center bg-warning/10"
            >
              <i class="fa-solid fa-list text-xl text-warning"></i>
            </div>
            <div class="absolute bottom-0 right-0 overflow-hidden rounded-lg">
              <i
                  class="fa-solid fa-list translate-x-1/4 translate-y-1/4 text-5xl opacity-15"
              ></i>
            </div>
          </div>
          <div class="card flex-row justify-between p-4">
            <div>
              <p class="text-xs+ uppercase">Projects</p>
              <div class="mt-8 flex items-baseline space-x-1">
                <p
                    class="text-2xl font-semibold text-slate-700 dark:text-navy-100"
                >
                  {{ data.projects }}
                </p>
<!--                <p class="text-xs text-success">+4%</p>-->
              </div>
            </div>
            <div
                class="mask is-squircle flex h-10 w-10 items-center justify-center bg-info/10"
            >
              <i class="fa-solid fa-folder text-xl text-info"></i>
            </div>
            <div class="absolute bottom-0 right-0 overflow-hidden rounded-lg">
              <i
                  class="fa-solid fa-folder translate-x-1/4 translate-y-1/4 text-5xl opacity-15"
              ></i>
            </div>
          </div>
          <div class="card flex-row justify-between p-4">
            <div>
              <p class="text-xs+ uppercase">Users</p>
              <div class="mt-8 flex items-baseline space-x-1">
                <p
                    class="text-2xl font-semibold text-slate-700 dark:text-navy-100"
                >
                  {{ data.users }}
                </p>
<!--                <p class="text-xs text-success">+8%</p>-->
              </div>
            </div>
            <div
                class="mask is-squircle flex h-10 w-10 items-center justify-center bg-success/10"
            >
              <i class="fa-solid fa-user text-xl text-success"></i>
            </div>
            <div class="absolute bottom-0 right-0 overflow-hidden rounded-lg">
              <i
                  class="fa-solid fa-user translate-x-1/4 translate-y-1/4 text-5xl opacity-15"
              ></i>
            </div>
          </div>
          <div class="card flex-row justify-between p-4">
            <div>
              <p class="text-xs+ uppercase">HIGH PRIORITY TASKS</p>
              <div class="mt-8 flex items-baseline space-x-1">
                <p
                    class="text-2xl font-semibold text-slate-700 dark:text-navy-100"
                >
                  {{ data.high_priority_tasks }}
                </p>
<!--                <p class="text-xs text-error">-2.3%</p>-->
              </div>
            </div>
            <div
                class="mask is-squircle flex h-10 w-10 items-center justify-center bg-error/10"
            >
              <i class="fa-solid fa-tasks text-xl text-error"></i>
            </div>
            <div class="absolute bottom-0 right-0 overflow-hidden rounded-lg">
              <i
                  class="fa-solid fa-tasks translate-x-1/4 translate-y-1/4 text-5xl opacity-15"
              ></i>
            </div>
          </div>
        </div>

      </div>
    </main>
  </Layout>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
