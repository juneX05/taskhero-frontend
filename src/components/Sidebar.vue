<script setup>
import {ref, onMounted } from 'vue'
import {useGlobalStore} from "../stores/globalStore";

defineProps({
  msg: String,
})

const count = ref(0)

/*
* SIDEBAR CONFIGS */
const menus = useGlobalStore().menus

</script>

<template>

  <template v-for="(menu, index) in menus">
    <!-- Header Link -->
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
              class="nav-link flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4"
              data-default-class="dark:text-navy-200 text-navy-200 dark:hover:text-navy-50 hover:text-primary"
              data-active-class="font-medium text-accent-light"
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

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
