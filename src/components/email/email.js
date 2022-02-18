import React, {useState} from 'react';
import style from './email.module.css'
import {connect} from 'react-redux';
import {hideAlert, setAlertText, setAlertType} from '../../store/ActionCreators/appActions';


const Email = () => {
	let email = 'addon-223@learned-sprite-332518.iam.gserviceaccount.com'
	const [state, setState] = useState(email);

	return (
		<div>
			<div className={style.linkBlock} id="linkBlock" onClick={async () => {
				await navigator.clipboard.writeText(email);
				setState('Copied')
				setTimeout(() => {
					setState(email)
				}, 3000)
			}}>
				<p className={style.linkText} id='linkText'>{state}</p>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		showAlert: (text, type) => {
			dispatch(setAlertText(text));
			dispatch(setAlertType(type));
		},
		hideAlert: () => {
			dispatch(hideAlert());
		}
	}
}

const mapStateToProps = state => {
	return {
		alertText: state.app.alertText,
		alertType: state.app.alertType,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Email);