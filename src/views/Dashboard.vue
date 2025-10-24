<template>
  <div class="dashboard-container">
    
    <header class="dashboard-header">
      <div class="logo">
        <span>FlowState</span>
      </div>
    </header>

    <div class="dashboard-grid">
      <ToDoList />        <GoalTracker />     <Timer />           <TermCalendar />    </div>

    <div class="auth-button-area">
      <GoogleAuthButton />
    </div>

  </div>
</template>

<script setup>
import ToDoList from '@/components/ToDoList.vue'; 
import GoalTracker from '@/components/GoalTracker.vue';
import Timer from '@/components/Timer.vue'; 
import TermCalendar from '@/components/TermCalendar.vue';
import GoogleAuthButton from '@/components/GoogleAuthButton.vue'; // New Auth Component
</script>

<style scoped>
/* ------------------------------------------
// Global Dashboard Styling
// ------------------------------------------ */
.dashboard-container {
  /* min-height: 100vh ensures full screen coverage */
  padding: 20px 40px; 
  background-color: var(--color-background);
  min-height: 100vh;
  box-sizing: border-box; 
}

/* ------------------------------------------
// Dashboard Header (FlowState Branding)
// ------------------------------------------ */
.dashboard-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 30px 0; 
  /* Center header content with the grid layout */
  max-width: 1400px; 
  margin: 0 auto; 
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-dark);
}

/* ------------------------------------------
// CSS GRID Layout (2 Rows, 3 Columns)
// ------------------------------------------ */
.dashboard-grid {
  display: grid;
  /* Defines the three columns with relative widths */
  grid-template-columns: 1.2fr 1.2fr 1fr; 
  grid-template-rows: auto auto; 
  gap: 20px; 
  max-width: 1400px; 
  margin: 0 auto; /* Centers the grid */
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

/* Authentication Button Area Styling */
.auth-button-area {
    /* Center button horizontally under the main grid */
    max-width: 1400px;
    margin: 20px auto 0;
    text-align: center;
}
</style>