<template>
  <div class="card pomodoro-timer">
    <h2>Pomodoro Timer</h2>
    <p class="subtitle">Boost your focus and productivity.</p>

    <div class="mode-tabs">
      <button 
        :class="{ 'active': currentMode === 'pomodoro' }" 
        @click="setMode('pomodoro')"
      >
        Pomodoro
      </button>
      <button 
        :class="{ 'active': currentMode === 'shortBreak' }" 
        @click="setMode('shortBreak')"
      >
        Short Break
      </button>
      <button 
        :class="{ 'active': currentMode === 'longBreak' }" 
        @click="setMode('longBreak')"
      >
        Long Break
      </button>
    </div>

    <div class="timer-display">
      {{ formattedTime }}
    </div>

    <div class="timer-controls">
      <button @click="startTimer" v-if="!isRunning && timeLeft > 0">
        <span class="icon">▶</span> Start
      </button>
      <button @click="pauseTimer" v-else-if="isRunning">
        <span class="icon">❚❚</span> Pause
      </button>
      <button @click="resetTimer">
        <span class="icon">↻</span> Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';

const TIME_SETTINGS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

const currentMode = ref('pomodoro');
const isRunning = ref(false);
const timeLeft = ref(TIME_SETTINGS[currentMode.value]);
let timerInterval = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}`;
});

const startTimer = () => {
  if (isRunning.value || timeLeft.value === 0) return;
  isRunning.value = true;
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval);
      isRunning.value = false;
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timerInterval);
  isRunning.value = false;
};

const resetTimer = () => {
  clearInterval(timerInterval);
  isRunning.value = false;
  timeLeft.value = TIME_SETTINGS[currentMode.value];
};

const setMode = (mode) => {
  if (isRunning.value || currentMode.value === mode) return;
  currentMode.value = mode;
  resetTimer();
};

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped>
.card {
  background-color: var(--color-card-background);
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-base);
  padding: 20px;
  text-align: center;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

.mode-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.mode-tabs button {
  background: #f0f0f0; /* Lighter background for inactive tabs */
  border: none; /* No border for tabs */
  padding: 8px 15px;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-medium);
  transition: background-color 0.2s, color 0.2s;
}
.mode-tabs button.active {
  background-color: var(--color-primary-blue);
  color: white;
}
.mode-tabs button:not(.active):hover {
    background-color: #e0e0e0;
}

.timer-display {
  font-size: 5.5rem; /* Slightly smaller for cleaner look */
  font-weight: 700; /* Bolder */
  letter-spacing: -2px;
  margin: 10px 0 30px;
  color: var(--color-text-dark);
}

.timer-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.timer-controls button {
  padding: 12px 30px; /* More padding for a bigger button */
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  border: none;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow for buttons */
}

.timer-controls button:first-child,
.timer-controls button:nth-child(2) { /* Start/Pause button */
  background-color: var(--color-primary-blue);
  color: white;
}
.timer-controls button:first-child:hover,
.timer-controls button:nth-child(2):hover {
  background-color: var(--color-primary-blue-dark);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.timer-controls button:last-child { /* Reset button */
  background-color: var(--color-card-background); /* White background */
  color: var(--color-text-medium); /* Darker text */
  border: 1px solid #e0e0e0; /* Lighter border */
}
.timer-controls button:last-child:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}

.icon {
    margin-right: 8px; /* More space for icon */
    font-size: 1em; /* Ensure icon size is consistent */
}
</style>