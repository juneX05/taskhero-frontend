<script setup>

import {onMounted, ref} from "vue";
import {getBrwoserScrollbarWidth, leaveAnimation} from "../assets/js/utils/helpers.js";

const MODAL_OVERLAY_CLASS = "modal-overlay";
const MODAL_CONTENT_CLASS = "modal-content";
const MODAL_SHOW_CLASS = "show";
const props = defineProps({
  id: {},
  title: {},
  content_class: {default: () => 'max-w-lg'}
})

const emit = defineEmits([
  'modalOpen', 'modalClose'
])

const isActive = ref(false)
const scrollbarWidth = getBrwoserScrollbarWidth();
const _html = document.documentElement;

let modal, overlay, content, toggleBtns, closeBtns;

const closeModal = () => {
  if (!isActive.value) return;

  leaveAnimation(modal, () => {
    modal.classList.remove(MODAL_SHOW_CLASS);
    _html.style.removeProperty("padding-right");
    _html.style.removeProperty("overflow");
    isActive.value = false;
  });

  emit('modalClose');
}

const openModal = () => {
  if (isActive.value) return;

  _html.style.paddingRight = `${scrollbarWidth}px`;
  _html.style.overflow = "hidden";
  modal.classList.add(MODAL_SHOW_CLASS);
  isActive.value = true;

  emit('modalOpen');
}

onMounted( () => {
  modal = document.querySelector('#' + props.id)
  overlay = modal.querySelector(`.${MODAL_OVERLAY_CLASS}`)
  content = modal.querySelector(`.${MODAL_CONTENT_CLASS}`)

  toggleBtns = document.querySelectorAll(`[data-toggle="modal"][data-target="#${props.id}"]`);
  closeBtns = document.querySelectorAll(`[data-close-modal]`);

  toggleBtns.forEach((node) => {
    node.addEventListener("click", () => { openModal(node.dataset.target) });
  });

  closeBtns.forEach((node) => {
    node.addEventListener("click", () => { closeModal(node.dataset.target) });
  });
})
</script>

<template>
  <div
      :id="id"
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
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>