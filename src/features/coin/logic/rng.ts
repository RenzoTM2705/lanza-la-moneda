import type { CoinFace } from '../types'

export function getRandomCoinFace(): CoinFace {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    // Si es par, Cara. Si es impar, Sello.
    return array[0] % 2 === 0 ? 'cara' : 'sello'
}