import { create } from 'zustand';
import cdtCodes from '../data/cdtCodes.json';
import multiCodes from '../data/multiCodes.json';

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useChartStore = create((set, get) => ({
    // Global Selection State
    selectedTeeth: [],

    // The master ledger of charted clinical events
    progressNotes: [],

    // Current Entry Context
    currentProvider: 'Dr. Cifor',
    currentStatus: 'Treatment Plan', // Treatment Plan, Completed, Existing, Existing Other, Condition

    // Selection Actions
    toggleToothSelection: (toothNum) => set((state) => {
        const isSelected = state.selectedTeeth.includes(toothNum);
        return {
            selectedTeeth: isSelected
                ? state.selectedTeeth.filter(t => t !== toothNum)
                : [...state.selectedTeeth, toothNum]
        };
    }),

    clearSelection: () => set({ selectedTeeth: [] }),

    // Context Actions
    setProvider: (provider) => set({ currentProvider: provider }),
    setStatus: (status) => set({ currentStatus: status }),

    // Intelligent Posting Logic
    postProcedure: (codeString, specificContext = {}) => {
        const state = get();
        const { selectedTeeth, currentProvider, currentStatus } = state;

        let codesToPost = [];

        // 1. Is it a Multi-code?
        const multiCodeDef = multiCodes.find(mc => mc.id === codeString);
        if (multiCodeDef) {
            // Unpack multi-code into individual CDTs
            codesToPost = multiCodeDef.codes.map(c => ({
                code: c,
                surfaces: multiCodeDef.surfaces || [], // Use pre-defined surfaces if the multi-code dictates (e.g., MOD)
            }));
        } else {
            // 2. Or is it a direct CDT code?
            codesToPost = [{ code: codeString, surfaces: specificContext.surfaces || [] }];
        }

        const newNotes = [];

        codesToPost.forEach(postingReq => {
            const baseCodeDef = cdtCodes.find(c => c.code === postingReq.code);
            if (!baseCodeDef) {
                console.warn(`Unknown code: ${postingReq.code}`);
                return;
            }

            // Intelligence Layer: Resolve substitution based on surfaces if needed
            let finalCodeDef = baseCodeDef;
            if (baseCodeDef.treatmentArea === 'Surface' && postingReq.surfaces.length > 0) {
                // Find the correct code in the same category that matches the number of surfaces
                // E.g., D2391 -> D2392 if 2 surfaces were actually selected
                const requiredSurfaces = postingReq.surfaces.length;
                if (baseCodeDef.surfacesRequired !== requiredSurfaces) {
                    const upgradeCode = cdtCodes.find(c =>
                        c.treatmentArea === 'Surface' &&
                        c.material === baseCodeDef.material &&
                        c.toothType === baseCodeDef.toothType && // Anterior vs Posterior logic would go deeper here
                        c.surfacesRequired === requiredSurfaces
                    );
                    if (upgradeCode) {
                        finalCodeDef = upgradeCode;
                    }
                }
            }

            // Post the code for each selected tooth (or once if it's a mouth-level code)
            if (finalCodeDef.treatmentArea === 'Mouth' || selectedTeeth.length === 0) {
                newNotes.push({
                    id: generateId(),
                    date: new Date().toISOString(),
                    tooth: '',
                    surface: postingReq.surfaces.join(''),
                    code: finalCodeDef.code,
                    description: finalCodeDef.desc,
                    provider: currentProvider,
                    status: currentStatus,
                    amount: 0 // Would look up in a fee schedule
                });
            } else {
                selectedTeeth.forEach(toothNum => {
                    newNotes.push({
                        id: generateId(),
                        date: new Date().toISOString(),
                        tooth: toothNum.toString(),
                        surface: postingReq.surfaces.join(''),
                        code: finalCodeDef.code,
                        description: finalCodeDef.desc,
                        provider: currentProvider,
                        status: currentStatus,
                        amount: 0
                    });
                });
            }
        });

        // Update the master ledger
        set((state) => ({
            progressNotes: [...state.progressNotes, ...newNotes],
            // clearSelection() // Optionally clear selection after posting, Dentrix usually keeps it by default
        }));
    },

    // Delete a posted procedure
    deleteProcedure: (id) => set((state) => ({
        progressNotes: state.progressNotes.filter(note => note.id !== id)
    })),

    // Change status of an existing procedure (e.g., TP -> C)
    updateProcedureStatus: (id, newStatus) => set((state) => ({
        progressNotes: state.progressNotes.map(note =>
            note.id === id ? { ...note, status: newStatus } : note
        )
    }))
}));
