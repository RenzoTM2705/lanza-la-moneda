export function Table() {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="#8b5a2b" />
        </mesh>
    )
}