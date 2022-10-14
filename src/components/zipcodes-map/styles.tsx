import { FillLayer, SymbolLayer } from 'react-map-gl';

export const highlightSavedLayer: FillLayer = {
  id: 'savedZipcodes',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#E0A100',
    'fill-color': '#FBE8A8',
    'fill-opacity': 0.7,
  },
};
export const highlightDeletedLayer: FillLayer = {
  id: 'deletedZipcodes',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#615E54',
    'fill-color': '#C0BAAE',
    'fill-opacity': 0.8,
  },
};
export const highlightAddedLayer: FillLayer = {
  id: 'addedZipcodes',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#FF760F',
    'fill-color': '#FFECDE',
    'fill-opacity': 0.8,
  },
};
export const highlightSavedFilterLayer: FillLayer = {
  id: 'savedZipcodesFilter',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#AE4B00',
    'fill-color': '#E0A100',
    'fill-opacity': 0.7,
  },
};
export const highlightDeletedFilterLayer: FillLayer = {
  id: 'deletedZipcodesFilter',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#050400',
    'fill-color': '#615E54',
    'fill-opacity': 0.5,
  },
};
export const highlightAddedFilterLayer: FillLayer = {
  id: 'addedZipcodesFilter',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#F4230B',
    'fill-color': '#FFD6D1',
    'fill-opacity': 1,
  },
};

export const searchLayer: FillLayer = {
  id: 'searchLayer',
  type: 'fill',
  source: 'zipcodes',
  paint: {
    'fill-outline-color': '#FF760F',
    'fill-color': 'transparent',
    'fill-opacity': 1,
  },
};

export const searchMarkerLayer: SymbolLayer = {
  id: 'searchMarkerLayer',
  type: 'symbol',
  source: 'zipcodes',
  layout: {
    'icon-image': '_marker1',
    'text-field': ['get', 'zipCode'],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
    'text-optional': true,
    'icon-optional': true,
  },
  paint: {
    'text-color': '#FF760F',
  },
};

export const addedMarkerLayer: SymbolLayer = {
  id: 'addedMarkerLayer',
  type: 'symbol',
  source: 'zipcodes',
  layout: {
    'icon-image': '_marker1',
    'text-field': ['get', 'zipCode'],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
    'text-optional': true,
    'icon-optional': true,
  },
  paint: {
    'text-color': '#FF760F',
  },
};
export const addedTakenMarkerLayer: SymbolLayer = {
  id: 'addedTakenMarkerLayer',
  type: 'symbol',
  source: 'zipcodes',
  layout: {
    // 'icon-image': '_exclamation',
    'text-field': ['get', 'zipCode'],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
    'text-optional': true,
    'icon-optional': true,
  },
  paint: {
    'text-color': '#FF760F',
  },
};

export const savedMarkerLayer: SymbolLayer = {
  id: 'savedMarkerLayer',
  type: 'symbol',
  source: 'zipcodes',
  layout: {
    'icon-image': '_marker2',
    'text-field': ['get', 'zipCode'],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
    'text-optional': true,
    'icon-optional': true,
  },
  paint: {
    'text-color': '#E0A100',
  },
};

export const deletedMarkerLayer: SymbolLayer = {
  id: 'deletedMarkerLayer',
  type: 'symbol',
  source: 'zipcodes',
  layout: {
    'icon-image': '_marker3',
    'text-field': ['get', 'zipCode'],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
    'text-optional': true,
    'icon-optional': true,
  },
  paint: {
    'text-color': '#615E54',
  },
};

export const warehouseMarkerStyle = {
  padding: '3px',
  margin: '2px',
  display: 'none',
  background: '#ffffff',
};
