import type { CoinPreset } from '../types'

export const coinPresets: CoinPreset[] = [
    {
        id: 'oro',
        label: 'Oro',
        // Usamos metalness 0 para que el color se vea sólido y no negro
        material: { color: '#ffcc00', metalness: 0, roughness: 0.5 },
        faceSymbols: {
            cara: { glyph: 'C', accent: '#5a3a1a' },
            sello: { glyph: 'S', accent: '#5a3a1a' },
        },
    },
]

export const defaultCoinPreset = coinPresets[0]