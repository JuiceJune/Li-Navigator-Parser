import {HIDE_ALERT, LOGIN_USER, SET_ALERT_TEXT, SET_ALERT_TYPE} from '../types'

const initialState = {
  alertText: null,
  alertType: true,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_ALERT_TEXT:
      return {...state, alertText: action.payload}
    case SET_ALERT_TYPE:
      return {...state, alertType: action.payload}
    case HIDE_ALERT:
      return {...state, alertText: null}

    default: return state
  }
}
