import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {appReducer} from './appReducer';
import {projectReducer} from './projectReducer';

const rootReducer = combineReducers({
	app: appReducer,
	project: projectReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))