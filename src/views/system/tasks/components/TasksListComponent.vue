<script setup>
import AssignedList from "../../../../components/AssignedList.vue";
import {formatDate} from "../../../../assets/js/utils/helpers.js";

defineProps( {
  records: {type:Array, default: () => []}
} )

const stepsCounter = (steps) => {
  const total = steps.length;
  const completed = steps.filter(item => item.completed).length

  return completed + '/' + total
}

</script>

<template>
  <div
      class="border-b border-slate-150 py-3 dark:border-navy-500"
      v-for="(item, index) in records"
      :key="index"
  >
    <div class="flex items-center justify-between">
      <div class="flex space-x-2 sm:space-x-3 ">
        <label class="flex">
          <input
              :checked="item.completed"
              disabled
              type="checkbox"
              class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
          />
        </label>
        <router-link
            :to="{ name: 'tasks-view', params:{ id: item.id } }"
            class="text-slate-600 line-clamp-1 dark:text-navy-100"
        >
          {{ item.title }}
        </router-link>

        <div
            v-if="item.steps"
            class="badge space-x-1  py-1 px-1.5 "
            :class=" {
                    'bg-error/10 dark:bg-error/15 text-error' : !item.completed,
                    'bg-success/10 dark:bg-success/15 text-success' : item.completed,
                  }"
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
          <span>{{ stepsCounter(item.steps) }}</span>
        </div>
      </div>

      <div class="flex">
        <p>{{ formatDate(item.created_at) }}</p>
      </div>

    </div>
    <div class="mt-3 flex items-end justify-between">
      <div class="flex flex-wrap items-center font-inter text-sm">
        <p class="text-info" v-html="item.description"></p>
      </div>
    </div>
    <div class="flex items-end justify-between">
      <div class="flex flex-wrap items-center font-inter text-xs">

        <div
            class="badge space-x-2.5 px-1"
            :class="{
                      'text-success' : item.priority.name === 'low',
                      'text-error' : item.priority.name === 'high',
                      'text-warning' : item.priority.name === 'medium',
                    }"
        >
          <div class="h-2 w-2 rounded-full bg-current"></div>
          <span>{{ item.priority.title }}</span>
        </div>

        <template v-if="item.due_date">
          <div
              class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"
          ></div>
          <p>{{ formatDate(item.end_date) }}</p>
        </template>

        <template v-if="item.tags" >
          <div
              class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"
          ></div>

          <div class="badge space-x-2.5 px-1 text-info" v-for="(tag, index) in item.tags">
            <div class="h-2 w-2 rounded-full bg-current"></div>
            <span>{{ tag }}</span>
          </div>
        </template>

      </div>
      <div class="flex -space-x-1.5">
        <AssignedList :max_users="2" :users="item.assignees"/>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>