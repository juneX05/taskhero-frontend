<script setup>

import {onMounted, ref} from "vue";

const props = defineProps( {
  classes: {},
  title: {},
  id: {type: String, default: ''},
  position: {type: String, default: 'left'},
  content_class: { type: String, default: 'w-[50%]' }
})

const emit = defineEmits([
    'drawerOpen', 'drawerClose'
])

const isActive = ref(false)
let drawer, overlay ,content;

const closeDrawer = () => {
  if (!isActive.value) return;

  drawer.classList.add('hidden');
  if (overlay) {
    // helpers.leaveAnimation(overlay, () => {
      overlay.classList.add("hidden");
    // });
  }

  // helpers.leaveAnimation(content, () => {
    content.classList.add("hidden");
  // });

  emit('drawerClose');
  isActive.value = false;
}

let toggleBtns, closeBtns;

const openDrawer = () => {
  if (isActive.value) return;

  drawer.classList.remove('hidden');
  if (overlay) overlay.classList.remove('hidden');
  content.classList.remove('hidden')

  isActive.value = true;
  emit('drawerOpen');
}

onMounted( () => {
  drawer = document.querySelector('#' + props.id)
  overlay = drawer.querySelector('.drawer-overlay')
  content = drawer.querySelector('.drawer-content')
  toggleBtns = document.querySelectorAll(`[data-toggle="drawer"][data-target="#${props.id}"]`);
  closeBtns = document.querySelectorAll(`.drawer-close`);

  toggleBtns.forEach((node) => {
    node.addEventListener("click", () => { openDrawer(node.dataset.target) });
  });

  closeBtns.forEach((node) => {
    node.addEventListener("click", () => { closeDrawer(node.dataset.target) });
  });
})

</script>

<template>
    <div :id="id" class="drawer hidden">
      <div
          @click="closeDrawer"
          class="drawer-overlay fixed inset-0 z-[100] hidden bg-slate-900/60"
      ></div>
      <div
          :class="content_class"
          class="drawer-content fixed right-0 top-0 z-[101] hidden h-full "
      >
        <div class="flex h-full w-full flex-col bg-white dark:bg-navy-700">
          <div
              class="flex h-14 items-center justify-between bg-slate-150 p-4 dark:bg-navy-800"
          >
            <h3
                class="text-base font-medium text-slate-700 dark:text-navy-100"
            >
              {{ title }}
            </h3>
            <div class="-mr-1.5 flex items-center space-x-2.5">
              <div class="flex">
                <button
                    @click="closeDrawer"
                    class="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
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
            </div>
          </div>
          <slot></slot>

        </div>
      </div>
    </div>
</template>

<style scoped>

</style>