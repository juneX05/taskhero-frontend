<script setup>
import DrawerComponent from "../../../../components/DrawerComponent.vue";
import InputField from "../../../../components/inputs/InputField.vue";
import {computed, onMounted, reactive, ref} from "vue";
import SelectField from "../../../../components/inputs/SelectField.vue";
import {useUsersStore} from "../__usersStore.js";
import Notifier from "../../../../components/Notifier.vue";
import ModalComponent from "../../../../components/ModalComponent.vue";

const emit = defineEmits(['accountUpdated'])

const props = defineProps({
  user: {type: Object},
  user_id: {type: String},
})

const form = ref({})
const errors = ref({})

const userStore = useUsersStore()

const page = {
  title: 'Complete User Registration',
  button_icon: 'fa fa-check',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await userStore.completeUserRegistration(props.user_id)
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

onMounted( () => {
  new Modal('#complete_user_registration')
})

</script>

<template>
  <button
      data-toggle="modal" data-target="#complete_user_registration"
      class=" flex h-8 p-4 w-full items-center justify-center rounded-lg bg-success hover:bg-success-focus text-white"
  >
    <i :class="page.button_icon" class="text-base mr-2"></i> {{ page.title }}
  </button>
  <ModalComponent
    :id="'complete_user_registration'"
    :title="'Complete User Registration'">

    <div class=" space-y-5">

      <div>
        Are you sure you want to complete the registration of user {{user.name}}?
      </div>

      <div class="space-x-2 text-right">
        <button
            data-close-modal
            class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
        >
          Cancel
        </button>
        <button
            @click="submit"
            :disabled="loading"
            class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
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
          <span v-else>Yes, Complete</span>
        </button>
      </div>
    </div>

  </ModalComponent>
</template>

<style scoped>

</style>