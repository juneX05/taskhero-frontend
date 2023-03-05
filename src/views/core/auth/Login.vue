<script setup>
import { useRoute, useRouter } from 'vue-router';
import {inject, reactive, ref} from 'vue'
import {useGlobalStore} from "../../../stores/globalStore.js";
import InputField from "../../../components/inputs/InputField.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const form = reactive({})

const globalStore = useGlobalStore();

const message = ref()
const errors = reactive({})

const submit = async data => {
  const response = await globalStore.login(form);
  if (!response.status) {
    Object.keys(response.errors).forEach( (item) => {
      errors[item] = response.errors[item]
    })
  } else {
    setTimeout(() => {
      localStorage.setItem('auth', "true");
      localStorage.setItem('token', response.data.token);
      router.push({name: 'dashboard'});
      globalStore.loading = false;
    },1500);
  }
  message.value = response.message
}
</script>

<template>

  <!-- Main Content Wrapper -->
  <main class="grid w-full grow grid-cols-1 place-items-center">
    <div class="w-full max-w-[26rem] p-4 sm:px-5">
      <div class="text-center">
        <img
            class="mx-auto h-16 w-16 block dark:hidden"
            src="/src/assets/images/app-logo.svg"
            alt="logo"
        />
        <img
            class="mx-auto h-16 w-16 hidden dark:block"
            src="/src/assets/images/app-logo-white.svg"
            alt="logo"
        />
        <div class="mt-4">
          <img
              class="mx-auto w-[70%] block dark:hidden"
              src="/src/assets/images/app-logo-text.svg"
              alt="logo"
          />
          <img
              class="mx-auto w-[70%] hidden dark:block"
              src="/src/assets/images/app-logo-text-white.svg"
              alt="logo"
          />

          <p class="text-slate-400 dark:text-navy-300">
            Please sign in to continue
          </p>
        </div>
      </div>
      <div class="card mt-5 rounded-lg p-5 lg:p-7">
        <form @submit.prevent = "submit">
          <div class="space-y-3 flex flex-col">
            <InputField
                v-model="form.email"
                id="email"
                icon="message"
                placeholder="Enter email"
                title="Email"
                :error="errors.email"
            />

            <InputField
                v-model="form.password"
                id="password"
                icon="lock"
                placeholder="Enter Password"
                title="Password"
                :error="errors.password"
                type="password"
            />

            <button
                :disabled="globalStore.loading"
                class="btn mt-5 w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
            >
              <span v-if="!globalStore.loading">Sign In</span>
              <span v-else class="fa fa-circle-notch fa-spin"></span>
            </button>
          </div>

          <div class="mt-4 text-center flex items-center justify-center space-x-2">
            <router-link
                :to="{ name:'forgot-password' }"
                class="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100"
            >Forgot Password?</router-link>
          </div>
<!--          <div class="mt-4 text-center text-xs+">-->
<!--            <p class="line-clamp-1">-->
<!--              <span>Dont have Account? </span>-->

<!--              <a-->
<!--                  class="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent"-->
<!--                  href="pages-singup-1.html"-->
<!--              >Create account</a-->
<!--              >-->
<!--            </p>-->
<!--          </div>-->
          <div class="my-7 flex items-center space-x-3">
            <div class="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
            <p>OR</p>
            <div class="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
          </div>
          <div class="flex space-x-4">
            <button
                class="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
            >
              <img
                  class="h-5.5 w-5.5"
                  src="/src/assets/images/100x100.png"
                  alt="logo"
              />
              <span>Google</span>
            </button>
            <button
                class="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
            >
              <img
                  class="h-5.5 w-5.5"
                  src="/src/assets/images/100x100.png"
                  alt="logo"
              />
              <span>Github</span>
            </button>
          </div>
        </form>
      </div>
      <div
          class="mt-8 flex justify-center text-xs text-slate-400 dark:text-navy-300"
      >
        <a href="#">Privacy Notice</a>
        <div class="mx-3 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
        <a href="#">Term of service</a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
