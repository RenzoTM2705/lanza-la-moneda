import { useState } from 'react'
import { Title } from '../features/ui/Title'
import { SettingsDrawer } from '../features/ui/SettingsDrawer'
import { CoinScene } from '../features/coin/components/CoinScene'
import { coinPresets, defaultCoinPreset } from '../features/coin/data/coinPresets'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { CoinFace } from '../features/coin/types'

export default function App() {
    const [result, setResult] = useState<CoinFace | null>(null)
    const [isFlipping, setIsFlipping] = useState(false)
    const [flipRequest, setFlipRequest] = useState<CoinFace | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // Persistencia de Moneda
    const [activePresetId, setActivePresetId] = useLocalStorage<string>('coin-preset-id', defaultCoinPreset.id)
    const activePreset = coinPresets.find(p => p.id === activePresetId) || defaultCoinPreset

    // Persistencia de Retos
    const [isChallengeMode, setIsChallengeMode] = useLocalStorage<boolean>('challenge-mode', false)
    const [challenges, setChallenges] = useLocalStorage<{ cara: string; sello: string }>('challenges', {
        cara: '',
        sello: ''
    })

    // Persistencia de Historial y Contador
    const [launchCount, setLaunchCount] = useLocalStorage<number>('launch-count', 0)
    const [history, setHistory] = useLocalStorage<CoinFace[]>('launch-history', [])

    const isChallengeValid = !isChallengeMode || (challenges.cara.trim() !== '' && challenges.sello.trim() !== '')
    const isLaunchDisabled = isFlipping || !isChallengeValid

    const handleLaunch = () => {
        if (isLaunchDisabled) return

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

        // Actualizar contador e historial
        setLaunchCount(prev => prev + 1)
        setHistory(prev => [face, ...prev].slice(0, 10)) // Guardamos los últimos 10
    }

    const handleChallengeChange = (face: 'cara' | 'sello', value: string) => {
        setChallenges({ ...challenges, [face]: value })
    }

    const handleReset = () => {
        if (confirm('¿Estás seguro de que quieres restablecer todos los ajustes e historial?')) {
            setActivePresetId(defaultCoinPreset.id)
            setIsChallengeMode(false)
            setChallenges({ cara: '', sello: '' })
            setLaunchCount(0)
            setHistory([])
            setResult(null)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center px-6 py-10 relative overflow-hidden">

            <header className="w-full max-w-5xl flex justify-between items-center">
                <div className="w-10" />
                <Title />
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-accent transition-colors text-2xl"
                    aria-label="Abrir configuración"
                >
                    ⚙
                </button>
            </header>

            <section className="relative flex w-full max-w-5xl flex-1 items-center justify-center">
                <div className="h-[420px] w-full sm:h-[520px] md:h-[600px]">
                    <CoinScene
                        preset={activePreset}
                        flipRequest={flipRequest}
                        onSettled={handleSettled}
                    />
                </div>
            </section>

            <footer className="flex w-full max-w-5xl flex-col items-center gap-6 pt-6 h-32">
                <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
                    {result && (
                        <>
                            <span className="text-2xl font-bold text-accent uppercase tracking-widest">
                                ¡Salió {result}!
                            </span>
                            {isChallengeMode && (
                                <span className="text-lg font-medium text-text mt-1 bg-surface px-4 py-1 rounded-full border border-border">
                                    {challenges[result]}
                                </span>
                            )}
                        </>
                    )}
                </div>

                <button
                    onClick={handleLaunch}
                    disabled={isLaunchDisabled}
                    className="rounded-full bg-accent px-8 py-3 text-lg font-bold text-cream shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    title={!isChallengeValid ? 'Completa ambos retos para lanzar' : ''}
                >
                    {isFlipping ? 'Girando...' : 'Lanzar'}
                </button>
            </footer>

            <SettingsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                activePreset={activePreset}
                onSelectPreset={(preset) => setActivePresetId(preset.id)}
                isChallengeMode={isChallengeMode}
                onToggleChallengeMode={() => setIsChallengeMode(!isChallengeMode)}
                challenges={challenges}
                onChallengeChange={handleChallengeChange}
                launchCount={launchCount}
                history={history}
                onReset={handleReset}
            />
        </main>
    )
}