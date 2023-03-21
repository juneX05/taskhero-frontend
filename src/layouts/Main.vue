<template>
  <!-- Sidebar -->
  <Sidebar />

  <!-- App Header Wrapper-->
  <nav class="header print:hidden">
    <!-- App Header  -->
    <div
        class="header-container relative flex w-full bg-white dark:bg-navy-700 print:hidden"
    >
      <!-- Header Items -->
      <div class="flex w-full items-center justify-between">
        <Navbar></Navbar>
      </div>
    </div>
  </nav>

  <slot></slot>
</template>

<script setup>
import { onMounted } from 'vue';

import '../assets/js/app.js'
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';

onMounted(async () => {
  if (!localStorage.getItem('auth')) {
    console.log('NOT AUTHENTICATED');
    return false;
  }
})
</script>