import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// Procedural gapless layout based on accumulated widths
const getToothConfig = (num) => {
    let tWidth = 0.5;
    let tDepth = 0.5;
    let tHeight = 1.2; // Taller teeth
    let tRadius = 0.15;

    if ([1, 2, 3, 14, 15, 16, 17, 18, 19, 30, 31, 32].includes(num)) {
        tWidth = 0.8; tDepth = 0.75; tHeight = 1.0; tRadius = 0.15; // Molars
    } else if ([4, 5, 12, 13, 20, 21, 28, 29].includes(num)) {
        tWidth = 0.55; tDepth = 0.6; tHeight = 1.2; tRadius = 0.2; // Premolars
    } else if ([6, 11, 22, 27].includes(num)) {
        tWidth = 0.5; tDepth = 0.55; tHeight = 1.35; tRadius = 0.2; // Canines
    } else {
        tWidth = 0.45; tDepth = 0.4; tHeight = 1.25; tRadius = 0.1; // Incisors
    }

    // We add a tiny micro-gap to the rendered width to prevent pure Z-fighting but they will look perfectly gapless.
    return { tWidth: tWidth - 0.015, tHeight, tDepth, tRadius, actualWidth: tWidth };
};

const archRadiusX = 2.4;
const archRadiusZ = 2.8;

const computeArchPositions = (archArray, isUpper) => {
    let totalWidth = 0;
    const configs = archArray.map(num => {
        const config = getToothConfig(num);
        totalWidth += config.actualWidth;
        return { num, config };
    });

    let currentArc = 0;
    return configs.map(({ num, config }) => {
        // Find center point along arc for this tooth
        const t = (currentArc + config.actualWidth / 2) / totalWidth;
        const angle = Math.PI * (1 - t);

        currentArc += config.actualWidth;

        const x = Math.cos(angle) * archRadiusX;
        const z = Math.sin(angle) * archRadiusZ - (archRadiusZ * 0.5);
        const y = isUpper ? 0.6 : -0.6; // Bringing them together

        return { num, config, x, y, z, angle };
    });
};

const Tooth3D = ({ num, isUpper, pos, data, onSelect, isSelected, onStatusChange, getToothColor }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    const { x, y, z, angle, config } = pos;
    const { tWidth, tHeight, tDepth, tRadius } = config;

    // Rotation so it faces the arch curve normal
    const rotationY = -angle + Math.PI / 2;

    const isMissing = data?.status === 'Missing';
    const toothColor = getToothColor ? getToothColor(data?.status || 'Healthy') : '#ffffff';

    // Base Enamel Material for valid teeth
    const enamelMaterialProps = {
        transmission: 0.1,
        opacity: 1,
        metalness: 0.05,
        roughness: 0.25,
        ior: 1.5,
        thickness: 1.0,
        color: data?.status === 'Healthy' ? '#fffff8' : toothColor,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: true,
        emissive: toothColor,
        emissiveIntensity: data?.status !== 'Healthy' && data?.status !== 'Missing' ? 0.2 : 0 // slight glow for conditions
    };

    return (
        <group position={[x, y, z]} rotation={[0, rotationY, 0]}>
            {/* Main Tooth Geometry OR Ghost Box for Missing */}
            <RoundedBox
                ref={meshRef}
                args={[tWidth, tHeight, tDepth]}
                radius={tRadius}
                smoothness={4}
                onClick={(e) => { e.stopPropagation(); onSelect(num); }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
            >
                {isMissing ? (
                    <meshStandardMaterial
                        color="#94A3B8"
                        transparent
                        opacity={0.15}
                        wireframe={true}
                        emissive={hovered || isSelected ? '#a7f3d0' : '#000000'}
                        emissiveIntensity={isSelected ? 0.4 : (hovered ? 0.2 : 0)}
                    />
                ) : (
                    <meshPhysicalMaterial
                        {...enamelMaterialProps}
                        emissive={hovered || isSelected ? '#a7f3d0' : enamelMaterialProps.emissive}
                        emissiveIntensity={hovered || isSelected ? 0.4 : enamelMaterialProps.emissiveIntensity}
                    />
                )}
            </RoundedBox>

            {/* Number Label & Interactive Popup Overlay */}
            {(hovered || isSelected) && (
                <Html position={[0, isUpper ? tHeight / 2 + 0.5 : -tHeight / 2 - 0.5, 0]} center zIndexRange={[100, 0]}>
                    {!isSelected ? (
                        <div style={{ background: '#111827', color: 'white', padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700, pointerEvents: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            #{num}
                        </div>
                    ) : (
                        <div style={{ background: '#ffffff', borderRadius: 12, padding: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 100, width: 160, border: '1px solid #E5E7EB', pointerEvents: 'auto' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#1f2937', textAlign: 'center' }}>Tooth #{num}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {["Healthy", "Existing", "Proposed", "Watch", "Missing"].map(status => (
                                    <button
                                        key={status}
                                        onClick={(e) => { e.stopPropagation(); onStatusChange(num, status); }}
                                        style={{
                                            background: data?.status === status ? `${getToothColor(status)}15` : 'transparent',
                                            border: 'none',
                                            padding: '6px 8px',
                                            borderRadius: 6,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: data?.status === status ? getToothColor(status) : '#1f2937',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => { if (data?.status !== status) e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                                        onMouseOut={e => { if (data?.status !== status) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <div style={{ width: 8, height: 8, borderRadius: 4, background: getToothColor(status) }} />
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </Html>
            )}
        </group>
    );
};

// Removed PulsatingSphere as condition states are now represented via full mesh tinting

const DentalArchGums = ({ isUpper }) => {
    const curve = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 30; i++) {
            const t = i / 30;
            const angle = Math.PI * (1 - t);
            const x = Math.cos(angle) * archRadiusX;
            const z = Math.sin(angle) * archRadiusZ - (archRadiusZ * 0.5);
            const y = isUpper ? 1.0 : -1.0;
            points.push(new THREE.Vector3(x, y, z));
        }
        return new THREE.CatmullRomCurve3(points);
    }, [isUpper]);

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.45, 16, false]} />
            <meshStandardMaterial color="#fca5a5" roughness={0.2} metalness={0.05} />
        </mesh>
    );
};

export function Dental3DModel({ teethData, selectedTooth, onSelectTooth, onStatusChange, getToothColor }) {
    const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
    const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

    const upperPositions = useMemo(() => computeArchPositions(upperArch, true), []);
    const lowerPositions = useMemo(() => computeArchPositions(lowerArch, false), []);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '500px', background: 'linear-gradient(to bottom, #f0fdf4 0%, #e0f2fe 100%)', borderRadius: 24, overflow: 'hidden', position: 'relative', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(0,182,122,0.05)' }}>
            <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor={"#ffffff"} groundColor={"#a7f3d0"} intensity={0.8} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                <pointLight position={[0, 0, 5]} intensity={1.0} decay={2} distance={10} />

                <group position={[0, 0, 0]} rotation={[0.1, 0, 0]}>
                    {upperPositions.map((pos) => (
                        <Tooth3D
                            key={`upper-${pos.num}`}
                            num={pos.num}
                            isUpper={true}
                            pos={pos}
                            data={teethData[pos.num]}
                            isSelected={selectedTooth === pos.num}
                            onSelect={onSelectTooth}
                            onStatusChange={onStatusChange}
                            getToothColor={getToothColor}
                        />
                    ))}
                    {lowerPositions.map((pos) => (
                        <Tooth3D
                            key={`lower-${pos.num}`}
                            num={pos.num}
                            isUpper={false}
                            pos={pos}
                            data={teethData[pos.num]}
                            isSelected={selectedTooth === pos.num}
                            onSelect={onSelectTooth}
                            onStatusChange={onStatusChange}
                            getToothColor={getToothColor}
                        />
                    ))}

                    <DentalArchGums isUpper={true} />
                    <DentalArchGums isUpper={false} />
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
