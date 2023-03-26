<script setup>
import DrawerComponent from "../../../../components/DrawerComponent.vue";
import InputField from "../../../../components/inputs/InputField.vue";
import {computed, onMounted, reactive, ref} from "vue";
import SelectField from "../../../../components/inputs/SelectField.vue";
import Notifier from "../../../../components/Notifier.vue";
import ModalComponent from "../../../../components/ModalComponent.vue";
import TextAreaField from "../../../../components/inputs/TextAreaField.vue";
import CheckboxField from "../../../../components/inputs/CheckboxField.vue";
import {useTasksStore} from "../__tasksStore.js";
import FileInputField from "../../../../components/inputs/FileInputField.vue";
import {Validator} from "../../../../assets/js/utils/validator.js";

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  record: {type: Object},
  record_id: {type: String},
})

const form = ref({})
const errors = ref({})

const store = useTasksStore()

const page = {
  title: 'Add Task Step',
  button_icon: 'fa fa-plus',
  background: 'primary',
  color: 'white',
  id: 'add_task_step',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await store.addTaskStep(props.record_id, form.value)
  if (response.value.status === false) {
    loading.value = false
    if (response.value.message === "ERR_VALIDATION") {
      response.value.message = 'Validation Error'
      errors.value = response.value.errors
    }
  } else {
    setTimeout(() => {
      loading.value = false
      emit('recordUpdated')
      document.getElementById('btn_cancel').click();
    },1500);
  }

}

const validateForm = computed(() => {
  const rules = {
    title: {required: true,},
    description: {required: true,},
  }
  const messages = {
    title: { required: 'Title is required' },
    description: { required: 'Description is required' },
  }
  let errors = Validator.make(form.value, rules, messages);
  return Object.keys(errors).length > 0;
})

onMounted( () => {
  new Modal('#' + page.id)
})

</script>

<template>
  <button
      data-toggle="modal" :data-target="`#${page.id}`"
      :class=" `bg-${page.background} hover:bg-${page.background}-focus text-${page.color}`"
      class="  h-8 items-center justify-center rounded-lg "
  >
    <i :class="page.button_icon" class="text-base mr-2"></i> {{ page.title }}
  </button>
  <ModalComponent
    :id="page.id"
    :title="page.title">

    <div class=" space-y-5">
      <Notifier :response="response" />
      <form class="space-y-5">

        <InputField
            id="stepTitle"
            placeholder="Enter Title."
            title="Title"
            v-model="form.title"
            type="text"
            :error="errors.title"
        />

        <TextAreaField
            id="description"
            placeholder="Enter Description."
            title="Description:"
            v-model="form.description"
            :error="errors.description"
        />

        <FileInputField
            v-model="form.files"
            :error="errors.files"
            title="Files"
            id="step_files"
            accept="image/*, application/pdf"
            :multiple="true"
        />
      </form>

      <div class="space-x-2 text-right">
        <button
            data-close-modal
            class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
        >
          Cancel
        </button>
        <button
            @click="submit"
            :disabled="loading || validateForm"
            :class=" `bg-${page.background} hover:bg-${page.background}-focus text-${page.color} border border-${page.background}`"
            class="btn min-w-[7rem] h-[2.3rem] rounded-full font-medium disabled:pointer-events-none disabled:select-none disabled:opacity-60"
        >
          <span
              v-if="loading"
              class="flex fa fa-circle-notch fa-spin"
          >
          </span>
          <span v-else>Yes, {{ page.title }}</span>
        </button>
      </div>
    </div>

  </ModalComponent>
</template>

<style scoped>

</style>