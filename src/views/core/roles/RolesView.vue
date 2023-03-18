<script setup>
import Layout from '../../../layouts/Main.vue'
import {useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, ref} from "vue";
import LoaderComponent from "../../../components/LoaderComponent.vue";
import {useRolesStore} from "./__rolesStore.js";
import EditRoleDetails from "./components/EditRoleDetails.vue";
import ManageRolePermissions from "./components/ManageRolePermissions.vue";
import ActivateRole from "./components/ActivateRole.vue";
import DeactivateRole from "./components/DeactivateRole.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const record_id = route.params.id;
const rolesStore = useRolesStore()

let record = ref({})
const role_permissions = ref([])

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY')
}

const loading = ref(false);

const init = async () => {
  loading.value = true;
  await rolesStore.getRecord(record_id);
  record.value = rolesStore.record.role
  role_permissions.value = rolesStore.record.permissions
  console.log(record)
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
            :to="{ name:'roles-index' }"
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
                {{ record.title }}
              </div>

            </div>

          </div>

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
                 Description
                </h2>

              </div>
              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full overflow-x-auto rounded-lg">
                {{ record.description }}
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
                       v-if="role_permissions && role_permissions.length > 0">
                  <tbody>
                  <tr v-for="(permission, index) in role_permissions" :key="index">
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

            <div class="card p-4 col-span-12 md:col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Role Details
                </h2>

              </div>
              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500">
                <table class="is-zebra w-full text-left">
                  <tbody>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Status
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      <span class="tag rounded-full"
                            :class="{
                              'bg-success/30 text-success hover:bg-success/50' : record.status === 'active',
                              'bg-error/30 text-error hover:bg-error/50' : record.status === 'inactive',
                            }"
                      >
                        {{ record.status }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th class="whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5">
                      Created Date
                    </th>
                    <td class="whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5">
                      {{ formatDate(record.created_at) }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="card p-4 mt-4 col-span-6">
              <div class="flex items-center justify-between">
                <h2
                    class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
                >
                  Actions
                </h2>

              </div>

              <LoaderComponent v-if="loading" />
              <div v-else class="mt-4 min-w-full space-y-1 overflow-x-auto">

                <EditRoleDetails
                    v-if="record.status === 'active'"
                    :record="{
                      name: record.name,
                      description: record.description,
                      title: record.title,
                    }"
                    :record_id="record.urid"
                    @record-updated="init"
                />

                <ManageRolePermissions
                    v-if="record.status === 'active'"
                    :record="{
                    name: record.name,
                  }"
                    :record_id="record.urid"
                    @record-updated="init"
                />

                <ActivateRole
                    v-if="record.status === 'inactive'"
                    :record="{
                      name: record.name,
                    }"
                    :record_id="record.urid"
                    @record-updated="init"
                />

                <DeactivateRole
                    v-if="record.status === 'active'"
                    :record="{
                      name: record.name,
                    }"
                    :record_id="record.urid"
                    @record-updated="init"
                />

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
