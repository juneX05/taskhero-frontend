<template>
  <label class="whitespace-nowrap inline-flex items-center space-x-2">
    <input
        :checked="model_value === value"
           :name="id"
           :id="id"
           :value="value"
           v-model="model_value"
           :class="`checked:!border-${color} checked:bg-${color} hover:!border-${color} focus:!border-${color}`"
           class="form-radio is-basic h-4 w-4 rounded-full border-slate-400/70 dark:border-navy-400"
           type="radio"
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
  color: {type: String, default: () => 'error'},
  value: {},
  modelValue: {},
  title: {type: String, default: () => ""},
  id: {type: String, default: () => ""},
  error: {type: String, default: () => null},
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
