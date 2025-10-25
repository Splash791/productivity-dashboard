<template>
  <button 
    @click="handleClick" 
    :disabled="calendarStore.isAuthenticated"
    class="google-auth-btn"
  >
    {{ calendarStore.isAuthenticated ? 'Calendar Connected' : 'Connect Google Calendar' }}
  </button>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCalendarStore } from '@/stores/calendar';

const calendarStore = useCalendarStore();

// Initialize the Google Auth client when the component is mounted
onMounted(async () => {
    // 🛑 Call the async init function to ensure the Google script is ready
    await calendarStore.initGoogleAuth(); 
});

const handleClick = () => {
    if (!calendarStore.isAuthenticated) {
        // Triggers the OAuth popup/redirect
        calendarStore.requestAccessToken();
    }
};
</script>

<style scoped>
.google-auth-btn {
    /* Style this button to match your dashboard's aesthetic */
    background-color: var(--color-primary-blue);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: var(--border-radius-base);
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
    transition: background-color 0.2s;
    /* Center text alignment for clean look */
    display: inline-block;
}
.google-auth-btn:disabled {
    /* Green color when successfully connected */
    background-color: var(--color-success-green); 
    cursor: default;
}
.google-auth-btn:not(:disabled):hover {
    background-color: var(--color-primary-blue-dark);
}
</style>