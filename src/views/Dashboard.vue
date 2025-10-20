<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="logo">
        <span>FlowState</span>
      </div>
    </header>

    <div class="dashboard-grid">
      <ToDoList />        <GoalTracker />     <Timer />           <TermCalendar />    </div>
  </div>
</template>

<script setup>
import ToDoList from '@/components/ToDoList.vue'; 
import GoalTracker from '@/components/GoalTracker.vue';
import Timer from '@/components/Timer.vue'; 
</script>

<style scoped>


/* ------------------------------------------
// Global Dashboard Styling
// ------------------------------------------ */
.dashboard-container {
  padding: 20px 40px; 
  background-color: var(--color-background);
  min-height: 100vh;
  box-sizing: border-box; 
}

/* ------------------------------------------
// Dashboard Header (for "FlowState" branding)
// ------------------------------------------ */
.dashboard-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 30px 0; 
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700; /* Bolded for better visual impact */
  color: var(--color-text-dark);
}

/* ------------------------------------------
// CSS GRID Layout
// ------------------------------------------ */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1fr; 
  grid-template-rows: auto auto; 
  gap: 20px; 
  max-width: 1400px; 
  margin: 0 auto;
}

/* General Card Styling (applies to all components inside the grid) */
.dashboard-grid > * {
  background-color: var(--color-card-background);
  padding: 20px;
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
}

/* TermCalendar Placement Overrides */
.dashboard-grid > :nth-child(4) { 
  grid-column: 1 / span 3; 
  grid-row: 2 / 3; 
}
</style>