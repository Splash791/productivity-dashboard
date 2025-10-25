<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="logo">
        <span>FlowState</span>
      </div>
    </header>

    <div class="dashboard-grid">
      <ToDoList />        
      <GoalTracker />     
      <Timer />           
      <TermCalendar />    
    </div>

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
import GoogleAuthButton from '@/components/GoogleAuthButton.vue'; 
</script>

<style scoped>
.dashboard-container {
  padding: 20px 40px; 
  background-color: var(--color-background);
  min-height: 100vh;
  box-sizing: border-box; 
}
.dashboard-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 30px 0; 
  max-width: 1400px; 
  margin: 0 auto; 
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-dark);
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1fr; 
  grid-template-rows: auto auto; 
  gap: 20px; 
  max-width: 1400px; 
  margin: 0 auto; 
}
.dashboard-grid > * {
  background-color: var(--color-card-background);
  padding: 20px;
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
}
.dashboard-grid > :nth-child(4) { 
  grid-column: 1 / span 3; 
  grid-row: 2 / 3; 
}
.auth-button-area {
    max-width: 1400px;
    margin: 20px auto 0;
    text-align: center;
}
</style>