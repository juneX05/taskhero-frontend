<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import {onMounted, ref} from 'vue'
import AssignedList from "../../../components/AssignedList.vue";
import {useProjectsStore} from "./__projectsStore.js";
import LoaderComponent from "../../../components/LoaderComponent.vue";
import {formatDate} from "../../../assets/js/utils/helpers.js"
defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore()
const records = ref([])
const loading = ref(false)

const init = async () => {
  loading.value = true
  await projectsStore.getAllData()
  records.value = projectsStore.records
  loading.value = false;
}

onMounted( async () => {
  await init()
})

const submit = () => {
  router.push({name: 'dashboard'})
}

const stepsCounter = (steps) => {
  const total = steps.length;
  const completed = steps.filter( item => item.completed ).length

  return completed + '/' +  total
}

const splitDateTime = (date) => {
  const datetime = date.split(" ");
  return {
    date: datetime[0], time: datetime[1]
  }
}
</script>

<template>

  <Layout>


    <!-- Main Content Wrapper -->
    <main class="main-content w-full px-[var(--margin-x)] pb-8">
      <div
          class="mt-6 flex flex-col items-center justify-between space-y-2 text-center sm:flex-row sm:space-y-0 sm:text-left"
      >
        <div>
          <h3 class="text-xl font-semibold text-slate-700 dark:text-navy-100">
            Projects
          </h3>
          <p class="mt-1 hidden sm:block">List of your ongoing projects</p>
        </div>
        <router-link
            :to="{name: 'projects-create'}"
            class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-indigo-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span> New Project</span>
        </router-link>
      </div>
      <div
          class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
      >


        <LoaderComponent v-if="loading" />
        <div v-else v-for="(item, index) in records" :key="index"
            class="card shadow-xl">
          <div
              class="flex flex-1 flex-col justify-between rounded-lg bg-white dark:bg-transparent p-4 sm:p-5"
          >
            <div>
              <div class="flex items-start justify-between">
                <img
                    class="h-12 w-12 rounded-lg object-cover object-center"
                    :src="item.media.url"
                    alt="image"
                />
                <p class="text-xs+ text-slate-500">
                  {{ formatDate(item.created_at) }}
                </p>
              </div>
              <router-link :to="{ name:'projects-view', params:{id:item.id} }">
                <h3 class="mt-3 font-medium dark:text-white text-slate-500 line-clamp-2">
                  {{ item.title }}
                </h3>
                <p class="text-xs+ dark:text-amber-50 text-slate-800">
                  {{ item.category.title }}
                </p>
              </router-link>
            </div>
            <div>
              <div class="mt-4" v-if="item.progress">
                <p class="text-xs+ text-slate-500 dark:text-white">Progress</p>
                <div class="progress my-2 h-1.5 dakr:bg-white/30 bg-black/30 ">
                  <span :style="'width : ' + item.progress + '%'" class="rounded-full dark:bg-white bg-black"></span>
                </div>
                <p class="text-right text-xs+ font-medium dark:text-white">
                  {{ item.progress }}%</p>
              </div>

              <div class="mt-5 flex flex-wrap -space-x-3">
                <AssignedList :max_users="2" :users="item.assignees" />
              </div>

              <div class="mt-4 flex items-center justify-between space-x-2"  v-if="item.duration_left">
                <div

                    class="badge h-5.5 rounded-full bg-black/20 px-2 text-xs+ text-black dark:text-white"
                >
                  {{ item.duration_left }}
                </div>
                <div>
                  <button
                      class="btn -mr-1.5 h-8 w-8 rounded-full p-0 text-black dark:text-white hover:bg-white/20 focus:bg-white/20 active:bg-white/25"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <div
        class="modal fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        id="new_project"
        role="dialog"
    >
      <div
          class="modal-overlay absolute inset-0 bg-slate-500/60 pointer-events-none"
      ></div>
      <div
          class="modal-content scrollbar-sm relative flex max-w-lg flex-col items-center overflow-y-auto rounded-lg bg-white px-4 py-10 text-center dark:bg-navy-700 sm:px-5"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline h-28 w-28 shrink-0 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div class="mt-4">
          <h2 class="text-2xl text-slate-700 dark:text-navy-100">
            Success Message
          </h2>
          <p class="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur dignissimos soluta totam?
          </p>
          <button
              data-close-modal
              class="btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  </Layout>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
