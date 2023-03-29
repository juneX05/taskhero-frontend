<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useTasksStore} from "../../__tasksStore.js";
import {timePassed} from "../../../../../assets/js/utils/helpers.js";

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  record: {type: Object},
  record_id: {type: String},
})

const form = ref({})
const errors = ref({})

const store = useTasksStore()

const page = {
  title: 'Step history',
  button_icon: 'fa fa-clock-rotate-left',
  background: 'primary',
  color: 'white',
  id: 'task_history',
}

const response = ref({})
const loading = ref(false)

const records = ref([])

const init = async () => {
  const response = await store.getTaskStepHistory(props.record_id)
  if (response.status) {
    records.value = response.data
  }
}

const checkHidden = (key) => {
  let hiddenKeys = [
    'id',
    'created_at'
    , 'updated_at'
    , 'priority_id'
    , 'project_id'
    , 'task_id'
    , 'urid'
  ]
  return !hiddenKeys.includes(key);
}

const resolveValue = (key, value) => {
  let keys = {
    priority: 'title',
    step: ['title', 'description'],
    project: 'title',
    status: 'title',
    files: 'name',
    tags: 'title',
  }
  if (Object.keys(keys).includes(key)) {
    if (Array.isArray(value) && value.length > 0) {
      return value.map((n) => n[keys[key]]).join(', ')
    } else {
      if (value === undefined || value === null) return '';

      if (Array.isArray(keys[key])){
        let values = keys[key];
        let data = '';
        values.forEach( (item) => {
          data += `<b>${item}</b>: ${value[item]} <br/>`
        })
        return data;
      }

      return  value[keys[key]]
    }
  }

  return value;
}

onMounted( () => {
  init()
})

</script>

<template>

  <div class=" space-y-5">

    <div class="mx-3">
      <p>
        The timeline displays a list of events in chronological order.
      </p>
      <div class="mt-5">
        <ol class="timeline ">
          <li class="timeline-item" v-for="(record, index) in records" :key="index">
            <div
                class="timeline-item-point rounded-full bg-slate-300 dark:bg-navy-400"
            ></div>
            <div class="timeline-item-content flex-1 pl-4 sm:pl-8">
              <div
                  class="flex flex-col justify-between pb-2 sm:flex-row sm:pb-0"
              >

                <div id="accordion_exapmple_1" class=" flex flex-col w-full">
                  <div class="ac [&.is-active_.ac-icon]:-rotate-180">
                    <div
                        class="ac-trigger flex cursor-pointer items-center justify-between text-base font-medium text-slate-700 dark:text-navy-100"
                    >
                      <p
                          class="flex flex-col space-y-2 pb-2 font-medium leading-none text-slate-600 dark:text-navy-100 sm:pb-0"
                      >
                        <span>{{ record.action_name }}</span>

                        <span class="text-xs text-slate-400 dark:text-navy-300">{{ timePassed(record.created_at) }} |
                          {{ record.request.user }}
                        </span>
                        <span class="text-xs text-slate-400 dark:text-navy-300"></span>
                      </p>

                      <div
                          class="ac-icon text-sm font-normal leading-none text-slate-400 transition-transform duration-300 dark:text-navy-300"
                      >
                        <i class="fas fa-chevron-down"></i>
                      </div>
                    </div>
                    <div class="ac-panel w-full">
                      <div class="flex">

                        <div
                            class="is-scrollbar-hidden min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500"
                        >
                          <table class="w-full text-left">
                            <thead>
                            <tr>
                              <th>Key</th>
                              <th>Old</th>
                              <th>New</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(key, index) in Object.keys(record.new_data)">
                              <tr v-if="checkHidden(key) && resolveValue(key, record.old_data[key]) !== resolveValue(key, record.new_data[key]) ">
                                <th
                                    class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5"
                                    v-html="key"
                                >
                                </th>
                                <td
                                    class=" border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5"
                                    v-html="resolveValue(key, record.old_data[key])"
                                >
                                </td>
                                <td
                                    class=" border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5"
                                    v-html="resolveValue(key, record.new_data[key])"
                                >
                                </td>

                              </tr>
                            </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>