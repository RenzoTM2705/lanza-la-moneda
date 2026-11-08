// Instancia única para el sonido de impacto
const impactAudio = new Audio('/public/sounds/sonido-moneda.MP3')
impactAudio.preload = 'auto'
impactAudio.volume = 0.8

export function playImpactSound() {
    try {
        // Reiniciamos al segundo 0 para que suene de inmediato
        impactAudio.currentTime = 0
        impactAudio.play().catch(() => {
            // Ignoramos el error de bloqueo de autoplay del navegador
        })
    } catch (e) {
        console.warn('Audio no soportado', e)
    }
}