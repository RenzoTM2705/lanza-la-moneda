import { forwardRef } from 'react'
import type { Group } from 'three'
import { CoinFace } from './CoinFace'
import type { CoinPreset } from '../types'

interface CoinProps {
    preset: CoinPreset
    radius?: number
    thickness?: number
}

export const Coin = forwardRef<Group, CoinProps>(
    ({ preset, radius = 1, thickness = 0.25 }, ref) => {
        return (
            <group ref={ref} position={[0, 0.125, 0]}>

                {/* Canto principal */}
                <mesh>
                    <cylinderGeometry args={[radius, radius, thickness, 96]} />
                    <meshBasicMaterial color={preset.material.edgeColor} />
                </mesh>

                {/* Cara superior */}
                <mesh position={[0, thickness / 2, 0]}>
                    <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.01, 96]} />
                    <meshBasicMaterial color={preset.material.color} />
                </mesh>
                {/* Anillo superior */}
                <mesh position={[0, thickness / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius * 0.8, radius * 0.85, 64]} />
                    <meshBasicMaterial color={preset.material.edgeColor} />
                </mesh>

                {/* Cara inferior */}
                <mesh position={[0, -thickness / 2, 0]}>
                    <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.01, 96]} />
                    <meshBasicMaterial color={preset.material.color} />
                </mesh>
                {/* Anillo inferior */}
                <mesh position={[0, -thickness / 2 - 0.006, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius * 0.8, radius * 0.85, 64]} />
                    <meshBasicMaterial color={preset.material.edgeColor} />
                </mesh>

                {/* Textos */}
                <CoinFace symbol={preset.faceSymbols.cara} radius={radius} facing="front" thickness={thickness} />
                <CoinFace symbol={preset.faceSymbols.sello} radius={radius} facing="back" thickness={thickness} />
            </group>
        )
    }
)
Coin.displayName = 'Coin'