import { Title } from '../features/ui/Title'
import { CoinScene } from '../features/coin/components/CoinScene'
import { defaultCoinPreset } from '../features/coin/data/coinPresets'

export default function App() {
    return (
        <main className="flex min-h-screen flex-col items-center px-6 py-10">
            <header className="w-full max-w-5xl text-center">
                <Title />
            </header>

            <section
                aria-label="Mesa de lanzamiento"
                className="relative flex w-full max-w-5xl flex-1 items-center justify-center"
            >
                <div className="h-[420px] w-full overflow-hidden rounded-2xl sm:h-[520px] md:h-[600px]">
                    <CoinScene preset={defaultCoinPreset} />
                </div>
            </section>

            <footer className="w-full max-w-5xl pt-6 text-center">
                <p className="font-mono text-xs text-text-muted">Listo para lanzar</p>
            </footer>
        </main>
    )
}