<script setup>
import InputField from "../../../../components/inputs/InputField.vue";
import {computed, onMounted, reactive, ref} from "vue";
import ModalComponent from "../../../../components/ModalComponent.vue";
import TextAreaField from "../../../../components/inputs/TextAreaField.vue";
import {useRolesStore} from "../__rolesStore.js";

const emit = defineEmits(['recordCreated'])

const props = defineProps({

})

const form = ref({})
const errors = ref({})

const rolesStore = useRolesStore()

const page = {
  title: 'Create Role',
  button_icon: 'fa fa-plus',
  background: 'primary',
  color: 'white',
  id: 'create_role',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await rolesStore.save(form.value)
  if (response.value.status === false) {
    loading.value = false
    if (response.value.message === "ERR_VALIDATION") {
      response.value.message = 'Validation Error'
      errors.value = response.value.errors
    }
  } else {
    setTimeout(() => {
      loading.value = false
      emit('recordCreated')
      document.getElementById(page.id + '_btn_cancel').click();
    },1500);
  }
}

const validateForm = computed(() => {
  let errors = 0;
  if (form.value.name === null || form.value.name === '')
    errors++;

  if (form.value.title === null || form.value.title === '')
    errors++;

  if (form.value.description === null || form.value.description === '')
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
      class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-indigo-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    <span> {{ page.title }}</span>
  </button>
  <ModalComponent
    :id="page.id"
    :title="page.title">

    <div class="space-y-5">

      <form class="flex flex-col space-y-4">

        <InputField
            id="roleName"
            placeholder="Enter Name."
            title="Name"
            v-model="form.name"
            type="text"
            :error="errors.name"
        />

        <InputField
            id="roleTitle"
            placeholder="Enter Title."
            title="Title"
            v-model="form.title"
            type="title"
            :error="errors.title"
        />

        <TextAreaField
            id="description"
            placeholder="Enter Description"
            title="Description"
            v-model="form.description"
            :error="errors.description"
        />

      </form>

      <div class="space-x-2 text-right">
        <button
            :id="page.id + '_btn_cancel'"
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
          <span v-else>Save</span>
        </button>
      </div>
    </div>

  </ModalComponent>
</template>

<style scoped>

</style>