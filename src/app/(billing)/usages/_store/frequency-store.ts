import { create } from 'zustand';

interface ModifiedCurrency {
  currency: string;
  variant: string;
  tokens: string;
}

interface FrequencyItem {
  section: string;
  name: string;
  tokens: string;
  productFamily?: string;
}

interface FrequencyStore {
  // State
  selectedItems: FrequencyItem[];
  modifiedCurrencies: Record<string, ModifiedCurrency[]>;
  drawerStatus: 'show' | 'hide';
  selectedViewItem: FrequencyItem | null;

  // Actions
  setDrawerStatus: (status: 'show' | 'hide') => void;
  setSelectedViewItem: (item: FrequencyItem | null) => void;
  addSelectedItem: (item: FrequencyItem) => void;
  removeSelectedItem: (item: FrequencyItem) => void;
  removeMultipleItems: (items: FrequencyItem[]) => void;
  updateModifiedCurrencies: (key: string, currencies: ModifiedCurrency[]) => void;
  clearModifiedCurrencies: () => void;
  handleDrawer: (action: string, item: FrequencyItem) => void;
  handleCloseDrawer: () => void;
}

export const useFrequencyStore = create<FrequencyStore>((set) => ({
  // Initial state
  selectedItems: [],
  modifiedCurrencies: {},
  drawerStatus: 'hide',
  selectedViewItem: null,

  // Actions
  setDrawerStatus: (status) => set({ drawerStatus: status }),
  
  setSelectedViewItem: (item) => set({ selectedViewItem: item }),
  
  addSelectedItem: (item) => set((state) => {
    // Check if item already exists
    const exists = state.selectedItems.some(
      existingItem => existingItem.section === item.section && existingItem.name === item.name
    );
    if (exists) return state;
    
    return {
      selectedItems: [...state.selectedItems, item]
    };
  }),
  
  removeSelectedItem: (item) => set((state) => ({
    selectedItems: state.selectedItems.filter(
      existingItem => !(existingItem.section === item.section && existingItem.name === item.name)
    )
  })),

  // New action for batch removal
  removeMultipleItems: (items) => set((state) => ({
    selectedItems: state.selectedItems.filter(existingItem => 
      !items.some(item => 
        item.section === existingItem.section && item.name === existingItem.name
      )
    )
  })),
  
  updateModifiedCurrencies: (key, currencies) => set((state) => ({
    modifiedCurrencies: {
      ...state.modifiedCurrencies,
      [key]: currencies
    }
  })),
  
  clearModifiedCurrencies: () => set({ modifiedCurrencies: {} }),
  
  handleDrawer: (action, item) => set({
    selectedViewItem: item,
    drawerStatus: 'show'
  }),
  
  handleCloseDrawer: () => set({
    drawerStatus: 'hide',
    selectedViewItem: null
  })
}));