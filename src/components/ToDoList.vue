<template>
  <div class="card to-do-list">
    <h2>To-Do List</h2>
    <p class="subtitle">Manage your daily tasks and priorities.</p>

    <div class="add-task-bar">
      <input v-model="newTaskText" placeholder="Add a new task..." />
      <select v-model="newTaskPriority" class="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="addTaskHandler" class="add-button">+</button>
    </div>

    <div v-for="task in taskStore.pendingTasks" :key="task.id" class="task-item">
      <label class="custom-checkbox">
        <input type="checkbox" :checked="task.completed" @change="taskStore.toggleCompletion(task.id)">
        <span class="checkmark"></span>
        <span class="task-text">{{ task.text }}</span>
      </label>
      <span :class="['priority-tag', task.priority]">{{ task.priority }}</span>
    </div>
    
    <div v-for="task in taskStore.completedTasks" :key="task.id" class="task-item completed">
      <label class="custom-checkbox">
        <input type="checkbox" :checked="task.completed" @change="taskStore.toggleCompletion(task.id)">
        <span class="checkmark"></span>
        <span class="task-text">{{ task.text }}</span>
      </label>
      <span :class="['priority-tag', task.priority]">{{ task.priority }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();
const newTaskText = ref('');
const newTaskPriority = ref('Medium');

const addTaskHandler = () => {
  if (newTaskText.value.trim()) {
    taskStore.addTask(newTaskText.value.trim(), newTaskPriority.value); 
    newTaskText.value = '';
    newTaskPriority.value = 'Medium';
  }
};
</script>

<style scoped>
/* Card Base (defined globally in Dashboard.vue, but can be overridden) */
.card {
  /* Use global variables for consistent styling */
  background-color: var(--color-card-background);
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
  padding: 20px; /* Keep internal padding */
}

/* Subtitle (from global style) */
h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

.add-task-bar {
  display: flex;
  gap: 8px; 
  margin-bottom: 20px;
}
.add-task-bar input {
  flex-grow: 1; 
  padding: 10px 12px; /* Increased padding for better look */
  border: 1px solid #e0e0e0; /* Lighter border */
  border-radius: var(--border-radius-base);
  font-size: 0.95rem;
  color: var(--color-text-dark);
}
.add-task-bar input::placeholder {
  color: var(--color-text-light);
}
.priority-select {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius-base);
  background-color: var(--color-card-background);
  color: var(--color-text-dark);
  font-size: 0.95rem;
  cursor: pointer;
}
.add-button {
  background-color: var(--color-primary-blue); 
  color: white;
  border: none;
  border-radius: var(--border-radius-base);
  width: 40px;
  min-width: 40px; /* Ensure button doesn't shrink */
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0; 
  line-height: 1; 
  transition: background-color 0.2s;
}
.add-button:hover {
  background-color: var(--color-primary-blue-dark);
}

/* Task Item Styling */
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Pushes priority tag to the right */
  margin-top: 15px; /* Increased space between tasks */
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0; /* Lighter separator */
}
.task-item:last-of-type {
  border-bottom: none;
}
.task-text {
  flex-grow: 1; 
  margin-left: 10px; /* Space between checkbox and text */
}

/* Custom Checkbox Styling to match LifeSlice */
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative; /* For custom checkmark */
  font-size: 0.95rem; /* Text size */
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0; /* Hide default checkbox */
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 18px; /* Size of custom checkbox */
  width: 18px;
  background-color: #eee; /* Background color of unchecked box */
  border-radius: 4px; /* Slightly rounded */
  border: 1px solid #ccc;
  transition: all 0.2s;
  flex-shrink: 0; /* Prevent checkmark from shrinking */
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--color-primary-blue); /* Blue when checked */
  border-color: var(--color-primary-blue);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block; /* Show checkmark when checked */
}


/* Completed Tasks */
.task-item.completed .task-text {
  text-decoration: line-through;
  opacity: 0.6;
  color: var(--color-text-light); /* Lighter color for completed text */
}

/* Priority Tag Styling */
.priority-tag {
  font-size: 0.75rem;
  padding: 4px 10px; /* Slightly larger padding */
  border-radius: 20px; /* Pill shape */
  color: white;
  flex-shrink: 0;
  font-weight: 500;
  margin-left: 15px;
}
.Low { background-color: var(--color-success-green); }
.Medium { background-color: var(--color-warning-orange); }
.High { background-color: var(--color-danger-red); }

</style>