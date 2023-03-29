<script setup>
import {onMounted, ref, toRefs, watch} from "vue";

const emit = defineEmits(['selectedTab'])

const props = defineProps({
  tabs: {type: Array, default: () => []},
  default_tab: {}
})

const { default_tab } = toRefs(props);
const activeTab = ref('');

const defaultClass = () => {
  return ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100';
}
const activeClass = () => {
  return ' bg-white shadow dark:bg-navy-500 dark:text-navy-100';
}

const setActiveTab= (selected_tab) => {
  activeTab.value = selected_tab
  console.log(activeTab.value)
  // tabs.value.forEach( (tab) => {
  //   document.querySelector('#'+tab.name).classList.remove('is-active')
  // })
  // document.querySelector('#'+selected_tab).classList.add('is-active')
}

onMounted( () => {
  activeTab.value = default_tab.value
})

</script>

<template>
  <div id="tab-wrapper-5" class="tabs flex flex-col">
    <div
        class="is-scrollbar-hidden overflow-x-auto rounded-lg bg-slate-200 text-slate-600 dark:bg-navy-800 dark:text-navy-200"
    >
      <div class="tabs-list flex px-1.5 py-1">
        <button
            v-for="(tab, index) in tabs" :key="index"
            @click="setActiveTab(tab.name)"
            class="tab btn shrink-0 space-x-2 px-3 py-1.5 font-medium"
            :class="[(activeTab === tab.name) ? 'is-active ' + activeClass: defaultClass ]"
        >
          <span> {{ tab.title }} </span>
        </button>
      </div>
    </div>
    <div class="pt-4">
      <template
          v-for="(tab, index) in tabs" :key="index"
      >
        <slot
            v-if="activeTab === tab.name"
            :name="`tab_${tab.name}`"
        />
      </template>

    </div>
  </div>
</template>

<style scoped>

</style>