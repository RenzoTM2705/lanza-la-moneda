import { Title } from '../features/ui/Title'

export default function App() {
    return (
        <main className="flex min-h-full flex-col items-center justify-between px-6 py-10">
            <header className="w-full max-w-5xl text-center">
                <Title />
            </header>

            <section
                aria-label="Mesa de lanzamiento"
                className="flex w-full max-w-5xl flex-1 items-center justify-center"
            >
                <p className="font-mono text-sm text-text-muted">
                    Fondo
                </p>
            </section>

            <footer className="w-full max-w-5xl text-center">
                <p className="font-mono text-xs text-text-muted">
                    ----
                </p>
            </footer>
        </main>
    )
}