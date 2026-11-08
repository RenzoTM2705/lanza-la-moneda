import { Text } from '@react-three/drei'
import type { CoinFaceSymbol } from '../types'

interface CoinFaceProps {
    symbol: CoinFaceSymbol
    radius: number
    facing: 'front' | 'back'
}

export function CoinFace({ symbol, radius, facing }: CoinFaceProps) {
    const rotationX = facing === 'front' ? -Math.PI / 2 : Math.PI / 2
    // Subimos un poco el texto para que quede por encima del nuevo relieve
    const yOffset = facing === 'front' ? 0.085 : -0.085

    return (
        <group rotation={[rotationX, 0, 0]} position={[0, yOffset, 0]}>
            <Text
                position={[0, 0, 0.002]}
                fontSize={radius * 0.7} // Ligeramente más pequeño para que quepa en el anillo
                color={symbol.accent}
                anchorX="center"
                anchorY="middle"
            >
                {symbol.glyph}
            </Text>
        </group>
    )
}