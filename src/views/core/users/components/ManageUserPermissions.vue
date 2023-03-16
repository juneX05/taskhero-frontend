<script setup>
import DrawerComponent from "../../../../components/DrawerComponent.vue";
import {ref} from "vue";
import {useUsersStore} from "../__usersStore.js";
import Notifier from "../../../../components/Notifier.vue";
import CheckboxField from "../../../../components/inputs/CheckboxField.vue";

const emit = defineEmits(['accountUpdated'])

const props = defineProps({
  user: {type: Object},
  user_id: {type: String},
})

const form = ref({
  permissions: []
})
const errors = ref({})

const userStore = useUsersStore()

const permissions = ref([])

const init = async () => {
  const response = await userStore.getAllPermissions()
  if (response.status) {
    permissions.value = response.data
  }

  form.value.permissions = permissions.value.map((permission) => {
    let user_permission = props.user.user_permissions.filter((item) => item.id === permission.id)
    return {id:permission.id, selected: user_permission.length > 0}
  })
}

const destroy = async () => {
  form.value = response.value = {};
}

const page = {
  id: 'manage_user_permissions_drawer',
  title: 'Manage User Permissions',
  button_icon: 'fa fa-shield',
}

const response = ref({})
const loading = ref(false)

const submit = async () => {
  loading.value = true;
  response.value = await userStore.manageUserPermissions(props.user_id, form.value)
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
      content_class = "w-[350px]"
  >
    <Notifier :response="response" />
    <div
        class="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto p-4"
    >

      <div class="flex mt-4 min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
        <table class="is-zebra w-full text-left"
               v-if="permissions.length > 0">
          <tbody>
          <tr v-for="(permission, index) in permissions" :key="index">
            <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
              <CheckboxField
                  :value="permission.id"
                  v-model="form.permissions[index].selected"
                  :id="permission.name"
                  :error="null"
                  :title="''"
                  :multiple="true"
              />
            </td>
            <td class="border border-t-0 border-l-0 border-slate-200 px-3 py-3 text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
              <div class=" font-semibold  uppercase">{{ permission.title }}</div>
              <small>
                {{ permission.description }}
              </small>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="min-w-full" v-else>
          <h3 class="text-center">No Permissions</h3>
        </div>
      </div>


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