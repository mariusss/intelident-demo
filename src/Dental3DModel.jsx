import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// Tooth configuration logic mirroring the 2D version
const getToothConfig = (num, isUpper) => {
    let tWidth = 0.8;
    let tDepth = 0.8;
    let tHeight = 1.0;
    let tRadius = 0.2;

    if ([1, 2, 3, 14, 15, 16, 17, 18, 19, 30, 31, 32].includes(num)) {
        tWidth = 1.0; tDepth = 0.9; tHeight = 0.7; tRadius = 0.15; // Molars
    } else if ([4, 5, 12, 13, 20, 21, 28, 29].includes(num)) {
        tWidth = 0.7; tDepth = 0.7; tHeight = 0.8; tRadius = 0.2; // Premolars
    } else if ([6, 11, 22, 27].includes(num)) {
        tWidth = 0.6; tDepth = 0.6; tHeight = 1.0; tRadius = 0.25; // Canines
    } else {
        tWidth = 0.6; tDepth = 0.4; tHeight = 0.9; tRadius = 0.1; // Incisors
    }

    return { tWidth, tHeight, tDepth, tRadius };
};

const Tooth3D = ({ num, index, isUpper, data, onSelect, isSelected }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Arch positioning Math - creating a semi-ellipse / parabola
    const archRadiusX = 3.2;
    const archRadiusZ = 3.5;

    // Map index 0-15 to an angle representing the U-shape
    // index 0 is left posterior, index 15 is right posterior
    const t = index / 15;
    const angle = Math.PI * (1 - t);

    const x = Math.cos(angle) * archRadiusX;
    // Front teeth (angle ~ PI/2) should be forward. Posterior teeth further back.
    const z = Math.sin(angle) * archRadiusZ - (archRadiusZ * 0.5);
    // Upper arch sits above lower arch
    const y = isUpper ? 0.6 : -0.6;

    const { tWidth, tHeight, tDepth, tRadius } = useMemo(() => getToothConfig(num, isUpper), [num, isUpper]);

    // Rotation so it faces the arch curve normal
    const rotationY = -angle + Math.PI / 2;

    // Enamel Material
    const enamelMaterialProps = {
        transmission: 0.5,
        opacity: 1,
        metalness: 0,
        roughness: 0.15,
        ior: 1.5,
        thickness: 0.5,
        color: '#fffff8',
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    };

    const isMissing = data?.status === 'Missing';

    if (isMissing) return null;

    let isExisting = false;
    let isProposed = false;
    let isWatch = false;

    if (data?.status === 'Existing') {
        isExisting = true;
    } else if (data?.status === 'Proposed') {
        isProposed = true;
    } else if (data?.status === 'Watch') {
        isWatch = true;
    }

    return (
        <group position={[x, y, z]} rotation={[0, rotationY, 0]}>
            {/* Main Tooth Geometry */}
            <RoundedBox
                ref={meshRef}
                args={[tWidth, tHeight, tDepth]}
                radius={tRadius}
                smoothness={4}
                onClick={(e) => { e.stopPropagation(); onSelect(num); }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshPhysicalMaterial
                    {...enamelMaterialProps}
                    emissive={hovered || isSelected ? '#a7f3d0' : '#000000'}
                    emissiveIntensity={isSelected ? 0.4 : (hovered ? 0.15 : 0)}
                />
            </RoundedBox>

            {/* Condition Overlays */}
            {isExisting && (
                <mesh position={[0, isUpper ? -tHeight / 2 + 0.15 : tHeight / 2 - 0.15, 0]}>
                    <boxGeometry args={[tWidth * 0.5, 0.3, tDepth * 0.5]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.3} />
                </mesh>
            )}

            {isProposed && (
                <RoundedBox args={[tWidth * 1.1, tHeight * 1.1, tDepth * 1.1]} radius={tRadius} smoothness={4}>
                    <meshStandardMaterial color="#ef4444" transparent opacity={0.35} depthWrite={false} />
                </RoundedBox>
            )}

            {isWatch && (
                <PulsatingSphere isUpper={isUpper} tHeight={tHeight} tDepth={tDepth} />
            )}

            {/* Number Label */}
            {(hovered || isSelected) && (
                <Html position={[0, isUpper ? tHeight / 2 + 0.4 : -tHeight / 2 - 0.4, 0]} center>
                    <div style={{ background: '#111827', color: 'white', padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700, pointerEvents: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        #{num}
                    </div>
                </Html>
            )}
        </group>
    );
};

const PulsatingSphere = ({ isUpper, tHeight, tDepth }) => {
    const meshRef = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.scale.setScalar(1 + Math.sin(time * 5) * 0.2);
    });
    return (
        <Sphere ref={meshRef} args={[0.12, 16, 16]} position={[0, isUpper ? -tHeight / 2 : tHeight / 2, tDepth / 2 + 0.1]}>
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
        </Sphere>
    );
}

export function Dental3DModel({ teethData, selectedTooth, onSelectTooth }) {
    const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
    const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '500px', background: 'linear-gradient(to bottom, #f0fdf4 0%, #e0f2fe 100%)', borderRadius: 24, overflow: 'hidden', position: 'relative', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(0,182,122,0.05)' }}>
            <Canvas camera={{ position: [0, 3, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor={"#ffffff"} groundColor={"#a7f3d0"} intensity={0.8} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                <pointLight position={[0, 0, 5]} intensity={1.0} decay={2} distance={10} />

                <group position={[0, 0, 0]} rotation={[0.1, 0, 0]}>
                    {upperArch.map((num, i) => (
                        <Tooth3D
                            key={`upper-${num}`}
                            num={num}
                            index={i}
                            isUpper={true}
                            data={teethData[num]}
                            isSelected={selectedTooth === num}
                            onSelect={onSelectTooth}
                        />
                    ))}
                    {lowerArch.map((num, i) => (
                        <Tooth3D
                            key={`lower-${num}`}
                            num={num}
                            index={i}
                            isUpper={false}
                            data={teethData[num]}
                            isSelected={selectedTooth === num}
                            onSelect={onSelectTooth}
                        />
                    ))}

                    {/* Simulated Gingiva Extrusions */}
                    <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[3.2, 0.5, 32, 64, Math.PI]} />
                        <meshStandardMaterial color="#fca5a5" roughness={0.3} metalness={0.05} />
                    </mesh>
                    <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[3.2, 0.5, 32, 64, Math.PI]} />
                        <meshStandardMaterial color="#fca5a5" roughness={0.3} metalness={0.05} />
                    </mesh>
                </group>

                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={3}
                    maxDistance={15}
                    target={[0, 0, 1]}
                />
            </Canvas>

            {/* Control hints overlay */}
            <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,0.7)', padding: '8px 12px', borderRadius: 8, fontSize: 12, color: '#6B7280', display: 'flex', gap: 12, pointerEvents: 'none', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <span><strong style={{ color: '#111827' }}>Left Click</strong> Rotate/Select</span>
                <span><strong style={{ color: '#111827' }}>Right Click</strong> Pan</span>
                <span><strong style={{ color: '#111827' }}>Scroll</strong> Zoom</span>
            </div>

            {/* View Title */}
            <div style={{ position: 'absolute', top: 16, left: 16, background: '#111827', color: 'white', padding: '6px 12px', borderRadius: 9999, fontSize: 13, fontWeight: 700, pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: '#10B981' }}></span> Live 3D View
            </div>
        </div>
    );
}
