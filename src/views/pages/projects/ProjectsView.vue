<script setup>
import Layout from '../../../layouts/Main.vue'
import {useRoute, useRouter} from 'vue-router';
import {onMounted} from "vue";
import {useProjectsStore} from "../../../stores/projectsStore.js";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore()

const project_id = route.params.id;
const project = projectsStore.getItemById(project_id);

const submit = () => {
  router.push({name: 'tasks-index'})
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
            :to="{ name: 'projects-index' }"
            class="flex h-8 p-4 items-center justify-center rounded-lg bg-info/10 text-slate-600 dark:text-info"
        >
          <i class="fa fa-arrow-left text-base mr-2"></i> Back
        </router-link>

        <div class="flex items-center space-x-2">
          <div
              class="flex-1 text-lg font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            <div class="items-center justify-center grid grid-cols-12">
              <div class="col-span-12">
                {{ project.name }}
              </div>

              <div class="text-center text-xs dark:text-amber-50 text-slate-800 col-span-12">
                {{ project.category }}
              </div>
            </div>

          </div>
          <img
              class="h-10 w-10 rounded-lg object-cover object-center"
              src="/src/assets/images/800x600.png"
              alt="image"
          />

        </div>
        <div class="hidden sm:flex space-x-1 ">
          <div class="flex flex-row">
            <a
                href="/projects/edit.html"
                class="flex h-8 p-4 ml-2 items-center justify-center rounded-lg bg-warning text-white"
            >
              <i class="fa fa-edit text-base mr-2"></i> Edit Project
            </a>
            <router-link
                :to="{ name:'projects-board', params: { id: project_id } }"
                class="flex h-8 p-4 ml-2 items-center justify-center rounded-lg bg-primary text-white"
            >
              <i class="fa fa-tasks text-base mr-2"></i> View Boards
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex px-[var(--margin-x)] flex-grow flex-col">
        <div
            class="mt-2 grid grid-cols-12 gap-4 transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:gap-6"
        >
          <div class="col-span-12 lg:col-span-8 order-2 lg:order-1 ">

            <div class="card p-4  col-span-12 lg:col-span-8">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Description
                </h2>

              </div>

              <div
                  class="mt-4 flex"
              >
                <p class="mt-1 text-sm" v-html="project.description"></p>
              </div>
            </div>

            <div class="card p-4 mt-4 col-span-12">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Task Boards Overview
                </h2>

                <a
                    href="/projects/boards.html"
                    class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
                >
                  View All
                </a>

              </div>

              <div
                  class="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4 sm:gap-5 lg:mt-6"
              >
                <div class="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                  <div class="flex justify-between space-x-1">
                    <p
                        class="text-xl font-semibold text-slate-700 dark:text-navy-100"
                    >
                      20
                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-primary dark:text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </div>
                  <p class="mt-1 text-xs+">In Progress</p>
                </div>
                <div class="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                  <div class="flex justify-between">
                    <p
                        class="text-xl font-semibold text-slate-700 dark:text-navy-100"
                    >
                      5
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <p class="mt-1 text-xs+">Completed</p>
                </div>
                <div class="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                  <div class="flex justify-between">
                    <p
                        class="text-xl font-semibold text-slate-700 dark:text-navy-100"
                    >
                      143
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-warning"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p class="mt-1 text-xs+">Pending</p>
                </div>
                <div class="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                  <div class="flex justify-between">
                    <p
                        class="text-xl font-semibold text-slate-700 dark:text-navy-100"
                    >
                      651
                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-info"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                      <path
                          d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"
                      />
                    </svg>
                  </div>
                  <p class="mt-1 text-xs+">In Review</p>
                </div>
              </div>

            </div>

            <div class="col-span-12 grid grid-cols-12 md:space-x-4">

              <div class="card p-4 mt-4 col-span-12 md:col-span-6">
                <div class="flex items-center justify-between">
                  <h2
                      class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                  >
                    Project Files
                  </h2>

                </div>
                <div class="mt-4 min-w-full min-h-full overflow-x-auto">
                  <ul class="space-y-3.5 font-inter font-medium">
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>

                        <span>Getting start</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                          />
                        </svg>

                        <span>Shipping</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-navy-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        <span>Payments</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-navy-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                          />
                        </svg>
                        <span>Returns</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-navy-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>

                        <span>My Account</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-navy-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                          <path
                              d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                          />
                          <path
                              d="M12.0449 15.8486C12.625 15.8486 13.1318 15.6729 13.5654 15.3213C13.999 14.9697 14.2393 14.5303 14.2861 14.0029H15.8242C15.7949 14.5479 15.6074 15.0664 15.2617 15.5586C14.916 16.0508 14.4531 16.4434 13.873 16.7363C13.2988 17.0293 12.6895 17.1758 12.0449 17.1758C10.75 17.1758 9.71875 16.7451 8.95117 15.8838C8.18945 15.0166 7.80859 13.833 7.80859 12.333V12.0605C7.80859 11.1348 7.97852 10.3115 8.31836 9.59082C8.6582 8.87012 9.14453 8.31055 9.77734 7.91211C10.416 7.51367 11.1689 7.31445 12.0361 7.31445C13.1025 7.31445 13.9873 7.63379 14.6904 8.27246C15.3994 8.91113 15.7773 9.74023 15.8242 10.7598H14.2861C14.2393 10.1445 14.0049 9.64062 13.583 9.24805C13.167 8.84961 12.6514 8.65039 12.0361 8.65039C11.21 8.65039 10.5684 8.94922 10.1113 9.54688C9.66016 10.1387 9.43457 10.9971 9.43457 12.1221V12.4297C9.43457 13.5254 9.66016 14.3691 10.1113 14.9609C10.5625 15.5527 11.207 15.8486 12.0449 15.8486Z"
                              fill="currentColor"
                          />
                        </svg>

                        <span>Copyright &amp; Legal</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-navy-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Mobile App</span>
                      </a>
                    </li>
                    <li>
                      <a
                          class="group inline-flex items-center space-x-2 tracking-wide outline-none transition-colors hover:text-slate-800 focus:text-navy-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                          href="#"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span>Security</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card p-4 mt-4 col-span-12 md:col-span-6">
                <div class="flex items-center justify-between">
                  <h2
                      class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                  >
                    Assigned Users
                  </h2>

                </div>
                <div class="mt-4 space-y-1 min-w-full min-h-full overflow-x-auto">
                  <div class="group flex items-center justify-between" v-for="(assignee, index) in project.assigned">
                    <div class="flex space-x-3">
                      <div
                          class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                      >

                        <img v-if="assignee.profile_pic"
                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                             class="h-5.5 w-5.5"
                        />

                        <div class="avatar h-6 w-6 sm:h-8 sm:w-8" v-else>
                          <div
                              class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                          >
                            {{ assignee.name.split(" ").map(n => n[0]).join('').toUpperCase() }}
                          </div>
                        </div>

                      </div>

                      <div class="flex items-center">
                        <a href="#" class="text-slate-600 dark:text-navy-100"
                        >
                          {{ assignee.name }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4 order-1 lg:order-2 ">
            <div class="card p-4 col-span-12 md:col-span-6">
              <div class=" min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
                <table class="is-zebra w-full text-left">
                  <tbody>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Category
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ project.category }}
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Created Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ project.created_date }}
                    </td>
                  </tr>
                  <tr v-if="project.start_date">
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Start Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ project.start_date }}
                    </td>
                  </tr>
                  <tr v-if="project.end_date">
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      End Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ project.end_date }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="card p-4 mt-4 col-span-12 md:col-span-6">
              <div class="">
                <div class="flex grow flex-col items-center">
                  <p class="mt-2 font-medium">Due Date</p>
                </div>
                <div class="mt-3 text-center">
                  <p class="text-3xl font-semibold text-slate-600 dark:text-navy-100">
                    {{ project.duration_left }}
                  </p>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-xs+ text-slate-500 dark:text-white">Progress</p>
                <div class="progress my-2 h-1.5 dakr:bg-white/30 bg-black/30 ">
                  <span :style="'width:'+project.progress+'%'" class="rounded-full dark:bg-white bg-black"></span>
                </div>
                <p class="text-right text-xs+ font-medium dark:text-white">
                  {{ project.progress }}%</p>
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
