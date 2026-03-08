import React, { useState } from 'react';
import { useChartStore } from '../../store/chartStore';
import cdtCodes from '../../data/cdtCodes.json';

const GEO_GREEN = "#00B67A";
const GEO_DARK = "#1C1E23";
const GEO_BLUE = "#2563EB";
const GEO_WHITE = "#FFFFFF";
const GEO_BG = "#F1F5F9";
const GEO_TEXT_MAIN = "#1E293B";
const GEO_TEXT_MUTED = "#64748b";

export function ToothChart2D({ teethState }) {
    const { selectedTeeth, toggleToothSelection, postProcedure, setStatus, clearSelection } = useChartStore();
    const [selectedSurfaces, setSelectedSurfaces] = useState({});
    const [paletteTab, setPaletteTab] = useState("Procedures");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCodes, setFilteredCodes] = useState([]);

    // We use the most recently selected tooth for the popup in 2D
    const activeToothNum = selectedTeeth.length > 0 ? selectedTeeth[selectedTeeth.length - 1] : null;

    // Arch definition
    const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
    const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

    const SVG_PATHS = {
        O: "M 30 30 L 70 30 L 70 70 L 30 70 Z",
        B: "M 0 0 L 100 0 L 70 30 L 30 30 Z",
        L: "M 30 70 L 70 70 L 100 100 L 0 100 Z",
        M: "M 0 0 L 30 30 L 30 70 L 0 100 Z",
        D: "M 100 0 L 70 30 L 70 70 L 100 100 Z"
    };

    const getToothColor = (status) => {
        switch (status) {
            case "Healthy": return GEO_GREEN;
            case "Existing": return "#3B82F6";
            case "Proposed": return "#EF4444";
            case "Missing": return "#94A3B8";
            case "Watch": return "#F59E0B";
            default: return GEO_BG;
        }
    };

    const handleToothClick = (num) => {
        toggleToothSelection(num);
        setPaletteTab("Procedures");
        setSearchTerm("");
        setFilteredCodes([]);
        const newSurfaces = { ...selectedSurfaces };
        Object.keys(newSurfaces).forEach(k => {
            if (!k.startsWith(`${num}-`)) delete newSurfaces[k];
        });
        setSelectedSurfaces(newSurfaces);
    };

    const handleStatusChange = (num, status) => {
        setStatus(status);
        // Post a placeholder note to represent condition change
        if (status === "Missing") {
            postProcedure("D7140", { surfaces: [] });
        } else {
            postProcedure("D0000", { surfaces: [] });
        }
        clearSelection();
        setSelectedSurfaces({});
    };

    const handleProcedureClick = (procName) => {
        if (!activeToothNum) return;
        const activeSurfaces = Object.keys(selectedSurfaces)
            .filter(k => k.startsWith(`${activeToothNum}-`) && selectedSurfaces[k])
            .map(k => k.split('-')[1]);

        const fullToothProcedures = ["Crown", "Root Canal", "Extraction", "Implant"];
        if (fullToothProcedures.includes(procName)) activeSurfaces.length = 0;

        const CDTS = {
            "Composite": "D239" + (activeSurfaces.length > 0 ? activeSurfaces.length : 1),
            "Amalgam": "D216" + (activeSurfaces.length > 0 ? activeSurfaces.length : 1),
            "Crown": "D2740",
            "Root Canal": "D3330",
            "Implant": "D6010",
            "Extraction": "D7140",
            "Sealant": "D1351"
        };
        const cdtCode = CDTS[procName];
        if (cdtCode) {
            postProcedure(cdtCode, { surfaces: activeSurfaces });
        }
        clearSelection();
        setSelectedSurfaces({});
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val);

        let lowerVal = val.toLowerCase().trim();
        if (!lowerVal) { setFilteredCodes([]); return; }

        // Exact digit matching logic (like '56' -> D56)
        const isDigitsOnly = /^\d+$/.test(lowerVal);

        // ALIASING: If the user searches for "repla" (replacement), they usually mean "repair" in CDT terms
        if (lowerVal.startsWith('repla')) {
            lowerVal = 'repair';
        }

        const wordRegex = new RegExp(`\\b${lowerVal}`, 'i');

        const results = cdtCodes.filter(c => {
            const matchesCodeNumber = isDigitsOnly && c.code.includes(lowerVal);
            const matchesCodePrefix = !isDigitsOnly && c.code.toLowerCase().includes(lowerVal);
            const matchesDescBound = wordRegex.test(c.desc);
            // Also include a fallback general `.includes()` for more fuzzy flexibility
            const matchesFlexible = c.desc.toLowerCase().includes(lowerVal);

            return (matchesCodeNumber || matchesCodePrefix || matchesDescBound || matchesFlexible) && !(c.code.startsWith('D0') && lowerVal.length < 2);
        }).slice(0, 50);

        setFilteredCodes(results);
    };

    const handleSearchCodeClick = (codeString) => {
        if (!activeToothNum) return;
        const activeSurfaces = Object.keys(selectedSurfaces)
            .filter(k => k.startsWith(`${activeToothNum}-`) && selectedSurfaces[k])
            .map(k => k.split('-')[1]);
        postProcedure(codeString, { surfaces: activeSurfaces });
        setSearchTerm("");
        setFilteredCodes([]);
        clearSelection();
        setSelectedSurfaces({});
    };

    const ToothNode = ({ num, index, isUpper }) => {
        const data = teethState[num] || { status: 'Healthy', surfaces: [] };
        const isSelected = activeToothNum === num;

        const distanceFromCenter = Math.abs(index - 7.5);
        const verticalOffset = Math.pow(distanceFromCenter, 2) * 1.5;
        const translateY = isUpper ? verticalOffset : -verticalOffset;

        return (
            <div style={{ position: "relative", display: "flex", flexDirection: isUpper ? "column-reverse" : "column", alignItems: "center", gap: 6, transform: `translateY(${translateY}px)`, zIndex: isSelected ? 50 : 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? GEO_BLUE : GEO_TEXT_MAIN, transition: "color 0.2s" }}>
                    {num}
                </div>

                <div
                    onClick={() => handleToothClick(num)}
                    style={{
                        width: 38, height: 38, cursor: "pointer", transition: "all 0.2s", position: "relative",
                        transform: isSelected ? "scale(1.15)" : "scale(1)",
                        filter: isSelected ? "drop-shadow(0 4px 12px rgba(37,99,235,0.3))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
                    }}
                >
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        {data.status === "Missing" ? (
                            <g opacity="0.4">
                                <path d="M 10 10 L 90 90 M 90 10 L 10 90" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                            </g>
                        ) : (
                            <g stroke={isSelected ? GEO_BLUE : "#E5E7EB"} strokeWidth="3" strokeLinejoin="round">
                                {['B', 'L', 'M', 'D', 'O'].map((surface) => {
                                    const key = `${num}-${surface}`;
                                    const isSurfaceSelected = !!selectedSurfaces[key];
                                    return (
                                        <path
                                            key={surface}
                                            d={SVG_PATHS[surface]}
                                            fill={(data.status !== "Healthy" && data.status !== "Missing" && (!data.surfaces || data.surfaces.length === 0 || data.surfaces.includes(surface))) ? getToothColor(data.status) : (isSurfaceSelected ? '#DBEAFE' : '#FFFFFF')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToothClick(num);
                                                setSelectedSurfaces(prev => ({ ...prev, [key]: !prev[key] }));
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSurfaceSelected && (!data.surfaces || data.surfaces.length === 0 || !data.surfaces.includes(surface) || data.status === "Healthy" || data.status === "Missing")) {
                                                    e.currentTarget.style.fill = '#EFF6FF';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSurfaceSelected && (!data.surfaces || data.surfaces.length === 0 || !data.surfaces.includes(surface) || data.status === "Healthy" || data.status === "Missing")) {
                                                    e.currentTarget.style.fill = '#FFFFFF';
                                                }
                                            }}
                                            style={{ transition: 'fill 0.1s', cursor: 'pointer' }}
                                        />
                                    );
                                })}
                            </g>
                        )}
                    </svg>
                </div>

                {isSelected && (
                    <div style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)", background: GEO_WHITE, borderRadius: 16, padding: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)", zIndex: 100, width: 320 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: GEO_TEXT_MAIN, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Tooth #{num}</span>
                            <div
                                onClick={() => setSelectedSurfaces({})}
                                style={{ fontSize: 13, fontWeight: 600, color: GEO_BLUE, cursor: "pointer", padding: "4px 8px", background: "#EFF6FF", borderRadius: 6, transition: "all 0.2s" }}
                            >
                                {Object.keys(selectedSurfaces).filter(k => k.startsWith(`${num}-`) && selectedSurfaces[k]).map(k => k.split('-')[1]).join('') || 'Whole Tooth'}
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 8, marginBottom: 16, borderBottom: `1px solid ${GEO_BG}`, paddingBottom: 8 }}>
                            {["Procedures", "Conditions"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setPaletteTab(tab)}
                                    style={{
                                        background: "transparent", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                                        color: paletteTab === tab ? GEO_BLUE : GEO_TEXT_MUTED,
                                        backgroundColor: paletteTab === tab ? "#EFF6FF" : "transparent",
                                        cursor: "pointer", transition: "all 0.2s"
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {paletteTab === "Procedures" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                    {["Composite", "Amalgam", "Crown", "Root Canal", "Implant", "Extraction", "Sealant"].map(proc => (
                                        <button
                                            key={proc}
                                            onClick={() => handleProcedureClick(proc)}
                                            style={{
                                                background: "#F8FAFC", border: `1px solid #E2E8F0`, padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                                                color: GEO_TEXT_MAIN, cursor: "pointer", textAlign: "center", transition: "all 0.2s"
                                            }}
                                        >
                                            {proc}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type="text"
                                        placeholder="Search CDT Code or Description..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${GEO_BG}`, fontSize: 13, outline: "none", background: "#F8FAFC", boxSizing: "border-box" }}
                                    />
                                    {filteredCodes.length > 0 && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, marginTop: 4, maxHeight: 200, overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100 }}>
                                            {filteredCodes.map(codeDef => (
                                                <button
                                                    key={codeDef.code}
                                                    onClick={() => handleSearchCodeClick(codeDef.code)}
                                                    style={{ display: 'block', width: '100%', padding: '10px 12px', border: 'none', background: 'transparent', textAlign: 'left', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                                                >
                                                    <span style={{ fontWeight: 600, color: GEO_BLUE }}>{codeDef.code}</span>
                                                    <span style={{ fontSize: 12, color: GEO_TEXT_MAIN, marginLeft: 8 }}>{codeDef.desc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {paletteTab === "Conditions" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {["Healthy", "Existing", "Proposed", "Watch", "Missing"].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(num, status)}
                                        style={{
                                            background: "transparent", border: "none", padding: "8px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                                            color: data.status === status ? getToothColor(status) : GEO_TEXT_MAIN,
                                            backgroundColor: data.status === status ? `${getToothColor(status)}10` : "transparent",
                                            cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s"
                                        }}
                                    >
                                        <div style={{ width: 10, height: 10, borderRadius: 5, background: getToothColor(status) }} />
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", width: "100%", padding: "20px 0" }}>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", width: "100%", marginTop: 40, marginBottom: 0 }}>
                {upperArch.map((num, i) => <ToothNode key={num} num={num} index={i} isUpper={true} />)}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", width: "100%", marginTop: 0, marginBottom: 40 }}>
                {lowerArch.map((num, i) => <ToothNode key={num} num={num} index={i} isUpper={false} />)}
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                    { label: "Healthy", color: GEO_GREEN },
                    { label: "Existing", color: "#3B82F6" },
                    { label: "Proposed", color: "#EF4444" },
                    { label: "Watch", color: "#F59E0B" },
                    { label: "Missing", color: "#94A3B8" }
                ].map(leg => (
                    <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED }}>
                        <div style={{ width: 12, height: 12, borderRadius: 2, border: `2px solid ${leg.color}`, background: `${leg.color}20` }} />
                        {leg.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
