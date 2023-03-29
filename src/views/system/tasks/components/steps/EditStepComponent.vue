<script setup>
import Notifier from "../../../../../components/Notifier.vue";
import InputField from "../../../../../components/inputs/InputField.vue";
import TextAreaField from "../../../../../components/inputs/TextAreaField.vue";
import FileInputField from "../../../../../components/inputs/FileInputField.vue";
import {computed, ref} from "vue";
import {Validator} from "../../../../../assets/js/utils/validator.js";
import {useTasksStore} from "../../__tasksStore.js";

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  form: {type: Object},
  task_id: {type: String},
  record_id: {type: String},
  page: {}
})
const store = useTasksStore()
const response = ref({})
const errors = ref({})

const loading = ref(false)

const submit = async () => {
  loading.value = true;
  const data = {
    title: props.form.title,
    description: props.form.description,
    files: props.form.files,
  }
  response.value = await store.editTaskStep(props.task_id, props.record_id, data)
  if (response.value.status === false) {
    loading.value = false
    if (response.value.message === "ERR_VALIDATION") {
      response.value.message = 'Validation Error'
      errors.value = response.value.errors
    }
  } else {
    setTimeout(() => {
      emit('recordUpdated')
      response.value = {}
      loading.value = false
      destroy();
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
  let errors = Validator.make(props.form, rules, messages);
  return Object.keys(errors).length > 0;
})


</script>

<template>

  <Notifier :response="response" />
  <form class="flex flex-col space-y-5">

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
</template>

<style scoped>

</style>