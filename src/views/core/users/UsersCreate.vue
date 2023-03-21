<script setup>
import Layout from '../../../layouts/Main.vue'
import {useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, ref} from "vue";
import SelectField from "../../../components/inputs/SelectField.vue";
import InputField from "../../../components/inputs/InputField.vue";
import icons from "../../../data/icons.js";
import {useUsersStore} from "./__usersStore.js";
import Notifier from "../../../components/Notifier.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const userStore = useUsersStore()

const splash = ref({})
const init = async () => {
  await userStore.getSplashData()
  splash.value = userStore.splash;
}

onMounted(async () => {
  await init()
})

let form = reactive({})


const errors = ref({})
const response = ref({})

const submit = async () => {
  const {data, count} = userStore.validator(form);
  errors.value = data;

  if (count > 0) {
    console.log('DATA', form)
    console.log('MESSAGES', data)
  } else {
    response.value = await userStore.save(form)
    console.log(response);
    if (response.value.status === false) {
      userStore.loading = false;
      if (response.value.message === "ERR_VALIDATION") {
        response.value.message = 'Validation Error'
        errors.value = response.value.errors
      }
    } else {
      setTimeout(() => {
        router.push({name: 'users-index'})
        userStore.loading = false;
      },1500);
    }
  }

}
</script>

<template>

  <Layout>
    <!-- Main Content Wrapper -->
    <main class="main-content w-full px-[var(--margin-x)] pb-8">
      <div
          class="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6"
      >
        <div class="flex items-center space-x-1">
          <span v-html="icons.user"></span>
          <h2
              class="text-xl font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            New User
          </h2>
        </div>
        <div class="flex justify-center space-x-2">
          <button
              @click="submit"
              :disabled="userStore.loading"
              class="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            <span v-if="userStore.loading" class="fa fa-circle-notch fa-spin"></span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
      <Notifier :response="response" class="mb-4"/>
      <div class="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">

        <div class="col-span-12 lg:col-span-8">
          <div class="card space-y-5 p-4 sm:p-5">

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

            <InputField
                id="userPassword"
                placeholder="Enter Password."
                title="Password"
                v-model="form.password"
                type="password"
                :error="errors.password"
            />

            <InputField
                id="userPasswordConfirmation"
                placeholder="Enter Password Confirmation."
                title="Password Confirmation"
                v-model="form.password_confirmation"
                type="password"
                :error="errors.password_confirmation"
            />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="card space-y-5 p-4 sm:p-5">

            <SelectField
                id="userType"
                label-field="title"
                :options="splash.user_types"
                placeholder="Select User Type"
                search-field="title"
                title="User Type"
                value-field="id"
                v-model="form.user_type_id"
                :multiple="false"
                :error="errors.user_type_id"
            />

            <SelectField
                id="userRole"
                label-field="title"
                :options="splash.roles"
                placeholder="Select User Role"
                search-field="title"
                title="User Role"
                value-field="id"
                v-model="form.role_id"
                :multiple="false"
                :error="errors.role_id"
            />

          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>


</style>
