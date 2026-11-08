import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Lighting } from './Lighting'
import { Table } from './Table'
import { Coin } from './Coin'
import { useCoinFlip } from '../hooks/useCoinFlip'
import type { CoinPreset, CoinFace } from '../types'

interface CoinSceneProps {
    preset: CoinPreset
    flipRequest: CoinFace | null
    onSettled: (face: CoinFace) => void
}

function SceneContent({ preset, flipRequest, onSettled }: CoinSceneProps) {
    const { groupRef, flip } = useCoinFlip(onSettled)
    const lastRequest = useRef<CoinFace | null>(null)

    useEffect(() => {
        if (flipRequest && flipRequest !== lastRequest.current) {
            lastRequest.current = flipRequest
            flip(flipRequest)
        }
        if (!flipRequest) {
            lastRequest.current = null
        }
    }, [flipRequest, flip])

    return (
        <>
            <Lighting />
            <Table />
            <Coin preset={preset} ref={groupRef} />
        </>
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