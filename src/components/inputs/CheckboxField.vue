<template>
  <label class="inline-flex items-center space-x-2">
    <input v-if="multiple"
        :id="id"
        :value="value"
        v-model="model_value"
           :class="style === 'rounded' ? 'rounded-full' : ''"
        class="form-checkbox is-basic h-5 w-5 border-slate-400/70 checked:bg-slate-500 checked:border-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:checked:bg-navy-400"
        type="checkbox"
    />
    <input v-else
        :id="id"
        v-model="model_value"
        :true-value="true_value"
        :false-value="false_value"
           :class="style === 'rounded' ? 'rounded-full' : ''"
        class="form-checkbox is-basic h-5 w-5 border-slate-400/70 checked:bg-slate-500 checked:border-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:checked:bg-navy-400"
        type="checkbox"
    />
    <span v-html="title"></span>
  </label>

  <span v-if="error" class="text-tiny+ text-error">
    {{ error }}
  </span>
</template>

<script setup>
import {onMounted, computed} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  value: {},
  modelValue: {},
  title: { type: String, default: () => "" },
  id: { type: String, default: () => "" },
  true_value: {  },
  false_value: {  },
  error: { type: String, default: () => null },
  multiple: { default: () => false },
  style: { default: () => 'rounded' }
})

const model_value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

onMounted(() => {

})

</script>
