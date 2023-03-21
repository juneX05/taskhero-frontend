<template>
  <template v-for="index in max_users_set" :key="'no-pic' + index">
    <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8"
        >
      <div
          :title = "user(index-1).name"
          class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
      >
        {{ initials(index-1) }}
      </div>
    </div>

<!--    <div-->
<!--        v-else-->
<!--        class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8"-->
<!--         :key="'with-pic' + index">-->
<!--      <img-->
<!--          class="rounded-full border-2 border-slate-50 dark:border-navy-900"-->
<!--          :src="user(index).profile_pic"-->
<!--          alt="avatar"-->
<!--      />-->
<!--    </div>-->
  </template>

  <div v-if="users.length > max_users" class="avatar h-6 w-6 sm:h-8 sm:w-8">
    <div
        class="is-initial rounded-full border-2 border-slate-50 bg-info text-xs uppercase text-white dark:border-navy-900"
    >
      +{{ users.length - max_users }}
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";

  const props = defineProps({
    max_users: {default: 3},
    users: {
      type: Array,
      default: () => []
    },
  })

  const initials = (index) => {
    let name = user(index).name
    let names = name.split(" ")
    return names[0][0] + names[1][0]
  }

  const user = (index) => {
    return props.users[index]
  }

  const max_users_set = computed( () => {
    if (props.max_users > props.users.length) return props.users.length
    else return props.max_users
  })

  onMounted( () => {
    console.log(props.users)
  })
</script>