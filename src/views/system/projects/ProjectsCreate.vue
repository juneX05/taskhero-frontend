<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import {onMounted, reactive, ref} from "vue";
import SelectField from "../../../components/inputs/SelectField.vue";
import InputField from "../../../components/inputs/InputField.vue";
import WYSIWYG from "../../../components/inputs/WYSIWYG.vue";
import FileInputField from "../../../components/inputs/FileInputField.vue";
import {useProjectsStore} from "./__projectsStore.js";
import Notifier from "../../../components/Notifier.vue";
import {Validator} from "../../../assets/js/utils/validator.js";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore()

const splash = ref({})

const init = async () => {
  const response = await projectsStore.getSplashData()
  console.log(response);
  if (response.status) {
    splash.value = response.data;
  }
}

onMounted( async () => {
  await init()
})

let form = reactive({})

const loading = ref(false)
const response = ref({})
const errors = ref({})

const validate = (key = null) => {
  const rules = {
    title: {required: true,},
    description: {required: true,},
    assigned: {required: true, type:'array'},
    priority_id: {required: true},
    project_category_id: {required: true},
    image: {required: true},
  }
  const messages = {
    title: { required: 'Title is required' },
    description: { required: 'Description is required' },
    assigned: { required: 'Please select at least one user' },
    priority_id: { required: 'Priority is required' },
    project_category_id: { required: 'Project Category is required' },
    image: { required: 'Please upload an image to be used as project logo' },
  }
  return Validator.make(form, rules, messages);
}

const submit = async () => {
  response.value = {};
  loading.value = true;
  errors.value = await validate();

  if (Object.keys(errors.value).length > 0){
    loading.value = false;
    return;
  }

  response.value = await projectsStore.save(form)
  if (response.value.status === false) {
    if (response.value.message === "ERR_VALIDATION") {
      response.value.message = 'Validation Error'
      errors.value = response.value.errors
    }
    loading.value = false
    return;
  }

  setTimeout(async () => {
    await router.push({name: 'projects-index'});
    loading.value = false
  },1000);
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
      <Notifier :response="response" />
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
                :options="splash.priorities"
                placeholder="Select Priority"
                search-field="name"
                title="Priority"
                value-field="id"
                v-model="form.priority_id"
                :multiple="false"
                :error="errors.priority_id"
            />

            <SelectField
                id="projectCategory"
                label-field="name"
                :options="splash.categories"
                placeholder="Select Category"
                search-field="name"
                title="Category"
                value-field="id"
                v-model="form.project_category_id"
                :error="errors.project_category_id"
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

            <SelectField
                id="projectUsers"
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
    </main>
  </Layout>
</template>

<style scoped>


</style>
