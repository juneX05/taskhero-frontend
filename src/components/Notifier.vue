<template>
  <div v-if="response.message"
       class="tag rounded-lg border"
       :class="{
              'border-success/30 bg-success/10 text-success hover:bg-success/20 focus:bg-success/20 active:bg-success/25' : response.status === true,
              'border-error/30 bg-error/10 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25' : response.status === false,
             }"
  >
    {{ response.message }}
  </div>
</template>

<script setup>

defineProps({
  response: {}
})

</script>

<style scoped>

</style>