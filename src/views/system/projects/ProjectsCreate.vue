<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import {useTasksStore} from "../../../stores/tasksStore.js";
import {onMounted, reactive} from "vue";
import {useGlobalStore} from "../../../stores/globalStore.js";
import {useProjectsStore} from "../../../stores/projectsStore.js";
import SelectField from "../../../components/inputs/SelectField.vue";
import InputField from "../../../components/inputs/InputField.vue";
import SelectAssignUsers from "../../../components/SelectAssignUsers.vue";
import WYSIWYG from "../../../components/inputs/WYSIWYG.vue";
import FileInputField from "../../../components/inputs/FileInputField.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const userStore = useGlobalStore()
const users = userStore.users
const tags = userStore.tags

const projectsStore = useProjectsStore()
const categories = projectsStore.categories

const init = () => {

}

onMounted( () => {
  init()
})

let form = reactive({
  assigned: [],
})

const errors = reactive({})

const submit = () => {
  const { data, count } = projectsStore.validator(form);
  Object.keys(data).forEach( (item) => {
    errors[item] = data[item]
  })

  if(count > 0) {
    console.log('PROJECT', form)
    console.log('MESSAGES',data)
  } else {
    projectsStore.save(form)
  }

}
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
            <rect width="12" height="10" x="6" y="3" fill="currentColor" fill-opacity=".25" rx="2"></rect>
            <path fill="currentColor" d="M3 10h14.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 11.52 21 12.08 21 13.2v4.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8V10Zm0 0c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C4.602 7 5.068 7 6 7h2.343c.818 0 1.226 0 1.594.152.368.152.657.442 1.235 1.02L13 10H3Z"></path>
          </svg>
          <h2
              class="text-xl font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            New Project
          </h2>
        </div>
        <div class="flex justify-center space-x-2">
          <button
              @click="submit"
              class="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            Save
          </button>
        </div>
      </div>
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
                  />

                  <WYSIWYG
                      id="taskDescription"
                      placeholder="Enter description for the task"
                      title="Description"
                      v-model="form.description"
                      :error="errors.description"
                  />

                  <FileInputField
                      v-model="form.image"
                      :error="errors.image"
                      title="Image/Logo"
                      id="project_image"
                      accept="image/png, image/jpeg, image/gif"
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="card space-y-5 p-4 sm:p-5">

            <SelectField
                id="projectPriority"
                label-field="name"
                :options="[
                    {id:1, name:'High'},
                    {id:2, name:'Medium'},
                    {id:3, name:'Low'},
                ]"
                placeholder="Select Priority"
                search-field="name"
                title="Priority"
                value-field="id"
                v-model="form.priority"
                :multiple="false"
                :error="errors.priority"
            />

            <SelectField
                id="projectCategory"
                label-field="name"
                :options="categories"
                placeholder="Select Category"
                search-field="name"
                title="Category"
                value-field="id"
                v-model="form.project"
                :multiple="false"
            />

            <InputField
                id="projectStartDate"
                placeholder="Chose Date..."
                title="Start Date"
                v-model="form.start_date"
                icon="calendar"
                type="date"
                :error="errors.start_date"
            />

            <InputField
                id="projectEndDate"
                placeholder="Chose Date..."
                title="End Date"
                v-model="form.end_date"
                icon="calendar"
                type="date"
                :error="errors.end_date"
            />


            <SelectAssignUsers v-model="form.assigned" :error="errors.assigned" />
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>


</style>
