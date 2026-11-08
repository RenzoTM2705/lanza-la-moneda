interface CoinEdgeProps {
    radius: number
    thickness: number
    color: string
}

export function CoinEdge({ radius, thickness, color }: CoinEdgeProps) {
    const ridges = 60
    const ridgeDepth = 0.012
    const items = Array.from({ length: ridges }, (_, i) => {
        const angle = (i / ridges) * Math.PI * 2
        return { angle, key: i }
    })

    return (
        <group>
            {items.map(({ angle, key }) => (
                <mesh
                    key={key}
                    position={[
                        Math.cos(angle) * (radius + ridgeDepth * 0.5),
                        Math.sin(angle) * (radius + ridgeDepth * 0.5),
                        0,
                    ]}
                    rotation={[0, 0, angle]}
                >
                    <boxGeometry args={[ridgeDepth, thickness * 0.9, 0.02]} />
                    <meshStandardMaterial color={color} metalness={1} roughness={0.35} />
                </mesh>
            ))}
        </group>
    )
}