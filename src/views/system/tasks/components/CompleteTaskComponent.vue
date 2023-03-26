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

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  record: {type: Object},
  record_id: {type: String},
})

const form = ref({})
const errors = ref({})

const store = useTasksStore()

const page = {
  title: 'Complete Task',
  button_icon: 'fa fa-check',
  background: 'success',
  color: 'white',
  id: 'complete_task',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await store.completeTask(props.record_id, form.value)
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
  let errors = 0;
  if (form.value.confirm === undefined || form.value.confirm === false)
    errors++;

  if (form.value.notes === null || form.value.notes === '')
    errors++;

  return errors > 0;
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
        <TextAreaField
            id="notes"
            placeholder="Enter Notes."
            title="Notes:"
            v-model="form.notes"
            :error="errors.notes"
        />

        <CheckboxField
            v-model="form.confirm"
          :id="'confirm'"
          :false_value="false"
          :true_value="true"
          :error="errors.confirm"
          :title="`Are you sure you want complete task <b>${record.title}</b>?`"
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