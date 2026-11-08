import { CoinFace } from './CoinFace'
import type { CoinPreset } from '../types'

interface CoinProps {
    preset: CoinPreset
    radius?: number
    thickness?: number
}

export function Coin({ preset, radius = 1, thickness = 0.15 }: CoinProps) {
    return (
        <group position={[0, 0.075, 0]}>
            {/* 1. El borde exterior (el canto de la moneda, un poco más oscuro) */}
            <mesh>
                <cylinderGeometry args={[radius, radius, thickness, 96]} />
                <meshBasicMaterial color="#c28b00" /> {/* Dorado más oscuro */}
            </mesh>

            {/* 2. La cara principal (ligeramente más pequeña para que se vea el borde) */}
            <mesh position={[0, thickness / 2, 0]}>
                <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.01, 96]} />
                <meshBasicMaterial color={preset.material.color} />
            </mesh>

            {/* 3. Un anillo interior de relieve en la cara superior */}
            <mesh position={[0, thickness / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius * 0.8, radius * 0.85, 64]} />
                <meshBasicMaterial color="#c28b00" /> {/* Dorado más oscuro */}
            </mesh>

            {/* 4. El texto / símbolo en el centro */}
            <CoinFace symbol={preset.faceSymbols.cara} radius={radius} facing="front" />

            {/* Mantenemos la cara trasera por si giramos la moneda en el futuro */}
            <CoinFace symbol={preset.faceSymbols.sello} radius={radius} facing="back" />
        </group>
    )
}