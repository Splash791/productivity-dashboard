<template>
  <div class="card goal-tracker">
    <header>
      <h2>Goal Tracker</h2>
      <button @click="isAdding = true" v-if="!isAdding" class="add-goal-btn">+ Add Goal</button>
    </header>
    <p class="subtitle">Set and track your personal and professional goals.</p>

    <div v-if="isAdding" class="add-goal-form">
      <input v-model="newGoalText" placeholder="New goal description" />
      <input v-model="newGoalDate" type="text" placeholder="Due Date (e.g., Dec 30, 2025)" />
      <div class="form-actions">
          <button @click="handleGoalAdd" class="confirm-btn">Save</button>
          <button @click="isAdding = false" class="cancel-btn">Cancel</button>
      </div>
    </div>

    <section>
      <h3>In Progress</h3>
      <div v-for="goal in goalStore.inProgressGoals" :key="goal.id" class="goal-item in-progress">
        <div class="goal-details">
          <button @click="goalStore.completeGoal(goal.id)" class="complete-btn">
             ✅
          </button>
          <span>{{ goal.text }}</span>
        </div>
        <div class="goal-meta">
          <span class="due-date">{{ goal.dueDate }}</span>
          <button @click="goalStore.removeGoal(goal.id)" class="remove-btn">x</button>
        </div>
      </div>
    </section>

    <section>
      <h3>Completed</h3>
      <div v-for="goal in goalStore.completedGoals" :key="goal.id" class="goal-item completed">
        <div class="goal-details">
          <input type="checkbox" checked disabled class="disabled-checkbox">
          <span>{{ goal.text }}</span>
        </div>
        <button @click="goalStore.removeGoal(goal.id)" class="remove-btn">x</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGoalStore } from '@/stores/goals'; 

const goalStore = useGoalStore();
const isAdding = ref(false);
const newGoalText = ref('');
const newGoalDate = ref('');

const handleGoalAdd = () => {
  if (newGoalText.value.trim()) {
    goalStore.addGoal(newGoalText.value.trim(), newGoalDate.value.trim());
    newGoalText.value = '';
    newGoalDate.value = '';
    isAdding.value = false;
  }
};
</script>

<style scoped>
.card {
  background-color: var(--color-card-background);
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
  padding: 20px;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

h3 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-dark);
  margin-top: 20px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f0f0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-goal-btn {
  background: var(--color-primary-blue);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 500;
  transition: background-color 0.2s;
}
.add-goal-btn:hover {
    background-color: var(--color-primary-blue-dark);
}

/* Add Goal Form */
.add-goal-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: var(--border-radius-base);
    background-color: #f9f9f9;
}
.add-goal-form input {
    padding: 10px 12px;
    border: 1px solid #e0e0e0;
    border-radius: var(--border-radius-base);
    font-size: 0.95rem;
    color: var(--color-text-dark);
}
.add-goal-form input::placeholder {
  color: var(--color-text-light);
}
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
}
.confirm-btn, .cancel-btn {
    padding: 8px 15px;
    border-radius: var(--border-radius-base);
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: background-color 0.2s;
}
.confirm-btn {
    background-color: var(--color-success-green);
    color: white;
    border: none;
}
.confirm-btn:hover {
    background-color: #4CAF50; /* A darker green */
}
.cancel-btn {
    background-color: #f0f0f0;
    color: var(--color-text-dark);
    border: 1px solid #ccc;
}
.cancel-btn:hover {
    background-color: #e0e0e0;
}


/* Goal Item Styling */
.goal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
}
.goal-item:last-of-type {
    border-bottom: none;
}

.goal-details {
    display: flex;
    align-items: center;
}

.complete-btn {
    background: none;
    border: none;
    font-size: 1.1em;
    cursor: pointer;
    margin-right: 10px;
}
.goal-details span {
    color: var(--color-text-dark);
}

.goal-meta {
    display: flex;
    align-items: center;
    gap: 10px;
}
.due-date {
    font-size: 0.85em;
    color: var(--color-text-medium);
}

.remove-btn {
    background: none;
    border: none;
    color: var(--color-text-light);
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9em;
    opacity: 0.7;
    transition: opacity 0.2s;
}
.remove-btn:hover {
    opacity: 1;
    color: var(--color-danger-red);
}

.completed span {
  text-decoration: line-through;
  opacity: 0.7;
  color: var(--color-text-light);
}

.disabled-checkbox {
    margin-right: 10px;
    /* You could also custom style this checkbox if you want it to look exactly like the active ones */
}
</style>