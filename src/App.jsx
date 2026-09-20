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
    const leftDoor = useRef(null)
    const rightDoor = useRef(null)

    useFrame(({ camera }) => {
        const distance = camera.position.z - position[2]
        const target = distance < 9 ? 1 : 0
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
            <mesh position={[0, 4.3, -0.3]}><planeGeometry args={[3.2, 0.55]} /><meshStandardMaterial color="#ffd76a" emissive="#d27c28" emissiveIntensity={0.7} /></mesh>
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
    return <group position={position}><mesh position={[0, 2.4, 0]} castShadow><cylinderGeometry args={[0.09, 0.13, 4.8, 8]} /><meshStandardMaterial color="#392b27" /></mesh><mesh position={[0, 4.65, 0]}><sphereGeometry args={[0.28, 16, 16]} /><meshStandardMaterial color="#ffd36d" emissive="#f08b2e" emissiveIntensity={1.4} /></mesh><pointLight position={[0, 4.65, 0]} color="#ffb35b" intensity={5} distance={9} /></group>
}

function LanternString({ position }) {
    const points = [[-7, 0], [-3.5, -0.65], [0, -1.05], [3.5, -0.65], [7, 0]]
    return <group position={position}>{points.slice(0, -1).map(([x1, y1], index) => { const [x2, y2] = points[index + 1]; const length = Math.hypot(x2 - x1, y2 - y1); const angle = Math.atan2(y2 - y1, x2 - x1); return <mesh key={`${x1}-${x2}`} position={[(x1 + x2) / 2, (y1 + y2) / 2, 0]} rotation={[0, 0, angle]}><boxGeometry args={[length, 0.045, 0.045]} /><meshStandardMaterial color="#2b2020" roughness={1} /></mesh> })}{points.map(([x, y]) => <group key={x} position={[x, y - 0.55, 0]}><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.025, 0.025, 0.6, 6]} /><meshStandardMaterial color="#3b2925" /></mesh><mesh><sphereGeometry args={[0.22, 12, 12]} /><meshStandardMaterial color="#ff9f37" emissive="#ff5c25" emissiveIntensity={1.8} /></mesh><pointLight color="#ff8e3d" intensity={1.6} distance={4} /></group>)}</group>
}

function VillageBoundary({ position }) {
    return <group position={position}><mesh position={[0, 3.4, 0]} castShadow><boxGeometry args={[34, 6.8, 0.45]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh>{[-15, -10, -5, 0, 5, 10, 15].map((x) => <mesh key={x} position={[x, 7, 0]} castShadow><boxGeometry args={[0.18, 0.7, 0.6]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>)}</group>
}

function SideVillageWall({ side }) {
    return <group position={[side * 11, 2.4, -12]}><mesh castShadow><boxGeometry args={[0.5, 4.8, 44]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh>{[-30, -24, -18, -12, -6, 0, 6, 12].map((z) => <mesh key={z} position={[0, 2.7, z]} castShadow><boxGeometry args={[0.7, 0.7, 0.8]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>)}</group>
}

function RearCharacterWall() {
    return <group position={[0, 2.6, 8.7]}><mesh castShadow><boxGeometry args={[22, 5.2, 0.5]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh>{[-9, -4.5, 0, 4.5, 9].map((x) => <mesh key={x} position={[x, 2.8, 0]} castShadow><boxGeometry args={[0.7, 0.7, 0.8]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>)}</group>
}

function GroundBeyondGate() {
    return <mesh position={[0, 0.025, -30]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 6]} /><meshStandardMaterial color="#39452d" roughness={1} /></mesh>
}

function FirstPersonController({ active }) {
    const keys = useRef(new Set())
    const transitionDone = useRef(false)

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
        camera.position.x += (direction.x * forward + right.x * strafe) * speed
        camera.position.z += (direction.z * forward + right.z * strafe) * speed
        camera.position.x = Math.max(-2.4, Math.min(2.4, camera.position.x))
        camera.position.z = Math.max(-27, Math.min(8, camera.position.z))
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
        <ambientLight intensity={0.82} color="#aab8d8" />
        <directionalLight position={[-8, 12, 6]} intensity={1.25} color="#e6c98d" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[50, 50]} /><meshStandardMaterial color="#263c32" roughness={1} /></mesh>
        <mesh position={[0, 0.02, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[4, 42]} /><meshStandardMaterial color="#242a29" roughness={0.92} /></mesh>
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
        <VillageBoundary position={[0, 0, -34]} /><SideVillageWall side={-1} /><SideVillageWall side={1} /><RearCharacterWall /><GroundBeyondGate />
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
