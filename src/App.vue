<script setup>
import Dashboard from './views/Dashboard.vue'
</script>

<template>
  <header>
    <h1>FlowState</h1>
    <p>Stay focused. Stay consistent.</p>
  </header>

  <main>
    <Dashboard />
  </main>

  <footer>
    <p>© 2025 FlowState</p>
  </footer>
</template>

<style scoped>
header {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: white;
  text-align: center;
  padding: 2rem;
}

footer {
  text-align: center;
  padding: 1rem;
  color: #888;
}
</style>
