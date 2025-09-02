<template>
  <a
    href="https://buymeacoffee.com/maximilianrts"
    target="_blank"
    rel="noopener noreferrer"
    class="buy-me-coffee-btn group"
    :class="size"
  >
    <div class="flex items-center space-x-2">
      <!-- Coffee Icon -->
      <div class="coffee-icon">
        <svg 
          class="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
        </svg>
      </div>
      
      <!-- Button Text -->
      <span class="font-medium">
        {{ text }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  text: 'Buy me a Coffee'
})
</script>

<style scoped>
.buy-me-coffee-btn {
  @apply inline-flex items-center justify-center rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background;
  background: linear-gradient(135deg, #1DB954 0%, #16a34a 100%);
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(29, 185, 84, 0.3);
  border: none;
}

.buy-me-coffee-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(29, 185, 84, 0.45);
  background: linear-gradient(135deg, #1DB954 0%, #15803d 100%);
}

.buy-me-coffee-btn:active {
  transform: translateY(0);
}

.buy-me-coffee-btn:focus {
  @apply ring-primary-500;
}

/* Size variants */
.buy-me-coffee-btn.small {
  @apply px-3 py-2 text-sm;
}

.buy-me-coffee-btn.medium {
  @apply px-4 py-3 text-base;
}

.buy-me-coffee-btn.large {
  @apply px-6 py-4 text-lg;
}

/* Coffee icon animation */
.coffee-icon {
  @apply transition-transform duration-200;
}

.buy-me-coffee-btn:hover .coffee-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Dark mode support */
.dark .buy-me-coffee-btn {
  background: linear-gradient(135deg, #1DB954 0%, #16a34a 100%);
  box-shadow: 0 4px 15px rgba(29, 185, 84, 0.4);
}

.dark .buy-me-coffee-btn:hover {
  box-shadow: 0 6px 20px rgba(29, 185, 84, 0.55);
}

.dark .buy-me-coffee-btn:focus {
  @apply ring-primary-400;
}
</style>
