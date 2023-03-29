<script setup>
import CheckboxField from "../../../../../components/inputs/CheckboxField.vue";
import {ref} from "vue";
import {useTasksStore} from "../../__tasksStore.js";
import Notifier from "../../../../../components/Notifier.vue";

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  files: {},
  record_id: {},
  task_id: {},
})

const form=ref({
  removeFiles: []
})

const errors = ref({})
const response = ref({})
const loading = ref(false)

const store = useTasksStore();

const removeFiles = async () => {
  loading.value = true;
  response.value = await store.removeTaskStepFiles(props.task_id, props.record_id, form.value.removeFiles)
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
    },1500);
  }

}
</script>

<template>
  <div class="mb-3 text-center">
    <span
        class="text-sm text-slate-600  dark:text-navy-100"
    >
      Existing Files
    </span>
  </div>
  <div>
    <div class="flex flex-col text-xs+" v-if="files && files.length > 0">
      <Notifier :response="response" />
      <div class="flex-1 flex flex-row items-center justify-between dark:text-navy-100 hover:text-primary dark:hover:text-primary" v-for="(file, index) in files">
        <CheckboxField
            :value="file.urid"
            v-model="form.removeFiles"
            :id="'remove_files'"
            :error="errors.removeFiles"
            :title="''"
            :multiple="true"
        />
        <div
            class="flex-1 flex-row inline-flex cursor-pointer items-center space-x-1 pt-2 transition-colors  "
        >
          <span class="text-xs+ flex-1">
            <i class="h-5 w-5 fa fa-file-download"></i>
            {{ file.original_name }}
          </span>
        </div>
      </div>

    </div>
    <div
        class="mt-20">
      <CheckboxField
          :true_value="true"
          :false_value="false"
          v-model="form.confirm"
          :id="'confirm_remove'"
          :style="'square'"
          :title="'Are you sure you want to remove these files?'"
      />
    </div>

  </div>

  <div class="space-x-2 text-right mt-3">

    <button
        @click="removeFiles"
        :disabled="loading || form.removeFiles.length === 0 || !form.confirm"
        :class=" `bg-error hover:bg-error-focus text-white border border-error`"
        class="btn min-w-[7rem] h-[2.3rem] rounded-full font-medium disabled:pointer-events-none disabled:select-none disabled:opacity-60"
    >
      <span
          v-if="loading"
          class="flex fa fa-circle-notch fa-spin"
      >
      </span>
      <span v-else>Remove Files</span>
    </button>
  </div>
</template>


<style scoped>

</style>