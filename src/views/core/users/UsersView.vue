<script setup>
import Layout from '../../../layouts/Main.vue'
import {useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, ref} from "vue";
import {useUsersStore} from "./__usersStore.js";
import LoaderComponent from "../../../components/LoaderComponent.vue";
import EditAccountDetails from "./components/EditAccountDetails.vue";
import CompleteUserRegistration from "./components/CompleteUserRegistration.vue";
import DeactivateUser from "./components/DeactivateUser.vue";
import ActivateUser from "./components/ActivateUser.vue";
import ManageUserPermissions from "./components/ManageUserPermissions.vue";
import ManageUserRoles from "./components/ManageUserRoles.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const record_id = route.params.id;
const usersStore = useUsersStore()

let user = ref({})
const permission_status = ref([])

const submit = () => {
  router.push({name: 'tasks-index'})
}

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY')
}

const loading = ref(false);

const init = async () => {
  loading.value = true;
  await usersStore.getUser(record_id);
  let record = usersStore.record
  user.value = {
    ...usersStore.record.user,
    user_permissions: usersStore.record.permissions,
    user_roles: usersStore.record.roles,
  }
  permission_status.value = usersStore.record.permission_status
  loading.value = false;
}

onMounted(async () => {
  await init();
})

</script>

<template>

  <Layout>

    <!-- Main Content Wrapper -->
    <main class="main-content kanban-app w-full">
      <div
          class="flex items-center justify-between space-x-2 px-[var(--margin-x)] py-5 transition-all duration-[.25s]"
      >

        <router-link
            :to="{ name:'users-index' }"
            class="flex h-8 p-4 items-center justify-center rounded-lg bg-info/10 text-slate-600 dark:text-info"
        >
          <i class="fa fa-arrow-left text-base mr-2"></i> Back
        </router-link>

        <div class="flex items-center space-x-2">
          <div
              class="flex-1 text-lg font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            <div class="items-center justify-center grid grid-cols-12">
              <div class="col-span-12">
                {{ user.name }}
              </div>

              <div class="text-center text-xs dark:text-amber-50 text-slate-800 col-span-12">
                {{ user.user_type }}
              </div>
            </div>

          </div>
          <img
              class="h-10 w-10 rounded-lg object-cover object-center"
              src="/src/assets/images/800x600.png"
              alt="image"
          />

        </div>
      </div>

      <div class="flex px-[var(--margin-x)] flex-col">
        <div
            class="mt-2 grid grid-cols-12 gap-4 transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:gap-6"
        >
          <div class="col-span-12 lg:col-span-8 ">

            <div class="card p-4 col-span-12 md:col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Account Details
                </h2>

              </div>
              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
                <table class="is-zebra w-full text-left">
                  <tbody>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Email
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ user.email }}
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Status
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      <span class="tag rounded-full"
                            :class="{
                              'bg-success/30 text-success hover:bg-success/50' : user.status === 'active',
                              'bg-warning/30 text-warning hover:bg-warning/50' : user.status === 'pending',
                              'bg-error/30 text-error hover:bg-error/50' : user.status === 'inactive',
                            }"
                      >
                        {{ user.status }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Created Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ formatDate(user.created_at) }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card p-4 mt-4 col-span-12 md:col-span-6 mb-10">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Permissions
                </h2>

              </div>

              <LoaderComponent v-if="loading" />
              <div v-else class="flex mt-4 min-w-full max-h-[45vh] overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
                <table class="is-zebra w-full text-left"
                       v-if="user.user_permissions && user.user_permissions.length > 0">
                  <tbody>
                  <tr v-for="(permission, index) in user.user_permissions" :key="index">
                    <td class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      <div class=" font-semibold  uppercase">{{ permission.title }}</div>
                      <small>
                        {{ permission.description }}
                      </small>
                    </td>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ permission.module_id }}
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div class="min-w-full" v-else>
                  <h3 class="text-center">No Permissions Given</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4 mb-10">
            <div class="card p-4 col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Actions
                </h2>

              </div>

              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full space-y-1 overflow-x-auto">

                <EditAccountDetails
                    :user="{
                      name: user.name,
                      email: user.email,
                      user_type_id: user.user_type_id,
                    }"
                    :user_id="user.urid"
                    @account-updated="init"
                />

                <CompleteUserRegistration
                    v-if="user.status === 'pending'"
                    :user="{
                      name: user.name,
                      email: user.email,
                      user_type_id: user.user_type_id,
                    }"
                    :user_id="user.urid"
                    @account-updated="init"
                />

                <template v-else>

                  <DeactivateUser
                      v-if="user.status === 'active'"
                      :user="{
                      name: user.name,
                      email: user.email,
                      user_type_id: user.user_type_id,
                    }"
                      :user_id="user.urid"
                      @account-updated="init"
                  />

                  <ActivateUser
                      v-if="user.status === 'inactive'"
                      :user="{
                      name: user.name,
                      email: user.email,
                      user_type_id: user.user_type_id,
                    }"
                      :user_id="user.urid"
                      @account-updated="init"
                  />

                  <ManageUserPermissions
                      :user="{
                      name: user.name,
                      user_permissions: user.user_permissions,
                    }"
                      :permission_status = "permission_status"
                      :user_id="user.urid"
                      @account-updated="init"
                  />

                  <ManageUserRoles
                      :user="{
                      name: user.name,
                      user_roles: user.user_roles
                    }"
                      :user_id="user.urid"
                      @account-updated="init"
                  />
                </template>


              </div>
            </div>
            <div class="card p-4 mt-4 col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Roles
                </h2>
              </div>

              <LoaderComponent v-if="loading" />
              <div v-else class="flex mt-4 min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
                <table class="is-zebra w-full text-left" v-if="user.user_roles && user.user_roles.length > 0">
                  <tbody>
                  <tr v-for="(role, index) in user.user_roles" :key="index">
                    <td class="border border-t-0 border-l-0 border-slate-200 px-3 py-3 text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      <div class="whitespace-nowrap font-semibold  uppercase">{{ role.title }}</div>
                      <small>
                        {{ role.description }}
                      </small>
                    </td>
                    <!--                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">-->
                    <!--                      {{ role.state }}-->
                    <!--                    </td>-->
                  </tr>
                  </tbody>
                </table>

                <div class="min-w-full" v-else>
                  <h3 class="text-center">No Roles Given</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  </Layout>
</template>

<style scoped>


</style>
