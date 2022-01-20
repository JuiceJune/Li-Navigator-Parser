import {COLUMN_SETTINGS, PROJECT_NAME, SHEET_LINK, SHEET_NAME, TO_RENDER} from '../types';

export const updateProjectName = (payload) => ({type: PROJECT_NAME, payload})
export const updateSheetLink = (payload) => ({type: SHEET_LINK, payload})
export const updateSheetName = (payload) => ({type: SHEET_NAME, payload})
export const updateColumnSettings = (payload) => ({type: COLUMN_SETTINGS, payload})
export const updateToRender = (payload) => ({type: TO_RENDER, payload})

