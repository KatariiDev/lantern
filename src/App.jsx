import './App.css'
import './components/Village.css'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, PointerLockControls, Stars } from '@react-three/drei'
import { DoubleSide, Shape, Vector3 } from 'three'

const vietGableShape = new Shape()
vietGableShape.moveTo(-1.9, 0)
vietGableShape.lineTo(1.9, 0)
vietGableShape.lineTo(-0.2, 1.95)
vietGableShape.closePath()

const starShape = new Shape()
const starPoints = 5
const outerR = 0.26
const innerR = 0.105
for (let i = 0; i < starPoints * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = (i * Math.PI) / starPoints - Math.PI / 2
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r
    if (i === 0) starShape.moveTo(x, y)
    else starShape.lineTo(x, y)
}
starShape.closePath()

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

function StarLantern({ position, swayOffset = 0, scale = 1 }) {
    const starRef = useRef(null)
    useFrame(({ clock }) => {
        if (starRef.current) {
            starRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.8 + swayOffset) * 0.14
            starRef.current.rotation.y = Math.cos(clock.elapsedTime * 1.2 + swayOffset) * 0.16
        }
    })

    return (
        <group position={position} scale={scale}>
            {/* Dây treo đèn lồng */}
            <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 0.44, 6]} />
                <meshStandardMaterial color="#473220" />
            </mesh>
            {/* Thân đèn ông sao 5 cánh */}
            <group ref={starRef} position={[0, -0.48, 0]}>
                <mesh>
                    <shapeGeometry args={[starShape]} />
                    <meshStandardMaterial color="#e52a20" emissive="#ff3326" emissiveIntensity={0.95} side={DoubleSide} transparent opacity={0.92} />
                </mesh>
                {/* Vòng nan tre tròn quanh các cánh sao */}
                <mesh position={[0, 0, 0]}>
                    <ringGeometry args={[0.20, 0.225, 20]} />
                    <meshStandardMaterial color="#d4a359" side={DoubleSide} />
                </mesh>
                {/* Lõi nến lung linh giữa ngôi sao */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.065, 12, 12]} />
                    <meshStandardMaterial color="#fff3a1" emissive="#ffc338" emissiveIntensity={2.8} />
                </mesh>
                {/* <pointLight color="#ff9b3d" intensity={2.2} distance={4.5} /> */}
            </group>
        </group>
    )
}

function CarrouselLantern({ position, swayOffset = 0, scale = 1 }) {
    const lanternRef = useRef(null)
    useFrame(({ clock }) => {
        if (lanternRef.current) {
            lanternRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.7 + swayOffset) * 0.12
            lanternRef.current.rotation.y = clock.elapsedTime * 0.4 + swayOffset
        }
    })

    return (
        <group position={position} scale={scale}>
            {/* Dây treo */}
            <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.32, 6]} />
                <meshStandardMaterial color="#473220" />
            </mesh>
            <group ref={lanternRef} position={[0, -0.38, 0]}>
                {/* Nắp trên mạ vàng */}
                <mesh position={[0, 0.19, 0]}>
                    <cylinderGeometry args={[0.11, 0.13, 0.04, 8]} />
                    <meshStandardMaterial color="#e6b437" roughness={0.5} />
                </mesh>
                {/* Thân đèn quả trám đỏ thắm */}
                <mesh position={[0, 0.08, 0]}>
                    <cylinderGeometry args={[0.13, 0.21, 0.18, 8]} />
                    <meshStandardMaterial color="#cf271d" emissive="#ff3d2e" emissiveIntensity={0.8} />
                </mesh>
                <mesh position={[0, -0.08, 0]}>
                    <cylinderGeometry args={[0.21, 0.13, 0.18, 8]} />
                    <meshStandardMaterial color="#cf271d" emissive="#ff3d2e" emissiveIntensity={0.8} />
                </mesh>
                {/* Đáy đèn */}
                <mesh position={[0, -0.19, 0]}>
                    <cylinderGeometry args={[0.13, 0.11, 0.04, 8]} />
                    <meshStandardMaterial color="#e6b437" roughness={0.5} />
                </mesh>
                {/* Lõi nến phát sáng bên trong */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.06, 12, 12]} />
                    <meshStandardMaterial color="#fff4b0" emissive="#ffb834" emissiveIntensity={2.5} />
                </mesh>
                {/* Tua rua vàng buông rủ */}
                <mesh position={[0, -0.32, 0]}>
                    <cylinderGeometry args={[0.015, 0.04, 0.24, 6]} />
                    <meshStandardMaterial color="#e6b437" roughness={0.6} />
                </mesh>
                {/* <pointLight color="#ff8533" intensity={2.0} distance={4.2} /> */}
            </group>
        </group>
    )
}

function RoundFestiveLantern({ position, swayOffset = 0, scale = 1 }) {
    const ref = useRef(null)
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.z = Math.sin(clock.elapsedTime * 1.5 + swayOffset) * 0.11
            ref.current.rotation.x = Math.cos(clock.elapsedTime * 1.3 + swayOffset) * 0.08
        }
    })

    return (
        <group position={position} scale={scale}>
            <mesh position={[0, -0.14, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.28, 6]} />
                <meshStandardMaterial color="#473220" />
            </mesh>
            <group ref={ref} position={[0, -0.35, 0]}>
                {/* Quả cầu lồng đèn đỏ nếp gấp */}
                <mesh position={[0, 0, 0]} scale={[1, 0.88, 1]}>
                    <sphereGeometry args={[0.19, 14, 12]} />
                    <meshStandardMaterial color="#d4261b" emissive="#ff3324" emissiveIntensity={0.88} />
                </mesh>
                {/* Vành trên */}
                <mesh position={[0, 0.165, 0]}>
                    <cylinderGeometry args={[0.085, 0.085, 0.035, 12]} />
                    <meshStandardMaterial color="#e5b338" />
                </mesh>
                {/* Vành dưới */}
                <mesh position={[0, -0.165, 0]}>
                    <cylinderGeometry args={[0.085, 0.085, 0.035, 12]} />
                    <meshStandardMaterial color="#e5b338" />
                </mesh>
                {/* Tua rua vàng rủ */}
                <mesh position={[0, -0.31, 0]}>
                    <cylinderGeometry args={[0.015, 0.045, 0.26, 6]} />
                    <meshStandardMaterial color="#e5b338" roughness={0.6} />
                </mesh>
                <pointLight color="#ff8833" intensity={2.0} distance={4.2} />
            </group>
        </group>
    )
}

function WaterJar({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            {/* Bụng lu sành nung */}
            <mesh position={[0, 0.32, 0]} castShadow>
                <sphereGeometry args={[0.3, 12, 10]} />
                <meshStandardMaterial color="#4a2c1d" roughness={0.95} />
            </mesh>
            {/* Miệng lu */}
            <mesh position={[0, 0.54, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.22, 0.1, 12]} />
                <meshStandardMaterial color="#3b2014" roughness={0.9} />
            </mesh>
            {/* Nắp gỗ che lu */}
            <mesh position={[0, 0.59, 0]} rotation={[0.08, 0.2, 0.05]} castShadow>
                <cylinderGeometry args={[0.19, 0.19, 0.04, 10]} />
                <meshStandardMaterial color="#785335" roughness={0.9} />
            </mesh>
            {/* Cán gáo mộc */}
            <mesh position={[0.1, 0.62, 0]} rotation={[0.4, 0.3, -0.6]}>
                <cylinderGeometry args={[0.014, 0.014, 0.38, 6]} />
                <meshStandardMaterial color="#94744b" />
            </mesh>
        </group>
    )
}

function BambooBench({ position, rotation = 0, scale = 1 }) {
    return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
            {/* Mặt chõng tre */}
            <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.4, 0.05, 0.64]} />
                <meshStandardMaterial color="#9c7b48" roughness={0.85} />
            </mesh>
            {/* 4 Chân chõng nan tre */}
            {[-0.6, 0.6].flatMap((x) => [-0.25, 0.25].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 0.19, z]} castShadow>
                    <cylinderGeometry args={[0.035, 0.04, 0.38, 6]} />
                    <meshStandardMaterial color="#826436" roughness={0.9} />
                </mesh>
            )))}
            {/* Thanh giằng chõng */}
            <mesh position={[0, 0.12, -0.25]} castShadow>
                <boxGeometry args={[1.3, 0.03, 0.03]} />
                <meshStandardMaterial color="#826436" />
            </mesh>
            <mesh position={[0, 0.12, 0.25]} castShadow>
                <boxGeometry args={[1.3, 0.03, 0.03]} />
                <meshStandardMaterial color="#826436" />
            </mesh>
            {/* Ấm tích uống chè xanh */}
            <mesh position={[-0.25, 0.44, 0]} castShadow>
                <cylinderGeometry args={[0.055, 0.07, 0.09, 8]} />
                <meshStandardMaterial color="#3d493a" roughness={0.7} />
            </mesh>
            <mesh position={[-0.1, 0.42, 0.05]}>
                <cylinderGeometry args={[0.026, 0.022, 0.042, 6]} />
                <meshStandardMaterial color="#dcd3ba" roughness={0.8} />
            </mesh>
            {/* Đĩa bánh nướng Trung Thu */}
            <mesh position={[0.25, 0.41, 0]} receiveShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.02, 10]} />
                <meshStandardMaterial color="#e5dec9" roughness={0.8} />
            </mesh>
            <mesh position={[0.25, 0.435, 0]} castShadow>
                <cylinderGeometry args={[0.055, 0.055, 0.035, 8]} />
                <meshStandardMaterial color="#a05e26" roughness={0.7} />
            </mesh>
        </group>
    )
}

function Haystack({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            {/* Khối đáy đống rơm */}
            <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.85, 1.1, 0.85, 12]} />
                <meshStandardMaterial color="#9f7c3e" roughness={1} />
            </mesh>
            {/* Chóp nón đống rơm vàng */}
            <mesh position={[0, 1.35, 0]} castShadow>
                <coneGeometry args={[0.92, 1.45, 12]} />
                <meshStandardMaterial color="#b18b45" roughness={1} />
            </mesh>
            {/* Cọc tre cắm giữa đống rơm */}
            <mesh position={[0, 1.25, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 2.7, 6]} />
                <meshStandardMaterial color="#685031" roughness={0.9} />
            </mesh>
        </group>
    )
}

function BananaTree({ position, scale = 1, rotation = 0 }) {
    return (
        <group position={position} scale={scale} rotation={[0, rotation, 0]}>
            {/* Thân cây chuối nghiêng tự nhiên */}
            <mesh position={[0, 1.25, 0]} rotation={[0.06, 0, 0.04]} castShadow>
                <cylinderGeometry args={[0.12, 0.19, 2.5, 8]} />
                <meshStandardMaterial color="#476936" roughness={0.9} />
            </mesh>
            {/* Các tàu lá chuối quê rủ xuống mềm mại */}
            {[
                { rot: [0.45, 0, -0.3], pos: [0.45, 2.45, 0.25] },
                { rot: [0.4, 1.3, -0.25], pos: [0.15, 2.55, 0.5] },
                { rot: [0.35, 2.4, -0.35], pos: [-0.45, 2.45, 0.25] },
                { rot: [0.4, 3.6, -0.3], pos: [-0.35, 2.4, -0.38] },
                { rot: [0.45, 4.8, -0.35], pos: [0.35, 2.4, -0.38] },
                { rot: [0.15, 0.8, -0.1], pos: [0.12, 2.8, 0.12] },
            ].map((leaf, idx) => (
                <group key={idx} position={leaf.pos} rotation={leaf.rot}>
                    <mesh position={[0, 0, 0.55]}>
                        <cylinderGeometry args={[0.018, 0.025, 1.15, 5]} />
                        <meshStandardMaterial color="#55803e" />
                    </mesh>
                    <mesh position={[0, 0.02, 0.55]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
                        <planeGeometry args={[0.42, 1.15]} />
                        <meshStandardMaterial color={idx === 5 ? '#6ea64e' : '#3c6e33'} roughness={0.8} side={DoubleSide} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

function BackyardChickenCoop({ position }) {
    return (
        <group position={position}>
            {/* Hàng rào tre nứa bao quanh vườn sau */}
            <mesh position={[0, 0.45, -1.6]} castShadow>
                <boxGeometry args={[5.8, 0.04, 0.04]} />
                <meshStandardMaterial color="#6a5234" roughness={1} />
            </mesh>
            <mesh position={[0, 0.8, -1.6]} castShadow>
                <boxGeometry args={[5.8, 0.04, 0.04]} />
                <meshStandardMaterial color="#6a5234" roughness={1} />
            </mesh>
            {[-2.8, -1.4, 0, 1.4, 2.8].map((x) => (
                <mesh key={x} position={[x, 0.5, -1.6]} castShadow>
                    <cylinderGeometry args={[0.035, 0.045, 1.0, 6]} />
                    <meshStandardMaterial color="#543e26" roughness={1} />
                </mesh>
            ))}
            {/* Hàng rào hai bên vườn sau */}
            {[-2.8, 2.8].map((x) => (
                <group key={x}>
                    <mesh position={[x, 0.45, -0.8]} rotation={[0, Math.PI / 2, 0]} castShadow>
                        <boxGeometry args={[1.6, 0.04, 0.04]} />
                        <meshStandardMaterial color="#6a5234" />
                    </mesh>
                    <mesh position={[x, 0.8, -0.8]} rotation={[0, Math.PI / 2, 0]} castShadow>
                        <boxGeometry args={[1.6, 0.04, 0.04]} />
                        <meshStandardMaterial color="#6a5234" />
                    </mesh>
                    <mesh position={[x, 0.5, -0.8]} castShadow>
                        <cylinderGeometry args={[0.035, 0.045, 1.0, 6]} />
                        <meshStandardMaterial color="#543e26" />
                    </mesh>
                </group>
            ))}

            {/* Chuồng gà tre nứa mái rơm nghiêng */}
            <group position={[-1.3, 0, -0.6]}>
                {/* 4 Cột tre chống chuồng */}
                {[-0.9, 0.9].flatMap((x) => [-0.55, 0.55].map((z) => (
                    <mesh key={`${x}-${z}`} position={[x, 0.65, z]} castShadow>
                        <cylinderGeometry args={[0.035, 0.04, 1.3, 6]} />
                        <meshStandardMaterial color="#634c32" roughness={1} />
                    </mesh>
                )))}
                {/* Mái chuồng gà lợp rơm rạ dốc nghiêng */}
                <mesh position={[0, 1.35, 0]} rotation={[0.18, 0, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.0, 0.08, 1.4]} />
                    <meshStandardMaterial color="#91713d" roughness={1} />
                </mesh>
                {/* Vách nan tre quanh chuồng */}
                <mesh position={[0, 0.55, -0.55]} castShadow>
                    <boxGeometry args={[1.8, 0.9, 0.03]} />
                    <meshStandardMaterial color="#7a5d3b" roughness={1} />
                </mesh>
                <mesh position={[-0.9, 0.55, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[1.1, 0.9, 0.03]} />
                    <meshStandardMaterial color="#7a5d3b" roughness={1} />
                </mesh>
                <mesh position={[0.9, 0.55, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[1.1, 0.9, 0.03]} />
                    <meshStandardMaterial color="#7a5d3b" roughness={1} />
                </mesh>
                {/* Cửa chuồng gà bằng nan tre hé mở */}
                <mesh position={[-0.35, 0.55, 0.55]} rotation={[0, -0.5, 0]} castShadow>
                    <boxGeometry args={[0.65, 0.85, 0.03]} />
                    <meshStandardMaterial color="#886843" roughness={1} />
                </mesh>
                {/* Máng ăn cho gà bằng tre bổ đôi */}
                <mesh position={[0.2, 0.1, 0.75]} castShadow>
                    <boxGeometry args={[0.85, 0.09, 0.15]} />
                    <meshStandardMaterial color="#a3824f" roughness={0.9} />
                </mesh>
                {/* Khay nước đất nung */}
                <mesh position={[-0.6, 0.06, 0.75]} castShadow>
                    <cylinderGeometry args={[0.13, 0.1, 0.1, 10]} />
                    <meshStandardMaterial color="#5a3822" roughness={0.9} />
                </mesh>
                {/* Ổ rơm cho gà đẻ trứng */}
                <mesh position={[0.45, 0.18, -0.15]} castShadow>
                    <torusGeometry args={[0.2, 0.08, 8, 14]} />
                    <meshStandardMaterial color="#c29b4e" roughness={1} />
                </mesh>
                {/* Quả trứng gà tròn nhỏ */}
                <mesh position={[0.45, 0.22, -0.15]}>
                    <sphereGeometry args={[0.045, 8, 8]} />
                    <meshStandardMaterial color="#fff3df" roughness={0.6} />
                </mesh>
                <mesh position={[0.5, 0.22, -0.1]}>
                    <sphereGeometry args={[0.042, 8, 8]} />
                    <meshStandardMaterial color="#ffeed4" roughness={0.6} />
                </mesh>

                {/* Chú gà trống mào cờ đứng trên thanh gỗ chuồng gà */}
                <group position={[-0.45, 1.15, 0.45]}>
                    <mesh position={[0, 0.12, 0]} scale={[1.2, 0.85, 0.85]} castShadow>
                        <sphereGeometry args={[0.14, 10, 10]} />
                        <meshStandardMaterial color="#913b19" roughness={0.8} />
                    </mesh>
                    <mesh position={[0.1, 0.22, 0]} castShadow>
                        <coneGeometry args={[0.08, 0.18, 8]} />
                        <meshStandardMaterial color="#c97424" roughness={0.8} />
                    </mesh>
                    <mesh position={[0.13, 0.32, 0]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshStandardMaterial color="#ba4e1c" />
                    </mesh>
                    <mesh position={[0.13, 0.39, 0]}>
                        <boxGeometry args={[0.04, 0.06, 0.02]} />
                        <meshStandardMaterial color="#e02015" />
                    </mesh>
                    <mesh position={[0.18, 0.31, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <coneGeometry args={[0.02, 0.05, 5]} />
                        <meshStandardMaterial color="#e5a827" />
                    </mesh>
                    <mesh position={[-0.14, 0.24, 0]} rotation={[0, 0, 0.7]} castShadow>
                        <boxGeometry args={[0.16, 0.04, 0.03]} />
                        <meshStandardMaterial color="#1a2d24" />
                    </mesh>
                </group>

                {/* Đàn gà con và gà mái mổ thóc dưới đất */}
                <group position={[0.3, 0.08, 0.9]}>
                    <mesh position={[0, 0, 0]} castShadow><sphereGeometry args={[0.09, 8, 8]} /><meshStandardMaterial color="#78502d" /></mesh>
                    <mesh position={[0.07, 0.08, 0]}><sphereGeometry args={[0.04, 6, 6]} /><meshStandardMaterial color="#78502d" /></mesh>
                    <mesh position={[0.1, 0.07, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.015, 0.03, 4]} /><meshStandardMaterial color="#d49428" /></mesh>
                </group>
                <group position={[0.65, 0.04, 0.7]}>
                    <mesh castShadow><sphereGeometry args={[0.045, 6, 6]} /><meshStandardMaterial color="#f0ca35" /></mesh>
                </group>
                <group position={[0.55, 0.04, 0.85]}>
                    <mesh castShadow><sphereGeometry args={[0.04, 6, 6]} /><meshStandardMaterial color="#f0ca35" /></mesh>
                </group>
            </group>

            {/* Đống rơm vàng ở góc sau vườn (tuyệt đối không bị kẹt giữa hai nhà) */}
            <Haystack position={[1.8, 0, -0.6]} scale={1.35} />
        </group>
    )
}

function HouseInterior() {
    return (
        <group position={[0, 0.28, 0]}>
            {/* Gian giữa: Án gian thờ gia tiên cổ truyền */}
            <group position={[0, 0, -1.2]}>
                {/* Bàn thờ gỗ mít sơn gụ */}
                <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1.8, 0.08, 0.75]} />
                    <meshStandardMaterial color="#421a0f" roughness={0.8} />
                </mesh>
                {/* 4 Chân bàn thờ chạm khắc */}
                {[-0.8, 0.8].flatMap((x) => [-0.3, 0.3].map((z) => (
                    <mesh key={`${x}-${z}`} position={[x, 0.31, z]} castShadow>
                        <boxGeometry args={[0.08, 0.62, 0.08]} />
                        <meshStandardMaterial color="#35140b" roughness={0.85} />
                    </mesh>
                )))}
                {/* Yếm bàn thờ chạm hoa văn triện */}
                <mesh position={[0, 0.52, 0.32]} castShadow>
                    <boxGeometry args={[1.65, 0.18, 0.03]} />
                    <meshStandardMaterial color="#501d11" roughness={0.8} />
                </mesh>

                {/* Bát hương đồng sành đỏ ở chính giữa */}
                <mesh position={[0, 0.76, 0]} castShadow>
                    <cylinderGeometry args={[0.09, 0.08, 0.14, 12]} />
                    <meshStandardMaterial color="#912818" roughness={0.7} />
                </mesh>
                {/* Chân nến đồng hai bên bát hương */}
                {[-0.45, 0.45].map((x) => (
                    <group key={x} position={[x, 0.73, 0]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.035, 0.05, 0.18, 8]} />
                            <meshStandardMaterial color="#c2983c" metalness={0.6} roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.15, 0]}>
                            <cylinderGeometry args={[0.016, 0.016, 0.12, 6]} />
                            <meshStandardMaterial color="#c92318" />
                        </mesh>
                        <mesh position={[0, 0.23, 0]}>
                            <sphereGeometry args={[0.024, 8, 8]} />
                            <meshStandardMaterial color="#fff3a3" emissive="#ff9d24" emissiveIntensity={3.2} />
                        </mesh>
                    </group>
                ))}
                {/* Ánh nến bàn thờ tỏa sáng ấm áp bên trong nhà */}
                <pointLight position={[0, 1.1, 0.1]} color="#ff9b36" intensity={3.5} distance={7.5} />

                {/* Mâm bồng ngũ quả rằm tháng Tám */}
                <mesh position={[-0.24, 0.72, 0.18]} castShadow>
                    <cylinderGeometry args={[0.11, 0.06, 0.05, 10]} />
                    <meshStandardMaterial color="#c2983c" />
                </mesh>
                <mesh position={[-0.24, 0.78, 0.18]}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshStandardMaterial color="#d49228" roughness={0.8} />
                </mesh>

                {/* Lọ hoa cúc vàng mùa thu */}
                <mesh position={[0.24, 0.76, 0.18]} castShadow>
                    <cylinderGeometry args={[0.045, 0.065, 0.14, 8]} />
                    <meshStandardMaterial color="#2d473b" roughness={0.7} />
                </mesh>
                <mesh position={[0.24, 0.86, 0.18]}>
                    <sphereGeometry args={[0.05, 6, 6]} />
                    <meshStandardMaterial color="#f0be2e" emissive="#ffcc33" emissiveIntensity={0.6} />
                </mesh>

                {/* Bức hoành phi sơn son thiếp vàng phía trên bàn thờ */}
                <mesh position={[0, 2.2, -0.45]} castShadow>
                    <boxGeometry args={[1.7, 0.45, 0.04]} />
                    <meshStandardMaterial color="#7a1c12" roughness={0.7} />
                </mesh>
                <mesh position={[0, 2.2, -0.42]}>
                    <boxGeometry args={[1.56, 0.35, 0.02]} />
                    <meshStandardMaterial color="#cca13b" emissive="#bb8e2e" emissiveIntensity={0.8} />
                </mesh>

                {/* Đôi câu đối đỏ chữ vàng hai bên */}
                {[-1.25, 1.25].map((x) => (
                    <group key={x} position={[x, 1.4, -0.45]}>
                        <mesh castShadow>
                            <boxGeometry args={[0.22, 1.5, 0.03]} />
                            <meshStandardMaterial color="#881f15" roughness={0.7} />
                        </mesh>
                        <mesh position={[0, 0, 0.02]}>
                            <boxGeometry args={[0.16, 1.4, 0.01]} />
                            <meshStandardMaterial color="#cca13b" emissive="#bb8e2e" emissiveIntensity={0.6} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Phía trước: Bộ bàn ghế trường kỷ gỗ gụ */}
            <group position={[0, 0, 0.45]}>
                <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1.3, 0.05, 0.55]} />
                    <meshStandardMaterial color="#421a0f" roughness={0.85} />
                </mesh>
                {[-0.55, 0.55].flatMap((x) => [-0.2, 0.2].map((z) => (
                    <mesh key={`${x}-${z}`} position={[x, 0.22, z]} castShadow>
                        <boxGeometry args={[0.05, 0.44, 0.05]} />
                        <meshStandardMaterial color="#35140b" />
                    </mesh>
                )))}
                <mesh position={[-0.25, 0.52, 0]} castShadow>
                    <cylinderGeometry args={[0.07, 0.08, 0.11, 8]} />
                    <meshStandardMaterial color="#785934" roughness={0.9} />
                </mesh>
                <mesh position={[0.2, 0.48, 0]} receiveShadow>
                    <cylinderGeometry args={[0.09, 0.09, 0.02, 10]} />
                    <meshStandardMaterial color="#e5dec9" />
                </mesh>
                <mesh position={[0.2, 0.51, 0]} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 0.035, 8]} />
                    <meshStandardMaterial color="#a05e26" roughness={0.7} />
                </mesh>

                {/* Ghế trường kỷ hai bên */}
                {[-0.85, 0.85].map((x) => (
                    <group key={x} position={[x, 0, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
                        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
                            <boxGeometry args={[0.55, 0.04, 1.15]} />
                            <meshStandardMaterial color="#421a0f" roughness={0.85} />
                        </mesh>
                        <mesh position={[0, 0.6, -0.52]} castShadow>
                            <boxGeometry args={[0.55, 0.6, 0.04]} />
                            <meshStandardMaterial color="#35140b" roughness={0.85} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    )
}

function House({
    position,
    rotation = 0,
    scale = 1,
    variant = 'tiled',
    color,
    roofColor,
    hasBench = true,
    hasJar = true,
    hasLantern = true,
    hasBanana = false,
    hasHaystack = false,
    seed = 0
}) {
    const isThatched = variant === 'thatched'
    const actualWallColor = color || (isThatched ? '#8f6a3b' : '#a68146')
    const actualRoofColor = roofColor || (isThatched ? '#8a673b' : '#7a2618')
    const woodColor = isThatched ? '#5a3f26' : '#331d11'

    return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
            {/* Nền nhà & Thềm hiên gạch nung: chìm xuống đất 0.08m, cao 0.32m để hoàn toàn không bị Z-fighting */}
            <mesh position={[0, 0.12, 0.6]} receiveShadow>
                <boxGeometry args={[6.8, 0.40, 5.0]} />
                <meshStandardMaterial color={isThatched ? '#5c432d' : '#6d291b'} roughness={0.92} />
            </mesh>

            {/* Bậc tam cấp bước lên hiên (chìm sâu chống Z-fighting) */}
            <mesh position={[0, 0.08, 3.35]} receiveShadow>
                <boxGeometry args={[2.6, 0.20, 0.5]} />
                <meshStandardMaterial color={isThatched ? '#523c28' : '#632518'} roughness={0.92} />
            </mesh>
            <mesh position={[0, 0.20, 3.10]} receiveShadow>
                <boxGeometry args={[2.4, 0.24, 0.4]} />
                <meshStandardMaterial color={isThatched ? '#523c28' : '#632518'} roughness={0.92} />
            </mesh>

            {/* Lòng nhà rỗng: Tường sau */}
            <mesh position={[0, 1.84, -1.8]} castShadow receiveShadow>
                <boxGeometry args={[6.4, 3.12, 0.2]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} />
            </mesh>

            {/* Tường hồi hai bên */}
            <mesh position={[-3.2, 1.84, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 3.12, 3.6]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} />
            </mesh>
            <mesh position={[3.2, 1.84, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 3.12, 3.6]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} />
            </mesh>

            {/* Tường mặt trước: Hai gian bên */}
            <mesh position={[-2.15, 1.84, 1.8]} castShadow receiveShadow>
                <boxGeometry args={[2.1, 3.12, 0.16]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} />
            </mesh>
            <mesh position={[2.15, 1.84, 1.8]} castShadow receiveShadow>
                <boxGeometry args={[2.1, 3.12, 0.16]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} />
            </mesh>

            {/* Lanh tô trên cửa chính gian giữa */}
            <mesh position={[0, 3.15, 1.8]} castShadow>
                <boxGeometry args={[2.2, 0.5, 0.16]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} />
            </mesh>
            {/* Ngưỡng cửa gỗ gian giữa */}
            <mesh position={[0, 0.38, 1.8]} castShadow>
                <boxGeometry args={[2.2, 0.2, 0.18]} />
                <meshStandardMaterial color="#2d170f" roughness={0.9} />
            </mesh>

            {/* Đôi cánh cửa gỗ mở hé góc đón trăng và lộ nội thất bên trong */}
            <mesh position={[-0.95, 1.6, 1.82]} rotation={[0, -0.75, 0]} castShadow>
                <boxGeometry args={[0.88, 2.45, 0.05]} />
                <meshStandardMaterial color="#382015" roughness={0.88} />
            </mesh>
            <mesh position={[0.95, 1.6, 1.82]} rotation={[0, 0.75, 0]} castShadow>
                <boxGeometry args={[0.88, 2.45, 0.05]} />
                <meshStandardMaterial color="#382015" roughness={0.88} />
            </mesh>

            {/* Chân tường đá ong/gạch nung nhô dày dứt khoát 0.12m chống trùng mặt phẳng */}
            {!isThatched && (
                <>
                    <mesh position={[0, 0.42, -1.82]} castShadow>
                        <boxGeometry args={[6.56, 0.60, 0.32]} />
                        <meshStandardMaterial color="#483426" roughness={0.95} />
                    </mesh>
                    <mesh position={[-3.22, 0.42, 0]} castShadow>
                        <boxGeometry args={[0.32, 0.60, 3.76]} />
                        <meshStandardMaterial color="#483426" roughness={0.95} />
                    </mesh>
                    <mesh position={[3.22, 0.42, 0]} castShadow>
                        <boxGeometry args={[0.32, 0.60, 3.76]} />
                        <meshStandardMaterial color="#483426" roughness={0.95} />
                    </mesh>
                </>
            )}

            {/* Nẹp tre gia cố vách đất cho nhà tranh */}
            {isThatched && (
                <>
                    {[-1.0, 1.0].map((y) => (
                        <mesh key={y} position={[0, 1.84 + y * 0.7, -1.88]}>
                            <boxGeometry args={[6.35, 0.05, 0.03]} />
                            <meshStandardMaterial color="#553a20" />
                        </mesh>
                    ))}
                    {[-2.0, 0, 2.0].map((x) => (
                        <mesh key={x} position={[x, 1.84, -1.88]}>
                            <boxGeometry args={[0.05, 3.0, 0.03]} />
                            <meshStandardMaterial color="#553a20" />
                        </mesh>
                    ))}
                </>
            )}

            {/* Vì kèo gỗ mộc đỡ mái hiên cổ truyền */}
            <mesh position={[-2.7, 3.45, 2.35]} rotation={[0.508, 0, 0]}>
                <boxGeometry args={[0.1, 0.12, 1.2]} />
                <meshStandardMaterial color={woodColor} />
            </mesh>
            <mesh position={[2.7, 3.45, 2.35]} rotation={[0.508, 0, 0]}>
                <boxGeometry args={[0.1, 0.12, 1.2]} />
                <meshStandardMaterial color={woodColor} />
            </mesh>

            {/* Không gian nội thất bên trong nhà ba gian */}
            <HouseInterior />

            {/* Hai đầu hồi tam giác bít đốc cổ truyền */}
            <mesh position={[-3.2, 3.4, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
                <shapeGeometry args={[vietGableShape]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} side={DoubleSide} />
            </mesh>
            <mesh position={[3.2, 3.4, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
                <shapeGeometry args={[vietGableShape]} />
                <meshStandardMaterial color={actualWallColor} roughness={0.95} side={DoubleSide} />
            </mesh>

            {/* Mái trước: Dốc che hàng hiên vươn dài cao 3.45m */}
            <mesh position={[0, 4.425, 1.55]} rotation={[0.508, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[7.0, isThatched ? 0.18 : 0.11, 4.05]} />
                <meshStandardMaterial color={actualRoofColor} roughness={isThatched ? 1.0 : 0.85} />
            </mesh>

            {/* Mái sau */}
            <mesh position={[0, 4.475, -1.2]} rotation={[-0.747, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[7.0, isThatched ? 0.18 : 0.11, 2.75]} />
                <meshStandardMaterial color={actualRoofColor} roughness={isThatched ? 1.0 : 0.85} />
            </mesh>

            {/* Bờ nóc đỉnh mái vươn cao 5.4m bề thế */}
            <mesh position={[0, 5.4, -0.2]} castShadow>
                <boxGeometry args={[7.06, 0.16, 0.2]} />
                <meshStandardMaterial color={isThatched ? '#543f29' : '#52241a'} roughness={0.9} />
            </mesh>
            {!isThatched && (
                <>
                    <mesh position={[-3.53, 5.48, -0.2]} castShadow>
                        <boxGeometry args={[0.12, 0.22, 0.12]} />
                        <meshStandardMaterial color="#52241a" />
                    </mesh>
                    <mesh position={[3.53, 5.48, -0.2]} castShadow>
                        <boxGeometry args={[0.12, 0.22, 0.12]} />
                        <meshStandardMaterial color="#52241a" />
                    </mesh>
                </>
            )}

            {/* Xà hiên đỡ mái cao 3.45m */}
            <mesh position={[0, 3.45, 2.9]} castShadow>
                <boxGeometry args={[6.6, 0.14, 0.14]} />
                <meshStandardMaterial color={woodColor} roughness={0.9} />
            </mesh>

            {/* 4 Cột hiên gỗ tròn cao 3.35m với chân tảng đá mộc */}
            {[-2.7, -0.95, 0.95, 2.7].map((x) => (
                <group key={x} position={[x, 0, 2.9]}>
                    <mesh position={[0, 0.42, 0]} castShadow>
                        <cylinderGeometry args={[0.11, 0.14, 0.28, 8]} />
                        <meshStandardMaterial color="#4b4642" roughness={1} />
                    </mesh>
                    <mesh position={[0, 1.83, 0]} castShadow>
                        <cylinderGeometry args={[0.075, 0.085, 3.1, 8]} />
                        <meshStandardMaterial color={woodColor} roughness={0.9} />
                    </mesh>
                </group>
            ))}

            {/* Hai gian bên: Cửa sổ chấn song gỗ có ánh đèn vàng ấm tỏa sáng */}
            {[-2.15, 2.15].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    <mesh position={[0, 1.7, 1.81]}>
                        <boxGeometry args={[0.95, 0.95, 0.06]} />
                        <meshStandardMaterial color="#271710" />
                    </mesh>
                    <mesh position={[0, 1.7, 1.82]}>
                        <planeGeometry args={[0.85, 0.85]} />
                        <meshStandardMaterial color="#ffe18b" emissive="#ff952b" emissiveIntensity={1.5} />
                    </mesh>
                    {[-0.3, -0.1, 0.1, 0.3].map((dx) => (
                        <mesh key={dx} position={[dx, 1.7, 1.84]}>
                            <boxGeometry args={[0.03, 0.85, 0.03]} />
                            <meshStandardMaterial color="#2d1a12" />
                        </mesh>
                    ))}
                    <mesh position={[0, 2.15, 1.94]} rotation={[-0.45, 0, 0]}>
                        <boxGeometry args={[0.96, 0.35, 0.03]} />
                        <meshStandardMaterial color="#3a2418" />
                    </mesh>
                </group>
            ))}

            {/* Đèn ông sao treo hiên nhà đón Tết Trung Thu */}
            {hasLantern && (
                <StarLantern position={[-0.95, 3.45, 2.9]} swayOffset={seed * 1.5} scale={1.25} />
            )}

            {/* Chum sành / lu nước đất nung góc hiên */}
            {hasJar && (
                <WaterJar position={[-2.7, 0.28, 2.8]} scale={1.25} />
            )}

            {/* Chõng tre uống trà, ngắm trăng, ăn bánh nướng ngoài hiên */}
            {hasBench && (
                <BambooBench position={[1.8, 0.28, 2.4]} scale={1.2} />
            )}

            {/* Bụi chuối bờ hè cạnh nhà */}
            {hasBanana && (
                <BananaTree position={[-4.0, 0, 0.5]} scale={1.4} rotation={seed * 0.7} />
            )}

            {/* Vườn sau nhà với chuồng nuôi gà và đống rơm vàng */}
            {hasHaystack && (
                <BackyardChickenCoop position={[0, 0, -3.6]} />
            )}
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

function BanyanTree({ position }) {
    return (
        <group position={position}>
            {/* Gốc cây đa cổ thụ xù xì */}
            <mesh position={[0, 2.2, 0]} castShadow>
                <cylinderGeometry args={[0.65, 0.92, 4.4, 8]} />
                <meshStandardMaterial color="#423429" roughness={1} />
            </mesh>
            {/* Các rễ phụ buông rủ xuống đất */}
            {[-0.6, 0.6].flatMap((x) => [-0.5, 0.5].map((z) => (
                <mesh key={`${x}-${z}`} position={[x * 1.2, 2.0, z * 1.1]} castShadow>
                    <cylinderGeometry args={[0.07, 0.09, 4.0, 6]} />
                    <meshStandardMaterial color="#4f3c30" roughness={1} />
                </mesh>
            )))}
            {/* Nhánh cành vươn ra che rợp cổng làng */}
            <mesh position={[1.5, 3.8, 0.4]} rotation={[0, 0, -0.55]} castShadow>
                <cylinderGeometry args={[0.25, 0.38, 3.2, 8]} />
                <meshStandardMaterial color="#423429" roughness={1} />
            </mesh>
            {/* Các khối tán lá đa xum xuê cổ kính */}
            <mesh position={[0, 4.8, 0]} castShadow><icosahedronGeometry args={[2.2, 1]} /><meshStandardMaterial color="#1a4230" roughness={0.9} /></mesh>
            <mesh position={[1.8, 4.5, 0.8]} castShadow><icosahedronGeometry args={[1.8, 1]} /><meshStandardMaterial color="#234e3a" roughness={0.9} /></mesh>
            <mesh position={[-1.4, 4.6, -0.6]} castShadow><icosahedronGeometry args={[1.9, 1]} /><meshStandardMaterial color="#1a4230" roughness={0.9} /></mesh>
            <mesh position={[0.5, 5.6, -0.3]} castShadow><icosahedronGeometry args={[1.7, 1]} /><meshStandardMaterial color="#275640" roughness={0.9} /></mesh>
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
        if (distance < 6) gateOpened.current = true
        if (distance > 9) gateOpened.current = false
        const target = gateOpened.current ? 1 : 0
        openProgress.current += (target - openProgress.current) * 0.045
        if (leftDoor.current && rightDoor.current) {
            leftDoor.current.rotation.y = -openProgress.current * 1.25
            rightDoor.current.rotation.y = openProgress.current * 1.25
        }
    })

    return (
        <group position={position}>
            {/* Cây đa cổ thụ bên cổng làng */}
            <BanyanTree position={[-4.8, 0, 1.2]} />

            {/* Trụ cổng gạch đá ong cổ rêu phong hai bên */}
            <mesh position={[-2.2, 2.3, 0]} castShadow>
                <boxGeometry args={[1.1, 4.6, 1.4]} />
                <meshStandardMaterial color="#54483e" roughness={1} />
            </mesh>
            <mesh position={[2.2, 2.3, 0]} castShadow>
                <boxGeometry args={[1.1, 4.6, 1.4]} />
                <meshStandardMaterial color="#54483e" roughness={1} />
            </mesh>

            {/* Chân tảng đá mộc đỡ 2 trụ cổng */}
            <mesh position={[-2.2, 0.25, 0]} receiveShadow>
                <boxGeometry args={[1.25, 0.5, 1.55]} />
                <meshStandardMaterial color="#423b35" roughness={1} />
            </mesh>
            <mesh position={[2.2, 0.25, 0]} receiveShadow>
                <boxGeometry args={[1.25, 0.5, 1.55]} />
                <meshStandardMaterial color="#423b35" roughness={1} />
            </mesh>

            {/* Khối vòm cổng cuốn tò vò */}
            <mesh position={[0, 4.0, 0]} castShadow>
                <boxGeometry args={[4.4, 1.2, 1.2]} />
                <meshStandardMaterial color="#54483e" roughness={1} />
            </mesh>

            {/* Bảng đại tự cuốn thư "LÀNG VEN TRĂNG" */}
            <mesh position={[0, 4.35, 0.65]}>
                <boxGeometry args={[2.5, 0.65, 0.08]} />
                <meshStandardMaterial color="#7a2016" roughness={0.8} />
            </mesh>
            <mesh position={[0, 4.35, 0.7]}>
                <boxGeometry args={[2.36, 0.52, 0.02]} />
                <meshStandardMaterial color="#d4a345" emissive="#c68a2d" emissiveIntensity={0.6} />
            </mesh>

            {/* Tầng mái 1 (Mái hạ ngói đao cong che cổng) */}
            <mesh position={[0, 4.85, 0]} castShadow>
                <boxGeometry args={[6.2, 0.16, 2.2]} />
                <meshStandardMaterial color="#6d291b" roughness={0.88} />
            </mesh>
            {/* 4 Đầu đao cong vút nhẹ ở 4 góc mái */}
            {[
                [-3.1, 4.98, -1.05],
                [3.1, 4.98, -1.05],
                [-3.1, 4.98, 1.05],
                [3.1, 4.98, 1.05]
            ].map((p, idx) => (
                <mesh key={idx} position={p} rotation={[0, 0, idx % 2 === 0 ? -0.4 : 0.4]} castShadow>
                    <boxGeometry args={[0.35, 0.12, 0.14]} />
                    <meshStandardMaterial color="#531e13" />
                </mesh>
            ))}

            {/* Cổ lâu / gác lầu nhỏ giữa 2 tầng mái */}
            <mesh position={[0, 5.45, 0]} castShadow>
                <boxGeometry args={[2.6, 0.95, 1.4]} />
                <meshStandardMaterial color="#54483e" roughness={1} />
            </mesh>
            {/* Ô cửa vòm cổ lâu phát sáng ánh trăng */}
            <mesh position={[0, 5.45, 0.72]}>
                <circleGeometry args={[0.28, 16]} />
                <meshStandardMaterial color="#ffeaa8" emissive="#ffba42" emissiveIntensity={0.8} />
            </mesh>

            {/* Tầng mái 2 (Mái thượng cổ kính) */}
            <mesh position={[0, 6.05, 0]} castShadow>
                <boxGeometry args={[3.4, 0.14, 1.8]} />
                <meshStandardMaterial color="#6d291b" roughness={0.88} />
            </mesh>
            {/* Bờ nóc đỉnh cổng làng */}
            <mesh position={[0, 6.32, 0]} castShadow>
                <boxGeometry args={[3.5, 0.12, 0.16]} />
                <meshStandardMaterial color="#521e14" />
            </mesh>
            <mesh position={[-1.7, 6.38, 0]} castShadow><boxGeometry args={[0.1, 0.16, 0.1]} /><meshStandardMaterial color="#521e14" /></mesh>
            <mesh position={[1.7, 6.38, 0]} castShadow><boxGeometry args={[0.1, 0.16, 0.1]} /><meshStandardMaterial color="#521e14" /></mesh>

            {/* Đôi cánh cổng gỗ lim đóng mở tự động */}
            <group ref={leftDoor} position={[-1.65, 1.8, 0]}>
                <mesh position={[0.825, 0, 0]} castShadow>
                    <boxGeometry args={[1.65, 3.6, 0.16]} />
                    <meshStandardMaterial color="#382115" roughness={0.92} />
                </mesh>
                {/* Then ngang gỗ */}
                <mesh position={[0.825, 0, 0.1]}>
                    <boxGeometry args={[1.5, 0.12, 0.05]} />
                    <meshStandardMaterial color="#24140c" />
                </mesh>
            </group>
            <group ref={rightDoor} position={[1.65, 1.8, 0]}>
                <mesh position={[-0.825, 0, 0]} castShadow>
                    <boxGeometry args={[1.65, 3.6, 0.16]} />
                    <meshStandardMaterial color="#382115" roughness={0.92} />
                </mesh>
                <mesh position={[-0.825, 0, 0.1]}>
                    <boxGeometry args={[1.5, 0.12, 0.05]} />
                    <meshStandardMaterial color="#24140c" />
                </mesh>
            </group>

            {/* Đèn lồng đỏ lớn treo hai bên cổng làng */}
            <RoundFestiveLantern position={[-2.2, 3.4, 0.78]} scale={1.3} swayOffset={0.5} />
            <RoundFestiveLantern position={[2.2, 3.4, 0.78]} scale={1.3} swayOffset={2.2} />

            {/* Tường lũy làng hai bên bằng gạch rêu */}
            <mesh position={[-6.8, 1.7, 0]} castShadow>
                <boxGeometry args={[8.2, 3.4, 0.7]} />
                <meshStandardMaterial color="#4a3e35" roughness={1} />
            </mesh>
            <mesh position={[6.8, 1.7, 0]} castShadow>
                <boxGeometry args={[8.2, 3.4, 0.7]} />
                <meshStandardMaterial color="#4a3e35" roughness={1} />
            </mesh>
        </group>
    )
}

function LanternString({ z = 0, swayPhase = 0 }) {
    // Dây lồng đèn có độ cong parabol võng tự nhiên nối từ mái nhà bên trái sang nhà bên phải (treo cao thoáng, đường làng rộng)
    const span = 6.2
    const segments = 18
    const points = []
    for (let i = 0; i <= segments; i++) {
        const x = -span + (i * (span * 2)) / segments
        const y = 3.65 + 0.95 * Math.pow(x / span, 2)
        points.push([x, y])
    }

    const lanternPositions = [
        { x: -4.4, type: 'star' },
        { x: -2.9, type: 'carrousel' },
        { x: -1.4, type: 'round' },
        { x: 0, type: 'star' },
        { x: 1.4, type: 'round' },
        { x: 2.9, type: 'carrousel' },
        { x: 4.4, type: 'star' },
    ]

    return (
        <group position={[0, 0, z]}>
            {/* Dây treo uốn cong mềm mại qua đường làng */}
            {points.slice(0, -1).map(([x1, y1], idx) => {
                const [x2, y2] = points[idx + 1]
                const length = Math.hypot(x2 - x1, y2 - y1)
                const angle = Math.atan2(y2 - y1, x2 - x1)
                return (
                    <mesh
                        key={idx}
                        position={[(x1 + x2) / 2, (y1 + y2) / 2, 0]}
                        rotation={[0, 0, angle]}
                    >
                        <boxGeometry args={[length + 0.02, 0.025, 0.025]} />
                        <meshStandardMaterial color="#2d2420" roughness={1} />
                    </mesh>
                )
            })}

            {/* Các lồng đèn Trung Thu treo đung đưa dọc theo độ võng của dây */}
            {lanternPositions.map((item, idx) => {
                const ly = 3.65 + 0.95 * Math.pow(item.x / span, 2)
                return (
                    <group key={idx}>
                        {item.type === 'star' && (
                            <StarLantern position={[item.x, ly, 0]} swayOffset={swayPhase + idx * 1.2} scale={0.95} />
                        )}
                        {item.type === 'carrousel' && (
                            <CarrouselLantern position={[item.x, ly, 0]} swayOffset={swayPhase + idx * 1.2} scale={0.95} />
                        )}
                        {item.type === 'round' && (
                            <RoundFestiveLantern position={[item.x, ly, 0]} swayOffset={swayPhase + idx * 1.2} scale={0.95} />
                        )}
                    </group>
                )
            })}
        </group>
    )
}

function MidAutumnMoon() {
    return (
        <group position={[0, 80, -120]}>
            {/* Vầng trăng rằm tròn đầy vằng vặc trên cao như vì sao */}
            <mesh>
                <sphereGeometry args={[4.4, 32, 32]} />
                <meshBasicMaterial color="#fffef0" fog={false} />
            </mesh>

            {/* Vết mảng vân mặt trăng (chú Cuội gốc đa) */}
            <mesh position={[0.9, 0.6, 3.8]} scale={[1.2, 0.9, 0.5]}>
                <sphereGeometry args={[1.0, 16, 16]} />
                <meshBasicMaterial color="#dfcf9f" transparent opacity={0.65} fog={false} />
            </mesh>
            <mesh position={[-0.7, -0.7, 3.9]} scale={[1.4, 0.8, 0.5]}>
                <sphereGeometry args={[0.9, 16, 16]} />
                <meshBasicMaterial color="#dfcf9f" transparent opacity={0.55} fog={false} />
            </mesh>

            {/* Removed halo ring meshes */}
            {/* <mesh position={[0, 0, 0.1]}> */}
            {/* </mesh> */}
            {/* Halo ring meshes removed */}
            {/* <meshBasicMaterial color="#ffe891" transparent opacity={0.42} side={DoubleSide} fog={false} /> */}
            {/* </mesh> */}
            {/* <mesh position={[0, 0, 0.05]}> */}
            {/* <ringGeometry args={[6.2, 9.2, 48]} /> */}
            {/* <meshBasicMaterial color="#ffd863" transparent opacity={0.22} side={DoubleSide} fog={false} />
        </mesh> */}
            {/* <mesh position={[0, 0, 0.0]}> */}
            {/* <ringGeometry args={[9.2, 13.5, 48]} />
            <meshBasicMaterial color="#e0c774" transparent opacity={0.10} side={DoubleSide} fog={false} />
        </mesh > */}

            {/* 4 Vệt tia sao tỏa sáng 4 hướng (Star Spikes) tạo vẻ đẹp như một vì sao sáng rực giữa trời đêm */}
            {
                [0, Math.PI / 2].map((angle, idx) => (
                    <mesh key={idx} rotation={[0, 0, angle]}>
                        <planeGeometry args={[0.35, 24]} />
                        <meshBasicMaterial color="#fff5b8" transparent opacity={0.28} side={DoubleSide} fog={false} />
                    </mesh>
                ))
            }
            {
                [Math.PI / 4, -Math.PI / 4].map((angle, idx) => (
                    <mesh key={idx} rotation={[0, 0, angle]}>
                        <planeGeometry args={[0.2, 16]} />
                        <meshBasicMaterial color="#ffe891" transparent opacity={0.18} side={DoubleSide} fog={false} />
                    </mesh>
                ))
            }

            {/* Ánh trăng chiếu sáng toàn bộ xóm làng và quảng trường lễ hội */}
            {/* <pointLight position={[0, 0, 4]} color="#ffeaad" intensity={4.8} distance={160} /> */}
            <directionalLight position={[0, 20, 20]} intensity={1.4} color="#ffe299" />
        </group >
    )
}

function VillageBoundary({ position }) {
    return <group position={position}><mesh position={[0, 3.4, 0]} castShadow><boxGeometry args={[36, 6.8, 0.5]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh></group>
}

function SideVillageWall({ side }) {
    return <group position={[side * 12.5, 2.4, -40]}><mesh castShadow><boxGeometry args={[0.5, 4.8, 92]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh></group>
}

function RearCharacterWall() {
    return <group position={[0, 2.6, 8.7]}><mesh castShadow><boxGeometry args={[22, 5.2, 0.5]} /><meshStandardMaterial color="#393532" roughness={1} /></mesh>{[-9, -4.5, 0, 4.5, 9].map((x) => <mesh key={x} position={[x, 2.8, 0]} castShadow><boxGeometry args={[0.7, 0.7, 0.8]} /><meshStandardMaterial color="#292726" roughness={1} /></mesh>)}</group>
}

function GroundBeyondGate() {
    return (
        <group>
            {/* Nền đất nện pha cát phù sa đồng bằng Bắc Bộ sau cổng làng */}
            <mesh position={[0, 0.02, -48]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[26, 56]} />
                <meshStandardMaterial color="#544332" roughness={0.96} />
            </mesh>
            {/* Sân đình gạch nung đỏ Bát Tràng cổ kính chạy dọc hội chợ lễ hội */}
            <mesh position={[0, 0.025, -48]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[14.5, 52]} />
                <meshStandardMaterial color="#7a3f2d" roughness={0.88} />
            </mesh>
            {/* Lối đi chính giữa lát gạch nung hoa văn ấm áp */}
            <mesh position={[0, 0.03, -48]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[6.2, 52]} />
                <meshStandardMaterial color="#8a4732" roughness={0.84} />
            </mesh>
            {/* Viền đá xanh viền bờ sân đình truyền thống hai bên */}
            {[-7.25, 7.25].map((x) => (
                <mesh key={x} position={[x, 0.035, -48]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.4, 52]} />
                    <meshStandardMaterial color="#5e5a52" roughness={0.9} />
                </mesh>
            ))}
        </group>
    )
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

function FestivalFlag({ position, color = '#cc2b1d', rotation = 0 }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Cột tre cắm cờ hội */}
            <mesh position={[0, 2.5, 0]} castShadow>
                <cylinderGeometry args={[0.04, 0.06, 5.0, 6]} />
                <meshStandardMaterial color="#8a6943" roughness={0.9} />
            </mesh>
            {/* Đỉnh ngọn cờ */}
            <mesh position={[0, 5.08, 0]}>
                <coneGeometry args={[0.08, 0.22, 6]} />
                <meshStandardMaterial color="#d4a337" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Cờ ngũ sắc hình vuông có diềm răng cưa bay phấp phới */}
            <mesh position={[0.6, 4.2, 0]} castShadow>
                <planeGeometry args={[1.2, 1.2]} />
                <meshStandardMaterial color={color} side={DoubleSide} roughness={0.8} />
            </mesh>
            <mesh position={[0.6, 4.2, 0.01]}>
                <planeGeometry args={[0.8, 0.8]} />
                <meshStandardMaterial color="#ffcc33" side={DoubleSide} roughness={0.8} />
            </mesh>
            <mesh position={[0.6, 4.2, 0.02]}>
                <planeGeometry args={[0.45, 0.45]} />
                <meshStandardMaterial color="#2266aa" side={DoubleSide} roughness={0.8} />
            </mesh>
            {/* Diềm viền răng cưa quanh mép cờ */}
            <mesh position={[1.25, 4.2, 0]}>
                <boxGeometry args={[0.1, 1.2, 0.02]} />
                <meshStandardMaterial color="#ffcc33" />
            </mesh>
        </group>
    )
}

function FestivalBannerArch({ position }) {
    return (
        <group position={position}>
            {/* 2 Trụ cổng chào màu đỏ son viền vàng */}
            {[-4.0, 4.0].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    <mesh position={[0, 2.7, 0]} castShadow>
                        <boxGeometry args={[0.5, 5.4, 0.5]} />
                        <meshStandardMaterial color="#8b1c14" roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 5.5, 0]} castShadow>
                        <boxGeometry args={[0.7, 0.3, 0.7]} />
                        <meshStandardMaterial color="#d49b32" />
                    </mesh>
                    {/* Đèn lồng đỏ treo ở trụ */}
                    <RoundFestiveLantern position={[0, 4.2, 0.4]} scale={1.2} swayOffset={x} />
                </group>
            ))}
            {/* Xà ngang vòm cổng chào */}
            <mesh position={[0, 5.1, 0]} castShadow>
                <boxGeometry args={[8.6, 0.4, 0.4]} />
                <meshStandardMaterial color="#8b1c14" roughness={0.8} />
            </mesh>
            {/* Biển hiệu vòm cổng chào rực rỡ */}
            <mesh position={[0, 4.6, 0.22]}>
                <boxGeometry args={[5.2, 0.9, 0.08]} />
                <meshStandardMaterial color="#911d13" roughness={0.7} />
            </mesh>
            <mesh position={[0, 4.6, 0.28]}>
                <boxGeometry args={[4.9, 0.72, 0.02]} />
                <meshStandardMaterial color="#ffd452" emissive="#d48a22" emissiveIntensity={0.6} />
            </mesh>
            {/* Mái ngói đao cong che trên cổng chào */}
            <mesh position={[0, 5.5, 0]} castShadow>
                <boxGeometry args={[9.2, 0.16, 1.2]} />
                <meshStandardMaterial color="#6e2518" roughness={0.85} />
            </mesh>
            {/* Cờ ngũ sắc cắm trên đỉnh cổng chào */}
            <FestivalFlag position={[-3.8, 5.6, 0]} color="#d12c1b" />
            <FestivalFlag position={[3.8, 5.6, 0]} color="#1f8b4c" />
            <FestivalFlag position={[0, 5.6, 0]} color="#d49b32" />
        </group>
    )
}

function MidAutumnFoodStall({ position, rotation = 0, type = 'mooncake' }) {
    // Quầy hàng ẩm thực & trò chơi dân gian ngày Tết Trung Thu
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Thân quầy gỗ mộc mạc */}
            <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 1.04, 1.5]} />
                <meshStandardMaterial color="#4a301e" roughness={0.9} />
            </mesh>
            {/* Mặt bàn quầy trải khăn gấm đỏ lễ hội */}
            <mesh position={[0, 1.06, 0]} receiveShadow>
                <boxGeometry args={[3.4, 0.06, 1.65]} />
                <meshStandardMaterial color="#881a12" roughness={0.8} />
            </mesh>
            {/* Yếm quầy phía trước với viền vàng */}
            <mesh position={[0, 0.85, 0.77]}>
                <boxGeometry args={[3.0, 0.35, 0.04]} />
                <meshStandardMaterial color="#992015" />
            </mesh>
            <mesh position={[0, 0.85, 0.80]}>
                <boxGeometry args={[2.8, 0.22, 0.02]} />
                <meshStandardMaterial color="#d49a32" emissive="#aa7318" emissiveIntensity={0.5} />
            </mesh>

            {/* 4 Cột tre chống mái che sạp hàng */}
            {[-1.5, 1.5].flatMap((x) => [-0.7, 0.7].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 1.7, z]} castShadow>
                    <cylinderGeometry args={[0.04, 0.045, 1.4, 6]} />
                    <meshStandardMaterial color="#735436" roughness={0.9} />
                </mesh>
            )))}

            {/* Mái che bạt sọc đỏ trắng lễ hội hoặc mái tranh */}
            <mesh position={[0, 2.45, 0]} rotation={[0.15, 0, 0]} castShadow>
                <boxGeometry args={[3.6, 0.08, 1.9]} />
                <meshStandardMaterial color={type === 'streetfood' || type === 'tohe' ? '#8a653c' : '#b22e22'} roughness={0.85} />
            </mesh>
            {/* Diềm mái che lượn sóng phía trước */}
            <mesh position={[0, 2.32, 0.95]}>
                <boxGeometry args={[3.6, 0.22, 0.04]} />
                <meshStandardMaterial color="#f0d38d" />
            </mesh>

            {/* Bảng hiệu gỗ thư pháp trên mái sạp */}
            <mesh position={[0, 2.75, 0.75]} castShadow>
                <boxGeometry args={[2.6, 0.55, 0.08]} />
                <meshStandardMaterial color="#6e1910" roughness={0.7} />
            </mesh>
            <mesh position={[0, 2.75, 0.80]}>
                <boxGeometry args={[2.46, 0.42, 0.02]} />
                <meshStandardMaterial color="#ffd454" emissive="#cc8820" emissiveIntensity={0.6} />
            </mesh>

            {/* Đèn lồng trang trí treo góc mái sạp */}
            <RoundFestiveLantern position={[-1.5, 2.1, 0.85]} scale={0.75} swayOffset={1.2} />
            <RoundFestiveLantern position={[1.5, 2.1, 0.85]} scale={0.75} swayOffset={2.5} />
            <pointLight position={[0, 2.1, 0.4]} color="#ffb454" intensity={2.8} distance={5.5} />

            {/* CHI TIẾT ĐẶC TRƯNG TỪNG LOẠI SẠP */}
            {type === 'mooncake' && (
                <group position={[0, 1.1, 0]}>
                    {/* Bánh nướng vàng ruộm trên mẹt tre */}
                    <mesh position={[-0.8, 0.02, 0.1]} receiveShadow>
                        <cylinderGeometry args={[0.42, 0.42, 0.03, 16]} />
                        <meshStandardMaterial color="#bfa06b" roughness={0.9} />
                    </mesh>
                    {[-0.18, 0.18].flatMap((dx) => [-0.18, 0.18].map((dz) => (
                        <group key={`${dx}-${dz}`} position={[-0.8 + dx, 0.06, 0.1 + dz]}>
                            <mesh castShadow>
                                <cylinderGeometry args={[0.09, 0.09, 0.06, 12]} />
                                <meshStandardMaterial color="#91521d" roughness={0.7} />
                            </mesh>
                            <mesh position={[0, 0.032, 0]}>
                                <cylinderGeometry args={[0.06, 0.06, 0.01, 8]} />
                                <meshStandardMaterial color="#ad6828" />
                            </mesh>
                        </group>
                    )))}

                    {/* Bánh nướng cá chép vàng ươm cho trẻ em */}
                    <group position={[-0.8, 0.06, -0.45]} rotation={[0, 0.3, 0]}>
                        <mesh castShadow scale={[1.4, 0.7, 0.8]}>
                            <sphereGeometry args={[0.12, 12, 12]} />
                            <meshStandardMaterial color="#9a5a23" roughness={0.65} />
                        </mesh>
                        <mesh position={[-0.14, 0, 0]} rotation={[0, 0, 0.5]}>
                            <coneGeometry args={[0.07, 0.14, 4]} />
                            <meshStandardMaterial color="#9a5a23" />
                        </mesh>
                    </group>

                    {/* Bánh dẻo trắng ngọc mịn màng */}
                    <mesh position={[0.2, 0.02, 0.1]} receiveShadow>
                        <cylinderGeometry args={[0.42, 0.42, 0.03, 16]} />
                        <meshStandardMaterial color="#bfa06b" roughness={0.9} />
                    </mesh>
                    {[-0.16, 0.16].flatMap((dx) => [-0.16, 0.16].map((dz) => (
                        <mesh key={`${dx}-${dz}`} position={[0.2 + dx, 0.06, 0.1 + dz]} castShadow>
                            <cylinderGeometry args={[0.085, 0.085, 0.055, 12]} />
                            <meshStandardMaterial color="#f8f4e6" roughness={0.4} />
                        </mesh>
                    )))}

                    {/* Hộp quà bánh Trung Thu gấm đỏ sang trọng */}
                    <mesh position={[1.05, 0.14, -0.1]} castShadow>
                        <boxGeometry args={[0.65, 0.26, 0.65]} />
                        <meshStandardMaterial color="#911d13" roughness={0.7} />
                    </mesh>
                    <mesh position={[1.05, 0.15, -0.1]}>
                        <boxGeometry args={[0.67, 0.08, 0.15]} />
                        <meshStandardMaterial color="#d49b32" metalness={0.4} />
                    </mesh>
                    <mesh position={[1.05, 0.15, -0.1]}>
                        <boxGeometry args={[0.15, 0.08, 0.67]} />
                        <meshStandardMaterial color="#d49b32" metalness={0.4} />
                    </mesh>
                </group>
            )}

            {type === 'fruits' && (
                <group position={[0, 1.1, 0]}>
                    {/* Mâm ngũ quả lớn ở giữa */}
                    <mesh position={[0, 0.03, 0]} receiveShadow>
                        <cylinderGeometry args={[0.55, 0.48, 0.05, 18]} />
                        <meshStandardMaterial color="#b58d4a" metalness={0.4} />
                    </mesh>

                    {/* Chú chó bưởi lông xù - linh hồn mâm cỗ Trung Thu */}
                    <group position={[0, 0.15, 0]}>
                        <mesh castShadow scale={[1.2, 0.9, 0.9]}>
                            <sphereGeometry args={[0.18, 14, 14]} />
                            <meshStandardMaterial color="#f5f0db" roughness={0.95} />
                        </mesh>
                        <mesh position={[0.12, 0.14, 0]} castShadow>
                            <sphereGeometry args={[0.12, 12, 12]} />
                            <meshStandardMaterial color="#f5f0db" roughness={0.95} />
                        </mesh>
                        {/* 2 Mắt hạt nhãn đen tròn xoe */}
                        <mesh position={[0.21, 0.18, 0.06]}>
                            <sphereGeometry args={[0.022, 8, 8]} />
                            <meshStandardMaterial color="#1a1410" />
                        </mesh>
                        <mesh position={[0.21, 0.18, -0.06]}>
                            <sphereGeometry args={[0.022, 8, 8]} />
                            <meshStandardMaterial color="#1a1410" />
                        </mesh>
                        {/* Nơ đỏ quàng cổ chú chó bưởi */}
                        <mesh position={[0.1, 0.09, 0]}>
                            <torusGeometry args={[0.1, 0.025, 6, 12]} />
                            <meshStandardMaterial color="#d1261b" />
                        </mesh>
                    </group>

                    {/* Nải chuối vàng cong cong */}
                    <group position={[-0.8, 0.06, 0.1]} rotation={[0, 0.4, 0]}>
                        {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
                            <mesh key={i} position={[x, 0.05, 0]} rotation={[0.4, 0, 0.2]} castShadow>
                                <cylinderGeometry args={[0.035, 0.04, 0.26, 6]} />
                                <meshStandardMaterial color="#d6a824" roughness={0.7} />
                            </mesh>
                        ))}
                    </group>

                    {/* Quả hồng đỏ mọng & Gói cốm xanh mùa thu */}
                    <mesh position={[0.75, 0.08, 0.12]} castShadow>
                        <sphereGeometry args={[0.09, 10, 10]} />
                        <meshStandardMaterial color="#cc3b1b" roughness={0.6} />
                    </mesh>
                    <mesh position={[0.9, 0.07, 0.0]} castShadow>
                        <sphereGeometry args={[0.08, 10, 10]} />
                        <meshStandardMaterial color="#d44a22" roughness={0.6} />
                    </mesh>
                    {/* Gói cốm non lá sen */}
                    <mesh position={[0.75, 0.06, -0.3]} castShadow>
                        <boxGeometry args={[0.32, 0.09, 0.32]} />
                        <meshStandardMaterial color="#3d6e35" roughness={0.9} />
                    </mesh>
                </group>
            )}

            {type === 'tohe' && (
                <group position={[0, 1.1, 0]}>
                    {/* Giàn cắm que tò he bằng gỗ đục lỗ */}
                    <mesh position={[0, 0.08, -0.2]} castShadow receiveShadow>
                        <boxGeometry args={[2.4, 0.16, 0.35]} />
                        <meshStandardMaterial color="#4a2e1d" />
                    </mesh>

                    {/* Các que tò he bột màu rực rỡ cắm thẳng đứng */}
                    {[
                        { x: -0.9, color: '#e0281b', topColor: '#f7d028' },
                        { x: -0.6, color: '#258f4a', topColor: '#e03a28' },
                        { x: -0.3, color: '#e8488b', topColor: '#ffd747' },
                        { x: 0, color: '#d9a826', topColor: '#ba2318' },
                        { x: 0.3, color: '#286ee0', topColor: '#fff' },
                        { x: 0.6, color: '#e03a28', topColor: '#2b9148' },
                        { x: 0.9, color: '#963ce0', topColor: '#ffd747' },
                    ].map((item, idx) => (
                        <group key={idx} position={[item.x, 0.16, -0.2]}>
                            <mesh position={[0, 0.28, 0]}>
                                <cylinderGeometry args={[0.008, 0.008, 0.56, 4]} />
                                <meshStandardMaterial color="#bfa06b" />
                            </mesh>
                            <mesh position={[0, 0.58, 0]} castShadow>
                                <sphereGeometry args={[0.055, 8, 8]} />
                                <meshStandardMaterial color={item.color} roughness={0.5} />
                            </mesh>
                            <mesh position={[0, 0.66, 0]}>
                                <coneGeometry args={[0.035, 0.08, 6]} />
                                <meshStandardMaterial color={item.topColor} />
                            </mesh>
                        </group>
                    ))}

                    {/* Mẹt tre bày mặt nạ giấy bồi dân gian */}
                    <mesh position={[-0.7, 0.04, 0.25]} receiveShadow>
                        <cylinderGeometry args={[0.38, 0.38, 0.03, 14]} />
                        <meshStandardMaterial color="#a68456" />
                    </mesh>
                    <mesh position={[-0.7, 0.08, 0.25]} rotation={[-0.2, 0, 0]} castShadow>
                        <sphereGeometry args={[0.13, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#fad0b1" roughness={0.7} />
                    </mesh>
                    <mesh position={[-0.63, 0.13, 0.27]}>
                        <sphereGeometry args={[0.025, 6, 6]} />
                        <meshStandardMaterial color="#e8382e" />
                    </mesh>
                    <mesh position={[-0.77, 0.13, 0.27]}>
                        <sphereGeometry args={[0.025, 6, 6]} />
                        <meshStandardMaterial color="#e8382e" />
                    </mesh>

                    {/* Mẹt bày trống bỏi gõ lách cách */}
                    <mesh position={[0.6, 0.04, 0.25]} receiveShadow>
                        <cylinderGeometry args={[0.35, 0.35, 0.03, 14]} />
                        <meshStandardMaterial color="#a68456" />
                    </mesh>
                    {[-0.1, 0.1].map((dx, i) => (
                        <group key={i} position={[0.6 + dx, 0.08, 0.25]} rotation={[0, i * 0.7, 0]}>
                            <mesh castShadow>
                                <cylinderGeometry args={[0.07, 0.07, 0.04, 10]} />
                                <meshStandardMaterial color="#ba291c" />
                            </mesh>
                            <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.01, 0.01, 0.2, 4]} />
                                <meshStandardMaterial color="#9e7b4f" />
                            </mesh>
                        </group>
                    ))}
                </group>
            )}

            {type === 'streetfood' && (
                <group position={[0, 1.1, 0]}>
                    {/* Bếp than hồng đỏ rực */}
                    <group position={[-0.85, 0.18, 0]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.3, 0.24, 0.36, 12]} />
                            <meshStandardMaterial color="#3a322c" roughness={1} />
                        </mesh>
                        <mesh position={[0, 0.18, 0]}>
                            <cylinderGeometry args={[0.24, 0.24, 0.04, 10]} />
                            <meshStandardMaterial color="#ff4411" emissive="#ff3300" emissiveIntensity={3.2} />
                        </mesh>
                        <pointLight position={[0, 0.3, 0]} color="#ff5511" intensity={3.5} distance={3.5} />
                    </group>

                    {/* Nồi chè đồng lớn đang bốc khói ấm */}
                    <group position={[-0.85, 0.52, 0]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.32, 0.28, 0.32, 14]} />
                            <meshStandardMaterial color="#a8853b" metalness={0.7} roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.14, 0]}>
                            <cylinderGeometry args={[0.3, 0.3, 0.02, 12]} />
                            <meshStandardMaterial color="#8a531e" roughness={0.2} />
                        </mesh>
                    </group>

                    {/* 3 Bát chè trôi nước nóng hổi */}
                    {[-0.15, 0.2, 0.55].map((x, i) => (
                        <group key={i} position={[x, 0.06, 0.15]}>
                            <mesh castShadow>
                                <cylinderGeometry args={[0.13, 0.08, 0.1, 10]} />
                                <meshStandardMaterial color="#f0ece1" roughness={0.5} />
                            </mesh>
                            <mesh position={[0, 0.04, 0]}>
                                <cylinderGeometry args={[0.11, 0.11, 0.02, 8]} />
                                <meshStandardMaterial color="#965a20" roughness={0.3} />
                            </mesh>
                            <mesh position={[-0.03, 0.06, 0]}>
                                <sphereGeometry args={[0.038, 8, 8]} />
                                <meshStandardMaterial color="#fffef7" />
                            </mesh>
                            <mesh position={[0.04, 0.06, 0]}>
                                <sphereGeometry args={[0.035, 8, 8]} />
                                <meshStandardMaterial color="#fffef7" />
                            </mesh>
                        </group>
                    ))}

                    {/* Mẹt tre đựng bánh rán vừng vàng rộm */}
                    <group position={[0.85, 0.04, -0.2]}>
                        <mesh receiveShadow>
                            <cylinderGeometry args={[0.42, 0.42, 0.03, 14]} />
                            <meshStandardMaterial color="#a68456" />
                        </mesh>
                        {[-0.14, 0.14].flatMap((dx) => [-0.14, 0.14].map((dz) => (
                            <mesh key={`${dx}-${dz}`} position={[dx, 0.06, dz]} scale={[1, 0.7, 1]} castShadow>
                                <sphereGeometry args={[0.065, 8, 8]} />
                                <meshStandardMaterial color="#b8782a" roughness={0.8} />
                            </mesh>
                        )))}
                    </group>
                </group>
            )}

            {type === 'cotton_candy' && (
                <group position={[0, 1.1, 0]}>
                    {/* Máy quay kẹo bông gòn thùng nhôm */}
                    <mesh position={[-0.7, 0.16, 0]} castShadow>
                        <cylinderGeometry args={[0.42, 0.38, 0.32, 14]} />
                        <meshStandardMaterial color="#cfd4d8" metalness={0.7} roughness={0.25} />
                    </mesh>
                    <mesh position={[-0.7, 0.32, 0]}>
                        <cylinderGeometry args={[0.12, 0.12, 0.06, 8]} />
                        <meshStandardMaterial color="#e0486c" />
                    </mesh>

                    {/* Giá cắm những cây kẹo bông gòn bồng bềnh */}
                    <mesh position={[0.5, 0.28, 0]} castShadow>
                        <cylinderGeometry args={[0.06, 0.08, 0.55, 6]} />
                        <meshStandardMaterial color="#4a2e1d" />
                    </mesh>

                    {[
                        { pos: [0.35, 0.65, -0.1], color: '#fca5bd' },
                        { pos: [0.65, 0.70, -0.1], color: '#9ee2f7' },
                        { pos: [0.35, 0.75, 0.15], color: '#fce28b' },
                        { pos: [0.65, 0.65, 0.15], color: '#d0a9f5' },
                    ].map((item, i) => (
                        <group key={i} position={item.pos}>
                            <mesh>
                                <cylinderGeometry args={[0.007, 0.007, 0.35, 4]} />
                                <meshStandardMaterial color="#fff" />
                            </mesh>
                            <mesh position={[0, 0.14, 0]} scale={[1, 1.4, 1]} castShadow>
                                <sphereGeometry args={[0.13, 10, 10]} />
                                <meshStandardMaterial color={item.color} roughness={0.9} transparent opacity={0.88} />
                            </mesh>
                        </group>
                    ))}
                </group>
            )}

            {/* SẠP BÁN LỒNG ĐÈN TRUNG THU TRUYỀN THỐNG */}
            {type === 'lanterns' && (
                <group position={[0, 1.1, 0]}>
                    {/* Khung sào tre treo các loại lồng đèn phía trên */}
                    <mesh position={[0, 0.95, 0]}>
                        <cylinderGeometry args={[0.025, 0.025, 3.2, 6]} rotation={[0, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#8a673c" />
                    </mesh>
                    {/* Các móc treo lồng đèn */}
                    <StarLantern position={[-1.1, 1.35, 0.05]} scale={0.7} swayOffset={0.5} />
                    <CarrouselLantern position={[-0.4, 1.35, 0.05]} scale={0.7} swayOffset={1.6} />
                    <StarLantern position={[0.3, 1.35, 0.05]} scale={0.65} swayOffset={2.8} />
                    <CarrouselLantern position={[1.0, 1.35, 0.05]} scale={0.7} swayOffset={3.9} />

                    {/* Mẹt bày Đèn Cá Chép hóa rồng trên mặt bàn */}
                    <group position={[-0.8, 0.06, 0.1]}>
                        <mesh receiveShadow>
                            <cylinderGeometry args={[0.42, 0.42, 0.03, 14]} />
                            <meshStandardMaterial color="#a68456" />
                        </mesh>
                        {/* Đèn cá chép giấy kiếng đỏ vàng */}
                        <group position={[0, 0.12, 0]} rotation={[0, 0.3, 0]}>
                            {/* Thân cá chép */}
                            <mesh castShadow scale={[1.6, 0.8, 0.6]}>
                                <sphereGeometry args={[0.16, 12, 12]} />
                                <meshStandardMaterial color="#e53924" emissive="#ff451a" emissiveIntensity={0.6} transparent opacity={0.92} />
                            </mesh>
                            {/* Đuôi cá uốn lượn */}
                            <mesh position={[-0.26, 0.05, 0]} rotation={[0, 0, 0.5]}>
                                <coneGeometry args={[0.1, 0.22, 6]} />
                                <meshStandardMaterial color="#ffd84d" emissive="#fca026" emissiveIntensity={0.5} />
                            </mesh>
                            {/* Vây cá */}
                            <mesh position={[0.05, 0.14, 0]}>
                                <coneGeometry args={[0.05, 0.12, 4]} />
                                <meshStandardMaterial color="#ffd84d" />
                            </mesh>
                            {/* Mắt cá chép */}
                            {[-0.07, 0.07].map((z) => (
                                <mesh key={z} position={[0.16, 0.04, z]}>
                                    <sphereGeometry args={[0.025, 8, 8]} />
                                    <meshStandardMaterial color="#fff" />
                                </mesh>
                            ))}
                        </group>
                    </group>

                    {/* Hàng đèn cù quay giấy ngũ sắc */}
                    <group position={[0.1, 0.06, 0.12]}>
                        {[-0.22, 0.22].map((x, i) => (
                            <group key={i} position={[x, 0, 0]}>
                                <mesh position={[0, 0.15, 0]}>
                                    <cylinderGeometry args={[0.01, 0.01, 0.3, 4]} />
                                    <meshStandardMaterial color="#916a3f" />
                                </mesh>
                                <mesh position={[0, 0.28, 0]} rotation={[0.4, 0, i * 1.5]}>
                                    <cylinderGeometry args={[0.12, 0.08, 0.14, 8]} />
                                    <meshStandardMaterial color={i === 0 ? '#e03a28' : '#2b9148'} roughness={0.5} />
                                </mesh>
                                <mesh position={[0, 0.36, 0]}>
                                    <coneGeometry args={[0.06, 0.08, 6]} />
                                    <meshStandardMaterial color="#ffd747" />
                                </mesh>
                            </group>
                        ))}
                    </group>

                    {/* Những bó que đèn ông sao mini cắm giàn */}
                    <group position={[0.95, 0.08, -0.15]}>
                        <mesh position={[0, 0.12, 0]} castShadow>
                            <cylinderGeometry args={[0.18, 0.14, 0.24, 10]} />
                            <meshStandardMaterial color="#8a5323" roughness={0.9} />
                        </mesh>
                        {[-0.08, 0, 0.08].map((dx, idx) => (
                            <group key={idx} position={[dx, 0.28, 0]} rotation={[0, 0, (idx - 1) * 0.18]}>
                                <mesh position={[0, 0.1, 0]}>
                                    <cylinderGeometry args={[0.005, 0.005, 0.26, 4]} />
                                    <meshStandardMaterial color="#cc9f60" />
                                </mesh>
                                <mesh position={[0, 0.24, 0]} rotation={[0, 0, idx * 0.4]}>
                                    <octahedronGeometry args={[0.065]} />
                                    <meshStandardMaterial color={idx === 1 ? '#ff3b30' : '#ffcc00'} emissive="#ff8800" emissiveIntensity={0.8} />
                                </mesh>
                            </group>
                        ))}
                    </group>
                </group>
            )}

            {/* SẠP BÁN TRANG PHỤC & PHỤ KIỆN LỄ HỘI TRUNG THU */}
            {type === 'costumes' && (
                <group position={[0, 1.1, 0]}>
                    {/* Giá treo chữ T bằng gỗ mộc treo trang phục cổ truyền */}
                    <group position={[0, 0.65, -0.2]}>
                        {/* Cột đứng */}
                        <mesh position={[0, 0, 0]} castShadow>
                            <cylinderGeometry args={[0.03, 0.035, 1.3, 6]} />
                            <meshStandardMaterial color="#4a2e1d" />
                        </mesh>
                        {/* Thanh treo ngang */}
                        <mesh position={[0, 0.62, 0]}>
                            <cylinderGeometry args={[0.025, 0.025, 2.6, 6]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#4a2e1d" />
                        </mesh>

                        {/* ÁO DÀI GẤM ĐỎ TRUNG THU TREO TRÊN GIÁ */}
                        <group position={[-0.8, 0.22, 0]}>
                            <mesh castShadow>
                                <boxGeometry args={[0.48, 0.72, 0.06]} />
                                <meshStandardMaterial color="#b51b14" roughness={0.65} />
                            </mesh>
                            {/* Cổ áo viền vàng hoàng gia */}
                            <mesh position={[0, 0.37, 0.02]}>
                                <boxGeometry args={[0.22, 0.06, 0.04]} />
                                <meshStandardMaterial color="#ffd747" />
                            </mesh>
                            {/* Hàng khuy áo cài chéo truyền thống */}
                            {[-0.1, 0, 0.1, 0.2].map((y, i) => (
                                <mesh key={i} position={[0.06, y, 0.035]}>
                                    <sphereGeometry args={[0.015, 6, 6]} />
                                    <meshStandardMaterial color="#ffd747" />
                                </mesh>
                            ))}
                        </group>

                        {/* BỘ ĐỒ CHÚ CUỘI / ÁO BÀ BA NÂU SÒNG TRẺ EM */}
                        <group position={[0, 0.22, 0]}>
                            <mesh castShadow>
                                <boxGeometry args={[0.42, 0.65, 0.06]} />
                                <meshStandardMaterial color="#6e4d28" roughness={0.9} />
                            </mesh>
                            {/* Khăn rằn vắt ngang vai Chú Cuội */}
                            <mesh position={[0, 0.24, 0.04]} rotation={[0, 0, 0.35]}>
                                <boxGeometry args={[0.46, 0.08, 0.03]} />
                                <meshStandardMaterial color="#dcd5c5" roughness={0.8} />
                            </mesh>
                        </group>

                        {/* BỘ TRANG PHỤC CHỊ HẰNG LỤA VÀNG BỒNG BỀNH */}
                        <group position={[0.8, 0.22, 0]}>
                            <mesh castShadow>
                                <boxGeometry args={[0.48, 0.72, 0.06]} />
                                <meshStandardMaterial color="#f0b630" roughness={0.5} />
                            </mesh>
                            {/* Dải lụa tiên nữ màu thiên thanh */}
                            <mesh position={[0, 0.15, 0.04]}>
                                <boxGeometry args={[0.38, 0.12, 0.03]} />
                                <meshStandardMaterial color="#72c4ed" roughness={0.4} />
                            </mesh>
                        </group>
                    </group>

                    {/* Mẹt bày KHĂN ĐÓNG / KHĂN XẾP CỔ TRUYỀN & MẶT NẠ ÔNG ĐỊA */}
                    <group position={[-0.75, 0.04, 0.3]}>
                        <mesh receiveShadow>
                            <cylinderGeometry args={[0.38, 0.38, 0.03, 14]} />
                            <meshStandardMaterial color="#a68456" />
                        </mesh>
                        {/* Khăn xếp nhung đen */}
                        <mesh position={[-0.12, 0.06, 0]} castShadow>
                            <cylinderGeometry args={[0.12, 0.12, 0.09, 14]} />
                            <meshStandardMaterial color="#1a1816" roughness={0.9} />
                        </mesh>
                        {/* Khăn xếp gấm vàng */}
                        <mesh position={[0.14, 0.06, 0]} castShadow>
                            <cylinderGeometry args={[0.11, 0.11, 0.09, 14]} />
                            <meshStandardMaterial color="#d49b32" metalness={0.4} />
                        </mesh>
                    </group>

                    {/* MẸT BÀY CÁC LOẠI MẶT NẠ GIẤY BỒI DÂN GIAN (Mặt Chú Tễu, Chú Cuội, Thỏ Ngọc) */}
                    <group position={[0.75, 0.04, 0.3]}>
                        <mesh receiveShadow>
                            <cylinderGeometry args={[0.38, 0.38, 0.03, 14]} />
                            <meshStandardMaterial color="#a68456" />
                        </mesh>
                        {/* Mặt nạ Thỏ ngọc tai dài xinh xắn */}
                        <group position={[-0.12, 0.06, 0]}>
                            <mesh castShadow>
                                <sphereGeometry args={[0.1, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                <meshStandardMaterial color="#fffef7" />
                            </mesh>
                            <mesh position={[-0.04, 0.11, 0]} rotation={[0, 0, -0.2]}>
                                <boxGeometry args={[0.035, 0.12, 0.015]} />
                                <meshStandardMaterial color="#fcd4dc" />
                            </mesh>
                            <mesh position={[0.04, 0.11, 0]} rotation={[0, 0, 0.2]}>
                                <boxGeometry args={[0.035, 0.12, 0.015]} />
                                <meshStandardMaterial color="#fcd4dc" />
                            </mesh>
                        </group>
                        {/* Mặt nạ chú Cuội / đầu Lân con */}
                        <group position={[0.14, 0.06, 0]}>
                            <mesh castShadow>
                                <sphereGeometry args={[0.095, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                <meshStandardMaterial color="#e53924" />
                            </mesh>
                            <mesh position={[0, 0.08, 0.05]}>
                                <coneGeometry args={[0.025, 0.06, 5]} />
                                <meshStandardMaterial color="#ffd84d" />
                            </mesh>
                        </group>
                    </group>
                </group>
            )}

            {/* SẠP THƯ PHÁP ÔNG ĐỒ & CÂU ĐỐ TRUNG THU */}
            {type === 'calligraphy' && (
                <group position={[0, 1.1, 0]}>
                    {/* Giá treo các bức liễn thư pháp đỏ chữ vàng */}
                    <group position={[0, 0.65, -0.2]}>
                        <mesh position={[0, 0.62, 0]}>
                            <cylinderGeometry args={[0.02, 0.02, 2.8, 6]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#4a2e1d" />
                        </mesh>
                        {[-0.9, 0, 0.9].map((x, idx) => (
                            <group key={idx} position={[x, 0.15, 0]}>
                                <mesh castShadow>
                                    <boxGeometry args={[0.42, 0.9, 0.02]} />
                                    <meshStandardMaterial color="#a81a13" roughness={0.7} />
                                </mesh>
                                <mesh position={[0, 0, 0.015]}>
                                    <boxGeometry args={[0.34, 0.78, 0.01]} />
                                    <meshStandardMaterial color="#ffd54f" emissive="#cc8800" emissiveIntensity={0.6} />
                                </mesh>
                            </group>
                        ))}
                    </group>
                    {/* Nghiên mực đá & Giá gác bút lông */}
                    <group position={[-0.8, 0.04, 0.2]}>
                        <mesh receiveShadow>
                            <boxGeometry args={[0.32, 0.05, 0.24]} />
                            <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.03, 0]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.02, 10]} />
                            <meshStandardMaterial color="#0a0a0a" roughness={0.1} />
                        </mesh>
                    </group>
                    {/* Chồng giấy đỏ hoa mai cuộn tròn */}
                    <group position={[0.75, 0.08, 0.15]}>
                        {[-0.08, 0, 0.08].map((dz, i) => (
                            <mesh key={i} position={[0, 0, dz]} rotation={[0, 0, Math.PI / 2]} castShadow>
                                <cylinderGeometry args={[0.045, 0.045, 0.38, 10]} />
                                <meshStandardMaterial color="#d4261b" roughness={0.8} />
                            </mesh>
                        ))}
                    </group>
                </group>
            )}

            {/* SẠP THƯỞNG TRÀ HOA CÚC & BÁNH ĐẬU XANH HẢI DƯƠNG */}
            {type === 'tea' && (
                <group position={[0, 1.1, 0]}>
                    {/* Ấm trà tử sa nung màu nâu đỏ */}
                    <group position={[-0.4, 0.12, 0.1]}>
                        <mesh castShadow scale={[1.1, 0.9, 1.1]}>
                            <sphereGeometry args={[0.13, 12, 12]} />
                            <meshStandardMaterial color="#592e1e" roughness={0.6} />
                        </mesh>
                        <mesh position={[0, 0.11, 0]}>
                            <cylinderGeometry args={[0.04, 0.05, 0.05, 10]} />
                            <meshStandardMaterial color="#422115" />
                        </mesh>
                        <mesh position={[0.12, 0.06, 0]} rotation={[0, 0, -0.6]}>
                            <cylinderGeometry args={[0.02, 0.03, 0.12, 6]} />
                            <meshStandardMaterial color="#592e1e" />
                        </mesh>
                    </group>
                    {/* Bộ chén ngọc uống trà thanh tao */}
                    {[-0.1, 0.1, 0.3].map((x, i) => (
                        <mesh key={i} position={[x, 0.05, 0.15]} castShadow>
                            <cylinderGeometry args={[0.04, 0.025, 0.045, 8]} />
                            <meshStandardMaterial color="#e8f4ec" roughness={0.4} />
                        </mesh>
                    ))}
                    {/* Hộp bánh đậu xanh vàng ươm cắt khối vuông */}
                    <group position={[0.8, 0.06, 0]}>
                        <mesh receiveShadow>
                            <boxGeometry args={[0.48, 0.04, 0.38]} />
                            <meshStandardMaterial color="#cc4125" />
                        </mesh>
                        {[-0.1, 0.1].flatMap((dx) => [-0.08, 0.08].map((dz) => (
                            <mesh key={`${dx}-${dz}`} position={[dx, 0.04, dz]} castShadow>
                                <boxGeometry args={[0.07, 0.035, 0.07]} />
                                <meshStandardMaterial color="#eed56e" roughness={0.7} />
                            </mesh>
                        )))}
                    </group>
                </group>
            )}

            {/* SẠP ĐỒ CHƠI DÂN GIAN (Trống quân, Đèn cù, Chong chóng ngũ sắc) */}
            {type === 'toys' && (
                <group position={[0, 1.1, 0]}>
                    {/* Giàn chong chóng tre nhiều màu quay tít */}
                    {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
                        <group key={i} position={[x, 0.28, -0.1]}>
                            <mesh position={[0, 0, 0]}>
                                <cylinderGeometry args={[0.008, 0.008, 0.55, 4]} />
                                <meshStandardMaterial color="#9e7b4f" />
                            </mesh>
                            <mesh position={[0, 0.28, 0.02]} rotation={[0, 0, i * 0.7]} castShadow>
                                <boxGeometry args={[0.22, 0.05, 0.01]} />
                                <meshStandardMaterial color={['#e03a28', '#258f4a', '#ffd54f', '#2266aa', '#e8488b'][i % 5]} />
                            </mesh>
                            <mesh position={[0, 0.28, 0.02]} rotation={[0, 0, i * 0.7 + Math.PI / 2]} castShadow>
                                <boxGeometry args={[0.22, 0.05, 0.01]} />
                                <meshStandardMaterial color={['#ffd54f', '#e03a28', '#2266aa', '#e8488b', '#258f4a'][i % 5]} />
                            </mesh>
                        </group>
                    ))}
                    {/* Mẹt bày trống lắc tay mini cho các em bé */}
                    <group position={[0, 0.04, 0.22]}>
                        <mesh receiveShadow>
                            <cylinderGeometry args={[0.4, 0.4, 0.03, 14]} />
                            <meshStandardMaterial color="#a68456" />
                        </mesh>
                        {[-0.14, 0.14].map((dx, i) => (
                            <group key={i} position={[dx, 0.05, 0]} rotation={[0, i * 0.8, 0]}>
                                <mesh castShadow>
                                    <cylinderGeometry args={[0.08, 0.08, 0.045, 10]} />
                                    <meshStandardMaterial color="#d4261b" />
                                </mesh>
                                <mesh position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
                                    <cylinderGeometry args={[0.01, 0.01, 0.22, 4]} />
                                    <meshStandardMaterial color="#eed56e" />
                                </mesh>
                            </group>
                        ))}
                    </group>
                </group>
            )}

            {/* NGƯỜI BÁN HÀNG ĐỨNG PHỤC VỤ PHÍA SAU QUẦY (TRANG PHỤC CỔ TRUYỀN NÓN LÁ/KHĂN RẰN) */}
            <group position={[0, 0, -0.62]}>
                {/* 2 Chân người bán */}
                {[-0.14, 0.14].map((x) => (
                    <mesh key={x} position={[x, 0.45, 0]} castShadow>
                        <cylinderGeometry args={[0.065, 0.075, 0.9, 8]} />
                        <meshStandardMaterial color="#2d221a" />
                    </mesh>
                ))}
                {/* Thân áo bà ba truyền thống */}
                <mesh position={[0, 1.15, 0]} castShadow>
                    <cylinderGeometry args={[0.22, 0.26, 0.62, 10]} />
                    <meshStandardMaterial color={
                        type === 'mooncake' ? '#8a3c26' :
                            type === 'lanterns' ? '#b52b22' :
                                type === 'costumes' ? '#9c3882' :
                                    type === 'streetfood' ? '#5a3d24' :
                                        type === 'tohe' ? '#2d7a46' :
                                            type === 'calligraphy' ? '#1f3c5a' :
                                                type === 'tea' ? '#3d6346' :
                                                    type === 'toys' ? '#b85d1d' :
                                                        type === 'cotton_candy' ? '#c44275' : '#c47a27'
                    } roughness={0.8} />
                </mesh>
                {/* Khăn rằn vắt chéo qua vai */}
                <mesh position={[0, 1.25, 0.02]} rotation={[0, 0, 0.4]}>
                    <boxGeometry args={[0.34, 0.06, 0.26]} />
                    <meshStandardMaterial color="#f0ede4" roughness={0.9} />
                </mesh>
                {/* 2 Cánh tay tươi cười chào đón / bưng đồ */}
                <group position={[-0.28, 1.25, 0.12]} rotation={[0.6, 0, -0.2]}>
                    <mesh position={[0, -0.16, 0]}>
                        <cylinderGeometry args={[0.045, 0.04, 0.36, 6]} />
                        <meshStandardMaterial color="#d9a882" />
                    </mesh>
                </group>
                <group position={[0.28, 1.25, 0.12]} rotation={[0.6, 0, 0.2]}>
                    <mesh position={[0, -0.16, 0]}>
                        <cylinderGeometry args={[0.045, 0.04, 0.36, 6]} />
                        <meshStandardMaterial color="#d9a882" />
                    </mesh>
                </group>
                {/* Đầu và khuôn mặt đôn hậu */}
                <mesh position={[0, 1.62, 0]} castShadow>
                    <sphereGeometry args={[0.145, 12, 12]} />
                    <meshStandardMaterial color="#e5bba0" roughness={0.7} />
                </mesh>
                {/* Đôi mắt đen cười tít */}
                {[-0.05, 0.05].map((x) => (
                    <mesh key={x} position={[x, 1.63, 0.135]}>
                        <sphereGeometry args={[0.016, 6, 6]} />
                        <meshStandardMaterial color="#1a1410" />
                    </mesh>
                ))}
                {/* Nụ cười tươi thân thiện đón khách */}
                <mesh position={[0, 1.57, 0.135]}>
                    <boxGeometry args={[0.045, 0.015, 0.01]} />
                    <meshStandardMaterial color="#992015" />
                </mesh>
                {/* Nón lá truyền thống Việt Nam đội trên đầu */}
                <group position={[0, 1.76, 0]} rotation={[0.08, 0, 0]}>
                    <mesh castShadow>
                        <coneGeometry args={[0.42, 0.24, 18]} />
                        <meshStandardMaterial color="#d4b57b" roughness={0.9} />
                    </mesh>
                    {/* Quai nón lụa mềm */}
                    <mesh position={[0, -0.1, 0]}>
                        <torusGeometry args={[0.13, 0.012, 4, 12, Math.PI]} rotation={[Math.PI, 0, 0]} />
                        <meshStandardMaterial color="#b82619" />
                    </mesh>
                </group>
            </group>
        </group>
    )
}

function FestivalLanternString({ z = -30, swayPhase = 0 }) {
    const span = 9.2
    const segments = 18
    const points = []
    for (let i = 0; i <= segments; i++) {
        const x = -span + (i * (span * 2)) / segments
        const y = 4.6 + 1.1 * Math.pow(x / span, 2)
        points.push([x, y])
    }

    const lanternPositions = [
        { x: -7.2, type: 'round' },
        { x: -4.8, type: 'carrousel' },
        { x: -2.4, type: 'star' },
        { x: 0, type: 'round' },
        { x: 2.4, type: 'star' },
        { x: 4.8, type: 'carrousel' },
        { x: 7.2, type: 'round' },
    ]

    return (
        <group position={[0, 0, z]}>
            {points.slice(0, -1).map(([x1, y1], idx) => {
                const [x2, y2] = points[idx + 1]
                const length = Math.hypot(x2 - x1, y2 - y1)
                const angle = Math.atan2(y2 - y1, x2 - x1)
                return (
                    <mesh
                        key={idx}
                        position={[(x1 + x2) / 2, (y1 + y2) / 2, 0]}
                        rotation={[0, 0, angle]}
                    >
                        <boxGeometry args={[length + 0.02, 0.025, 0.025]} />
                        <meshStandardMaterial color="#2d2420" roughness={1} />
                    </mesh>
                )
            })}

            {lanternPositions.map((item, idx) => {
                const ly = 4.6 + 1.1 * Math.pow(item.x / span, 2)
                return (
                    <group key={idx}>
                        {item.type === 'star' && (
                            <StarLantern position={[item.x, ly, 0]} swayOffset={swayPhase + idx * 1.2} scale={0.95} />
                        )}
                        {item.type === 'carrousel' && (
                            <CarrouselLantern position={[item.x, ly, 0]} swayOffset={swayPhase + idx * 1.2} scale={0.95} />
                        )}
                        {item.type === 'round' && (
                            <RoundFestiveLantern position={[item.x, ly, 0]} swayOffset={swayPhase + idx * 1.2} scale={0.95} />
                        )}
                    </group>
                )
            })}
        </group>
    )
}

function GrandLionDanceStage({ position }) {
    const redLionHead = useRef(null)
    const redLionBody = useRef(null)
    const goldLion = useRef(null)
    const teuRef = useRef(null)

    useFrame(({ clock }) => {
        const t = clock.elapsedTime
        if (redLionHead.current) {
            redLionHead.current.rotation.y = Math.sin(t * 3.2) * 0.25
            redLionHead.current.rotation.x = 0.08 + Math.sin(t * 4.5) * 0.12
            redLionHead.current.position.y = 1.35 + Math.abs(Math.sin(t * 3.2)) * 0.18
        }
        if (redLionBody.current) {
            redLionBody.current.rotation.y = Math.sin(t * 3.2 - 0.5) * 0.22
            redLionBody.current.position.y = 1.15 + Math.abs(Math.sin(t * 3.2 - 0.4)) * 0.14
        }
        if (goldLion.current) {
            goldLion.current.position.y = 3.65 + Math.abs(Math.sin(t * 2.8)) * 0.3
            goldLion.current.rotation.z = Math.sin(t * 2.8) * 0.15
            goldLion.current.rotation.y = Math.cos(t * 1.5) * 0.25
        }
        if (teuRef.current) {
            teuRef.current.rotation.y = Math.sin(t * 2.2) * 0.4
            teuRef.current.position.y = 0.55 + Math.abs(Math.sin(t * 3.0)) * 0.06
        }
    })

    return (
        <group position={position}>
            {/* SÂN KHẤU CHÍNH BẰNG GỖ BỀ THẾ */}
            <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
                <boxGeometry args={[22, 1.1, 8.5]} />
                <meshStandardMaterial color="#4a2818" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.12, 0]} receiveShadow>
                <boxGeometry args={[21.8, 0.05, 8.3]} />
                <meshStandardMaterial color="#881a12" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.15, 4.15]}>
                <boxGeometry args={[21.8, 0.03, 0.15]} />
                <meshStandardMaterial color="#d49b32" metalness={0.5} />
            </mesh>

            {/* Bậc tam cấp chính giữa bước lên sân khấu */}
            <mesh position={[0, 0.28, 4.55]} receiveShadow>
                <boxGeometry args={[6.5, 0.56, 0.7]} />
                <meshStandardMaterial color="#5e3420" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.58, 4.35]} receiveShadow>
                <boxGeometry args={[6.5, 0.58, 0.5]} />
                <meshStandardMaterial color="#881a12" roughness={0.8} />
            </mesh>

            {/* Lan can hoa văn gỗ đỏ hai bên sườn sân khấu */}
            {[-10.9, 10.9].map((x) => (
                <group key={x} position={[x, 1.45, 0]}>
                    <mesh castShadow>
                        <boxGeometry args={[0.15, 0.65, 8.3]} />
                        <meshStandardMaterial color="#5e2618" roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 0.35, 0]}>
                        <boxGeometry args={[0.22, 0.1, 8.3]} />
                        <meshStandardMaterial color="#d49b32" />
                    </mesh>
                </group>
            ))}

            {/* PHÔNG NỀN ĐẠI LỄ HỘI RỰC RỠ (BACKDROP) */}
            <mesh position={[0, 4.5, -3.8]} castShadow>
                <boxGeometry args={[21, 6.8, 0.35]} />
                <meshStandardMaterial color="#7a170f" roughness={0.85} />
            </mesh>
            <mesh position={[0, 4.5, -3.6]}>
                <boxGeometry args={[20.4, 6.2, 0.08]} />
                <meshStandardMaterial color="#9e2318" roughness={0.8} />
            </mesh>

            {/* Vầng Trăng Đại Nguyệt mạ vàng trung tâm backdrop */}
            <mesh position={[0, 5.4, -3.52]}>
                <circleGeometry args={[2.0, 32]} />
                <meshStandardMaterial color="#ffd752" emissive="#cc8818" emissiveIntensity={0.8} />
            </mesh>
            {/* Hoa văn mây ngũ sắc cuộn sóng dưới vầng trăng */}
            {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
                <mesh key={i} position={[x, 3.8, -3.5]} scale={[1.2, 0.7, 0.7]}>
                    <sphereGeometry args={[0.45, 12, 12]} />
                    <meshStandardMaterial color="#d49b32" metalness={0.4} />
                </mesh>
            ))}

            {/* BẢNG ĐẠI TỰ THƯ PHÁP: "ĐÊM HỘI TRĂNG RẰM - MÚA LÂN SƯ RỒNG" */}
            <mesh position={[0, 7.1, -3.45]} castShadow>
                <boxGeometry args={[14.5, 1.1, 0.12]} />
                <meshStandardMaterial color="#881a12" roughness={0.7} />
            </mesh>
            <mesh position={[0, 7.1, -3.38]}>
                <boxGeometry args={[14.1, 0.9, 0.04]} />
                <meshStandardMaterial color="#ffd859" emissive="#cf8a21" emissiveIntensity={0.85} />
            </mesh>

            {/* CÂU ĐỐI ĐỎ HAI BÊN CÁNH GÀ SÂN KHẤU */}
            <group position={[-9.2, 4.4, -3.5]}>
                <mesh castShadow>
                    <boxGeometry args={[1.35, 4.8, 0.1]} />
                    <meshStandardMaterial color="#881a12" />
                </mesh>
                <mesh position={[0, 0, 0.06]}>
                    <boxGeometry args={[1.15, 4.5, 0.02]} />
                    <meshStandardMaterial color="#ffd859" emissive="#cf8a21" emissiveIntensity={0.6} />
                </mesh>
            </group>
            <group position={[9.2, 4.4, -3.5]}>
                <mesh castShadow>
                    <boxGeometry args={[1.35, 4.8, 0.1]} />
                    <meshStandardMaterial color="#881a12" />
                </mesh>
                <mesh position={[0, 0, 0.06]}>
                    <boxGeometry args={[1.15, 4.5, 0.02]} />
                    <meshStandardMaterial color="#ffd859" emissive="#cf8a21" emissiveIntensity={0.6} />
                </mesh>
            </group>

            {/* Mái ngói đao cong cổ kính che đỉnh phông nền */}
            <mesh position={[0, 8.0, -3.6]} castShadow>
                <boxGeometry args={[22.5, 0.22, 1.6]} />
                <meshStandardMaterial color="#662014" roughness={0.88} />
            </mesh>

            {/* DÀN CỘT MAI HOA THUNG (Plum Blossom Acrobat Stilt Pillars) */}
            <group position={[0, 1.12, 0]}>
                {[
                    { x: 2.2, z: 1.5, h: 0.9 },
                    { x: 3.6, z: 0.2, h: 1.3 },
                    { x: 5.0, z: 1.6, h: 1.8 },
                    { x: 6.4, z: 0.0, h: 2.2 },
                    { x: 7.8, z: 1.2, h: 2.5 },
                    { x: 6.8, z: 2.4, h: 1.7 },
                    { x: 4.8, z: 2.7, h: 1.2 },
                ].map((col, idx) => (
                    <group key={idx} position={[col.x, 0, col.z]}>
                        <mesh position={[0, col.h / 2, 0]} castShadow>
                            <cylinderGeometry args={[0.07, 0.09, col.h, 10]} />
                            <meshStandardMaterial color="#a62217" metalness={0.3} />
                        </mesh>
                        <mesh position={[0, col.h, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.32, 0.32, 0.06, 16]} />
                            <meshStandardMaterial color="#d49b32" metalness={0.6} roughness={0.3} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* DÀN TRỐNG HỘI LÂN SƯ & NGHỆ NHÂN ĐÁNH TRỐNG SÔI ĐỘNG */}
            <group position={[-6.2, 1.12, -0.8]}>
                {/* Giá đỡ trống cái bằng gỗ lim chạm trổ */}
                <group position={[0, 0, 0]}>
                    {[-0.65, 0.65].map((x) => (
                        <group key={x} position={[x, 0.55, 0]}>
                            <mesh rotation={[0, 0, x > 0 ? -0.22 : 0.22]} castShadow>
                                <boxGeometry args={[0.13, 1.25, 0.16]} />
                                <meshStandardMaterial color="#3d1e11" roughness={0.9} />
                            </mesh>
                            <mesh position={[0, -0.4, 0]}>
                                <boxGeometry args={[0.14, 0.08, 0.6]} />
                                <meshStandardMaterial color="#3d1e11" />
                            </mesh>
                        </group>
                    ))}
                    {/* Thanh giằng ngang giá trống sơn son */}
                    <mesh position={[0, 0.35, 0]}>
                        <cylinderGeometry args={[0.04, 0.04, 1.3, 6]} rotation={[0, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#881a12" />
                    </mesh>

                    {/* THÂN TRỐNG SẤM ĐẠI HỘI SƠN SON THIẾP VÀNG */}
                    <mesh position={[0, 1.08, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                        <cylinderGeometry args={[0.68, 0.68, 1.05, 24]} />
                        <meshStandardMaterial color="#8a1710" roughness={0.7} />
                    </mesh>
                    {/* 2 Đai thép nẹp thân trống tán đinh đồng vàng */}
                    {[-0.32, 0.32].map((x) => (
                        <mesh key={x} position={[x, 1.08, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <torusGeometry args={[0.69, 0.03, 8, 24]} />
                            <meshStandardMaterial color="#d49b32" metalness={0.8} roughness={0.2} />
                        </mesh>
                    ))}
                    {/* 2 Mặt da trâu già đanh căng nung mộc */}
                    <mesh position={[-0.53, 1.08, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <circleGeometry args={[0.64, 24]} />
                        <meshStandardMaterial color="#ebd7be" roughness={0.92} />
                    </mesh>
                    <mesh position={[0.53, 1.08, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <circleGeometry args={[0.64, 24]} />
                        <meshStandardMaterial color="#ebd7be" roughness={0.92} />
                    </mesh>
                    {/* Vòng tâm âm dương mộc đỏ vẽ trên mặt trống */}
                    <mesh position={[-0.535, 1.08, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <ringGeometry args={[0.18, 0.24, 20]} />
                        <meshStandardMaterial color="#881a12" />
                    </mesh>
                    <mesh position={[0.535, 1.08, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <ringGeometry args={[0.18, 0.24, 20]} />
                        <meshStandardMaterial color="#881a12" />
                    </mesh>
                </group>

                {/* 2 DÀN TRỐNG CON (TRỐNG BẢN / TRỐNG CƠM) ĐẶT PHÍA TRƯỚC */}
                {[-1.3, 1.3].map((x, i) => (
                    <group key={i} position={[x, 0, 0.9]}>
                        <mesh position={[0, 0.25, 0]}>
                            <cylinderGeometry args={[0.03, 0.05, 0.5, 4]} />
                            <meshStandardMaterial color="#3d1e11" />
                        </mesh>
                        <mesh position={[0, 0.56, 0]} castShadow>
                            <cylinderGeometry args={[0.3, 0.26, 0.38, 16]} />
                            <meshStandardMaterial color="#9c2117" roughness={0.7} />
                        </mesh>
                        <mesh position={[0, 0.755, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[0.29, 16]} />
                            <meshStandardMaterial color="#ebd7be" roughness={0.9} />
                        </mesh>
                        <mesh position={[0.12, 0.82, 0.05]} rotation={[0.4, 0.3, -0.6]}>
                            <cylinderGeometry args={[0.012, 0.012, 0.32, 6]} />
                            <meshStandardMaterial color="#d4a359" />
                        </mesh>
                    </group>
                ))}

                {/* CHŨM CHOẸ ĐỒNG & THANH LA NGÂN VANG */}
                <group position={[-1.4, 0, -1.1]}>
                    <mesh position={[0, 0.75, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, 1.5, 6]} />
                        <meshStandardMaterial color="#4a2212" />
                    </mesh>
                    <mesh position={[0, 1.25, 0.15]} rotation={[0.35, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.26, 0.26, 0.025, 20]} />
                        <meshStandardMaterial color="#f7c836" metalness={0.88} roughness={0.15} />
                    </mesh>
                    <mesh position={[0, 1.25, 0.18]}>
                        <sphereGeometry args={[0.06, 12, 12]} />
                        <meshStandardMaterial color="#f7c836" metalness={0.9} />
                    </mesh>
                </group>

                {/* NGHỆ NHÂN ĐÁNH TRỐNG LÂN SƯ VẠM VỠ CỘT KHĂN ĐỎ */}
                <group position={[0, 0, -1.05]}>
                    {[-0.22, 0.22].map((x) => (
                        <mesh key={x} position={[x, 0.45, 0]} castShadow>
                            <cylinderGeometry args={[0.09, 0.1, 0.9, 8]} />
                            <meshStandardMaterial color="#1a1816" />
                        </mesh>
                    ))}
                    <mesh position={[0, 1.2, 0]} castShadow>
                        <cylinderGeometry args={[0.26, 0.28, 0.65, 10]} />
                        <meshStandardMaterial color="#f2ba2c" roughness={0.7} />
                    </mesh>
                    <mesh position={[0, 0.95, 0]}>
                        <cylinderGeometry args={[0.28, 0.28, 0.12, 10]} />
                        <meshStandardMaterial color="#c42418" />
                    </mesh>
                    <group position={[-0.32, 1.35, 0.15]} rotation={[0.7, -0.4, 0.3]}>
                        <mesh position={[0, 0.18, 0]}>
                            <cylinderGeometry args={[0.055, 0.05, 0.36, 6]} />
                            <meshStandardMaterial color="#dba882" />
                        </mesh>
                        <mesh position={[0, 0.4, 0.08]} rotation={[0.5, 0, 0]}>
                            <cylinderGeometry args={[0.016, 0.02, 0.38, 6]} />
                            <meshStandardMaterial color="#916438" />
                        </mesh>
                    </group>
                    <group position={[0.32, 1.35, 0.15]} rotation={[0.5, 0.4, -0.3]}>
                        <mesh position={[0, 0.18, 0]}>
                            <cylinderGeometry args={[0.055, 0.05, 0.36, 6]} />
                            <meshStandardMaterial color="#dba882" />
                        </mesh>
                        <mesh position={[0, 0.4, 0.08]} rotation={[0.5, 0, 0]}>
                            <cylinderGeometry args={[0.016, 0.02, 0.38, 6]} />
                            <meshStandardMaterial color="#916438" />
                        </mesh>
                    </group>
                    <mesh position={[0, 1.68, 0]} castShadow>
                        <sphereGeometry args={[0.16, 12, 12]} />
                        <meshStandardMaterial color="#dba882" roughness={0.7} />
                    </mesh>
                    <mesh position={[0, 1.74, 0]}>
                        <torusGeometry args={[0.165, 0.025, 6, 16]} />
                        <meshStandardMaterial color="#c42418" />
                    </mesh>
                </group>
            </group>

            {/* CHÚ KIM LÂN ĐỎ (RED LION) BIỂU DIỄN GIỮA SÂN KHẤU */}
            <group position={[-0.8, 1.12, 0.8]}>
                {/* 2 Chân người múa lân phía trước */}
                {[-0.26, 0.26].map((x, i) => (
                    <group key={`front-leg-${i}`} position={[x, 0.35, 0.2]}>
                        {/* Ống quần gấm đỏ xếp nếp vảy rồng */}
                        <mesh castShadow>
                            <cylinderGeometry args={[0.13, 0.15, 0.7, 10]} />
                            <meshStandardMaterial color="#c22519" roughness={0.7} />
                        </mesh>
                        {/* Viền lông xù cổ chân */}
                        <mesh position={[0, -0.32, 0]}>
                            <torusGeometry args={[0.14, 0.04, 6, 12]} />
                            <meshStandardMaterial color="#f7c836" />
                        </mesh>
                        {/* Giày múa lân vải đen đế vàng */}
                        <mesh position={[0, -0.36, 0.05]} castShadow>
                            <boxGeometry args={[0.2, 0.1, 0.28]} />
                            <meshStandardMaterial color="#1a1410" />
                        </mesh>
                    </group>
                ))}

                {/* 2 Chân người múa lân phía sau đỡ đuôi */}
                {[-0.24, 0.24].map((x, i) => (
                    <group key={`back-leg-${i}`} position={[x, 0.35, -1.2]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.13, 0.15, 0.7, 10]} />
                            <meshStandardMaterial color="#c22519" roughness={0.7} />
                        </mesh>
                        <mesh position={[0, -0.32, 0]}>
                            <torusGeometry args={[0.14, 0.04, 6, 12]} />
                            <meshStandardMaterial color="#f7c836" />
                        </mesh>
                        <mesh position={[0, -0.36, 0.05]} castShadow>
                            <boxGeometry args={[0.2, 0.1, 0.28]} />
                            <meshStandardMaterial color="#1a1410" />
                        </mesh>
                    </group>
                ))}

                {/* THÂN VÀ ĐUÔI LÂN (LION CAPE & BODY) */}
                <group ref={redLionBody} position={[0, 0, -0.9]}>
                    {/* Mình lân uốn lượn nhiều tầng vải gấm đỏ */}
                    <mesh castShadow scale={[1.15, 0.9, 1.7]}>
                        <sphereGeometry args={[0.65, 16, 16]} />
                        <meshStandardMaterial color="#b82014" roughness={0.65} />
                    </mesh>
                    {/* Sống lưng vảy gấm kim tuyến vàng */}
                    <mesh position={[0, 0.52, 0]} scale={[0.75, 0.18, 1.45]}>
                        <boxGeometry args={[0.6, 0.2, 1.1]} />
                        <meshStandardMaterial color="#f5b82a" metalness={0.6} roughness={0.3} />
                    </mesh>
                    {/* Các lớp viền ren lông xù viền quanh sườn thân lân */}
                    {[-0.6, 0.6].map((x) => (
                        <group key={x} position={[x, -0.15, 0]}>
                            {[-0.6, -0.2, 0.2, 0.6].map((z, idx) => (
                                <mesh key={idx} position={[0, 0, z]} scale={[0.8, 1.2, 1]}>
                                    <sphereGeometry args={[0.12, 8, 8]} />
                                    <meshStandardMaterial color={idx % 2 === 0 ? '#ffd747' : '#fff'} />
                                </mesh>
                            ))}
                        </group>
                    ))}
                    {/* Đuôi lân xòe rộng vểnh cao kiêu hãnh */}
                    <group position={[0, 0.45, -0.95]} rotation={[0.45, 0, 0]}>
                        <coneGeometry args={[0.34, 0.75, 8]} />
                        <meshStandardMaterial color="#ffd747" emissive="#cc8810" emissiveIntensity={0.4} />
                        <mesh position={[0, 0.38, 0]}>
                            <sphereGeometry args={[0.16, 10, 10]} />
                            <meshStandardMaterial color="#e52b1b" />
                        </mesh>
                    </group>
                </group>

                {/* ĐẦU KIM LÂN VIỆT NAM TINH XẢO (LION HEAD WITH JAW & MIRROR EYES) */}
                <group ref={redLionHead} position={[0, 1.38, 0.2]}>
                    {/* Hộp sọ đầu lân */}
                    <mesh castShadow scale={[1.25, 1.05, 1.05]}>
                        <sphereGeometry args={[0.68, 18, 18]} />
                        <meshStandardMaterial color="#cc2416" roughness={0.65} />
                    </mesh>

                    {/* Sừng lân (kỳ lân đơn giác) mạ vàng đỉnh đầu */}
                    <mesh position={[0, 0.76, 0.08]} castShadow>
                        <coneGeometry args={[0.13, 0.52, 8]} />
                        <meshStandardMaterial color="#f5b82a" metalness={0.7} roughness={0.25} />
                    </mesh>
                    {/* Ngọc minh châu phát sáng trên đỉnh sừng lân */}
                    <mesh position={[0, 1.05, 0.08]}>
                        <sphereGeometry args={[0.085, 12, 12]} />
                        <meshStandardMaterial color="#ff2211" emissive="#ff3311" emissiveIntensity={2.5} />
                    </mesh>

                    {/* Gương bát quái tròn phản chiếu giữa trán lân */}
                    <group position={[0, 0.42, 0.62]} rotation={[-0.2, 0, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial color="#ffd747" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0, 0.015]}>
                            <circleGeometry args={[0.11, 16]} />
                            <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.05} />
                        </mesh>
                    </group>

                    {/* 2 Đôi mắt chớp to tròn lấp lánh có mí mắt chuyển động */}
                    {[-0.32, 0.32].map((x) => (
                        <group key={x} position={[x, 0.24, 0.54]}>
                            {/* Vòm mắt nổi cầu lồi */}
                            <mesh castShadow>
                                <sphereGeometry args={[0.2, 14, 14]} />
                                <meshStandardMaterial color="#ffffff" roughness={0.2} />
                            </mesh>
                            {/* Tròng đen mắt lân */}
                            <mesh position={[0, 0, 0.12]}>
                                <sphereGeometry args={[0.115, 12, 12]} />
                                <meshStandardMaterial color="#1a1410" roughness={0.1} />
                            </mesh>
                            {/* Đốm sáng tinh anh phản chiếu trong mắt */}
                            <mesh position={[0.03, 0.06, 0.16]}>
                                <sphereGeometry args={[0.045, 6, 6]} />
                                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.5} />
                            </mesh>
                            {/* Lông mày lân xù màu vàng uốn cong */}
                            <mesh position={[0, 0.18, -0.02]} rotation={[0, 0, x > 0 ? -0.3 : 0.3]}>
                                <boxGeometry args={[0.3, 0.09, 0.16]} />
                                <meshStandardMaterial color="#f7c836" />
                            </mesh>
                        </group>
                    ))}

                    {/* 2 Tai lân vểnh cao có tua viền lông trắng */}
                    {[-0.65, 0.65].map((x) => (
                        <group key={x} position={[x, 0.55, -0.1]} rotation={[0, 0, x > 0 ? -0.5 : 0.5]}>
                            <mesh castShadow>
                                <coneGeometry args={[0.14, 0.36, 6]} />
                                <meshStandardMaterial color="#b81b10" />
                            </mesh>
                            <mesh position={[0, -0.15, 0]}>
                                <torusGeometry args={[0.13, 0.04, 6, 10]} />
                                <meshStandardMaterial color="#ffffff" />
                            </mesh>
                        </group>
                    ))}

                    {/* Mũi lân xanh ngọc bích nổi bật */}
                    <mesh position={[0, 0.06, 0.72]} scale={[1.3, 0.9, 0.9]}>
                        <sphereGeometry args={[0.16, 12, 12]} />
                        <meshStandardMaterial color="#22a84d" roughness={0.4} />
                    </mesh>

                    {/* HÀM DƯỚI & RĂNG NẸP ĐẦU LÂN HÁ MIỆNG */}
                    <group position={[0, -0.22, 0.48]}>
                        {/* Miệng lân há rộng */}
                        <mesh scale={[1.4, 0.55, 0.85]} castShadow>
                            <boxGeometry args={[0.7, 0.36, 0.45]} />
                            <meshStandardMaterial color="#1a1410" />
                        </mesh>
                        {/* Răng nanh trắng của Kim Lân */}
                        {[-0.22, 0.22].map((x) => (
                            <mesh key={x} position={[x, 0.1, 0.2]} rotation={[Math.PI, 0, 0]}>
                                <coneGeometry args={[0.04, 0.11, 4]} />
                                <meshStandardMaterial color="#ffffff" />
                            </mesh>
                        ))}
                        {/* Lưỡi lân đỏ rực hồng */}
                        <mesh position={[0, -0.06, 0.18]} scale={[1.1, 0.3, 0.9]}>
                            <sphereGeometry args={[0.12, 10, 10]} />
                            <meshStandardMaterial color="#ff4060" />
                        </mesh>
                    </group>

                    {/* Dải lụa đỏ thêu chữ vàng chúc phúc rủ xuống từ miệng lân */}
                    <group position={[0, -0.88, 0.7]}>
                        <mesh castShadow>
                            <boxGeometry args={[0.44, 1.35, 0.02]} />
                            <meshStandardMaterial color="#b81b10" roughness={0.7} />
                        </mesh>
                        <mesh position={[0, 0, 0.015]}>
                            <boxGeometry args={[0.34, 1.2, 0.01]} />
                            <meshStandardMaterial color="#ffd859" emissive="#cf8a21" emissiveIntensity={0.85} />
                        </mesh>
                        {/* Quả cầu chuông vàng đáy dải lụa */}
                        <mesh position={[0, -0.72, 0]}>
                            <sphereGeometry args={[0.06, 8, 8]} />
                            <meshStandardMaterial color="#ffd859" metalness={0.7} />
                        </mesh>
                    </group>
                </group>
            </group>

            {/* CHÚ HOÀNG LÂN VÀNG (GOLDEN LION) TRÊN ĐỈNH CỘT MAI HOA THUNG */}
            <group ref={goldLion} position={[6.4, 0, 0.0]}>
                {/* Chân võ sinh múa lân trên cột thung */}
                {[-0.18, 0.18].map((x, i) => (
                    <mesh key={i} position={[x, -0.16, 0.1]} castShadow>
                        <cylinderGeometry args={[0.07, 0.09, 0.38, 8]} />
                        <meshStandardMaterial color="#c27815" />
                    </mesh>
                ))}
                {/* Thân Hoàng Lân mạ vàng kim uốn lượn */}
                <mesh castShadow scale={[0.95, 0.75, 1.3]}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color="#e5a825" metalness={0.4} roughness={0.5} />
                </mesh>
                <mesh position={[0, 0.32, 0]} scale={[0.65, 0.16, 1.1]}>
                    <boxGeometry args={[0.5, 0.2, 0.9]} />
                    <meshStandardMaterial color="#e53924" metalness={0.5} />
                </mesh>
                {/* Đuôi Hoàng Lân vểnh cao */}
                <mesh position={[0, 0.28, -0.68]} rotation={[0.4, 0, 0]}>
                    <coneGeometry args={[0.22, 0.52, 8]} />
                    <meshStandardMaterial color="#ffd84d" emissive="#cc8810" emissiveIntensity={0.4} />
                </mesh>
                {/* Đầu Hoàng Lân uy phong với sừng đỏ và mắt chớp */}
                <group position={[0, 0.6, 0.52]}>
                    <mesh castShadow scale={[1.15, 0.95, 0.95]}>
                        <sphereGeometry args={[0.5, 16, 16]} />
                        <meshStandardMaterial color="#f0b830" metalness={0.4} roughness={0.5} />
                    </mesh>
                    {/* Sừng lân */}
                    <mesh position={[0, 0.55, 0.05]}>
                        <coneGeometry args={[0.09, 0.36, 8]} />
                        <meshStandardMaterial color="#cc2416" />
                    </mesh>
                    <mesh position={[0, 0.75, 0.05]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshStandardMaterial color="#ffd747" emissive="#ffd747" emissiveIntensity={2} />
                    </mesh>
                    {/* Mắt lồi phản quang */}
                    {[-0.22, 0.22].map((x) => (
                        <group key={x} position={[x, 0.18, 0.42]}>
                            <sphereGeometry args={[0.13, 10, 10]} />
                            <meshStandardMaterial color="#fffeb8" emissive="#ffd747" emissiveIntensity={1.8} />
                        </group>
                    ))}
                    {/* Hàm há & dải lụa vàng kim */}
                    <mesh position={[0, -0.16, 0.36]} scale={[1.3, 0.5, 0.7]} castShadow>
                        <boxGeometry args={[0.48, 0.24, 0.3]} />
                        <meshStandardMaterial color="#1a1410" />
                    </mesh>
                    <mesh position={[0, -0.45, 0.48]}>
                        <boxGeometry args={[0.24, 0.65, 0.015]} />
                        <meshStandardMaterial color="#cc2416" emissive="#aa190d" emissiveIntensity={0.6} />
                    </mesh>
                </group>
            </group>

            {/* CHÚ TỄU / ÔNG ĐỊA BỤNG PHỆ CƯỜI TƯƠI CẦM QUẠT MO */}
            <group ref={teuRef} position={[0.2, 1.12, 2.6]}>
                {[-0.18, 0.18].map((x) => (
                    <mesh key={x} position={[x, 0.22, 0]} castShadow>
                        <cylinderGeometry args={[0.09, 0.11, 0.44, 8]} />
                        <meshStandardMaterial color="#2b2019" />
                    </mesh>
                ))}
                <mesh position={[0, 0.55, 0.05]} scale={[1.1, 1.0, 1.2]} castShadow>
                    <sphereGeometry args={[0.36, 14, 14]} />
                    <meshStandardMaterial color="#f7cfb2" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.65, 0]} scale={[1.2, 0.8, 1.15]} castShadow>
                    <cylinderGeometry args={[0.34, 0.38, 0.42, 10]} />
                    <meshStandardMaterial color="#e86b7b" roughness={0.85} />
                </mesh>
                <mesh position={[0, 1.12, 0]} castShadow>
                    <sphereGeometry args={[0.24, 14, 14]} />
                    <meshStandardMaterial color="#f7cfb2" roughness={0.8} />
                </mesh>
                {[-0.14, 0.14].map((x) => (
                    <mesh key={x} position={[x, 1.1, 0.2]}>
                        <sphereGeometry args={[0.045, 8, 8]} />
                        <meshStandardMaterial color="#e8382e" />
                    </mesh>
                ))}
                <mesh position={[0, 1.04, 0.22]} scale={[1.4, 0.6, 0.6]}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshStandardMaterial color="#881a12" />
                </mesh>

                <group position={[0.38, 0.72, 0.25]} rotation={[0.4, 0.3, -0.6]}>
                    <mesh>
                        <cylinderGeometry args={[0.015, 0.015, 0.28, 4]} />
                        <meshStandardMaterial color="#8a6943" />
                    </mesh>
                    <mesh position={[0, 0.22, 0]} scale={[1.2, 1.4, 0.08]} castShadow>
                        <sphereGeometry args={[0.14, 10, 10]} />
                        <meshStandardMaterial color="#dfc38a" roughness={0.9} />
                    </mesh>
                </group>
            </group>

            {/* DÀN ĐÈN PHA SÂN KHẤU */}
            {[-9.5, 9.5].map((x) => (
                <group key={x} position={[x, 1.12, 3.2]}>
                    <mesh position={[0, 2.6, 0]} castShadow>
                        <cylinderGeometry args={[0.06, 0.08, 5.2, 6]} />
                        <meshStandardMaterial color="#2d2926" metalness={0.7} />
                    </mesh>
                    <mesh position={[0, 5.2, 0]}>
                        <boxGeometry args={[0.5, 0.4, 0.5]} />
                        <meshStandardMaterial color="#2d2926" />
                    </mesh>
                    <pointLight position={[0, 5.0, 0]} color="#ffcf66" intensity={18} distance={22} />
                </group>
            ))}
            <pointLight position={[0, 4.5, 2.5]} color="#ffb042" intensity={12} distance={15} />
        </group>
    )
}

function ChrysanthemumPot({ position, scale = 1.0 }) {
    // Chậu cúc mâm xôi vàng rực rỡ đặc trưng lễ hội Trung Thu & ngày Tết làng quê
    return (
        <group position={position} scale={scale}>
            {/* Chậu sành gốm đỏ nung */}
            <mesh position={[0, 0.22, 0]} castShadow>
                <cylinderGeometry args={[0.34, 0.24, 0.44, 14]} />
                <meshStandardMaterial color="#9c4228" roughness={0.85} />
            </mesh>
            {/* Vành miệng chậu gốm */}
            <mesh position={[0, 0.44, 0]}>
                <torusGeometry args={[0.35, 0.035, 8, 16]} />
                <meshStandardMaterial color="#b85335" />
            </mesh>
            {/* Mâm xôi hoa cúc vàng rực hình bán cầu tròn xoe */}
            <mesh position={[0, 0.54, 0]} castShadow>
                <sphereGeometry args={[0.38, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#f7c81b" emissive="#cc980e" emissiveIntensity={0.35} roughness={0.9} />
            </mesh>
            {/* Điểm xuyết nụ cúc xanh và hoa cúc nở rộ */}
            {[-0.22, 0, 0.22].flatMap((dx) => [-0.22, 0.22].map((dz) => (
                <mesh key={`${dx}-${dz}`} position={[dx, 0.68, dz]} scale={[1, 0.8, 1]}>
                    <sphereGeometry args={[0.07, 8, 8]} />
                    <meshStandardMaterial color="#ffd83d" />
                </mesh>
            )))}
        </group>
    )
}

function FestivalCustomer({ position, rotation = 0, variant = 'adult', clothColor = '#2b6e9c', pantsColor = '#1f1b18', hasLantern = false, isChild = false }) {
    // Khách tham quan, người mua hàng và em bé rước đèn trẩy hội
    const scale = isChild ? 0.68 : 1.0
    return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
            {/* Đôi chân */}
            {[-0.12, 0.12].map((x) => (
                <mesh key={x} position={[x, 0.42, 0]} castShadow>
                    <cylinderGeometry args={[0.06, 0.07, 0.84, 8]} />
                    <meshStandardMaterial color={pantsColor} />
                </mesh>
            ))}
            {/* Đôi hài vải / guốc mộc */}
            {[-0.12, 0.12].map((x) => (
                <mesh key={x} position={[x, 0.04, 0.05]} castShadow>
                    <boxGeometry args={[0.13, 0.08, 0.22]} />
                    <meshStandardMaterial color="#30231b" />
                </mesh>
            ))}
            {/* Thân áo truyền thống (áo dài cách tân hoặc áo bà ba) */}
            <mesh position={[0, 1.15, 0]} castShadow>
                <cylinderGeometry args={[0.21, 0.26, 0.64, 10]} />
                <meshStandardMaterial color={clothColor} roughness={0.7} />
            </mesh>
            {/* Cánh tay trái */}
            <group position={[-0.26, 1.25, 0.05]} rotation={[0.4, 0, -0.15]}>
                <mesh position={[0, -0.18, 0]}>
                    <cylinderGeometry args={[0.045, 0.04, 0.38, 6]} />
                    <meshStandardMaterial color={clothColor} />
                </mesh>
            </group>
            {/* Cánh tay phải (nếu cầm đèn thì giơ ra phía trước) */}
            <group position={[0.26, 1.25, 0.05]} rotation={hasLantern ? [0.9, 0, 0.2] : [0.3, 0, 0.15]}>
                <mesh position={[0, -0.18, 0]}>
                    <cylinderGeometry args={[0.045, 0.04, 0.38, 6]} />
                    <meshStandardMaterial color={clothColor} />
                </mesh>
                {/* Tay cầm que lồng đèn ông sao mini dạo hội */}
                {hasLantern && (
                    <group position={[0, -0.38, 0.08]} rotation={[0.2, 0, 0]}>
                        <mesh position={[0, 0.12, 0]}>
                            <cylinderGeometry args={[0.007, 0.007, 0.32, 4]} />
                            <meshStandardMaterial color="#bfa06b" />
                        </mesh>
                        <mesh position={[0, 0.32, 0]}>
                            <octahedronGeometry args={[0.11]} />
                            <meshStandardMaterial color="#ff3b2f" emissive="#ff8800" emissiveIntensity={1.2} />
                        </mesh>
                        {/* <pointLight position={[0, 0.32, 0]} color="#ff9933" intensity={1.8} distance={3.0} /> */}
                    </group>
                )}
            </group>
            {/* Cổ & Đầu */}
            <mesh position={[0, 1.52, 0]}>
                <cylinderGeometry args={[0.06, 0.07, 0.1, 8]} />
                <meshStandardMaterial color="#dfb295" />
            </mesh>
            <mesh position={[0, 1.66, 0]} castShadow>
                <sphereGeometry args={[0.145, 12, 12]} />
                <meshStandardMaterial color="#dfb295" roughness={0.7} />
            </mesh>
            {/* Mắt */}
            {[-0.045, 0.045].map((x) => (
                <mesh key={x} position={[x, 1.67, 0.135]}>
                    <sphereGeometry args={[0.015, 6, 6]} />
                    <meshStandardMaterial color="#1a1410" />
                </mesh>
            ))}
            {/* Nụ cười */}
            <mesh position={[0, 1.61, 0.135]}>
                <boxGeometry args={[0.04, 0.012, 0.01]} />
                <meshStandardMaterial color="#881a12" />
            </mesh>
            {/* Tóc hoặc khăn vấn/mũ */}
            {variant === 'woman' ? (
                <group position={[0, 1.73, -0.04]}>
                    <mesh>
                        <torusGeometry args={[0.13, 0.04, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
                        <meshStandardMaterial color="#1a1410" roughness={0.9} />
                    </mesh>
                    <mesh position={[0, -0.06, -0.1]}>
                        <sphereGeometry args={[0.07, 8, 8]} />
                        <meshStandardMaterial color="#1a1410" />
                    </mesh>
                </group>
            ) : variant === 'child' ? (
                <group position={[0, 1.76, 0]}>
                    {/* Búi tóc củ tỏi ngộ nghĩnh của em bé */}
                    <mesh position={[0, 0.05, 0]} castShadow>
                        <sphereGeometry args={[0.065, 8, 8]} />
                        <meshStandardMaterial color="#1a1410" />
                    </mesh>
                    <mesh position={[0, 0.02, 0]}>
                        <torusGeometry args={[0.055, 0.015, 6, 12]} rotation={[Math.PI / 2, 0, 0]} />
                        <meshStandardMaterial color="#d4261b" />
                    </mesh>
                </group>
            ) : (
                <mesh position={[0, 1.75, 0]} castShadow>
                    <sphereGeometry args={[0.146, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#1a1410" roughness={0.95} />
                </mesh>
            )}
        </group>
    )
}

function TeaTableSet({ position, rotation = 0 }) {
    // Bàn trà nan tre mộc mạc và 2 đẩu con bên sạp thưởng trà
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Bàn tròn nhỏ tre */}
            <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.42, 0.42, 0.04, 16]} />
                <meshStandardMaterial color="#7a542b" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
                <cylinderGeometry args={[0.05, 0.07, 0.44, 8]} />
                <meshStandardMaterial color="#5a3d1d" />
            </mesh>
            {/* Chén trà & đĩa kẹo */}
            <mesh position={[-0.1, 0.48, 0]}>
                <cylinderGeometry args={[0.035, 0.025, 0.04, 8]} />
                <meshStandardMaterial color="#eef7f0" />
            </mesh>
            <mesh position={[0.1, 0.48, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.02, 10]} />
                <meshStandardMaterial color="#d9be8b" />
            </mesh>
            {/* 2 Ghế đẩu con hai bên bàn */}
            {[-0.55, 0.55].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    <mesh position={[0, 0.26, 0]} castShadow>
                        <cylinderGeometry args={[0.18, 0.18, 0.035, 12]} />
                        <meshStandardMaterial color="#6e4620" />
                    </mesh>
                    <mesh position={[0, 0.13, 0]}>
                        <cylinderGeometry args={[0.03, 0.04, 0.26, 6]} />
                        <meshStandardMaterial color="#543516" />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

function VietnameseChairWithBackrest({ position, rotation = 0 }) {
    // Ghế đẩu có tựa truyền thống Việt Nam (ghế gỗ lim/nan tre mộc mạc)
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Mặt ngồi ghế đẩu bằng nan gỗ/mây tre đan */}
            <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.48, 0.045, 0.46]} />
                <meshStandardMaterial color="#59341c" roughness={0.8} />
            </mesh>
            {/* Viền nẹp mặt ghế */}
            <mesh position={[0, 0.44, 0]}>
                <boxGeometry args={[0.5, 0.03, 0.48]} />
                <meshStandardMaterial color="#422513" />
            </mesh>

            {/* 4 Chân ghế đẩu vát góc vững chãi */}
            {[-0.19, 0.19].flatMap((x) => [-0.18, 0.18].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 0.22, z]} castShadow>
                    <cylinderGeometry args={[0.024, 0.028, 0.44, 6]} />
                    <meshStandardMaterial color="#422513" roughness={0.85} />
                </mesh>
            )))}

            {/* Thanh giằng 4 chân ghế bên dưới */}
            {[-0.18, 0.18].map((z) => (
                <mesh key={z} position={[0, 0.14, z]}>
                    <boxGeometry args={[0.38, 0.025, 0.025]} />
                    <meshStandardMaterial color="#422513" />
                </mesh>
            ))}
            {[-0.19, 0.19].map((x) => (
                <mesh key={x} position={[x, 0.14, 0]}>
                    <boxGeometry args={[0.025, 0.025, 0.36]} />
                    <meshStandardMaterial color="#422513" />
                </mesh>
            ))}

            {/* PHẦN LƯNG TỰA TRUYỀN THỐNG VIỆT NAM (2 trụ tiện đứng + thanh ngang uốn cong + nan tựa) */}
            <group position={[0, 0.48, -0.2]}>
                {/* 2 Trụ lưng đứng hai bên */}
                {[-0.19, 0.19].map((x) => (
                    <mesh key={x} position={[x, 0.26, 0]} castShadow>
                        <cylinderGeometry args={[0.022, 0.024, 0.52, 6]} />
                        <meshStandardMaterial color="#422513" />
                    </mesh>
                ))}
                {/* Thanh tì lưng ngang trên đỉnh uốn cong mềm mại */}
                <mesh position={[0, 0.52, 0]} castShadow>
                    <boxGeometry args={[0.48, 0.06, 0.04]} />
                    <meshStandardMaterial color="#59341c" roughness={0.7} />
                </mesh>
                {/* 3 Nan gỗ tựa lưng dọc truyền thống */}
                {[-0.09, 0, 0.09].map((x) => (
                    <mesh key={x} position={[x, 0.25, 0]} castShadow>
                        <boxGeometry args={[0.025, 0.44, 0.015]} />
                        <meshStandardMaterial color="#6b4227" roughness={0.8} />
                    </mesh>
                ))}
            </group>
        </group>
    )
}

function FirstPersonController({ active }) {
    const keys = useRef(new Set())
    const transitionDone = useRef(false)
    const obstacles = [
        { minX: -14.0, maxX: -13.0, minZ: -72, maxZ: 12 },
        { minX: 13.0, maxX: 14.0, minZ: -72, maxZ: 12 },
        { minX: -17, maxX: 17, minZ: -74.5, maxZ: -73.5 },
        { minX: -11, maxX: 11, minZ: 8.35, maxZ: 9.05 },
        { minX: -12.0, maxX: -2.0, minZ: -23.4, maxZ: -22.6 },
        { minX: 2.0, maxX: 12.0, minZ: -23.4, maxZ: -22.6 },
        // Dãy nhà và vườn sau làng quê hai bên đường
        { minX: -13.0, maxX: -3.2, minZ: -22.5, maxZ: 6.8 },
        { minX: 3.2, maxX: 13.0, minZ: -22.5, maxZ: 6.8 },
        ...[-2.6, 2.6].flatMap((x) => [0, -5, -11, -17].map((z) => ({ minX: x - 0.18, maxX: x + 0.18, minZ: z - 0.18, maxZ: z + 0.18 }))),
        ...[-4, 4].flatMap((x) => [-28, -38].map((z) => ({ minX: x - 0.18, maxX: x + 0.18, minZ: z - 0.18, maxZ: z + 0.18 }))),
        // Sạp ẩm thực bên trái (5 sạp)
        ...[-31, -37, -43, -49, -55].map((z) => ({ minX: -8.0, maxX: -4.8, minZ: z - 1.8, maxZ: z + 1.8 })),
        // Sạp ẩm thực bên phải (5 sạp)
        ...[-31, -37, -43, -49, -55].map((z) => ({ minX: 4.8, maxX: 8.0, minZ: z - 1.8, maxZ: z + 1.8 })),
        // Sân khấu múa lân lớn ở cuối lễ hội
        { minX: -11.5, maxX: 11.5, minZ: -74.0, maxZ: -61.6 },
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
        const xLimit = camera.position.z < -23 ? 8.2 : 3.0
        camera.position.x = Math.max(-xLimit, Math.min(xLimit, camera.position.x))
        camera.position.z = Math.max(-61.2, Math.min(8, camera.position.z))
    })

    return <PointerLockControls onLock={() => { transitionDone.current = true }} onUnlock={() => { transitionDone.current = false; keys.current.clear() }} />
}

function VillageWorld({ active }) {
    const cameraStartTime = useRef(null)
    useFrame(({ camera, clock }) => {
        if (!active) { cameraStartTime.current = null; camera.position.set(0, 1.7, 8.2); camera.lookAt(0, 8.5, -5); return }
        if (cameraStartTime.current === null) cameraStartTime.current = clock.elapsedTime
        const progress = Math.min((clock.elapsedTime - cameraStartTime.current) / 5.5, 1)
        const easedProgress = progress * progress * (3 - 2 * progress)
        if (progress < 1) { camera.position.set(0, 1.7, 8.2); camera.lookAt(0, 8.5 - easedProgress * 7.15, -5 - easedProgress * 7) }
    })

    return <>
        <color attach="background" args={['#090c13']} />
        <fog attach="fog" args={['#090c13', 14, 45]} />
        <Environment preset="night" background={false} />
        <Stars radius={90} depth={45} count={900} factor={1.8} saturation={0} fade speed={0.25} />
        {/* Ánh sáng tổng thể ấm áp, êm dịu thay vì lạnh sáng chói */}
        <ambientLight intensity={0.42} color="#664d36" />
        <directionalLight position={[-6, 16, 4]} intensity={1.1} color="#ffcc75" castShadow />

        {/* Mặt đất nền vườn quê đất phù sa & thảm cỏ đêm */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[64, 64]} />
            <meshStandardMaterial color="#2c3a26" roughness={1} />
        </mesh>
        {/* Nền đất nện xóm làng hai bên (đất đỏ bazan pha phù sa nung) */}
        <mesh position={[0, 0.015, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[7.2, 46]} />
            <meshStandardMaterial color="#5e4835" roughness={0.98} />
        </mesh>
        {/* Mặt đường làng đi lại bằng đất nung đầm chặt pha cát phù sa ấm áp */}
        <mesh position={[0, 0.028, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[3.8, 46]} />
            <meshStandardMaterial color="#70523a" roughness={0.94} />
        </mesh>
        {/* Vết mòn lối đi chính giữa đường đất làng quê */}
        <mesh position={[0, 0.032, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[2.0, 46]} />
            <meshStandardMaterial color="#7a5d43" roughness={0.9} />
        </mesh>
        {/* Viền cỏ & đá cuội lác đác bên mép đường làng */}
        {[-1.9, 1.9].map((x) => (
            <mesh key={x} position={[x, 0.035, -3]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 46]} />
                <meshStandardMaterial color="#4d4333" roughness={1} />
            </mesh>
        ))}
        <ContactShadows position={[0, 0.05, -4]} opacity={0.12} scale={22} blur={1.5} far={5} />

        {/* Dãy nhà làng quê bề thế bên trái, lùi về x = -6.2, giãn cách 10m mỗi nhà có khoảng vườn rộng */}
        <House position={[-6.2, 0, 2.0]} rotation={Math.PI / 2} scale={1.0} variant="tiled" color="#caa462" roofColor="#8f3a27" hasBanana={true} hasBench={true} hasJar={true} hasLantern={true} hasHaystack={true} seed={1} />
        <House position={[-6.2, 0, -8.0]} rotation={Math.PI / 2} scale={1.0} variant="thatched" color="#8f6a3b" roofColor="#8a673b" hasHaystack={true} hasBench={true} hasJar={true} hasLantern={true} hasBanana={true} seed={2} />
        <House position={[-6.2, 0, -18.0]} rotation={Math.PI / 2} scale={1.0} variant="tiled" color="#c49e5c" roofColor="#853523" hasBanana={true} hasBench={true} hasJar={true} hasLantern={true} hasHaystack={true} seed={3} />

        {/* Dãy nhà làng quê bề thế bên phải, lùi về x = 6.2, giãn cách 10m mỗi nhà có khoảng vườn rộng */}
        <House position={[6.2, 0, 2.0]} rotation={-Math.PI / 2} scale={1.0} variant="tiled" color="#c7a05e" roofColor="#883624" hasHaystack={true} hasBench={true} hasJar={true} hasLantern={true} hasBanana={true} seed={4} />
        <House position={[6.2, 0, -8.0]} rotation={-Math.PI / 2} scale={1.0} variant="tiled" color="#d1aa6b" roofColor="#933e2a" hasBanana={true} hasBench={true} hasJar={true} hasLantern={true} hasHaystack={true} seed={5} />
        <House position={[6.2, 0, -18.0]} rotation={-Math.PI / 2} scale={1.0} variant="thatched" color="#8f6a3b" roofColor="#8a673b" hasHaystack={true} hasJar={true} hasLantern={true} hasBench={true} seed={6} />

        {/* Cổng làng quê truyền thống */}
        <VillageGate position={[0, 0, -23]} />

        {/* Cây cối xóm làng tạo cảnh quan xanh mát tự nhiên ở các khoảng vườn */}
        <Tree position={[-9.6, 0, 5]} scale={1.9} /><Tree position={[9.6, 0, 5]} scale={2.0} />
        <Tree position={[-9.6, 0, -3]} scale={1.8} /><Tree position={[9.6, 0, -3]} scale={1.9} />
        <Tree position={[-9.6, 0, -13]} scale={1.8} /><Tree position={[9.6, 0, -13]} scale={1.8} />
        <Tree position={[-9.6, 0, -21]} scale={2.1} /><Tree position={[9.6, 0, -21]} scale={2.0} />

        {/* Cột đèn lồng lề đường đặt gọn ở rìa mép cỏ x = ±2.6 */}
        <Lantern position={[-2.6, 0, 0]} /><Lantern position={[2.6, 0, -5]} /><Lantern position={[-2.6, 0, -11]} /><Lantern position={[2.6, 0, -17]} />

        <Grass position={[-2.9, 0, 3]} scale={1.1} /><Grass position={[2.9, 0, 1]} scale={0.8} /><Grass position={[-2.9, 0, -4]} scale={0.9} /><Grass position={[2.9, 0, -9]} scale={1.2} />
        <Shrub position={[-9.2, 0, 1]} scale={1.5} /><Shrub position={[9.2, 0, 0]} scale={1.35} /><Shrub position={[-9.2, 0, -19]} scale={1.5} /><Shrub position={[9.2, 0, -20]} scale={1.35} />

        {/* CÁC CÔNG TRÌNH KHU VỰC QUẢNG TRƯỜNG LỄ HỘI PHÍA SAU CỔNG LÀNG */}
        <VillageBoundary position={[0, 0, -74]} />
        <SideVillageWall side={-1} />
        <SideVillageWall side={1} />
        <RearCharacterWall />
        <GroundBeyondGate />
        <GateLights />

        {/* Cổng chào lễ hội trung thu ngay sau cổng làng */}
        <FestivalBannerArch position={[0, 0, -26.5]} />

        {/* TRANG TRÍ PHÍA SAU CỔNG LÀNG: Các chậu cúc mâm xôi vàng rực rỡ nghênh đón */}
        <ChrysanthemumPot position={[-2.4, 0, -24.8]} scale={1.1} />
        <ChrysanthemumPot position={[2.4, 0, -24.8]} scale={1.1} />
        <ChrysanthemumPot position={[-4.6, 0, -26.5]} scale={1.25} />
        <ChrysanthemumPot position={[4.6, 0, -26.5]} scale={1.25} />
        <ChrysanthemumPot position={[-2.2, 0, -28.2]} scale={0.95} />
        <ChrysanthemumPot position={[2.2, 0, -28.2]} scale={0.95} />

        {/* Dãy cờ ngũ sắc cắm dọc 2 bên lề đường hội chợ */}
        {[-28, -34, -40, -46, -52, -58].map((z) => (
            <group key={z}>
                <FestivalFlag position={[-8.4, 0, z]} color={z % 2 === 0 ? '#d12c1b' : '#2b884d'} rotation={0.2} />
                <FestivalFlag position={[8.4, 0, z]} color={z % 2 === 0 ? '#d49b32' : '#d12c1b'} rotation={-0.2} />
            </group>
        ))}

        {/* ======================================================== */}
        {/* 5 SẠP HÀNG LỄ HỘI TRUNG THU PHÍA BÊN TRÁI ĐƯỜNG (x = -6.2) */}
        {/* ======================================================== */}
        {/* Sạp 1 (z = -31): Sạp Bánh Trung Thu gia truyền */}
        <MidAutumnFoodStall position={[-6.2, 0, -31]} rotation={Math.PI / 2} type="mooncake" />
        <ChrysanthemumPot position={[-4.5, 0, -29.6]} scale={0.9} />
        <FestivalCustomer position={[-3.8, 0, -31.2]} rotation={-Math.PI / 2} variant="woman" clothColor="#c0392b" pantsColor="#1a1a1a" hasLantern={false} />

        {/* Sạp 2 (z = -37): Sạp Lồng Đèn Trung Thu (Đèn ông sao, cá chép hóa rồng, đèn cù) */}
        <MidAutumnFoodStall position={[-6.2, 0, -37]} rotation={Math.PI / 2} type="lanterns" />
        <ChrysanthemumPot position={[-4.5, 0, -35.6]} scale={0.85} />
        <FestivalCustomer position={[-3.6, 0, -36.6]} rotation={-Math.PI / 2} variant="child" clothColor="#e67e22" pantsColor="#2c3e50" hasLantern={true} isChild={true} />
        <FestivalCustomer position={[-3.7, 0, -37.8]} rotation={-Math.PI / 2 + 0.3} variant="woman" clothColor="#16a085" pantsColor="#1a1a1a" hasLantern={false} />

        {/* Sạp 3 (z = -43): Sạp Thư Pháp Ông Đồ & Câu Đố Trung Thu */}
        <MidAutumnFoodStall position={[-6.2, 0, -43]} rotation={Math.PI / 2} type="calligraphy" />
        <ChrysanthemumPot position={[-4.5, 0, -41.6]} scale={0.9} />
        <FestivalCustomer position={[-3.7, 0, -43.2]} rotation={-Math.PI / 2} variant="adult" clothColor="#2980b9" pantsColor="#2c3e50" hasLantern={false} />

        {/* Sạp 4 (z = -49): Sạp Ẩm Thực Dân Gian (Chè trôi nước nóng, bánh rán vừng) */}
        <MidAutumnFoodStall position={[-6.2, 0, -49]} rotation={Math.PI / 2} type="streetfood" />
        <ChrysanthemumPot position={[-4.5, 0, -47.6]} scale={0.88} />
        <FestivalCustomer position={[-3.6, 0, -49.2]} rotation={-Math.PI / 2} variant="adult" clothColor="#8e44ad" pantsColor="#1f1b18" hasLantern={false} />

        {/* Sạp 5 (z = -55): Sạp Kẹo Bông Gòn Bồng Bềnh */}
        <MidAutumnFoodStall position={[-6.2, 0, -55]} rotation={Math.PI / 2} type="cotton_candy" />
        <ChrysanthemumPot position={[-4.5, 0, -53.6]} scale={0.85} />
        <FestivalCustomer position={[-3.6, 0, -54.7]} rotation={-Math.PI / 2} variant="child" clothColor="#f39c12" pantsColor="#2c3e50" hasLantern={true} isChild={true} />

        {/* ======================================================== */}
        {/* 5 SẠP HÀNG LỄ HỘI TRUNG THU PHÍA BÊN PHẢI ĐƯỜNG (x = 6.2) */}
        {/* ======================================================== */}
        {/* Sạp 1 (z = -31): Sạp Tò He Bột Màu & Trống Bỏi */}
        <MidAutumnFoodStall position={[6.2, 0, -31]} rotation={-Math.PI / 2} type="tohe" />
        <ChrysanthemumPot position={[4.5, 0, -29.6]} scale={0.9} />
        <FestivalCustomer position={[3.6, 0, -30.8]} rotation={Math.PI / 2} variant="child" clothColor="#27ae60" pantsColor="#1f1b18" hasLantern={true} isChild={true} />
        <FestivalCustomer position={[3.7, 0, -31.8]} rotation={Math.PI / 2 - 0.2} variant="adult" clothColor="#d35400" pantsColor="#2c3e50" hasLantern={false} />

        {/* Sạp 2 (z = -37): Sạp Trang Phục & Phụ Kiện Lễ Hội (Áo gấm, Chú Cuội, Chị Hằng, Mặt nạ thỏ) */}
        <MidAutumnFoodStall position={[6.2, 0, -37]} rotation={-Math.PI / 2} type="costumes" />
        <ChrysanthemumPot position={[4.5, 0, -35.6]} scale={0.88} />
        <FestivalCustomer position={[3.7, 0, -37.2]} rotation={Math.PI / 2} variant="woman" clothColor="#e84393" pantsColor="#1a1a1a" hasLantern={false} />

        {/* Sạp 3 (z = -43): Sạp Thưởng Trà Hoa Cúc & Bánh Đậu Xanh */}
        <MidAutumnFoodStall position={[6.2, 0, -43]} rotation={-Math.PI / 2} type="tea" />
        <TeaTableSet position={[4.2, 0, -41.4]} rotation={0.3} />
        <ChrysanthemumPot position={[4.5, 0, -44.6]} scale={0.92} />
        <FestivalCustomer position={[3.8, 0, -43.2]} rotation={Math.PI / 2} variant="adult" clothColor="#636e72" pantsColor="#2d3436" hasLantern={false} />

        {/* Sạp 4 (z = -49): Sạp Mâm Ngũ Quả & Chó Bưởi Lông Xù */}
        <MidAutumnFoodStall position={[6.2, 0, -49]} rotation={-Math.PI / 2} type="fruits" />
        <ChrysanthemumPot position={[4.5, 0, -47.6]} scale={0.95} />
        <FestivalCustomer position={[3.7, 0, -48.8]} rotation={Math.PI / 2} variant="woman" clothColor="#0984e3" pantsColor="#1a1a1a" hasLantern={false} />

        {/* Sạp 5 (z = -55): Sạp Đồ Chơi Dân Gian (Chong chóng tre, trống lắc tay) */}
        <MidAutumnFoodStall position={[6.2, 0, -55]} rotation={-Math.PI / 2} type="toys" />
        <ChrysanthemumPot position={[4.5, 0, -53.6]} scale={0.88} />
        <FestivalCustomer position={[3.6, 0, -54.8]} rotation={Math.PI / 2} variant="child" clothColor="#e17055" pantsColor="#2d3436" hasLantern={true} isChild={true} />

        {/* 5 Dây đèn lồng chăng ngang lối đi hội chợ */}
        <FestivalLanternString z={-28} swayPhase={0} />
        <FestivalLanternString z={-34} swayPhase={1} />
        <FestivalLanternString z={-40} swayPhase={2} />
        <FestivalLanternString z={-46} swayPhase={3} />
        <FestivalLanternString z={-52} swayPhase={4} />
        <FestivalLanternString z={-58} swayPhase={0.5} />

        {/* KHU VỰC KHÁN GIẢ XEM MÚA LÂN: HÀNG GHẾ ĐẨU CÓ TỰA TRUYỀN THỐNG VIỆT NAM TRÊN CHIẾU HOA */}
        {/* Chiếu hoa đan tre trải trước sân khấu */}
        <mesh position={[0, 0.04, -59.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[11.5, 4.2]} />
            <meshStandardMaterial color="#822818" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.045, -59.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[11.0, 3.8]} />
            <meshStandardMaterial color="#b3492e" roughness={0.92} />
        </mesh>

        {/* Hàng ghế đẩu có tựa thứ 1 (gần sân khấu) - xoay mặt vào sân khấu (rotation={Math.PI}) */}
        {[-4.6, -3.4, -2.2, -1.0, 1.0, 2.2, 3.4, 4.6].map((x) => (
            <VietnameseChairWithBackrest key={`chair-1-${x}`} position={[x, 0.05, -60.8]} rotation={Math.PI} />
        ))}
        {/* Hàng ghế đẩu có tựa thứ 2 (hàng sau) - xoay mặt vào sân khấu (rotation={Math.PI}) */}
        {[-4.6, -3.4, -2.2, -1.0, 1.0, 2.2, 3.4, 4.6].map((x) => (
            <VietnameseChairWithBackrest key={`chair-2-${x}`} position={[x, 0.05, -58.4]} rotation={Math.PI} />
        ))}

        {/* Chậu hoa cúc trang trí hai bên khán đài sân khấu */}
        <ChrysanthemumPot position={[-6.2, 0, -59.5]} scale={1.2} />
        <ChrysanthemumPot position={[6.2, 0, -59.5]} scale={1.2} />
        <ChrysanthemumPot position={[-6.2, 0, -61.2]} scale={1.05} />
        <ChrysanthemumPot position={[6.2, 0, -61.2]} scale={1.05} />

        {/* SÂN KHẤU MÚA LÂN LỚN HOÀNH TRÁNG Ở CUỐI KHU VỰC LỄ HỘI */}
        <GrandLionDanceStage position={[0, 0, -66]} />

        {/* 5 Dây lồng đèn Trung Thu trong làng xóm */}
        <LanternString z={2.0} swayPhase={0} />
        <LanternString z={-3.0} swayPhase={1} />
        <LanternString z={-8.0} swayPhase={2} />
        <LanternString z={-13.0} swayPhase={3} />
        <LanternString z={-18.0} swayPhase={4} />

        {/* Vầng Trăng Rằm Trung Thu đưa lên cao trên bầu trời như vì sao sáng */}
        <MidAutumnMoon />

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
            <main className="village"><Canvas shadows camera={{ position: [0, 1.7, 8.2], fov: 62 }}><VillageWorld active={cameraActive} /></Canvas><div className="village-title">Làng Công Nghệ</div></main>
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
