<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script setup>
// Import the primary view component
import Dashboard from './views/Dashboard.vue'
</script>

<style>
/* Global App Styles */
#app {
  width: 100%;
  min-height: 100vh; /* Takes up at least 100% of the viewport height */
  box-sizing: border-box; 
  background-color: #f4f7f9;
}
</style>