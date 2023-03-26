<script setup>

import {onMounted, ref} from "vue";
import {getBrwoserScrollbarWidth, leaveAnimation} from "../assets/js/utils/helpers.js";

const MODAL_OVERLAY_CLASS = "modal-overlay";
const MODAL_CONTENT_CLASS = "modal-content";
const MODAL_SHOW_CLASS = "show";
const props = defineProps({
  id: {},
})

const emit = defineEmits([
  'modalOpen', 'modalClose'
])

onMounted( () => {
  new Popper("#" + props.id, ".popper-ref", ".popper-root", {
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
})



</script>

<template>
  <div :id="id">
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
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>