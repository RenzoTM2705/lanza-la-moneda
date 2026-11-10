import { useState, useEffect } from 'react'

// Función que lee el valor inicial antes del primer render
const getInitialValue = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialValue)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        // Solo actualizamos si el valor cambia mientras la app está abierta
        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersReducedMotion
}