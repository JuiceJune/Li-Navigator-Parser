import React from 'react';
import style from './alert.module.css'
import {connect} from 'react-redux';
import {hideAlert} from '../../store/ActionCreators/appActions';

const Alert = (props) => {
	const {text, type, hideAlert} = props

	return (
		<div onClick={() => {
			setTimeout(() => {
				hideAlert()
			}, 200)
		}}>
			{type ? <div className={style.green}>
				{text}
			</div>
			:
			<div className={style.red}>
				{text}
			</div>
			}
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		hideAlert: () => {
			dispatch(hideAlert());
		}
	}
}

export default connect(null, mapDispatchToProps)(Alert);

