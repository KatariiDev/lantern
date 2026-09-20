import './Village.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { useRef } from 'react'

function House({ position, rotation = 0, scale = 1, color = '#9b5b43' }) {
    return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
            <mesh position={[0, 0.95, 0]} castShadow>
                <boxGeometry args={[2.4, 1.9, 2]} />
                <meshStandardMaterial color={color} roughness={0.95} />
            </mesh>
            <mesh position={[-0.62, 2.02, 0]} rotation={[0, 0, 0.55]} castShadow>
                <boxGeometry args={[1.45, 0.16, 2.18]} />
                <meshStandardMaterial color="#47333a" roughness={0.85} />
            </mesh>
            <mesh position={[0.62, 2.02, 0]} rotation={[0, 0, -0.55]} castShadow>
                <boxGeometry args={[1.45, 0.16, 2.18]} />
                <meshStandardMaterial color="#47333a" roughness={0.85} />
            </mesh>
            <mesh position={[0, 2.38, 0]} castShadow>
                <boxGeometry args={[0.14, 0.14, 2.24]} />
                <meshStandardMaterial color="#5b3e40" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.28, 1.12]} receiveShadow>
                <boxGeometry args={[1.5, 0.12, 0.75]} />
                <meshStandardMaterial color="#684c3c" roughness={1} />
            </mesh>
            <mesh position={[-0.65, 1.03, 1.02]}>
                <boxGeometry args={[0.5, 0.82, 0.04]} />
                <meshStandardMaterial color="#201b25" roughness={1} />
            </mesh>
            <mesh position={[0.65, 1.08, 1.02]}>
                <boxGeometry args={[0.42, 0.42, 0.04]} />
                <meshStandardMaterial color="#ffe39a" emissive="#e9a83c" emissiveIntensity={1.1} />
            </mesh>
            <mesh position={[0.65, 1.08, 1.045]}>
                <boxGeometry args={[0.05, 0.48, 0.05]} />
                <meshStandardMaterial color="#4b3530" />
            </mesh>
            <mesh position={[0.65, 1.08, 1.045]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.05, 0.48, 0.05]} />
                <meshStandardMaterial color="#4b3530" />
            </mesh>
            <mesh position={[-0.7, 2.25, -0.45]} castShadow>
                <boxGeometry args={[0.28, 0.7, 0.28]} />
                <meshStandardMaterial color="#5a4140" roughness={1} />
            </mesh>
            <mesh position={[0, 0.85, 1.04]}>
                <planeGeometry args={[0.5, 0.8]} />
                <meshStandardMaterial color="#201b25" roughness={1} />
            </mesh>
        </group>
    )
}

function Tree({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.75, 0]} castShadow>
                <cylinderGeometry args={[0.13, 0.2, 1.5, 8]} />
                <meshStandardMaterial color="#3e2a26" roughness={1} />
            </mesh>
            <mesh position={[-0.35, 1.55, 0]} castShadow>
                <icosahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial color="#234739" roughness={1} />
            </mesh>
            <mesh position={[0.4, 1.8, 0.05]} castShadow>
                <icosahedronGeometry args={[0.95, 1]} />
                <meshStandardMaterial color="#2d5945" roughness={1} />
            </mesh>
            <mesh position={[0, 2.25, -0.05]} castShadow>
                <icosahedronGeometry args={[0.65, 1]} />
                <meshStandardMaterial color="#37674c" roughness={1} />
            </mesh>
        </group>
    )
}

function Grass({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            <mesh rotation={[0, 0, -0.25]}>
                <coneGeometry args={[0.12, 0.7, 5]} />
                <meshStandardMaterial color="#4d7047" roughness={1} />
            </mesh>
            <mesh rotation={[0, 0, 0.3]}>
                <coneGeometry args={[0.1, 0.55, 5]} />
                <meshStandardMaterial color="#66804a" roughness={1} />
            </mesh>
        </group>
    )
}

function Shrub({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            <mesh position={[-0.25, 0.28, 0]} castShadow>
                <icosahedronGeometry args={[0.42, 1]} />
                <meshStandardMaterial color="#315640" roughness={1} />
            </mesh>
            <mesh position={[0.25, 0.3, 0.05]} castShadow>
                <icosahedronGeometry args={[0.48, 1]} />
                <meshStandardMaterial color="#3d6848" roughness={1} />
            </mesh>
        </group>
    )
}

function Stone({ position, scale = 1 }) {
    return (
        <mesh position={position} scale={scale} rotation={[0.1, 0.4, 0.15]} castShadow>
            <dodecahedronGeometry args={[0.28, 1]} />
            <meshStandardMaterial color="#655d55" roughness={1} />
        </mesh>
    )
}

function Fence({ side }) {
    return (
        <group position={[side * 3, 0, -2]}>
            {[-12, -8, -4, 0, 4, 8, 12].map((z) => (
                <group key={z} position={[0, 0, z]}>
                    <mesh position={[0, 0.55, 0]} castShadow>
                        <cylinderGeometry args={[0.07, 0.1, 1.1, 6]} />
                        <meshStandardMaterial color="#5b4435" roughness={1} />
                    </mesh>
                    <mesh position={[0, 0.7, 2]} rotation={[Math.PI / 2, 0, 0]}>
                        <boxGeometry args={[0.1, 4, 0.1]} />
                        <meshStandardMaterial color="#76543d" roughness={1} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

function Lantern({ position }) {
    return (
        <group position={position}>
            <mesh position={[0, 1.4, 0]} castShadow>
                <cylinderGeometry args={[0.07, 0.1, 2.8, 8]} />
                <meshStandardMaterial color="#392b27" />
            </mesh>
            <mesh position={[0, 2.65, 0]}>
                <sphereGeometry args={[0.28, 16, 16]} />
                <meshStandardMaterial color="#ffd36d" emissive="#f08b2e" emissiveIntensity={1.4} />
            </mesh>
            <pointLight position={[0, 2.65, 0]} color="#ffb35b" intensity={2} distance={5} />
        </group>
    )
}

function VillageWorld() {
    const cameraStartTime = useRef(null)

    useFrame(({ camera, clock }) => {
        if (cameraStartTime.current === null) {
            cameraStartTime.current = clock.elapsedTime
        }

        const elapsed = clock.elapsedTime - cameraStartTime.current
        const progress = Math.min(elapsed / 5.5, 1)
        const easedProgress = progress * progress * (3 - 2 * progress)
        const lookHeight = 8.5 - easedProgress * 7.15
        const lookDepth = -5 - easedProgress * 7

        camera.position.set(0, 1.7, 8.2)
        camera.lookAt(0, lookHeight, lookDepth)
    })

    return (
        <>
            <color attach="background" args={['#111a2b']} />
            <fog attach="fog" args={['#111a2b', 10, 34]} />
            <ambientLight intensity={0.55} color="#93a5cc" />
            <directionalLight position={[-8, 12, 6]} intensity={1.8} color="#ffe0a0" castShadow />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#263c32" roughness={1} />
            </mesh>
            <mesh position={[0, 0.02, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[4, 42]} />
                <meshStandardMaterial color="#87674f" roughness={1} />
            </mesh>
            <mesh position={[0, 0.04, -3]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.8, 42]} />
                <meshStandardMaterial color="#a58361" roughness={0.98} />
            </mesh>
            <ContactShadows position={[0, 0.05, -4]} opacity={0.45} scale={28} blur={2.5} far={12} />
            <House position={[-3.45, 0, -1]} rotation={Math.PI / 2} scale={1.2} />
            <House position={[3.65, 0, -5]} rotation={-Math.PI / 2} scale={1.05} color="#a96649" />
            <House position={[-4.2, 0, -11]} rotation={Math.PI / 2} scale={0.95} color="#b36d4d" />
            <House position={[4.4, 0, 2]} rotation={-Math.PI / 2} scale={0.9} color="#8e5543" />
            <Tree position={[-6, 0, -8]} scale={1.25} />
            <Tree position={[6, 0, -13]} scale={1.5} />
            <Tree position={[-6.5, 0, 2]} scale={1.1} />
            <Fence side={-1} />
            <Fence side={1} />
            <Lantern position={[-2.1, 0, -1]} />
            <Lantern position={[2.1, 0, -6]} />
            <Lantern position={[-2.1, 0, -12]} />
            <Grass position={[-2.5, 0, 3]} scale={1.1} />
            <Grass position={[2.5, 0, 1]} scale={0.8} />
            <Grass position={[-2.4, 0, -4]} scale={0.9} />
            <Grass position={[2.4, 0, -9]} scale={1.2} />
            <Grass position={[-5.5, 0, -5]} scale={1.5} />
            <Grass position={[5.8, 0, -2]} scale={1.3} />
            <Shrub position={[-2.9, 0, 4]} scale={1.2} />
            <Shrub position={[2.9, 0, 3]} scale={0.9} />
            <Shrub position={[-5.2, 0, -8]} scale={1.5} />
            <Shrub position={[5.4, 0, -11]} scale={1.4} />
            <Stone position={[-2.4, 0.25, 2]} scale={1.2} />
            <Stone position={[2.5, 0.22, -3]} scale={0.8} />
            <Stone position={[-2.6, 0.2, -7]} scale={0.7} />
            <Stone position={[2.5, 0.2, -10]} scale={1.1} />
            <mesh position={[6, 7, -17]}>
                <sphereGeometry args={[2.4, 32, 32]} />
                <meshBasicMaterial color="#fff1b3" />
            </mesh>
        </>
    )
}

export default function Village() {
    return (
        <main className="village">
            <Canvas shadows camera={{ position: [0, 1.7, 8.2], fov: 62 }}>
                <VillageWorld />
            </Canvas>
            <div className="village-title">Làng ven trăng</div>
        </main>
    )
}