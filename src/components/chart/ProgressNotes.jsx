import React, { useState } from 'react';
import { useChartStore } from '../../store/chartStore';

const GEO_BG = "#F4F5F7";
const GEO_WHITE = "#FFFFFF";
const GEO_BLUE = "#2563EB";
const GEO_TEXT_MAIN = "#1C1E23";
const GEO_TEXT_MUTED = "#8A8D93";
const GEO_BORDER = "#E5E7EB";

export const ProgressNotes = () => {
    const { progressNotes, deleteProcedure, updateProcedureStatus } = useChartStore();
    const [sortField, setSortField] = useState('date');
    const [sortDir, setSortDir] = useState('desc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('asc');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Treatment Plan': return '#EF4444'; // Red
            case 'Completed': return '#3B82F6'; // Blue
            case 'Existing': return '#10B981'; // Green
            case 'Condition': return '#111827'; // Black
            default: return GEO_TEXT_MAIN;
        }
    };

    const getStatusCode = (status) => {
        switch (status) {
            case 'Treatment Plan': return 'TP';
            case 'Completed': return 'C';
            case 'Existing': return 'E';
            case 'Condition': return 'Cond';
            default: return '';
        }
    }

    const sortedNotes = [...progressNotes].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
        return 0;
    });

    const Th = ({ field, children, width }) => (
        <th
            onClick={() => handleSort(field)}
            style={{
                padding: '10px 16px', background: GEO_BG, textAlign: 'left', fontSize: 11, fontWeight: 700,
                color: GEO_TEXT_MUTED, textTransform: 'uppercase', cursor: 'pointer', borderBottom: `1px solid ${GEO_BORDER}`, width
            }}
        >
            {children} {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : ''}
        </th>
    );

    return (
        <div style={{ flex: 1, borderTop: `1px solid ${GEO_BORDER}`, background: GEO_WHITE, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${GEO_BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: GEO_TEXT_MAIN }}>Progress Notes</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button style={{ padding: '6px 14px', background: GEO_WHITE, border: `1px solid ${GEO_BORDER}`, borderRadius: 6, fontSize: 12, fontWeight: 600, color: GEO_TEXT_MAIN, cursor: 'pointer' }}>Filter</button>
                    <button style={{ padding: '6px 14px', background: GEO_WHITE, border: `1px solid ${GEO_BORDER}`, borderRadius: 6, fontSize: 12, fontWeight: 600, color: GEO_TEXT_MAIN, cursor: 'pointer' }}>Print</button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <tr>
                            <Th field="date" width="120px">Date</Th>
                            <Th field="tooth" width="60px">Tth</Th>
                            <Th field="surface" width="60px">Surf</Th>
                            <Th field="code" width="80px">Code</Th>
                            <Th field="description">Description</Th>
                            <Th field="status" width="60px">Stat</Th>
                            <Th field="provider" width="120px">Provider</Th>
                            <Th field="amount" width="80px">Amount</Th>
                            <th style={{ background: GEO_BG, borderBottom: `1px solid ${GEO_BORDER}`, width: '40px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedNotes.length === 0 ? (
                            <tr>
                                <td colSpan={9} style={{ padding: 40, textAlign: 'center', color: GEO_TEXT_MUTED, fontSize: 14 }}>
                                    No procedures or conditions charted yet.
                                </td>
                            </tr>
                        ) : sortedNotes.map(note => (
                            <tr key={note.id} style={{ borderBottom: `1px solid ${GEO_BG}`, color: getStatusColor(note.status) }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500 }}>{new Date(note.date).toLocaleDateString()}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>{note.tooth}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>{note.surface}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>{note.code}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500 }}>{note.description}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700 }} title={note.status}>{getStatusCode(note.status)}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500 }}>{note.provider}</td>
                                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500 }}>${note.amount.toFixed(2)}</td>
                                <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                                    <button
                                        onClick={() => deleteProcedure(note.id)}
                                        style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 4, opacity: 0.5 }}
                                        title="Delete Entry"
                                    >✕</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
