import { coinPresets } from '../coin/data/coinPresets'
import type { CoinPreset, CoinFace } from '../coin/types'

interface SettingsDrawerProps {
    isOpen: boolean
    onClose: () => void
    activePreset: CoinPreset
    onSelectPreset: (preset: CoinPreset) => void
    isChallengeMode: boolean
    onToggleChallengeMode: () => void
    challenges: { cara: string; sello: string }
    onChallengeChange: (face: 'cara' | 'sello', value: string) => void
    launchCount: number
    history: CoinFace[]
    onReset: () => void
}

export function SettingsDrawer({
    isOpen,
    onClose,
    activePreset,
    onSelectPreset,
    isChallengeMode,
    onToggleChallengeMode,
    challenges,
    onChallengeChange,
    launchCount,
    history,
    onReset
}: SettingsDrawerProps) {
    if (!isOpen) return null

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <aside className="fixed right-0 top-0 z-50 h-full w-80 bg-bg-elevated p-6 shadow-2xl border-l border-border flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-text uppercase tracking-wider">Configuración</h2>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-accent transition-colors text-2xl"
                        aria-label="Cerrar configuración"
                    >
                        ×
                    </button>
                </div>

                {/* Selector de Monedas */}
                <div className="flex flex-col gap-4 mb-8">
                    <h3 className="font-mono text-sm text-text-muted">Diseño de Moneda</h3>
                    <div className="flex flex-col gap-2">
                        {coinPresets.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => onSelectPreset(preset)}
                                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${activePreset.id === preset.id
                                        ? 'border-accent bg-surface'
                                        : 'border-transparent bg-bg hover:bg-surface'
                                    }`}
                            >
                                <span className="text-text font-medium">{preset.label}</span>
                                <div
                                    className="w-6 h-6 rounded-full border border-border shadow-inner"
                                    style={{ backgroundColor: preset.material.color }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modo Retos */}
                <div className="flex flex-col gap-4 border-t border-border pt-6 mb-8">
                    <div className="flex items-center justify-between">
                        <h3 className="font-mono text-sm text-text-muted">Modo Retos</h3>
                        <button
                            onClick={onToggleChallengeMode}
                            className={`w-12 h-6 rounded-full transition-colors relative ${isChallengeMode ? 'bg-accent' : 'bg-border'}`}
                            aria-label="Alternar modo retos"
                        >
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${isChallengeMode ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {isChallengeMode && (
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="challenge-cara" className="text-sm text-text font-medium">Cara</label>
                                <input
                                    id="challenge-cara"
                                    type="text"
                                    value={challenges.cara}
                                    onChange={(e) => onChallengeChange('cara', e.target.value)}
                                    placeholder="Ej: Invitar la cena"
                                    className="bg-bg border border-border rounded p-2 text-sm text-text focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="challenge-sello" className="text-sm text-text font-medium">Sello</label>
                                <input
                                    id="challenge-sello"
                                    type="text"
                                    value={challenges.sello}
                                    onChange={(e) => onChallengeChange('sello', e.target.value)}
                                    placeholder="Ej: Lavar los platos"
                                    className="bg-bg border border-border rounded p-2 text-sm text-text focus:outline-none focus:border-accent"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Historial y Estadísticas */}
                <div className="flex flex-col gap-4 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-mono text-sm text-text-muted">Estadísticas</h3>
                        <span className="font-mono text-sm text-text bg-surface px-3 py-1 rounded-full border border-border">
                            Total: {launchCount}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        <span className="text-xs text-text-muted mb-1">Últimos lanzamientos:</span>
                        {history.length === 0 ? (
                            <span className="text-sm text-text-muted italic">Sin lanzamientos</span>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {history.map((face, i) => (
                                    <span
                                        key={i}
                                        className={`text-xs font-bold px-2 py-1 rounded border ${face === 'cara'
                                                ? 'bg-accent/20 border-accent/30 text-accent'
                                                : 'bg-transparent border-border text-text-muted'
                                            }`}
                                    >
                                        {face === 'cara' ? 'C' : 'S'}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón de Restablecer */}
                <div className="mt-auto pt-8">
                    <button
                        onClick={onReset}
                        className="w-full py-2 rounded-lg border-2 border-red-900/50 text-red-500 font-medium text-sm hover:bg-red-900/20 transition-colors"
                    >
                        Restablecer todo
                    </button>
                </div>
            </aside>
        </>
    )
}