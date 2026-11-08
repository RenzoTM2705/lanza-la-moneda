import { useState } from 'react'
import { Title } from '../features/ui/Title'
import { CoinScene } from '../features/coin/components/CoinScene'
import { defaultCoinPreset } from '../features/coin/data/coinPresets'
import type { CoinFace } from '../features/coin/types'

export default function App() {
    const [result, setResult] = useState<CoinFace | null>(null)
    const [isFlipping, setIsFlipping] = useState(false)

    // Usaremos un estado para pasar la orden de lanzar al canvas
    const [flipRequest, setFlipRequest] = useState<CoinFace | null>(null)

    const handleLaunch = () => {
        // 1. Determinar resultado ANTES de animar (Regla fundamental)
        const array = new Uint32Array(1)
        crypto.getRandomValues(array)
        const face: CoinFace = array[0] % 2 === 0 ? 'cara' : 'sello'

        setResult(null)
        setIsFlipping(true)
        setFlipRequest(face)
    }

    const handleSettled = (face: CoinFace) => {
        setIsFlipping(false)
        setResult(face)
        setFlipRequest(null)
    }

    return (
        <main className="flex min-h-screen flex-col items-center px-6 py-10">
            <header className="w-full max-w-5xl text-center">
                <Title />
            </header>

            <section className="relative flex w-full max-w-5xl flex-1 items-center justify-center">
                <div className="h-[420px] w-full sm:h-[520px] md:h-[600px]">
                    <CoinScene
                        preset={defaultCoinPreset}
                        flipRequest={flipRequest}
                        onSettled={handleSettled}
                    />
                </div>
            </section>

            <footer className="flex w-full max-w-5xl flex-col items-center gap-6 pt-6">
                {/* Mostrar resultado */}
                <div className="h-12 text-2xl font-bold text-accent">
                    {result && (
                        <span className="animate-pulse">
                            ¡Salió {result.toUpperCase()}!
                        </span>
                    )}
                </div>

                <button
                    onClick={handleLaunch}
                    disabled={isFlipping}
                    className="rounded-full bg-accent px-8 py-3 text-lg font-bold text-cream shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isFlipping ? 'Girando...' : 'Lanzar'}
                </button>
            </footer>
        </main>
    )
}