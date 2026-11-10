import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { CoinFace } from '../types'
import { playImpactSound } from '../logic/sounds'

type FlipStatus = 'idle' | 'flipping' | 'settled'

export function useCoinFlip(onSettled: (face: CoinFace) => void, prefersReducedMotion: boolean) {
    const groupRef = useRef<Group>(null)
    const [status, setStatus] = useState<FlipStatus>('idle')

    // Ahora el hook maneja el tiempo de la sacudida
    const shakeState = useRef({ time: 0 })

    const animState = useRef({
        startTime: 0,
        duration: 0,
        startRotation: 0,
        targetRotation: 0,
        finalFace: 'cara' as CoinFace,
        isFlipping: false,
    })

    const flip = useCallback((face: CoinFace) => {
        if (status === 'flipping' || !groupRef.current) return

        const startRotation = groupRef.current.rotation.x
        const turns = prefersReducedMotion ? 1 : 4
        const spinAngle = turns * Math.PI * 2
        const faceOffset = face === 'cara' ? 0 : Math.PI

        const currentNormalized = startRotation % (Math.PI * 2)
        const targetRotation = startRotation - currentNormalized + spinAngle + faceOffset

        animState.current = {
            startTime: performance.now(),
            duration: prefersReducedMotion ? 500 : 2500,
            startRotation,
            targetRotation,
            finalFace: face,
            isFlipping: true,
        }

        setStatus('flipping')
    }, [status, prefersReducedMotion])

    useFrame((_, delta) => {
        const group = groupRef.current

        if (group && animState.current.isFlipping) {
            const now = performance.now()
            const elapsed = now - animState.current.startTime
            const progress = Math.min(elapsed / animState.current.duration, 1)

            const easeOut = 1 - Math.pow(1 - progress, 3)
            group.rotation.x = animState.current.startRotation +
                (animState.current.targetRotation - animState.current.startRotation) * easeOut

            const jumpHeight = prefersReducedMotion ? 0 : 1.5
            group.position.y = 0.125 + Math.sin(progress * Math.PI) * jumpHeight

            if (progress === 1) {
                animState.current.isFlipping = false
                group.rotation.x = animState.current.targetRotation % (Math.PI * 2)
                group.position.y = 0.125

                playImpactSound()

                if (!prefersReducedMotion) {
                    shakeState.current.time = 0.2
                }

                setStatus('settled')
                onSettled(animState.current.finalFace)
            }
        }

        // Actualizamos el tiempo de sacudida aquí
        if (shakeState.current.time > 0) {
            shakeState.current.time -= delta
        }
    })

    return { groupRef, status, flip, shakeState }
}