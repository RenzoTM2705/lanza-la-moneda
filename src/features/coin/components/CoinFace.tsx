import { Text } from '@react-three/drei'
import type { CoinFaceSymbol } from '../types'

interface CoinFaceProps {
    symbol: CoinFaceSymbol
    radius: number
    facing: 'front' | 'back'
    thickness: number
}

export function CoinFace({ symbol, radius, facing, thickness }: CoinFaceProps) {
    // El texto se coloca justo por encima/debajo de la cara
    const yOffset = facing === 'front' ? (thickness / 2 + 0.01) : -(thickness / 2 + 0.01)
    // Rotamos para que mire hacia arriba (front) o hacia abajo (back)
    const rotationX = facing === 'front' ? -Math.PI / 2 : Math.PI / 2

    return (
        <group position={[0, yOffset, 0]} rotation={[rotationX, 0, 0]}>
            <Text
                position={[0, 0, 0.002]}
                fontSize={radius * 0.7}
                color={symbol.accent}
                anchorX="center"
                anchorY="middle"
            >
                {symbol.glyph}
            </Text>
        </group>
    )
}