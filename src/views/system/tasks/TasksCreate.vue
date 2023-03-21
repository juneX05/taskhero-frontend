<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import {onMounted, reactive, ref, watch} from "vue";
import SelectField from "../../../components/inputs/SelectField.vue";
import InputField from "../../../components/inputs/InputField.vue";
import WYSIWYG from "../../../components/inputs/WYSIWYG.vue";
import {useTasksStore} from "./__tasksStore.js";
import Notifier from "../../../components/Notifier.vue";
import { Validator } from "../../../assets/js/utils/validator.js";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore()

const splash = ref({})
const loading = ref(false)

const init = async () => {
  const response = await tasksStore.getSplashData()
  console.log(response);
  if (response.status) {
    splash.value = response.data;
  }
}

onMounted( async () => {
  await init()
})

const form = ref({})
const errors = ref({})
const response = ref({})

const validate = (key = null) => {
  const rules = {
    title: {required: true,},
    description: {required: true,},
    assigned: {required: true, type:'array'},
    priority_id: {required: true},
  }
  const messages = {
    title: { required: 'Title is required' },
    description: { required: 'Description is required' },
    assigned: { required: 'Please select at least one user' },
    priority_id: { required: 'Priority is required' },
  }
  return Validator.make(form.value, rules, messages);
  // if (key != null) {
  //   return errors.filter( (item) => item. )
  // }
}

const submit = async () => {
  response.value = {};
  loading.value = true;
  errors.value = validate();

  if (Object.keys(errors.value).length === 0) {
    console.log(form.value);
    response.value = await tasksStore.save(form.value)
    if (response.value.status) {
      setTimeout(async () => {
        await router.push({name: 'tasks-index'});
        loading.value = false;
      },1000);
    } else {
      loading.value = false
    }

  } else {
    loading.value = false;
  }
}

// watch(form, async (newValue, oldValue) => {
//   const { data, count } = validate();
//   errors.value = data
// }, { deep:true })
</script>

<template>

  <Layout>
    <!-- Main Content Wrapper -->
    <main class="main-content w-full px-[var(--margin-x)] pb-8">
      <div
          class="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6"
      >
        <div class="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.2"
                  d="m8 13 4.228 3.382a1 1 0 0 0 1.398-.148L22 6"/>
            <path fill="currentColor" fill-opacity=".3" fill-rule="evenodd"
                  d="m10.565 12.368 4.9-5.988a.6.6 0 0 0-.93-.76L9.644 11.6l.922.768Zm-2.533 3.096-.922-.769-.967 1.183a.4.4 0 0 1-.55.067L2.36 13.52a.6.6 0 0 0-.72.96l3.233 2.425a1.6 1.6 0 0 0 2.198-.267l.961-1.174Z"/>
          </svg>
          <h2
              class="text-xl font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            New Task
          </h2>
        </div>
        <div class="flex justify-center space-x-2">
          <button
              @click="submit"
              :disabled="loading"
              class="btn h-[2.3rem] relative min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            <span
                v-if="loading"
                class="absolute flex h-3 w-3 items-center justify-center"
            >
              <span
                  class="absolute  h-full w-full animate-ping rounded-full bg-secondary opacity-80"
              ></span>
              <span
                  class="h-2 w-2 rounded-full bg-secondary"
              ></span>
            </span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
      <Notifier :response="response" class="mb-4"/>
      <div class="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        <div class="col-span-12 lg:col-span-8">
          <div class="card">
            <div class="tabs flex flex-col">
              <div class="p-4 sm:p-5">
                <div class="space-y-5">

                  <InputField
                      id="taskTitle"
                      placeholder="Enter Title."
                      title="Title"
                      v-model="form.title"
                      type="text"
                      :error="errors.title"
                      @change="validate('title')"
                  />

                  <WYSIWYG
                      id="taskDescription"
                      placeholder="Enter description for the task"
                      title="Description"
                      v-model="form.description"
                      :error="errors.description"
                  />

                  <SelectField
                      id="taskUsers"
                      label-field="name"
                      :options="splash.users"
                      placeholder="Select User"
                      search-field="name"
                      title="Assigned"
                      value-field="urid"
                      v-model="form.assigned"
                      :multiple="true"
                      :error="errors.assigned"
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="card space-y-5 p-4 sm:p-5">

            <SelectField
                id="taskPriority"
                label-field="name"
                :options="splash.priorities"
                placeholder="Select Priority"
                search-field="name"
                title="Priority"
                value-field="urid"
                v-model="form.priority_id"
                :multiple="false"
                :error="errors.priority_id"
            />

            <SelectField
                id="taskProjects"
                label-field="title"
                :options="splash.projects"
                placeholder="Select Project"
                search-field="title"
                title="Project"
                value-field="urid"
                v-model="form.project_id"
                :error="errors.project_id"
                :multiple="false"
            />

            <SelectField
                id="taskTags"
                label-field="title"
                :options="splash.tags"
                placeholder="Add Tag"
                search-field="title"
                title="Tags"
                value-field="urid"
                v-model="form.task_tags"
                :error="errors.task_tags"
                :multiple="true"
            />

            <InputField
                id="taskStartDate"
                placeholder="Chose Date..."
                title="Start Date"
                v-model="form.start_date"
                icon="calendar"
                type="date"
                :error="errors.start_date"
            />

            <InputField
                id="taskEndDate"
                placeholder="Chose Date..."
                title="End Date"
                v-model="form.end_date"
                icon="calendar"
                type="date"
                :error="errors.end_date"
            />
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>


</style>
