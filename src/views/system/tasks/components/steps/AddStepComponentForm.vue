<template>

  <Notifier :response="response"/>
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
        id="steps_files"
        accept="image/*, application/pdf"
        :multiple="true"
    />
  </form>

  <div class="space-x-2 text-right">
    <button
        @click="submit"
        :disabled="loading || validateForm"
        :class=" `bg-${page.background} hover:bg-${page.background}-focus text-${page.color} border border-${page.background}`"
        class="btn min-w-[7rem] h-[2.3rem] w-full rounded-full font-medium disabled:pointer-events-none disabled:select-none disabled:opacity-60"
    >
      <span
          v-if="loading"
          class="flex fa fa-circle-notch fa-spin"
      >
      </span>
      <span v-else> <i class="fa fa-save mr-2"></i> Save </span>
    </button>
  </div>
</template>
<script setup>
import TextAreaField from "../../../../../components/inputs/TextAreaField.vue";
import InputField from "../../../../../components/inputs/InputField.vue";
import {computed, ref} from "vue";
import {Validator} from "../../../../../assets/js/utils/validator.js";
import Notifier from "../../../../../components/Notifier.vue";
import FileInputField from "../../../../../components/inputs/FileInputField.vue";
import {useTasksStore} from "../../__tasksStore.js";

const emit = defineEmits(['recordSaved'])

const props = defineProps({
  record_id: {},
  page: {}

})

const form = ref({})
const errors = ref({})

const response = ref({})
const loading = ref(false)

const store = useTasksStore()

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
      emit('recordSaved')
      document.getElementById('btn_cancel').click();
    }, 1500);
  }
}

const validateForm = computed(() => {
  const rules = {
    title: {required: true,},
    description: {required: true,},
  }
  const messages = {
    title: {required: 'Title is required'},
    description: {required: 'Description is required'},
  }
  let errors = Validator.make(form.value, rules, messages);
  return Object.keys(errors).length > 0;
})

</script>