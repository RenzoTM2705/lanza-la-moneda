import { Canvas } from '@react-three/fiber'
import { Lighting } from './Lighting'
import { Table } from './Table'
import { Coin } from './Coin'
import type { CoinPreset } from '../types'

interface CoinSceneProps {
    preset: CoinPreset
}

export function CoinScene({ preset }: CoinSceneProps) {
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 3.5, 2.5], fov: 35, near: 0.1, far: 100 }}
            gl={{ antialias: true }}
        >
            <Lighting />
            <Table />
            <Coin preset={preset} />
        </Canvas>
    )
}