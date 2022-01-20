import {HIDE_ALERT, SET_ALERT_TEXT, SET_ALERT_TYPE} from '../types';

export const setAlertText = (payload) => ({type: SET_ALERT_TEXT, payload})
export const setAlertType = (payload) => ({type: SET_ALERT_TYPE, payload})
export const hideAlert = (payload) => ({type: HIDE_ALERT, payload})
