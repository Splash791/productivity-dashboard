<template>
  <div class="card term-calendar">
    <h2>Term Calendar</h2>
    <p class="subtitle">Schedule events, track deadlines, and stay organized.</p>

    <div class="calendar-nav">
      <button @click="prevMonth" aria-label="Previous Month">&lt;</button>
      <h3>{{ currentMonthName }} {{ currentYear }}</h3>
      <button @click="nextMonth" aria-label="Next Month">&gt;</button>
    </div>
    
    <div class="weekdays-grid">
      <span v-for="day in weekdays" :key="day">{{ day }}</span>
    </div>

    <div class="dates-grid">
      <span v-for="n in startDayOffset" :key="`empty-start-${n}`" class="empty-day"></span>
      
      <span 
        v-for="day in daysInMonth" 
        :key="`day-${day}`" 
        :class="['calendar-day', { 
          'current-day': isCurrentDay(day), 
          'has-event-red': hasEvent(day, 'High'), 
          'has-event-blue': hasEvent(day, 'Low') 
        }]"
      >
        {{ day }}
      </span>

      <span v-for="n in endDayOffset" :key="`empty-end-${n}`" class="empty-day"></span>
    </div>

    <p v-if="calendarStore.loading" class="status-message">Loading events...</p>
    <p v-if="calendarStore.error" class="status-message error">{{ calendarStore.error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useCalendarStore } from '@/stores/calendar'; // Import the new store

const calendarStore = useCalendarStore();

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// --- Calendar Logic (Unchanged from previous versions) ---
const currentMonthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString('default', { month: 'long' });
});

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const startDayOffset = computed(() => firstDayOfMonth.value);

const endDayOffset = computed(() => {
  const totalSlots = startDayOffset.value + daysInMonth.value;
  return (totalSlots % 7 === 0) ? 0 : 7 - (totalSlots % 7);
});

const isCurrentDay = (day) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

// --- Google Calendar Integration ---

// Function to fetch events for the current month
const loadEvents = () => {
    const startOfMonth = new Date(currentYear.value, currentMonth.value, 1);
    // Fetch until the end of the month
    const endOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0); 
    calendarStore.fetchGoogleEvents(startOfMonth, endOfMonth);
};

// Use the Pinia store's data to check for events
const hasEvent = (day, type) => {
  const events = calendarStore.getEventsForMonth(currentMonth.value, currentYear.value);
  return events.some(event => event.day === day && event.type === type);
};

// Fetch events initially and whenever the month/year changes
watch([currentMonth, currentYear], loadEvents);
onMounted(loadEvents);

// --- Navigation Functions (Updated to call loadEvents) ---
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

</script>

<style scoped>
/* (All previous styling remains the same to maintain the UI look) */
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

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 600;
  color: var(--color-text-dark);
}

.calendar-nav button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-text-medium);
  padding: 5px 10px;
  border-radius: var(--border-radius-base);
  transition: background-color 0.2s;
}
.calendar-nav button:hover {
    background-color: #f0f0f0;
}

.calendar-nav h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.weekdays-grid,
.dates-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 5px; /* Space between day cells */
}

.weekdays-grid span {
  font-weight: 500;
  color: var(--color-text-medium);
  font-size: 0.9em;
  padding: 5px 0;
}

.calendar-day {
  padding: 8px 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-dark);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1; /* Make days square */
  border-radius: var(--border-radius-base); 
  cursor: pointer; 
  transition: background-color 0.2s;
}

.calendar-day:hover:not(.empty-day) {
    background-color: #f0f0f0;
}

.empty-day {
  visibility: hidden;
}

/* Status Messages */
.status-message {
    margin-top: 15px;
    text-align: center;
    color: var(--color-text-medium);
    font-size: 0.9em;
}
.status-message.error {
    color: var(--color-danger-red);
    font-weight: 600;
}


/* Styling for event markers (blue/red circles) */
.calendar-day.current-day {
  background-color: var(--color-warning-orange);
  color: white;
  font-weight: 600;
}

.calendar-day.has-event-blue {
    background-color: var(--color-primary-blue);
    color: white;
    font-weight: 600;
}

.calendar-day.has-event-red {
    background-color: var(--color-danger-red);
    color: white;
    font-weight: 600;
}
</style>