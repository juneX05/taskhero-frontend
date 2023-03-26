<template>
  <div>
    <span
        class="font-medium text-slate-600 dark:text-navy-100"
    >
      {{ title }}
    </span
    >
    <div
        class="filepond fp-bordered fp-grid mt-1.5 [--fp-grid:2]" :id="'file_container-' + id"
    >
      <input :id="id" type="file" :accept="accept" :multiple="multiple"/>

      <span v-if="error" class="text-tiny+ text-error">
        {{ error }}`
      </span>
    </div>
  </div>
</template>

<script setup>

import {onMounted, computed, onUpdated} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {},
  title: { type: String, default: () => "" },
  accept: { type: String, default: () => "image/png, image/jpeg, image/gif" },
  id: { type: String, default: () => "" },
  error: { type: String, default: () => null },
  multiple: {default: () => false},
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})


// Post Images (Filepond)
const init = (rerender = false) => {
  const fileContainer = document.querySelector("#file_container-" + props.id);
  const filePondRoot = fileContainer.querySelector(".filepond--root");

  if (!filePondRoot) return;

  if (rerender && props.error) {
    filePondRoot.classList.add('border', 'border-error', 'rounded-lg')
  } else {
    filePondRoot.classList.remove('border-error','border')
  }
}

onMounted(() => {
  const fileEl = document.querySelector("#" + props.id);
  fileEl._filepond = FilePond.create(fileEl);
  fileEl._filepond.on('addfile', (error, file) => {
    if (props.multiple) {
      let files = fileEl._filepond.getFiles()
      let uploaded_files = [];
      files.forEach( (file) => {
        uploaded_files.push(file.file)
      })
      value.value = uploaded_files;
    } else {
      value.value = file.file;
    }
  });
  fileEl._filepond.on('removefile', (error, file) => {
    value.value = null;
  });
})

onUpdated(() => {

  init(true)
})

</script>

<style>

</style>
