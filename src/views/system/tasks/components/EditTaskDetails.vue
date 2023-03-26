<script setup>
import DrawerComponent from "../../../../components/DrawerComponent.vue";
import InputField from "../../../../components/inputs/InputField.vue";
import {computed, onMounted, reactive, ref} from "vue";
import SelectField from "../../../../components/inputs/SelectField.vue";
import {useTasksStore} from "../__tasksStore.js";
import Notifier from "../../../../components/Notifier.vue";
import WYSIWYG from "../../../../components/inputs/WYSIWYG.vue";
import {Validator} from "../../../../assets/js/utils/validator.js";
import TextAreaField from "../../../../components/inputs/TextAreaField.vue";

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  record: {type: Object},
  record_id: {type: String},
})

const form = ref({})
const errors = ref({})

const store = useTasksStore()

const splash = ref({})

const init = async () => {
  const response = await store.getSplashData()
  if (response.status) {
    splash.value = response.data;
  }

  form.value = JSON.parse(JSON.stringify(props.record))
}

const destroy = async () => {
  form.value = response.value = {};
}

const page = {
  id:'edit_task_details_drawer',
  title: 'Edit Task Details',
  button_icon: 'fa fa-edit',
}

const response = ref({})
const loading = ref(false)

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
}

const submit = async () => {
  response.value = {};
  loading.value = true;
  errors.value = await validate();

  if (Object.keys(errors.value).length > 0){
    loading.value = false;
    return;
  }

  response.value = await store.update(props.record_id, form.value)
  if (response.value.status === false) {
    if (response.value.message === "ERR_VALIDATION") {
      response.value.message = 'Validation Error'
      errors.value = response.value.errors
    }
    loading.value = false
    return;
  }

  setTimeout(async () => {
    emit('recordUpdated')
    document.getElementById('btn_cancel').click();
    loading.value = false
  },1000);
}

</script>

<template>
  <button
      data-toggle="drawer"
      :data-target="'#' + page.id"
      class="drawer-toggle h-8 items-center justify-center rounded-lg bg-primary hover:bg-primary-focus text-white"
  >
    <i :class="page.button_icon" class="text-base mr-2"></i> {{ page.title }}
  </button>
  <DrawerComponent
      @drawer-open="init"
      @drawer-close="destroy"
      class=""
      :id="page.id"
      :title="page.title"
      content_class = "w-[300px]"
  >
    <Notifier :response="response" />
    <div
        class="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto p-4"
    >

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
    <div
        class="flex items-center justify-between border-t border-slate-150 py-3 px-4 dark:border-navy-600"
    >
      <div class="flex space-x-1">

        <button
            id="btn_cancel"
            class="drawer-close btn min-w-[7rem] bg-warning font-medium text-white hover:bg-warning-focus focus:bg-warning-focus active:bg-warning-focus/90 "
        >
          Cancel
        </button>
      </div>
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
  </DrawerComponent>
</template>

<style scoped>

</style>