<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <TheWelcome/>
  <el-table mb-1 :data="[]"/>
  <el-pagination :total="100"/>
</template>
