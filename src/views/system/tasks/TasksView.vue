<script setup>
import Layout from '../../../layouts/Main.vue'
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from "vue";
import {useTasksStore} from "./__tasksStore.js";
import LoaderComponent from "../../../components/LoaderComponent.vue";
import {formatDate, timeLeft} from "../../../assets/js/utils/helpers.js";
import EditTaskDetails from "./components/EditTaskDetails.vue";
import AssignedList from "../../../components/AssignedList.vue";
import CompleteTaskComponent from "./components/CompleteTaskComponent.vue";
import ReOpenTaskComponent from "./components/ReOpenTaskComponent.vue";
import TaskHistoryComponent from "./components/TaskHistoryComponent.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore()

const record_id = route.params.id;
const record = ref({})
const loading = ref({})

const init = async () => {
  loading.value=true;
  const response = await tasksStore.getRecord(record_id);
  if (response.status) {
    record.value = response.data
    console.log(response.data)
  }
  loading.value = false;
// Todolist Drag & Drop
  const todoList = document.querySelector("#todo-list");

  todoList._sortable = Sortable.create(todoList, {
    animation: 200,
    easing: "cubic-bezier(0, 0, 0.2, 1)",
    direction: "vertical",
    delay: 150,
    delayOnTouchOnly: true,
  });


  // Todo Checkbox
  const todoCheckbox = document.querySelectorAll(".todo-checkbox");

  todoCheckbox.forEach((node) => {
        node.disabled = 'disabled';
        node.addEventListener("click", (e) => e.stopPropagation())
      }
  );

  // Media Tags Dropdown
  new PopperMultiple(".popper-multiple", ".popper-ref", ".popper-root", {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  });
}

onMounted(async () => {
  await init()
})

</script>

<template>

  <Layout>

    <!-- Main Content Wrapper -->
    <main class="main-content kanban-app w-full">

      <div
          class="grid sm:flex space-y-3 sm:space-y-0 items-center justify-center sm:justify-between py-5 sm:space-x-2 sm:px-[var(--margin-x)] transition-all duration-[.25s]"
      >
        <router-link
            :to="{ name:'tasks-index'}"
            class="flex h-8 p-4 items-center justify-center rounded-lg bg-info/10 text-slate-600 dark:text-info"
        >
          <i class="fa fa-arrow-left text-base mr-2"></i> Back
        </router-link>

        <div
             class="flex flex-col items-center justify-center">
          <div class="flex">
            <h3
                class="flex-1 text-lg font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
            >
              TASK: {{ record.title }}
            </h3>

          </div>
          <div class="flex -space-x-1.5">
            <AssignedList :max_users="2" :users="record.assignees"/>
          </div>
        </div>

        <div v-if="record.project"
            class="flex flex-col items-center justify-center">
          <div class="flex" v-if="record.project">
            <img
                v-if="record.project"
                class="h-8 w-8 rounded-lg object-cover object-center"
                :src="record.project.media.url"
                alt="image"
            />
            <h1
                class="flex-1 text-lg ml-2 font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
            >
              <span>{{ record.project?.title }}</span>
            </h1>

          </div>
          <p class="mt-1 text-xs">
            PROJECT
          </p>
        </div>


      </div>

      <div class="flex px-[var(--margin-x)] flex-col">
        <div
            class="mt-2 grid grid-cols-12 gap-4 transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:gap-6"
        >
          <div class="col-span-12 lg:col-span-8 ">

            <div class="card p-4 col-span-12 md:col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                 Description
                </h2>

              </div>
              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full overflow-x-auto rounded-lg" v-html="record.description"></div>
            </div>

            <div
                class="mt-2 grid grid-cols-12 gap-4 transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:gap-6"
            >
              <div class="col-span-12 lg:col-span-6 ">
                <div class="flex items-center justify-between">
                  <h2
                      class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                  >
                    Files
                  </h2>

                </div>
                <div class="card mt-3 space-y-3.5 p-4 text-xs+ max-h-[35vh] overflow-auto">

                  <template v-if="record.files && record.files.length > 0">
                    <div class="group flex items-center justify-between">

                      <div class="flex space-x-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                        >


                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5.5 w-5.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                          >
                            <path
                                fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd"
                            />
                          </svg>


                        </div>
                        <div>
                          <a href="#" class="text-slate-600 dark:text-navy-100"
                          >
                            Image001
                          </a
                          >
                          <div
                              class="mt-1 flex text-xs text-slate-400 dark:text-navy-300"
                          >
                            <p>
                              1.2 KB
                            </p>
                          </div>
                        </div>

                      </div>
                      <div class="flex">
                        <button
                            data-toggle="modal"
                            data-target="#viewFile"
                            class="popper-ref text-primary btn mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                        >
                          <i class="fa fa-eye"></i>
                        </button>
                        <button
                            data-toggle="modal"
                            data-target="#deleteFile"
                            class="popper-ref text-error btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                        >
                          <i class="fa fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </template>

                  <div v-else class="p-3">
                    <h3>No files for task</h3>
                  </div>

                </div>
              </div>
              <div class="col-span-12 lg:col-span-6">
                <div class="flex justify-between">
                  <div class="flex items-center justify-start">
                    <h2
                        class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                    >
                      TASK STEPS
                    </h2>
                    <div
                        v-if="record.steps && record.steps.length > 0"
                        class="ml-2 badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>1/5</span>
                    </div>
                  </div>
                </div>

                <div class="card mt-3 space-y-3.5 p-4 text-xs+">
                  <div id="todo-list">

                    <template v-if="record.steps && record.steps.length > 0">
                      <div
                          v-for="(step, index) in record.steps"
                          class="border-b border-slate-150 py-3 dark:border-navy-500"
                      >
                        <div class="group flex items-center justify-between">
                          <div class="flex">
                            <div class="flex items-center space-x-2 sm:space-x-3">
                              <label class="flex">
                                <input
                                    type="checkbox"
                                    class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                                />
                              </label>
                              <h2
                                  class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100"
                              >
                                {{ step.title }}
                              </h2>
                            </div>
                          </div>

                          <div class="popper-multiple">
                            <button
                                class="popper-ref btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                            >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                              >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            <div class="popper-root">
                              <div
                                  class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
                              >
                                <ul>
                                  <li>
                                    <a
                                        data-target="#editStep"
                                        data-toggle="modal"
                                        href="#"
                                        class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                    >Edit</a
                                    >
                                  </li>
                                </ul>
                                <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                                <ul>
                                  <li>
                                    <a
                                        data-target="#deleteStep"
                                        data-toggle="modal"
                                        href="#"
                                        class="flex h-8 items-center text-error px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                    >
                                      <i class="fa fa-trash-alt mr-2"></i>
                                      Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </template>

                    <div v-else class="p-3">
                      <h3>No steps for task</h3>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4 mb-10">
            <div class="card p-4 col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Actions
                </h2>

              </div>

              <LoaderComponent v-if="loading" />
              <div v-else class="flex flex-col space-y-1 mt-4 min-w-full overflow-x-auto">

                <EditTaskDetails
                    v-if="['pending'].includes(record.status.name)"
                    :record_id="record_id"
                    :record="{
                    title: record.title,
                    description: record.description,
                    assigned: record.assignees.map( (item) => item.urid),
                    priority_id: record.priority_id,
                    project_id: record.project_id,
                    task_tags: record.tags.map( (item) => item.urid),
                    start_date: record.start_date,
                    end_date: record.end_date,
                  }"
                    @record-updated="init"
                />

                <CompleteTaskComponent
                    v-if="['pending'].includes(record.status.name)"
                    :record_id="record_id"
                    :record="{
                    title: record.title,
                  }"
                    @record-updated="init"
                />

                <ReOpenTaskComponent
                    v-if="['completed'].includes(record.status.name)"
                    :record_id="record_id"
                    :record="{
                    title: record.title,
                  }"
                    @record-updated="init"
                />

                <TaskHistoryComponent
                    :record_id="record_id"
                    :record="{
                    title: record.title,
                  }"
                    @record-updated="init"
                />

              </div>
            </div>

            <div class="card p-4 mt-4 col-span-12 md:col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Details
                </h2>

              </div>
              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
                <table class="is-zebra w-full text-left">
                  <tbody>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Priority
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      <span class="tag rounded-full"
                            :class="{
                              'bg-success/30 text-success hover:bg-success/50' : record.priority.name === 'low',
                              'bg-error/30 text-error hover:bg-error/50' : record.priority.name === 'high',
                              'bg-warning/30 text-warning hover:bg-warning/50' : record.priority.name === 'medium',
                            }"
                      >
                        {{ record.priority.title }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Status
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      <span class="tag rounded-full"
                            :class="{
                              'bg-success/30 text-success hover:bg-success/50' : record.status.name === 'completed',
                              'bg-error/30 text-error hover:bg-error/50' : record.status.name === 'inactive',
                              'bg-warning/30 text-warning hover:bg-warning/50' : record.status.name === 'pending',
                            }"
                      >
                        {{ record.status.title }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Created Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ formatDate(record.created_at) }}
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Start Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ formatDate(record.start_date) }}
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      End Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ formatDate(record.end_date) }}
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Time Left
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ timeLeft(record.end_date) }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-center border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      <div class="mb-1 text-center">TAGS</div>
                      <span
                          v-for="(item, index) in record.tags"
                          class="tag h-5 mt-1 mr-1 rounded-full text-xs+ bg-primary/30 text-primary dark:text-white hover:bg-primary/50"
                      >
                        {{ item.title }}
                      </span>
                    </td>
                  </tr>
                  </tbody>
                </table>
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
