<script setup>
import {ref} from "vue";
import RModalComponent from "../../../../../components/RModalComponent.vue";
import AddStepComponentForm from "./AddStepComponentForm.vue";

const emit = defineEmits(['recordUpdated'])

const props = defineProps({
  record: {type: Object},
  record_id: {type: String},
})

const page = {
  title: 'Add Task Step',
  button_icon: 'fa fa-plus',
  background: 'primary',
  color: 'white',
  id: 'add_task_step',
}

const showModal = ref(false);

</script>

<template>
  <button
      @click="showModal = true"
      :class=" `bg-${page.background} hover:bg-${page.background}-focus text-${page.color}`"
      class="  h-8 items-center justify-center rounded-lg "
  >
    <i :class="page.button_icon" class="text-base mr-2"></i> {{ page.title }}
  </button>
  <RModalComponent
      v-if="showModal"
      :show-modal="showModal"
      :id="page.id"
      :title="page.title"
      @modal-close="showModal = false"
  >

    <AddStepComponentForm
        v-if="showModal"
        :record_id="record_id"
        :page="page"
        @record-saved="emit('recordUpdated')"
    />

  </RModalComponent>
</template>

<style scoped>

</style>