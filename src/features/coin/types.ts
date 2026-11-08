import type { ThreeElements } from '@react-three/fiber'

export type CoinFace = 'cara' | 'sello'

export interface CoinMaterial {
    color: string
    edgeColor: string 
    metalness: number
    roughness: number
}

export interface CoinFaceSymbol {
    glyph: string
    accent: string
}

export interface CoinPreset {
    id: string
    label: string
    material: CoinMaterial
    faceSymbols: Record<CoinFace, CoinFaceSymbol>
}

export type GroupProps = ThreeElements['group']