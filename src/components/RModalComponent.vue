<script setup>
import {leaveAnimation} from "../assets/js/utils/helpers.js";
import {onMounted} from "vue";

const props = defineProps({
  id: {},
  showModal: {},
  title: {},
  content_class: {default: () => 'max-w-lg'}
})

const emit = defineEmits([
  'modalOpen', 'modalClose'
])

const closeModal = () => {
  const modal = document.querySelector('#' + props.id)
  leaveAnimation(modal, () => {
    emit('modalClose')
  });
}

onMounted( () => {
  console.log('Modal Mounted', props.id)
})
</script>

<template>
  <div
      :id="id"
      :class="{show: showModal}"
      class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
      role="dialog"
  >
    <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
    <div
        :class="content_class"
        class="modal-content relative flex w-full origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
    >
      <div
          class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
      >
        <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
          {{ title }}
        </h3>
        <button
            @click="closeModal"
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

        <slot></slot>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>