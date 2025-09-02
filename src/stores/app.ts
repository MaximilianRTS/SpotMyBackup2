import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AppState, Toast, Modal } from '@/types'

export const useAppStore = defineStore('app', () => {
  // State
  const state = ref<AppState>({
    isLoading: false,
    error: null,
    currentStep: 1,
    totalSteps: 3
  })

  const toasts = ref<Toast[]>([])
  const modals = ref<Modal[]>([])

  // Getters
  const isLoading = computed(() => state.value.isLoading)
  const error = computed(() => state.value.error)
  const currentStep = computed(() => state.value.currentStep)
  const totalSteps = computed(() => state.value.totalSteps)
  const progress = computed(() => (state.value.currentStep / state.value.totalSteps) * 100)

  // Actions
  const setLoading = (loading: boolean) => {
    state.value.isLoading = loading
  }

  const setError = (error: string | null) => {
    state.value.error = error
  }

  const setCurrentStep = (step: number) => {
    state.value.currentStep = step
  }

  const setTotalSteps = (steps: number) => {
    state.value.totalSteps = steps
  }

  const nextStep = () => {
    if (state.value.currentStep < state.value.totalSteps) {
      state.value.currentStep++
    }
  }

  const previousStep = () => {
    if (state.value.currentStep > 1) {
      state.value.currentStep--
    }
  }

  const resetSteps = () => {
    state.value.currentStep = 1
  }

  // Toast management
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast
    }
    
    toasts.value.push(newToast)

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  // Modal management
  const showModal = (modal: Omit<Modal, 'id'>) => {
    const id = Date.now().toString()
    const newModal: Modal = {
      id,
      closable: true,
      ...modal
    }
    
    modals.value.push(newModal)
    return id
  }

  const hideModal = (id: string) => {
    const index = modals.value.findIndex(modal => modal.id === id)
    if (index > -1) {
      modals.value.splice(index, 1)
    }
  }

  const clearModals = () => {
    modals.value = []
  }

  // Utility functions
  const showSuccess = (title: string, message: string) => {
    return addToast({ type: 'success', title, message })
  }

  const showError = (title: string, message: string) => {
    return addToast({ type: 'error', title, message })
  }

  const showWarning = (title: string, message: string) => {
    return addToast({ type: 'warning', title, message })
  }

  const showInfo = (title: string, message: string) => {
    return addToast({ type: 'info', title, message })
  }

  // Reset store
  const reset = () => {
    state.value = {
      isLoading: false,
      error: null,
      currentStep: 1,
      totalSteps: 3
    }
    toasts.value = []
    modals.value = []
  }

  return {
    // State
    state,
    toasts,
    modals,
    
    // Getters
    isLoading,
    error,
    currentStep,
    totalSteps,
    progress,
    
    // Actions
    setLoading,
    setError,
    setCurrentStep,
    setTotalSteps,
    nextStep,
    previousStep,
    resetSteps,
    
    // Toast management
    addToast,
    removeToast,
    clearToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Modal management
    showModal,
    hideModal,
    clearModals,
    
    // Utility
    reset
  }
})

