<script setup>
import Dashboard from "./views/Dashboard.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
    <!-- Navbar -->
    <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-flow-blue">FlowState</h1>
      <span class="text-gray-500 text-sm">Stay focused. Stay consistent.</span>
    </header>

    <!-- Main content -->
    <main class="flex-grow container mx-auto p-6">
      <Dashboard />
    </main>

    <!-- Footer -->
    <footer class="text-center py-4 text-gray-500 text-sm">
      © 2025 FlowState
    </footer>
  </div>
</template>

<style scoped>
/* Optional custom styling */
</style>
