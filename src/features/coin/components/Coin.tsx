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
    ({ preset, radius = 1, thickness = 0.25 }, ref) => { // Grosor aumentado a 0.25
        return (
            <group ref={ref} position={[0, 0.125, 0]}> {/* Mitad del grosor para que descanse en la mesa */}

                {/* Canto principal */}
                <mesh>
                    <cylinderGeometry args={[radius, radius, thickness, 96]} />
                    <meshBasicMaterial color="#c28b00" />
                </mesh>

                {/* Cara superior (Cara) */}
                <mesh position={[0, thickness / 2, 0]}>
                    <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.01, 96]} />
                    <meshBasicMaterial color={preset.material.color} />
                </mesh>
                {/* Anillo de relieve superior */}
                <mesh position={[0, thickness / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius * 0.8, radius * 0.85, 64]} />
                    <meshBasicMaterial color="#c28b00" />
                </mesh>

                {/* Cara inferior (Sello) - Espejada en Y */}
                <mesh position={[0, -thickness / 2, 0]}>
                    <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.01, 96]} />
                    <meshBasicMaterial color={preset.material.color} />
                </mesh>
                {/* Anillo de relieve inferior */}
                <mesh position={[0, -thickness / 2 - 0.006, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius * 0.8, radius * 0.85, 64]} />
                    <meshBasicMaterial color="#c28b00" />
                </mesh>

                {/* Textos en ambas caras */}
                <CoinFace symbol={preset.faceSymbols.cara} radius={radius} facing="front" thickness={thickness} />
                <CoinFace symbol={preset.faceSymbols.sello} radius={radius} facing="back" thickness={thickness} />
            </group>
        )
    }
)
Coin.displayName = 'Coin'