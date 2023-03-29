<script setup>
import {computed, onMounted, reactive, ref, toRefs, watch} from "vue";
import {useTasksStore} from "../../__tasksStore.js";
import {Validator} from "../../../../../assets/js/utils/validator.js";
import TabComponent from "../../../../../components/TabComponent.vue";
import RModalComponent from "../../../../../components/RModalComponent.vue";
import EditStepComponent from "./EditStepComponent.vue";
import ManageStepFiles from "./ManageStepFiles.vue";
import StepHistoryComponent from "./StepHistoryComponent.vue";

const emit = defineEmits(['recordUpdated','modalClosing'])

const props = defineProps({
  record: {type: Object},
  task_id: {type: String},
  record_id: {type: String},
  showModal: {type: Boolean}
})

const { record, showModal } = toRefs(props)

const form = ref({})
const errors = ref({})

const store = useTasksStore()

const page = {
  title: 'Manage Task Step',
  button_icon: 'fa fa-eye',
  background: 'primary',
  color: 'white',
  id: 'manage_task_step',
}

const response = ref({})
const loading = ref(false)

const successFulOperation = () => {
  emit('recordUpdated')
  response.value = {}
  loading.value = false
  destroy();
}

const validateForm = computed(() => {
  const rules = {
    title: {required: true,},
    description: {required: true,},
  }
  const messages = {
    title: { required: 'Title is required' },
    description: { required: 'Description is required' },
  }
  let errors = Validator.make(form.value, rules, messages);
  return Object.keys(errors).length > 0;
})

const destroy = () => {
  form.value = {}
  activeTab.value = 'details'
  emit('modalClosing')
}

watch(showModal, (newValue) => {
  if (newValue) {
    form.value = {title: props.record.title, description: props.record.description, files: []};
  } else {
    form.value = {};
  }
})

const activeTab = ref('details');

</script>

<template>

  <RModalComponent
      v-if="showModal"
      :show-modal="showModal"
      :id="page.id"
      :title="page.title"
      @modal-close="destroy"
  >

    <TabComponent
        :default_tab="'details'"
        :tabs="[{name:'details',title:'Details'},{name:'files',title:'Files'},{name:'history', title:'History'}]" >

      <template v-slot:tab_files>
        <div  class="tab-content tab-shift-left is-active">
          <ManageStepFiles
            :files="record.files"
            :task_id="task_id"
            :record_id="record_id"
            @record-updated="successFulOperation"
          />
        </div>
      </template>
      <template v-slot:tab_details>
        <div class="tab-content tab-shift-left is-active" >
          <EditStepComponent
            :form="form"
            :task_id="task_id"
            :record_id="record_id"
            :page="page"
            @record-updated="successFulOperation"
          />
        </div>
      </template>
      <template v-slot:tab_history>
        <div class="tab-content tab-shift-left is-active" >
          <StepHistoryComponent
            :record_id="record_id"
            :page="page"
          />
        </div>
      </template>
    </TabComponent>

  </RModalComponent>
</template>

<style scoped>

</style>