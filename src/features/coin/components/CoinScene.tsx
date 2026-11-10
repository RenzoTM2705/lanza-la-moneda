import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { Lighting } from './Lighting'
import { Table } from './Table'
import { Coin } from './Coin'
import { useCoinFlip } from '../hooks/useCoinFlip'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import type { CoinPreset, CoinFace } from '../types'

interface CoinSceneProps {
    preset: CoinPreset
    flipRequest: CoinFace | null
    onSettled: (face: CoinFace) => void
}

function SceneContent({ preset, flipRequest, onSettled }: CoinSceneProps) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const { groupRef, flip, shakeState } = useCoinFlip(onSettled, prefersReducedMotion)
    const lastRequest = useRef<CoinFace | null>(null)

    const sceneGroupRef = useRef<Group>(null)

    useEffect(() => {
        if (flipRequest && flipRequest !== lastRequest.current) {
            lastRequest.current = flipRequest
            flip(flipRequest)
        }
        if (!flipRequest) {
            lastRequest.current = null
        }
    }, [flipRequest, flip])

    // Aplicamos la sacudida al grupo entero
    useFrame(() => {
        if (sceneGroupRef.current) {
            if (shakeState.current.time > 0) {
                const intensity = 0.1 * (shakeState.current.time / 0.2)
                sceneGroupRef.current.position.x = (Math.random() - 0.5) * intensity
                sceneGroupRef.current.position.y = (Math.random() - 0.5) * intensity
            } else {
                sceneGroupRef.current.position.set(0, 0, 0)
            }
        }
    })

    return (
        <group ref={sceneGroupRef}>
            <Lighting />
            <Table />
            <Coin preset={preset} ref={groupRef} />
        </group>
    )
}

export function CoinScene({ preset, flipRequest, onSettled }: CoinSceneProps) {
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 7, 4], fov: 45, near: 0.1, far: 100 }}
            gl={{ antialias: true }}
        >
            <SceneContent
                preset={preset}
                flipRequest={flipRequest}
                onSettled={onSettled}
            />
        </Canvas>
    )
}