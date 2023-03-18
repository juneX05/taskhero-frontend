<script setup>
import Layout from '../../../layouts/Main.vue'
import {onMounted, reactive, ref} from "vue";
import {useRolesStore} from "./__rolesStore.js";
import icons from "../../../data/icons.js";
import RolesCreate from "./components/RolesCreate.vue";
import LoaderComponent from "../../../components/LoaderComponent.vue";

const rolesStore = useRolesStore();
const records = ref([])
const loading = ref(false)
onMounted(async () => {
  await init()
})

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY')
}

const page = {
  title: 'Roles',
  subtitle: 'All Roles',
  button_title: 'Create Role',
}

const init = async () => {
  loading.value = true
  await rolesStore.getAllData()
  records.value = rolesStore.records;
  loading.value = false
}

</script>

<template>
  <Layout>

    <!-- Main Content Wrapper -->
    <main class="main-content todo-app w-full px-[var(--margin-x)] pb-8">
      <div class="grid sm:flex items-center justify-center sm:justify-between py-5">
        <div class="flex flex-col items-center justify-center">
          <div class="flex-1 align-center space-x-2">
            <p class=" text-xl font-medium text-slate-800 dark:text-navy-50">
              {{ page.title }}
            </p>
          </div>
          <p class="mt-1 text-xs">
            {{ page.subtitle }}
          </p>
        </div>

        <div class="relative flex -space-x-px mt-1">
          <input
              class="form-input peer w-full h-8 rounded-l-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              placeholder="Search Task"
              type="text"
          />

          <div
              class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"
              />
            </svg>
          </div>

          <button
              class="btn rounded-l-none h-8 bg-navy-750 font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            Search
          </button>
        </div>
        <div class="justify-center hidden md:flex">

          <RolesCreate
            @record-created="init"
          />
        </div>
      </div>

      <div class="card px-4 pt-2 pb-4">
        <LoaderComponent v-if="loading" />
        <div v-else id="todo-list">

          <div
              class="border-b border-slate-150 py-3 dark:border-navy-500"
              v-for="(item, index) in records"
              :key="index"
          >
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="flex">
                <span v-html="icons.role"></span>
              </div>
              <router-link
                  :to="{ name: 'roles-view', params:{ id: item.urid } }"
                  class="text-slate-600 line-clamp-1 dark:text-navy-100"
              >
                {{ item.title }}
              </router-link>
            </div>
            <div class="mt-1 flex items-end justify-between">
              <div class="flex flex-wrap items-center font-inter text-xs">
                <p> {{ formatDate(item.created_at) }} </p>
                <div
                    class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"
                ></div>
                <div
                    class="badge space-x-2.5 px-1"
                    :class="{
                      'text-success' : item.status === 'active',
                      'text-error' : item.status === 'inactive',
                    }"
                >
                  <div class="h-2 w-2 rounded-full bg-current"></div>
                  <span>{{ item.status }}</span>
                </div>
              </div>
            </div>
            <div class="mt-1 flex items-end justify-between">
              <div class="flex flex-wrap items-center font-inter text-xs">
                <p class="text-info">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

  </Layout>
</template>

<style scoped>

</style>