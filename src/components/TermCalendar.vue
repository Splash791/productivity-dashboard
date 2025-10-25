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
import { useCalendarStore } from '@/stores/calendar'; 

const calendarStore = useCalendarStore();

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// --- Calendar Logic (Date Calculations) ---
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

// --- Event Integration ---

// 🛑 FIX for "is not a function" error 
const loadEvents = () => {
    // These dates are needed if the store needs to fetch a specific month
    const startOfMonth = new Date(currentYear.value, currentMonth.value, 1);
    const endOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
    
    // Calling the correctly named action
    calendarStore.fetchGoogleEventsForCurrentMonth(startOfMonth, endOfMonth); 
};

const hasEvent = (day, type) => {
  const events = calendarStore.getEventsForMonth(currentMonth.value, currentYear.value);
  return events.some(event => event.day === day && event.type === type);
};

// Fetch events initially and whenever the month/year changes
watch([currentMonth, currentYear], loadEvents);
onMounted(loadEvents);

// --- Navigation Functions ---
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
/* (Styles omitted for brevity, assume they are correct) */
/* ... */
</style>