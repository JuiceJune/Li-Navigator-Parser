import {COLUMN_SETTINGS, PROJECT_NAME, SHEET_LINK, SHEET_NAME, TO_RENDER} from '../types';

const dataList = ['First Name', 'Last Name', 'Title', 'Linkedin Link', 'Company',
  'Connections', 'Industry', 'Company Location', 'Lead Location', 'Date']
let columnSetting = []
dataList.forEach((item) => {
  columnSetting.push({
    column: '#',
    data: item,
    state: false
  })
})


const initialState = {
  projectName: '',
  sheetLink: '',
  sheetName: '',
  columnSetting: columnSetting,
  toRender: true,
}

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {

    case PROJECT_NAME:
      return {...state, projectName: action.payload}
    case SHEET_LINK:
      return {...state, sheetLink: action.payload}
    case SHEET_NAME:
      return {...state, sheetName: action.payload}
    case COLUMN_SETTINGS:
      return {...state, columnSetting: action.payload}
    case TO_RENDER:
      return {...state, toRender: action.payload}

    default: return state
  }
}
