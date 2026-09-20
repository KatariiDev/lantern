import './App.css'
import './components/Village.css'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, PointerLockControls, Stars } from '@react-three/drei'
import { Shape, Vector3 } from 'three'

const gableShape = new Shape()
gableShape.moveTo(-1.2, 0)
gableShape.lineTo(1.2, 0)
gableShape.lineTo(0, 0.68)
gableShape.closePath()

function createStars() {
    return Array.from({ length: 500 }).map((_, index) => ({
        id: index,
        style: {
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${1 + Math.random() * 2}s`
        },
        sizeClass: `size-${Math.floor(Math.random() * 3) + 1}`
    }))
}

function House({ position, rotation = 0, scale = 1, color = '#9b5b43' }) {
    return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale * 1.2}>
            <mesh position={[0, 0.95, 0]} castShadow><boxGeometry args={[2.4, 1.9, 2]} /><meshStandardMaterial color={color} roughness={0.95} /></mesh>
            <mesh position={[-0.62, 2.18, 0]} rotation={[0, 0, 0.55]} castShadow><boxGeometry args={[1.45, 0.16, 2.18]} /><meshStandardMaterial color="#47333a" roughness={0.85} /></mesh>
            <mesh position={[0.62, 2.18, 0]} rotation={[0, 0, -0.55]} castShadow><boxGeometry args={[1.45, 0.16, 2.18]} /><meshStandardMaterial color="#47333a" roughness={0.85} /></mesh>
            <mesh position={[0, 2.55, 0]} castShadow><boxGeometry args={[0.14, 0.14, 2.24]} /><meshStandardMaterial color="#5b3e40" roughness={0.85} /></mesh>
            <mesh position={[0, 1.85, 1.01]} castShadow><shapeGeometry args={[gableShape]} /><meshStandardMaterial color={color} roughness={0.95} /></mesh>
            <mesh position={[0, 1.85, -1.01]} rotation={[0, Math.PI, 0]} castShadow><shapeGeometry args={[gableShape]} /><meshStandardMaterial color={color} roughness={0.95} /></mesh>
            <mesh position={[0, 0.06, 1.12]} receiveShadow><boxGeometry args={[1.5, 0.12, 0.75]} /><meshStandardMaterial color="#684c3c" roughness={1} /></mesh>
            <mesh position={[-0.62, 0.72, 1.02]}><boxGeometry args={[0.5, 1.4, 0.04]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>
            <mesh position={[0.62, 0.76, 1.02]}><boxGeometry args={[0.52, 0.62, 0.04]} /><meshStandardMaterial color="#ffe39a" emissive="#ffad36" emissiveIntensity={1.35} /></mesh>
            <mesh position={[0.62, 0.76, 1.045]}><boxGeometry args={[0.05, 0.68, 0.05]} /><meshStandardMaterial color="#4b3530" /></mesh>
            <mesh position={[0.62, 0.76, 1.045]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.05, 0.68, 0.05]} /><meshStandardMaterial color="#4b3530" /></mesh>
            <mesh position={[-0.7, 2.42, -0.45]} castShadow><boxGeometry args={[0.28, 0.7, 0.28]} /><meshStandardMaterial color="#5a4140" roughness={1} /></mesh>
        </group>
    )
}

function VillageGate({ position }) {
    const openProgress = useRef(0)
    const gateOpened = useRef(false)
    const leftDoor = useRef(null)
    const rightDoor = useRef(null)

    useFrame(({ camera }) => {
        const distance = camera.position.z - position[2]
        if (distance < 5) gateOpened.current = true
        if (distance > 8) gateOpened.current = false
        const target = gateOpened.current ? 1 : 0
        openProgress.current += (target - openProgress.current) * 0.045
        if (leftDoor.current && rightDoor.current) {
            leftDoor.current.rotation.y = -openProgress.current * 1.15
            rightDoor.current.rotation.y = openProgress.current * 1.15
        }
    })

    return (
        <group position={position}>
            <mesh position={[-2.15, 2.3, 0]} castShadow><cylinderGeometry args={[0.28, 0.38, 4.6, 8]} /><meshStandardMaterial color="#4e352b" roughness={1} /></mesh>
            <mesh position={[2.15, 2.3, 0]} castShadow><cylinderGeometry args={[0.28, 0.38, 4.6, 8]} /><meshStandardMaterial color="#4e352b" roughness={1} /></mesh>
            <mesh position={[0, 4.45, 0]} castShadow><boxGeometry args={[4.8, 0.5, 0.55]} /><meshStandardMaterial color="#654333" roughness={1} /></mesh>
            <mesh position={[0, 5.1, 0]} rotation={[0, 0, Math.PI / 4]} castShadow><boxGeometry args={[1.2, 0.42, 0.5]} /><meshStandardMaterial color="#7d5039" roughness={1} /></mesh>
            <group ref={leftDoor} position={[-2, 2.1, 0]}>
                <mesh position={[1, 0, 0]} castShadow><boxGeometry args={[2, 4.2, 0.18]} /><meshStandardMaterial color="#593a2c" roughness={0.95} /></mesh>
            </group>
            <group ref={rightDoor} position={[2, 2.1, 0]}>
                <mesh position={[-1, 0, 0]} castShadow><boxGeometry args={[2, 4.2, 0.18]} /><meshStandardMaterial color="#593a2c" roughness={0.95} /></mesh>
            </group>
            <mesh position={[-6.5, 1.6, 0]} castShadow><boxGeometry args={[8.5, 3.2, 0.7]} /><meshStandardMaterial color="#593a2c" roughness={0.95} /></mesh>
            <mesh position={[6.5, 1.6, 0]} castShadow><boxGeometry args={[8.5, 3.2, 0.7]} /><meshStandardMaterial color="#593a2c" roughness={0.95} /></mesh>
        </group>
    )
}

function Tree({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.75, 0]} castShadow><cylinderGeometry args={[0.13, 0.2, 1.5, 8]} /><meshStandardMaterial color="#3e2a26" roughness={1} /></mesh>
            <mesh position={[-0.35, 1.55, 0]} castShadow><icosahedronGeometry args={[0.8, 1]} /><meshStandardMaterial color="#234739" roughness={1} /></mesh>
            <mesh position={[0.4, 1.8, 0.05]} castShadow><icosahedronGeometry args={[0.95, 1]} /><meshStandardMaterial color="#2d5945" roughness={1} /></mesh>
            <mesh position={[0, 2.25, -0.05]} castShadow><icosahedronGeometry args={[0.65, 1]} /><meshStandardMaterial color="#37674c" roughness={1} /></mesh>
        </group>
    )
}

function Grass({ position, scale = 1 }) {
    return <group position={position} scale={scale}><mesh rotation={[0, 0, -0.25]}><coneGeometry args={[0.12, 0.7, 5]} /><meshStandardMaterial color="#4d7047" roughness={1} /></mesh><mesh rotation={[0, 0, 0.3]}><coneGeometry args={[0.1, 0.55, 5]} /><meshStandardMaterial color="#66804a" roughness={1} /></mesh></group>
}

function Shrub({ position, scale = 1 }) {
    return <group position={position} scale={scale}><mesh position={[-0.25, 0.28, 0]} castShadow><icosahedronGeometry args={[0.42, 1]} /><meshStandardMaterial color="#315640" roughness={1} /></mesh><mesh position={[0.25, 0.3, 0.05]} castShadow><icosahedronGeometry args={[0.48, 1]} /><meshStandardMaterial color="#3d6848" roughness={1} /></mesh></group>
}

function Lantern({ position }) {
    return <group position={position}><mesh position={[0, 2.4, 0]} castShadow><cylinderGeometry args={[0.09, 0.13, 4.8, 8]} /><meshStandardMaterial color="#392b27" /></mesh><mesh position={[0, 4.65, 0]}><sphereGeometry args={[0.28, 16, 16]} /><meshStandardMaterial color="#fff0a8" emissive="#ff9c3d" emissiveIntensity={2.2} /></mesh><pointLight position={[0, 4.65, 0]} color="#ffb35b" intensity={10} distance={13} /></group>
}

function LanternString({ position }) {
    const points = [[-7, 0], [-3.5, -0.65], [0, -1.05], [3.5, -0.65], [7, 0]]
    return <group position={position}>{points.slice(0, -1).map(([x1, y1], index) => { const [x2, y2] = points[index + 1]; const length = Math.hypot(x2 - x1, y2 - y1); const angle = Math.atan2(y2 - y1, x2 - x1); return <mesh key={`${x1}-${x2}`} position={[(x1 + x2) / 2, (y1 + y2) / 2, 0]} rotation={[0, 0, angle]}><boxGeometry args={[length, 0.045, 0.045]} /><meshStandardMaterial color="#2b2020" roughness={1} /></mesh> })}{points.map(([x, y]) => <group key={x} position={[x, y - 0.55, 0]}><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.025, 0.025, 0.6, 6]} /><meshStandardMaterial color="#3b2925" /></mesh><mesh><sphereGeometry args={[0.22, 12, 12]} /><meshStandardMaterial color="#ff9f37" emissive="#ff5c25" emissiveIntensity={1.8} /></mesh><pointLight color="#ff8e3d" intensity={1.6} distance={4} /></group>)}</group>
}

function VillageBoundary({ position }) {
    return <group position={position}><mesh position={[0, 3.4, 0]} castShadow><boxGeometry args={[34, 6.8, 0.45]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh></group>
}

function SideVillageWall({ side }) {
    return <group position={[side * 11, 2.4, -30]}><mesh castShadow><boxGeometry args={[0.5, 4.8, 84]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh></group>
}

function RearCharacterWall() {
    return <group position={[0, 2.6, 8.7]}><mesh castShadow><boxGeometry args={[22, 5.2, 0.5]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh>{[-9, -4.5, 0, 4.5, 9].map((x) => <mesh key={x} position={[x, 2.8, 0]} castShadow><boxGeometry args={[0.7, 0.7, 0.8]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>)}</group>
}

function GroundBeyondGate() {
    return <mesh position={[0, 0.025, -39]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[21.6, 66]} /><meshStandardMaterial color="#263c32" roughness={1} /></mesh>
}

function GateLights() {
    return <>
        {[-4, 4].flatMap((x) => [-28, -38].map((z) => <group key={`${x}-${z}`} position={[x, 0, z]}>
            <mesh position={[0, 2.4, 0]}><cylinderGeometry args={[0.08, 0.11, 4.8, 8]} /><meshStandardMaterial color="#292726" /></mesh>
            <mesh position={[0, 4.7, 0]}><sphereGeometry args={[0.22, 16, 16]} /><meshStandardMaterial color="#ffe3a1" emissive="#ff9c3d" emissiveIntensity={2} /></mesh>
            <pointLight position={[0, 4.7, 0]} color="#ffb45c" intensity={16} distance={14} />
        </group>))}
    </>
}

function MidAutumnCart({ position, color }) {
    return <group position={position}>
        <mesh position={[0, 1.2, 0]} castShadow><boxGeometry args={[4.2, 1.25, 1.55]} /><meshStandardMaterial color={color} roughness={0.9} /></mesh>
        <mesh position={[0, 1.88, -0.82]} castShadow><boxGeometry args={[4.6, 0.18, 0.18]} /><meshStandardMaterial color="#d9a24f" roughness={0.8} /></mesh>
        <mesh position={[0, 2.85, 0]} castShadow><boxGeometry args={[4.8, 0.16, 1.95]} /><meshStandardMaterial color="#d9a24f" roughness={0.8} /></mesh>
        {[-1.75, 1.75].flatMap((x) => [-0.72, 0.72].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.5, 0.5, 0.28, 16]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>))}
        <mesh position={[0, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.08, 0.08, 3.8, 8]} /><meshStandardMaterial color="#392b27" /></mesh>
        {[-2.05, 2.05].map((x) => <mesh key={x} position={[x, 2.3, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 1.25, 8]} /><meshStandardMaterial color="#593a2c" /></mesh>)}
        <mesh position={[2.75, 1.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.06, 0.06, 1.5, 8]} /><meshStandardMaterial color="#593a2c" /></mesh>
        <mesh position={[0, 2.15, -0.86]}><boxGeometry args={[2.8, 0.65, 0.08]} /><meshStandardMaterial color="#f1ca72" emissive="#d8792e" emissiveIntensity={0.8} /></mesh>
        <mesh position={[0, 2.95, 0]}><sphereGeometry args={[0.22, 16, 16]} /><meshStandardMaterial color="#ffd36d" emissive="#ff8f2f" emissiveIntensity={1.8} /></mesh>
        <pointLight position={[0, 2.95, -0.7]} color="#ffad4f" intensity={4} distance={8} />
    </group>
}

function LionDance({ position, color }) {
    const lionRef = useRef(null)

    useFrame(({ clock }) => {
        if (lionRef.current) lionRef.current.position.x = Math.sin(clock.elapsedTime * 0.8) * 2.8
    })

    return <group ref={lionRef} position={position}>
        <mesh position={[-0.15, 1.35, 0]} scale={[1.55, 0.72, 0.72]} castShadow><sphereGeometry args={[1, 16, 12]} /><meshStandardMaterial color={color} roughness={0.8} /></mesh>
        <mesh position={[1.25, 1.65, -0.05]} scale={[0.8, 0.8, 0.8]} castShadow><sphereGeometry args={[1, 16, 12]} /><meshStandardMaterial color="#e7b34e" roughness={0.75} /></mesh>
        <mesh position={[1.02, 2.2, -0.35]}><sphereGeometry args={[0.18, 12, 12]} /><meshStandardMaterial color="#fff1b3" emissive="#ff9a32" emissiveIntensity={1.6} /></mesh>
        <mesh position={[1.5, 2.2, -0.35]}><sphereGeometry args={[0.18, 12, 12]} /><meshStandardMaterial color="#fff1b3" emissive="#ff9a32" emissiveIntensity={1.6} /></mesh>
        <mesh position={[1.25, 1.55, -0.75]}><sphereGeometry args={[0.24, 12, 12]} /><meshStandardMaterial color="#292726" /></mesh>
        {[-0.9, 0.65].flatMap((x) => [-0.42, 0.42].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.55, z]} castShadow><cylinderGeometry args={[0.18, 0.22, 1.1, 8]} /><meshStandardMaterial color="#292726" /></mesh>))}
    </group>
}

function MarketStall({ position, color }) {
    return <group position={position}>
        <mesh position={[0, 1.2, 0]} castShadow><boxGeometry args={[3.1, 1.5, 1.7]} /><meshStandardMaterial color={color} roughness={0.9} /></mesh>
        <mesh position={[0, 2.2, 0]} castShadow><boxGeometry args={[3.8, 0.16, 2.25]} /><meshStandardMaterial color="#d39b4b" roughness={0.8} /></mesh>
        <mesh position={[0, 3.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><coneGeometry args={[1.25, 3.8, 4]} /><meshStandardMaterial color="#8c3e32" roughness={0.85} /></mesh>
        <mesh position={[0, 2.45, -0.9]}><boxGeometry args={[2.4, 0.8, 0.08]} /><meshStandardMaterial color="#f1ca72" emissive="#d8792e" emissiveIntensity={0.8} /></mesh>
        <pointLight position={[0, 2.7, -0.7]} color="#ffb45c" intensity={3} distance={7} />
    </group>
}

function VillageStage({ position }) {
    return <group position={position}>
        <mesh position={[0, 0.55, -0.45]} castShadow><boxGeometry args={[20, 1.1, 7]} /><meshStandardMaterial color="#593a2c" roughness={0.9} /></mesh>
        <mesh position={[0, 1.1, -2]} receiveShadow><boxGeometry args={[19.4, 0.12, 3.2]} /><meshStandardMaterial color="#b9783d" roughness={0.8} /></mesh>
        <mesh position={[0, 3.1, -2.8]} castShadow><boxGeometry args={[17.5, 5.2, 0.35]} /><meshStandardMaterial color="#8c3e32" roughness={0.85} /></mesh>
        <mesh position={[-8.6, 3, 0.65]} castShadow><boxGeometry args={[1.15, 4.4, 0.38]} /><meshStandardMaterial color="#b7352f" roughness={0.8} /></mesh>
        <mesh position={[8.6, 3, 0.65]} castShadow><boxGeometry args={[1.15, 4.4, 0.38]} /><meshStandardMaterial color="#b7352f" roughness={0.8} /></mesh>
        <mesh position={[-7.25, 3, 0.75]} castShadow><boxGeometry args={[0.28, 4.8, 0.45]} /><meshStandardMaterial color="#e2a84f" roughness={0.8} /></mesh>
        <mesh position={[7.25, 3, 0.75]} castShadow><boxGeometry args={[0.28, 4.8, 0.45]} /><meshStandardMaterial color="#e2a84f" roughness={0.8} /></mesh>
        <mesh position={[0, 5.8, -2.5]} scale={[10.5, 2, 3.5]} castShadow><sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#d39b4b" roughness={0.8} /></mesh>
        <mesh position={[0, 5.78, -2.5]} castShadow><boxGeometry args={[20.8, 0.18, 6.8]} /><meshStandardMaterial color="#a86e32" roughness={0.85} /></mesh>
        <mesh position={[0, 3.3, -1.75]}><boxGeometry args={[4, 2.2, 0.08]} /><meshStandardMaterial color="#e2a84f" emissive="#9b4527" emissiveIntensity={0.7} /></mesh>
        <pointLight position={[0, 3.8, 0]} color="#ffb45c" intensity={12} distance={15} />
    </group>
}

function FirstPersonController({ active }) {
    const keys = useRef(new Set())
    const transitionDone = useRef(false)
    const obstacles = [
        { minX: -11.5, maxX: -10.5, minZ: -72, maxZ: 12 },
        { minX: 10.5, maxX: 11.5, minZ: -72, maxZ: 12 },
        { minX: -17, maxX: 17, minZ: -70.5, maxZ: -69.5 },
        { minX: -11, maxX: 11, minZ: 8.35, maxZ: 9.05 },
        { minX: -10.75, maxX: -2.25, minZ: -23.4, maxZ: -22.6 },
        { minX: 2.25, maxX: 10.75, minZ: -23.4, maxZ: -22.6 },
        { minX: -8.75, maxX: 8.75, minZ: -68.05, maxZ: -67.65 },
        { minX: -9.1, maxX: -4.1, minZ: -5.95, maxZ: -0.05 },
        { minX: 4.1, maxX: 9.1, minZ: -7.95, maxZ: -2.05 },
        { minX: -8.6, maxX: -4.6, minZ: -12.2, maxZ: -8.2 },
        { minX: 4.4, maxX: 8.4, minZ: -13.95, maxZ: -9.95 },
        { minX: -8.5, maxX: -4.5, minZ: -18.9, maxZ: -14.9 },
        { minX: 4.5, maxX: 8.5, minZ: -19.95, maxZ: -15.95 },
        { minX: -8.2, maxX: -5.4, minZ: -0.1, maxZ: 4.1 },
        { minX: 5.4, maxX: 8.2, minZ: -1.1, maxZ: 3.1 },
        ...[-1.55, 1.55].flatMap((x) => [-1, -6, -12, -18].map((z) => ({ minX: x - 0.18, maxX: x + 0.18, minZ: z - 0.18, maxZ: z + 0.18 }))),
        ...[-4, 4].flatMap((x) => [-28, -38].map((z) => ({ minX: x - 0.18, maxX: x + 0.18, minZ: z - 0.18, maxZ: z + 0.18 }))),
        { minX: -9.2, maxX: -8.2, minZ: -68.5, maxZ: -61.5 },
        { minX: 8.2, maxX: 9.2, minZ: -68.5, maxZ: -61.5 },
        { minX: -10.2, maxX: 10.2, minZ: -69, maxZ: -61.8 }
    ]

    const blocked = (x, z) => obstacles.some(({ minX, maxX, minZ, maxZ }) => (
        x > minX - 0.25 && x < maxX + 0.25 && z > minZ - 0.25 && z < maxZ + 0.25
    ))

    useEffect(() => {
        const movementCodes = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD'])
        const clearKeys = () => keys.current.clear()
        const handleKeyDown = (event) => { if (movementCodes.has(event.code)) { event.preventDefault(); keys.current.add(event.code) } }
        const handleKeyUp = (event) => { if (movementCodes.has(event.code)) keys.current.delete(event.code) }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('blur', clearKeys)
        document.addEventListener('visibilitychange', clearKeys)
        return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); window.removeEventListener('blur', clearKeys); document.removeEventListener('visibilitychange', clearKeys) }
    }, [])

    useFrame(({ camera }, delta) => {
        if (!active) return
        const forward = Number(keys.current.has('KeyW')) - Number(keys.current.has('KeyS'))
        const strafe = Number(keys.current.has('KeyD')) - Number(keys.current.has('KeyA'))
        if (!forward && !strafe) return
        const direction = camera.getWorldDirection(new Vector3())
        direction.y = 0
        direction.normalize()
        const right = { x: -direction.z, z: direction.x }
        const speed = 3.2 * delta
        const movementX = (direction.x * forward + right.x * strafe) * speed
        const movementZ = (direction.z * forward + right.z * strafe) * speed
        const nextX = camera.position.x + movementX
        const nextZ = camera.position.z + movementZ
        if (!blocked(nextX, camera.position.z)) camera.position.x = nextX
        if (!blocked(camera.position.x, nextZ)) camera.position.z = nextZ
        const xLimit = camera.position.z < -23 ? 10.2 : 5.8
        camera.position.x = Math.max(-xLimit, Math.min(xLimit, camera.position.x))
        camera.position.z = Math.max(-82, Math.min(8, camera.position.z))
    })

    return <PointerLockControls onLock={() => { transitionDone.current = true }} onUnlock={() => { transitionDone.current = false; keys.current.clear() }} />
}

function VillageWorld({ active }) {
    const cameraStartTime = useRef(null)
    const [moonPosition] = useState(() => [
        -40 + Math.random() * 80,
        20 + Math.random() * 28,
        -90 + Math.random() * 30
    ])
    useFrame(({ camera, clock }) => {
        if (!active) { cameraStartTime.current = null; camera.position.set(0, 1.7, 8.2); camera.lookAt(0, 8.5, -5); return }
        if (cameraStartTime.current === null) cameraStartTime.current = clock.elapsedTime
        const progress = Math.min((clock.elapsedTime - cameraStartTime.current) / 5.5, 1)
        const easedProgress = progress * progress * (3 - 2 * progress)
        if (progress < 1) { camera.position.set(0, 1.7, 8.2); camera.lookAt(0, 8.5 - easedProgress * 7.15, -5 - easedProgress * 7) }
    })

    return <>
        <color attach="background" args={['#080d18']} />
        <fog attach="fog" args={['#080d18', 10, 34]} />
        <Environment preset="night" background={false} />
        <Stars radius={90} depth={45} count={900} factor={1.8} saturation={0} fade speed={0.25} />
        <ambientLight intensity={1.1} color="#c2cbed" />
        <directionalLight position={[-8, 12, 6]} intensity={1.8} color="#ffe0a0" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[50, 50]} /><meshStandardMaterial color="#263c32" roughness={1} /></mesh>
        <mesh position={[0, 0.04, -3]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.8, 42]} /><meshStandardMaterial color="#3b403d" roughness={0.88} /></mesh>
        <ContactShadows position={[0, 0.05, -4]} opacity={0.12} scale={18} blur={1.5} far={5} />
        <House position={[-6.6, 0, -3]} rotation={Math.PI / 2} scale={2.05} />
        <House position={[6.5, 0, -5]} rotation={-Math.PI / 2} scale={1.9} color="#a96649" />
        <House position={[-6.4, 0, -9]} rotation={Math.PI / 2} scale={1.65} color="#b36d4d" />
        <House position={[6.4, 0, -11]} rotation={-Math.PI / 2} scale={1.6} color="#965c47" />
        <House position={[-6.5, 0, -15]} rotation={Math.PI / 2} scale={1.55} color="#805044" />
        <House position={[6.5, 0, -17]} rotation={-Math.PI / 2} scale={1.5} color="#a15f48" />
        <House position={[-6.8, 0, 2]} rotation={Math.PI / 2} scale={1.3} color="#8f5948" />
        <House position={[6.8, 0, 1]} rotation={-Math.PI / 2} scale={1.25} color="#965c47" />
        <VillageGate position={[0, 0, -23]} />
        <Tree position={[-9, 0, 5]} scale={1.9} /><Tree position={[9, 0, 5]} scale={2} />
        <Tree position={[-9, 0, 0]} scale={1.7} /><Tree position={[9, 0, -1]} scale={1.8} />
        <Tree position={[-10, 0, 2]} scale={1.8} /><Tree position={[10, 0, -3]} scale={1.9} />
        <Tree position={[-10.5, 0, -19]} scale={2.1} /><Tree position={[10.5, 0, -20]} scale={2} />
        <Lantern position={[-1.55, 0, -1]} /><Lantern position={[1.55, 0, -6]} /><Lantern position={[-1.55, 0, -12]} /><Lantern position={[1.55, 0, -18]} />
        <Grass position={[-2.5, 0, 3]} scale={1.1} /><Grass position={[2.5, 0, 1]} scale={0.8} /><Grass position={[-2.4, 0, -4]} scale={0.9} /><Grass position={[2.4, 0, -9]} scale={1.2} /><Grass position={[-5.5, 0, -5]} scale={1.5} /><Grass position={[5.8, 0, -2]} scale={1.3} /><Grass position={[-2.6, 0, -2]} scale={1.1} /><Grass position={[2.6, 0, -5]} scale={1.15} /><Grass position={[-2.5, 0, -10]} scale={0.9} /><Grass position={[2.5, 0, -14]} scale={1.2} />
        <Shrub position={[-8.8, 0, 1]} scale={1.5} /><Shrub position={[8.8, 0, 0]} scale={1.35} /><Shrub position={[-9.2, 0, -19]} scale={1.5} /><Shrub position={[9.2, 0, -20]} scale={1.35} />
        <VillageBoundary position={[0, 0, -70]} /><SideVillageWall side={-1} /><SideVillageWall side={1} /><RearCharacterWall /><GroundBeyondGate /><GateLights />
        <MidAutumnCart position={[-6, 0, -34]} color="#a64d36" /><MidAutumnCart position={[6, 0, -45]} color="#496b4c" />
        <LionDance position={[0, 1, -63.2]} color="#c94c35" />
        <MarketStall position={[-7.5, 0, -33]} color="#a64d36" /><MarketStall position={[-7.5, 0, -42]} color="#496b4c" />
        <MarketStall position={[-7.5, 0, -51]} color="#b66a3e" /><MarketStall position={[7.5, 0, -37]} color="#8e4d3d" /><MarketStall position={[7.5, 0, -47]} color="#3f6650" />
        <VillageStage position={[0, 0, -65]} />
        <LanternString position={[0, 6.4, -3]} /><LanternString position={[0, 6.4, -10]} /><LanternString position={[0, 6.4, -17]} />
        <mesh position={moonPosition}><sphereGeometry args={[4.2, 32, 32]} /><meshBasicMaterial color="#ffffff" /></mesh>
        <FirstPersonController active={active} />
    </>
}

function App() {
    const [started, setStarted] = useState(false)
    const [cameraActive, setCameraActive] = useState(false)
    const [scene, setScene] = useState('intro')
    const [stars] = useState(createStars)

    useEffect(() => {
        if (!started) return undefined
        const cameraTimer = setTimeout(() => setCameraActive(true), 3500)
        const sceneTimer = setTimeout(() => setScene('village'), 9000)
        return () => { clearTimeout(cameraTimer); clearTimeout(sceneTimer) }
    }, [started])

    return <>
        <div className={`village-stage ${cameraActive ? 'village-stage-visible' : ''}`}>
            <main className="village"><Canvas shadows camera={{ position: [0, 1.7, 8.2], fov: 62 }}><VillageWorld active={cameraActive} /></Canvas><div className="village-title">Làng ven trăng</div></main>
        </div>
        {scene === 'intro' && <div className={`intro ${cameraActive ? 'intro-leaving' : ''}`}>
            <div className="stars">{stars.map((star) => <div key={star.id} className={`star ${star.sizeClass}`} style={star.style} />)}</div>
            <div className="moon" />
            <div className="clouds"><div className="cloud speed-slow delay-1" /><div className="cloud speed-normal" /><div className="cloud speed-fast delay-2" /><div className="cloud speed-normal delay-3" /></div>
            {!started && <div className="content"><p className="small-title">Một đêm trung thu</p><h1>đêm trăng kéo quân</h1><p className="description">Một câu chuyện nhỏ về đêm trung thu</p><button onClick={() => setStarted(true)}>--- bắt đầu ---</button></div>}
            {started && <div className="started">Câu chuyện bắt đầu...</div>}
        </div>}
    </>
}

export default App
