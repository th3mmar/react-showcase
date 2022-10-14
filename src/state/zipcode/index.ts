import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WareHouse, ZipCode } from './types';
import _ from 'lodash';

export interface AppState {
  warehouse: WareHouse | null;
  savedZipCodes: ZipCode[];
  deletedZipCodes: ZipCode[];
  addedZipCodes: ZipCode[];
  savedZipCodesFiltered: ZipCode[];
  deletedZipCodesFiltered: ZipCode[];
  addedZipCodesFiltered: ZipCode[];
  filter: string;
  filterFound: boolean;
  hasUnsavedChanges: boolean;
  zipcodeAddable: boolean;
  zipcodeCancelable: boolean;
  fetchingActiveZipcodes: boolean;
  savingZipcodesFailed: boolean;
  attemptedNavigationURL: string | null;
  saveAndLeave: boolean;
  leaveApplicationTo: string | null;
}

const initialState: AppState = {
  warehouse: null,
  savedZipCodes: [],
  deletedZipCodes: [],
  addedZipCodes: [],
  savedZipCodesFiltered: [],
  deletedZipCodesFiltered: [],
  addedZipCodesFiltered: [],
  filter: '',
  filterFound: false,
  hasUnsavedChanges: false,
  zipcodeAddable: false,
  zipcodeCancelable: false,
  savingZipcodesFailed: false,
  fetchingActiveZipcodes: false,
  attemptedNavigationURL: null,
  saveAndLeave: false,
  leaveApplicationTo: null,
};

const sortAndFilter = (zipCodes, filter) => {
  return _.chain(zipCodes)
    .filter((o) => filter === '' || o.zipCode.startsWith(filter))
    .orderBy(['zipCode'], ['asc'])
    .value();
};

const updateFilterState = (state) => {
  if (state.filter.length > 0) {
    state.filterFound =
      state.deletedZipCodesFiltered.length > 0 ||
      state.savedZipCodesFiltered.length > 0 ||
      state.addedZipCodesFiltered.length > 0;

    state.zipcodeAddable = state.filter?.length === 5 && !state.filterFound;
    state.zipcodeCancelable =
      !state.zipcodeAddable &&
      state.filter?.length > 0 &&
      state.filter?.length <= 5;
  } else {
    state.filterFound = false;
    state.zipcodeAddable = false;
    state.zipcodeCancelable = false;
  }
};
const setHasUnsavedChanges = (state) => {
  state.hasUnsavedChanges =
    state.deletedZipCodes.length > 0 || state.addedZipCodes.length > 0;
};

const appSlice = createSlice({
  name: 'zipCode',
  initialState,
  reducers: {
    setWarehouse: (state, action: PayloadAction<WareHouse>) => {
      state.warehouse = action.payload;
    },
    setFilter: (state, action: PayloadAction<String>) => {
      state.filter = action.payload.toString();
      state.addedZipCodesFiltered = sortAndFilter(
        state.addedZipCodes,
        state.filter,
      );
      state.deletedZipCodesFiltered = sortAndFilter(
        state.deletedZipCodes,
        state.filter,
      );
      state.savedZipCodesFiltered = sortAndFilter(
        state.savedZipCodes,
        state.filter,
      );
      updateFilterState(state);
    },
    setSavedZipCodes: (state, action: PayloadAction<any>) => {
      state.savedZipCodes = action.payload;
      state.savedZipCodesFiltered = sortAndFilter(
        state.savedZipCodes,
        state.filter,
      );
      updateFilterState(state);
    },
    setFetchingActiveZipCodes: (state, action: PayloadAction<any>) => {
      state.fetchingActiveZipcodes = action.payload;
    },

    deleteSavedZipCode: (state, action: PayloadAction<String>) => {
      const zipCodeId = action.payload;
      const index = state.savedZipCodes.findIndex(
        (item: ZipCode) => zipCodeId === item.id,
      );
      if (index > -1) {
        // push before splicing !!
        state.deletedZipCodes.push(state.savedZipCodes[index]);
        state.savedZipCodes.splice(index, 1);
        state.deletedZipCodesFiltered = sortAndFilter(
          state.deletedZipCodes,
          state.filter,
        );
        state.savedZipCodesFiltered = sortAndFilter(
          state.savedZipCodes,
          state.filter,
        );
        state.hasUnsavedChanges = true;
      }
      updateFilterState(state);
    },
    undoDeletedSavedZipCode: (state, action: PayloadAction<String>) => {
      const zipCodeId = action.payload;
      const index = state.deletedZipCodes.findIndex(
        (item: ZipCode) => zipCodeId === item.id,
      );
      if (index > -1) {
        // push before splicing !!
        state.savedZipCodes.push(state.deletedZipCodes[index]);
        state.deletedZipCodes.splice(index, 1);
        state.savedZipCodesFiltered = sortAndFilter(
          state.savedZipCodes,
          state.filter,
        );
        state.deletedZipCodesFiltered = sortAndFilter(
          state.deletedZipCodes,
          state.filter,
        );
        setHasUnsavedChanges(state);
      }
      updateFilterState(state);
    },
    deleteAddedZipCode: (state, action: PayloadAction<String>) => {
      // added and not yet saved zipcodes do not have ids
      const zipCodeId = action.payload;
      const index = state.addedZipCodes.findIndex(
        (item: ZipCode) => zipCodeId === item.zipCode,
      );
      if (index > -1) {
        state.addedZipCodes.splice(index, 1);
        state.addedZipCodesFiltered = sortAndFilter(
          state.addedZipCodes,
          state.filter,
        );
        setHasUnsavedChanges(state);
      }
      updateFilterState(state);
    },
    // below will be useful for bulk adding
    addZipCodes: (state, action: PayloadAction<ZipCode[]>) => {
      action.payload.forEach((zc) => {
        if (!state.addedZipCodes.find((azc) => azc.zipCode === zc.zipCode))
          state.addedZipCodes.push(zc);
      });
      state.addedZipCodesFiltered = sortAndFilter(
        state.addedZipCodes,
        state.filter,
      );
      state.hasUnsavedChanges = true;
      updateFilterState(state);
    },
    addZipCode: (state, action: PayloadAction<ZipCode>) => {
      // clear filter
      state.filter = '';

      state.addedZipCodes.push(action.payload);
      state.addedZipCodesFiltered = sortAndFilter(
        state.addedZipCodes,
        state.filter,
      );
      state.deletedZipCodesFiltered = sortAndFilter(
        state.deletedZipCodes,
        state.filter,
      );
      state.savedZipCodesFiltered = sortAndFilter(
        state.savedZipCodes,
        state.filter,
      );
      state.hasUnsavedChanges = true;
      updateFilterState(state);
    },
    doConfirmNav: (state, action: PayloadAction<string>) => {
      state.attemptedNavigationURL = action.payload;
    },
    doCancelNav: (state) => {
      state.attemptedNavigationURL = null;
    },
    doSaveAndLeaveNav: (state) => {
      state.attemptedNavigationURL = null;
      state.saveAndLeave = true;
    },
    closeSaveFailureModal: (state) => {
      state.savingZipcodesFailed = false;
    },
    onSaveFailure: (state) => {
      state.savingZipcodesFailed = true;
    },
    doNavigateTo: (state, action: PayloadAction<any>) => {
      state.leaveApplicationTo = action.payload;
    },
    onSaveSuccess: (state, action: PayloadAction<any>) => {
      state.deletedZipCodes = [];
      state.addedZipCodes = [];
      state.deletedZipCodesFiltered = [];
      state.addedZipCodesFiltered = [];
      state.hasUnsavedChanges = false;
      // ckear filter
      state.filter = '';
      if (action.payload && action.payload.length > 0) {
        state.savedZipCodes = _.unionBy(
          state.savedZipCodes,
          action.payload,
          'zipCode',
        );
      }
      state.savedZipCodesFiltered = sortAndFilter(
        state.savedZipCodes,
        state.filter,
      );
      updateFilterState(state);
    },
  },
});

export const { setSavedZipCodes } = appSlice.actions;
export const appSliceActions = appSlice.actions;
export default appSlice.reducer;
