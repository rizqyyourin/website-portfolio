export const useLoading = () => {
    const isLoading = useState('loading', () => true)
    const progress = useState('loading-progress', () => 0)

    const startLoading = () => {
        isLoading.value = true
        progress.value = 0
    }

    const finishLoading = () => {
        progress.value = 100
        setTimeout(() => {
            isLoading.value = false
        }, 500)
    }

    const setProgress = (value: number) => {
        progress.value = value
    }

    return {
        isLoading,
        progress,
        startLoading,
        finishLoading,
        setProgress
    }
}
