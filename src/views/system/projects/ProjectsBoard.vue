<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'
import AssignedList from "../../../components/AssignedList.vue";
import KanbanBoard from "../../../components/KanbanBoard.vue";
import {useProjectsStore} from "./__projectsStore.js";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore()

const projects = projectsStore.projects

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
    <main class="main-content kanban-app w-full">
      <div
          class="flex items-center justify-between space-x-2 px-[var(--margin-x)] py-5 transition-all duration-[.25s]"
      >
        <router-link
            :to="{ name:'projects-view', params: { id: route.params.id } }"
            class="flex h-8 p-4 items-center justify-center rounded-lg bg-info/10 text-slate-600 dark:text-info"
        >
          <i class="fa fa-arrow-left text-base mr-2"></i> Back
        </router-link>

        <div class="flex items-center space-x-2">
          <h3
              class="flex-1 text-lg font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            Mobile App
          </h3>
          <img
              class="h-8 w-8 rounded-lg object-cover object-center"
              src="/assets/800x600-3f46f382.png"
              alt="image"
          />

        </div>
        <label class="relative hidden w-full max-w-[16rem] sm:flex">
          <input
              class="form-input peer h-8 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 text-xs+ placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              placeholder="Search on boards"
              type="text"
          />
          <span
              class="pointer-events-none absolute flex h-full w-9 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
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
          </span>
        </label>
      </div>

      <div class="flex h-[calc(100vh-8.5rem)] flex-grow flex-col">
        <div
            id="tasks-group"
            class="kanban-scrollbar flex w-full items-start space-x-4 overflow-x-auto overflow-y-hidden px-[var(--margin-x)] transition-all duration-[.25s]"
        >

          <kanban-board />
          <kanban-board />
          <kanban-board />
          <kanban-board />


          <div class="w-72 shrink-0">
            <button
                data-toggle="modal"
                data-target="#newBoard"
                class="btn w-full bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
            >
              New Board
            </button>

          </div>
        </div>
      </div>
    </main>

    <div
        id="newBoard"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            New Board
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Create a New Board for this Project
          </p>
          <div class="mt-4 space-y-4">
            <label class="block">
              <span>Title:</span>
              <input
                  class="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                  placeholder="Title"
                  type="text"
              />
            </label>
            <label class="block">
              <span>Description:</span>
              <textarea
                  rows="4"
                  placeholder=" Description "
                  class="form-textarea mt-1.5 w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              ></textarea>
            </label>

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        id="editBoard"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            Edit Board
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Edit Board
          </p>
          <div class="mt-4 space-y-4">
            <label class="block">
              <span>Title:</span>
              <input
                  class="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                  placeholder="Title"
                  type="text"
              />
            </label>
            <label class="block">
              <span>Description:</span>
              <textarea
                  rows="4"
                  placeholder=" Description "
                  class="form-textarea mt-1.5 w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              ></textarea>
            </label>

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        id="newTask"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            New Task
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Create a New Task for this Board
          </p>
          <div class="mt-4 space-y-4">
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100">Title</span>
              <input
                  class="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                  placeholder="Enter title"
                  type="text"
              />
            </label>
            <div>
              <span
                  class="font-medium text-slate-600 dark:text-navy-100">Description
              </span>
              <div class="mt-1.5 w-full">
                <div id="postConent" class="h-48"></div>
              </div>
            </div>

            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100"
              >Assign Users
              </span
              >
              <select
                  multiple
                  id="assignUsers"
                  class="mt-1.5 w-full"
              ></select>
            </label>

            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100">Priority</span>
              <select class="mt-1.5 w-full" id="taskPriority">
                <option value>Select the priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100">Tags</span>
              <input
                  id="taskTags"
                  class="mt-1.5 w-full"
                  placeholder="Enter Tags"
              />
            </label>
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100"
              >Start Date
              </span
              >
              <span class="relative mt-1.5 flex">
                <input
                    id="taskStartDate"
                    class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Choose date..."
                    type="text"
                />
                <span
                    class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </span>
            </label>
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100"
              >End Date
              </span
              >
              <span class="relative mt-1.5 flex">
                <input
                    id="taskEndDate"
                    class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Choose date..."
                    type="text"
                />
                <span
                    class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </span>
            </label>

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        class="modal fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        id="deleteBoard"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60"></div>
      <div
          class="modal-content scrollbar-sm relative flex max-w-lg flex-col items-center overflow-y-auto rounded-lg bg-white px-4 py-10 text-center dark:bg-navy-700 sm:px-5"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline h-28 w-28 shrink-0 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          <path stroke="currentColor" stroke-width="2" d="m9 15 6-6m0 6L9 9"/>
        </svg>

        <div class="mt-4">
          <h2 class="text-2xl text-slate-700 dark:text-navy-100">
            Delete Board
          </h2>
          <p class="mt-2">
            Are you sure you want to delete this board?
          </p>
          <button
              data-close-modal
              class="btn mt-6 bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90"
          >
            Yes I am sure.
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
