<script setup>
import {ref, onMounted, computed} from 'vue'
import {useGlobalStore} from "../stores/globalStore";
import {uiInitSidebarNav, uiInitSidebar, uiCloseSidebar} from '../sidebar.js';
import {useRoute, useRouter} from "vue-router";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

/*
* SIDEBAR CONFIGS */
const globalStore = useGlobalStore()
const menus = globalStore.menus

onMounted( async () => {
  await globalStore.checkLoading()
  uiInitSidebar()
  uiInitSidebarNav()
})

const logout = async () => {
  localStorage.removeItem('auth');
  await globalStore.logout()
  await router.push({name: 'login'});
}

</script>

<template>
  <div class="sidebar sidebar-panel print:hidden">
    <div
        class="flex h-full grow flex-col border-r border-slate-150 bg-white dark:border-navy-700 dark:bg-navy-750"
    >
      <div class="flex items-center justify-between px-3 pt-4">
        <!-- Application Logo -->
        <div class="flex">
          <a href="/" class="flex flex-col justify-center items-center">
            <img
                class="mx-auto w-[70%] block dark:hidden"
                src="/src/assets/images/app-logo-text.svg"
                alt="logo"
            />
            <img
                class="mx-auto w-[70%] hidden dark:block"
                src="/src/assets/images/app-logo-text-white.svg"
                alt="logo"
            />
          </a>
        </div>
        <button @click="uiCloseSidebar"
                class="sidebar-close btn h-7 w-7 rounded-full p-0 text-primary hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-accent-light/80 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 xl:hidden"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div
          class="nav-wrapper mt-5 h-[calc(100%-4.5rem)] overflow-x-hidden pb-6"
          data-simplebar
      >
        <ul class="flex flex-1 flex-col font-inter">

          <template v-for="(menu, index) in menus">
            <!-- Header Link -->
            <template v-if="useGlobalStore().permissions.includes(menu.permission) || menu.permission == null || menu.permission == undefined">
              <li class="my-3 text-navy-300 px-4" v-if="menu.type == 'header'" :key="'header-' + index">
                {{ menu.title }}
              </li>

              <!-- Normal Link -->
              <li class="dark:text-navy-" v-else-if="menu.children == undefined" :key="'normal-' + index">
                <router-link
                    :to="menu.link"
                    data-default-class="text-slate-600 dark:text-navy-200 hover:text-primary hover:bg-slate-300 dark:hover:text-white dark:hover:bg-transparent"
                    data-active-class="font-medium text-primary bg-slate-300 dark:text-white dark:bg-primary"
                    class="nav-link flex py-2 px-4 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out"
                >
                  <div class="flex items-center justify-between">
                    <svg v-html="menu.icon" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    </svg>
                    <span class="ml-2">{{ menu.title }}</span>
                  </div>

                </router-link>
              </li>

              <!-- Link with dropdown -->
              <li
                  v-else :key="'dropdown-' +  index"
                  class="ac nav-parent [&.is-active_.ac-trigger_.down-icon]:rotate-90 [&.is-active_.ac-trigger]:font-semibold [&.is-active_.ac-trigger]:text-primary dark:[&.is-active_.ac-trigger]:text-white dark:[&.is-active_.ac-trigger]:bg-primary [&.is-active_.ac-trigger]:bg-slate-300"
              >
                <button
                    class="ac-trigger flex flex-row w-full items-center justify-between py-2 px-4 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out dark:text-navy-200 text-navy-900 dark:hover:text-white hover:text-primary hover:bg-slate-300 dark:hover:bg-transparent"
                >

                  <div class="flex items-center justify-between">
                    <svg v-html="menu.icon" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    </svg>
                    <span class="ml-2">{{ menu.title }}</span>
                  </div>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-slate-400 transition-transform ease-in-out down-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
                <ul class="ac-panel bg-navy-900">
                  <li v-for="(child, child_index) in menu.children" :key="child_index">
                    <router-link
                        :to="child.link"
                        class=" nav-link flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4"
                        data-default-class="dark:text-navy-200 text-navy-200 dark:hover:text-white hover:text-white"
                        data-active-class="font-medium text-white dark:text-accent-light dark:font-bold"
                    >
                      <div class="flex items-center space-x-2">
                        <div
                            class="h-1.5 w-1.5 rounded-full border border-current opacity-40"
                        ></div>
                        <span>{{ child.title }}</span>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </li>
            </template>

          </template>

        </ul>
      </div>

      <div class="flex flex-col p-4">
        <div class="mt-3 px-4">
          <form @submit.prevent = 'logout'>
            <button type="submit"
                    class="btn h-9 w-full space-x-2 bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
