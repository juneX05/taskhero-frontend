<script setup>
import DrawerComponent from "../../../../components/DrawerComponent.vue";
import InputField from "../../../../components/inputs/InputField.vue";
import {computed, onMounted, reactive, ref} from "vue";
import SelectField from "../../../../components/inputs/SelectField.vue";
import {useUsersStore} from "../__usersStore.js";
import Notifier from "../../../../components/Notifier.vue";
import ModalComponent from "../../../../components/ModalComponent.vue";
import TextAreaField from "../../../../components/inputs/TextAreaField.vue";
import CheckboxField from "../../../../components/inputs/CheckboxField.vue";

const emit = defineEmits(['accountUpdated'])

const props = defineProps({
  user: {type: Object},
  user_id: {type: String},
})

const form = ref({})
const errors = ref({})

const userStore = useUsersStore()

const page = {
  title: 'Deactivate User',
  button_icon: 'fa fa-lock',
  background: 'error',
  color: 'white',
  id: 'deactivate_user',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await userStore.deactivateUser(props.user_id, form.value)
  if (response.value.status === false) {
    loading.value = false
    if (response.value.message === "ERR_VALIDATION") {
      response.value.message = 'Validation Error'
      errors.value = response.value.errors
    }
  } else {
    setTimeout(() => {
      loading.value = false
      emit('accountUpdated')
      document.getElementById('btn_cancel').click();
    },1500);
  }

}

const validateForm = computed(() => {
  let errors = 0;
  if (form.value.confirm_deactivation === undefined || form.value.confirm_deactivation === false)
    errors++;

  if (form.value.reason === null || form.value.reason === '')
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
      class=" flex h-8 p-4 w-full items-center justify-center rounded-lg "
  >
    <i :class="page.button_icon" class="text-base mr-2"></i> {{ page.title }}
  </button>
  <ModalComponent
    :id="page.id"
    :title="page.title">

    <div class=" space-y-5">

      <form class="space-y-5">
        <TextAreaField
            id="deactivationReason"
            placeholder="Enter Deactivation Reason."
            title="Reason:"
            v-model="form.reason"
            :error="errors.reason"
        />

        <CheckboxField
            v-model="form.confirm_deactivation"
          :id="'confirm_deactivation'"
          :false_value="false"
          :true_value="true"
          :error="errors.confirm_deactivation"
          :title="`Are you sure you want to deactivate user <b>${user.name}</b>?`"
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
            :class=" `bg-${page.background} hover:bg-${page.background}-focus text-${page.color} border border-error`"
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