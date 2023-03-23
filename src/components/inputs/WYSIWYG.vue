<template>
  <div>
    <span
        class="font-medium text-slate-600 dark:text-navy-100">
      {{title}}
    </span>
    <div class="mt-1.5 w-full" :id="'container-' + id">
      <div :id="id" class="h-48 ql-container ql-snow border"
           :class="{ 'border-error' : error }"></div>

      <span v-if="error" class="text-tiny+ text-error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup>

import {onMounted, computed, onUpdated, ref} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {},
  title: { type: String, default: () => "" },
  placeholder: { type: String, default: () => "" },
  id: { type: String, default: () => "" },
  icon: { type:String, default: () => null },
  type: { type: String, default: () => 'text' },
  error: { type: String, default: () => null }
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// Post Content (Quill Editor)
const config = {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{header: 1}, {header: 2}], // custom button values
      [{list: "ordered"}, {list: "bullet"}],
      [{script: "sub"}, {script: "super"}], // superscript/subscript
      [{indent: "-1"}, {indent: "+1"}], // outdent/indent
      [{direction: "rtl"}], // text direction
      [{size: ["small", false, "large", "huge"]}], // custom dropdown
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{color: []}, {background: []}], // dropdown with defaults from theme
      [{font: []}],
      [{align: []}],
      ["clean"], // remove formatting button
    ],
  },
  placeholder: props.placeholder,
  theme: "snow",
};

let element = null;
let toolbar = null;

onMounted(() => {

  const container = document.querySelector("#container-" + props.id);
  toolbar = container.querySelector('.ql-toolbar');
  element = document.querySelector("#" + props.id);

  element._editor = new Quill(element, config);
  element._editor.on('text-change', (delta, oldDelta, source) => {
    if(element._editor.getLength() > 1) {
      value.value = element._editor.root.innerHTML
    } else {
      value.value = ''
    }
  });

})

onUpdated(() => {
  if(element._editor.getLength() > 1) {
    value.value = element._editor.root.innerHTML
  } else {
    if (value.value) element._editor.root.innerHTML = value.value
  }

  if (toolbar == null) return;
  if (props.error) {
    toolbar.classList.add('border-error')
  } else {
    toolbar.classList.remove('border-error')
  }

})

</script>

<style>
.ql-container.ql-snow.border-error,
.ql-toolbar.ql-snow.border-error,
.dark .ql-toolbar.ql-snow.border-error
{
  border-color:#ff5724 !important;
}
</style>
