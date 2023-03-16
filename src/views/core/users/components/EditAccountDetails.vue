<script setup>
import DrawerComponent from "../../../../components/DrawerComponent.vue";
import InputField from "../../../../components/inputs/InputField.vue";
import {computed, onMounted, reactive, ref} from "vue";
import SelectField from "../../../../components/inputs/SelectField.vue";
import {useUsersStore} from "../__usersStore.js";
import Notifier from "../../../../components/Notifier.vue";

const emit = defineEmits(['accountUpdated'])

const props = defineProps({
  user: {type: Object},
  user_id: {type: String},
})

const form = ref({})
const errors = ref({})

const userStore = useUsersStore()

const splash = ref({})

const init = async () => {
  await userStore.getSplashData()
  splash.value = userStore.splash;

  form.value = JSON.parse(JSON.stringify(props.user))
}

const destroy = async () => {
  form.value = response.value = {};
}

const page = {
  id:'edit_account_details_drawer',
  title: 'Edit Account Details',
  button_icon: 'fa fa-edit',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await userStore.updateAccountDetails(props.user_id, form.value)
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

</script>

<template>
  <button
      data-toggle="drawer"
      :data-target="'#' + page.id"
      class="drawer-toggle flex h-8 p-4 w-full items-center justify-center rounded-lg bg-primary hover:bg-primary-focus text-white"
  >
    <i :class="page.button_icon" class="text-base mr-2"></i> {{ page.title }}
  </button>
  <DrawerComponent
      @drawer-open="init"
      @drawer-close="destroy"
      class="w-full"
      :id="page.id"
      :title="page.title"
      content_class = "w-[300px]"
  >
    <Notifier :response="response" />
    <div
        class="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto p-4"
    >
      <InputField
          id="userName"
          placeholder="Enter Name."
          title="Name"
          v-model="form.name"
          type="text"
          :error="errors.name"
      />

      <InputField
          id="userEmail"
          placeholder="Enter Email."
          title="Email"
          v-model="form.email"
          type="email"
          :error="errors.email"
      />

      <SelectField
          id="userType"
          label-field="title"
          :options="splash.user_types"
          placeholder="Select User Type"
          search-field="title"
          title="User Type"
          value-field="urid"
          v-model="form.user_type_id"
          :multiple="false"
          :error="errors.user_type_id"
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