import type { CoinPreset } from '../types'

export const coinPresets: CoinPreset[] = [
    {
        id: 'oro',
        label: 'Oro Clásico',
        material: { color: '#ffd700', edgeColor: '#c28b00', metalness: 1, roughness: 0.2 },
        faceSymbols: {
            cara: { glyph: 'C', accent: '#5a3a1a' },
            sello: { glyph: 'S', accent: '#5a3a1a' },
        },
    },
    {
        id: 'plata',
        label: 'Plata',
        material: { color: '#e0e0e0', edgeColor: '#a0a0a0', metalness: 1, roughness: 0.25 },
        faceSymbols: {
            cara: { glyph: 'C', accent: '#333333' },
            sello: { glyph: 'S', accent: '#333333' },
        },
    },
    {
        id: 'bronce',
        label: 'Bronce',
        material: { color: '#cd7f32', edgeColor: '#8b4513', metalness: 1, roughness: 0.4 },
        faceSymbols: {
            cara: { glyph: 'C', accent: '#2b1d12' },
            sello: { glyph: 'S', accent: '#2b1d12' },
        },
    },
]

export const defaultCoinPreset = coinPresets[0]