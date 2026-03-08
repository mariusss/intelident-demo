import React, { useState } from 'react';
import { useChartStore } from '../../store/chartStore';
import cdtCodes from '../../data/cdtCodes.json';
import multiCodes from '../../data/multiCodes.json';

const GEO_BG = "#F4F5F7";
const GEO_WHITE = "#FFFFFF";
const GEO_BLUE = "#2563EB";
const GEO_TEXT_MAIN = "#1C1E23";
const GEO_TEXT_MUTED = "#8A8D93";
const GEO_BORDER = "#E5E7EB";

export const ProcedureEntryPanel = () => {
    const {
        selectedTeeth,
        currentStatus,
        setStatus,
        currentProvider,
        setProvider,
        postProcedure
    } = useChartStore();

    const [activeTab, setActiveTab] = useState('Buttons');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Group CDT codes by ADA Category
    const categories = [...new Set(cdtCodes.map(c => c.category))];
    const groupedCodes = categories.reduce((acc, cat) => {
        acc[cat] = cdtCodes.filter(c => c.category === cat);
        return acc;
    }, {});

    const handlePost = (codeId) => {
        if (selectedTeeth.length === 0 && !multiCodes.find(m => m.id === codeId)) {
            // Some procedures require teeth, but we'll let the intelligence layer handle warnings
        }
        postProcedure(codeId);
    };

    const StatusButton = ({ label, color }) => (
        <button
            onClick={() => setStatus(label)}
            style={{
                flex: 1, padding: "8px 4px", fontSize: 11, fontWeight: 700, borderRadius: 6,
                border: `1px solid ${currentStatus === label ? color : GEO_BORDER}`,
                background: currentStatus === label ? `${color}15` : GEO_WHITE,
                color: currentStatus === label ? color : GEO_TEXT_MAIN,
                cursor: "pointer", transition: "all 0.2s"
            }}
        >
            {label}
        </button>
    );

    return (
        <div style={{ width: 340, background: GEO_WHITE, borderLeft: `1px solid ${GEO_BORDER}`, display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Header / Context Setup */}
            <div style={{ padding: 16, borderBottom: `1px solid ${GEO_BORDER}`, background: GEO_BG }}>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: GEO_TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'block' }}>
                        Selected Teeth ({selectedTeeth.length})
                    </label>
                    <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, minHeight: 20 }}>
                        {selectedTeeth.length > 0 ? selectedTeeth.sort((a, b) => a - b).join(', ') : 'None Selected'}
                    </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: GEO_TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'block' }}>
                        Provider
                    </label>
                    <select
                        value={currentProvider}
                        onChange={(e) => setProvider(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${GEO_BORDER}`, fontSize: 13, outline: 'none', background: GEO_WHITE }}
                    >
                        <option value="Dr. Cifor">Dr. Cifor</option>
                        <option value="Dr. Smith">Dr. Smith</option>
                        <option value="Hyg. Adams">Hyg. Adams</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: GEO_TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'block' }}>
                        Treatment Status
                    </label>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <StatusButton label="Treatment Plan" color="#EF4444" />
                        <StatusButton label="Completed" color="#3B82F6" />
                        <StatusButton label="Existing" color="#10B981" />
                        <StatusButton label="Condition" color="#111827" />
                    </div>
                </div>
            </div>

            {/* Entry Method Tabs */}
            <div style={{ display: "flex", borderBottom: `1px solid ${GEO_BORDER}` }}>
                {['Buttons', 'Codes', 'Search'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1, padding: "12px", background: activeTab === tab ? GEO_WHITE : GEO_BG,
                            border: "none", borderBottom: activeTab === tab ? `2px solid ${GEO_BLUE}` : "2px solid transparent",
                            fontSize: 13, fontWeight: 600, color: activeTab === tab ? GEO_BLUE : GEO_TEXT_MUTED,
                            cursor: "pointer", transition: "all 0.2s"
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Panel Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: GEO_WHITE }}>

                {activeTab === 'Buttons' && (
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 700, color: GEO_TEXT_MUTED, marginBottom: 12, textTransform: 'uppercase' }}>Quick Procedures</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {multiCodes.map(mc => (
                                <button
                                    key={mc.id}
                                    onClick={() => handlePost(mc.id)}
                                    style={{
                                        padding: "10px 8px", background: "#F8FAFC", border: `1px solid ${GEO_BORDER}`, borderRadius: 8,
                                        fontSize: 12, fontWeight: 600, color: GEO_TEXT_MAIN, textAlign: "left", cursor: "pointer",
                                        display: 'flex', flexDirection: 'column', gap: 4
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = GEO_BLUE; e.currentTarget.style.backgroundColor = "#EFF6FF"; }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = GEO_BORDER; e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                                >
                                    <span>{mc.name}</span>
                                    <span style={{ fontSize: 10, color: GEO_TEXT_MUTED, fontWeight: 400 }}>{mc.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'Codes' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {categories.map(cat => (
                            <div key={cat} style={{ border: `1px solid ${GEO_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
                                <button
                                    onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
                                    style={{
                                        width: '100%', padding: "12px 16px", background: expandedCategory === cat ? "#F8FAFC" : GEO_WHITE,
                                        border: "none", borderBottom: expandedCategory === cat ? `1px solid ${GEO_BORDER}` : 'none',
                                        fontSize: 13, fontWeight: 700, color: GEO_TEXT_MAIN, textAlign: "left", cursor: "pointer",
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}
                                >
                                    {cat}
                                    <span style={{ fontSize: 16, color: GEO_TEXT_MUTED }}>{expandedCategory === cat ? '−' : '+'}</span>
                                </button>

                                {expandedCategory === cat && (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {groupedCodes[cat].map(codeDef => (
                                            <button
                                                key={codeDef.code}
                                                onClick={() => handlePost(codeDef.code)}
                                                style={{
                                                    width: '100%', padding: "10px 16px", background: GEO_WHITE, border: "none", borderBottom: `1px solid ${GEO_BG}`,
                                                    fontSize: 12, color: GEO_TEXT_MAIN, textAlign: "left", cursor: "pointer", display: 'flex', gap: 12,
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#F0F9FF"}
                                                onMouseOut={e => e.currentTarget.style.backgroundColor = GEO_WHITE}
                                            >
                                                <span style={{ fontWeight: 700, color: GEO_BLUE, width: 45 }}>{codeDef.code}</span>
                                                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{codeDef.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Search' && (
                    <div>
                        <input
                            type="text"
                            placeholder="Search CDT Code or Description..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            autoFocus
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: 8, border: `1px solid ${GEO_BLUE}`,
                                fontSize: 13, outline: 'none', background: GEO_WHITE, marginBottom: 16,
                                boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                            }}
                        />

                        {searchTerm.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {cdtCodes.filter(c => {
                                    const q = searchTerm.toLowerCase();
                                    const codeRaw = c.code.toLowerCase();
                                    const codeNum = codeRaw.replace('d', '');

                                    // Match '56' against '5640'
                                    if (codeRaw.includes(q) || codeNum.includes(q)) return true;

                                    // Match 'RE' against 'Repair' (word boundary)
                                    const words = c.desc.toLowerCase().split(/[\s,\-]+/);
                                    if (words.some(w => w.startsWith(q))) return true;

                                    return false;
                                }).slice(0, 100).map(codeDef => (
                                    <button
                                        key={codeDef.code}
                                        onClick={() => handlePost(codeDef.code)}
                                        style={{
                                            width: '100%', padding: "10px 12px", background: GEO_WHITE, border: `1px solid ${GEO_BORDER}`, borderRadius: 6,
                                            fontSize: 12, color: GEO_TEXT_MAIN, textAlign: "left", cursor: "pointer", display: 'flex', gap: 12
                                        }}
                                        onMouseOver={e => { e.currentTarget.style.borderColor = GEO_BLUE; e.currentTarget.style.backgroundColor = "#F0F9FF"; }}
                                        onMouseOut={e => { e.currentTarget.style.borderColor = GEO_BORDER; e.currentTarget.style.backgroundColor = GEO_WHITE; }}
                                    >
                                        <span style={{ fontWeight: 700, color: GEO_BLUE, width: 45 }}>{codeDef.code}</span>
                                        <span style={{ flex: 1 }}>{codeDef.desc}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
