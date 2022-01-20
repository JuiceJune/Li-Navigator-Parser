import React, {useEffect, useState} from 'react';
import style from './createProject.module.css'
import M from 'materialize-css'
import {connect} from 'react-redux';
import {
	updateColumnSettings,
	updateProjectName,
	updateSheetLink,
	updateSheetName, updateToRender,
} from '../../store/ActionCreators/projectActions';
import {hideAlert, setAlertText, setAlertType} from '../../store/ActionCreators/appActions';
import Alert from '../alert/alert';
import {Select} from 'react-materialize';
import {addProject} from '../../popup_scripts/popup';

const CreateProject = (props) => {

	const {projectName, sheetLink, sheetName, columnSetting, toRender, alertText, alertType, showAlert, hideAlert,
		updateProjectName, updateSheetLink, updateSheetName, updateColumnSettings, updateToRender} = props

	const columnName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


	let newProjectName = React.createRef();
	let newSheetLink = React.createRef();
	let newSheetName = React.createRef();

	function selectHandler(event, item) {
		columnSetting.forEach((element) => {
			if(element.column === event.target.value && element.data !== item.data) {
				element.column = '#'
				element.state = false
			}
			item.column = event.target.value
			item.state = true
		})
		updateColumnSettings(columnSetting)
		columnSetting.forEach(element => {
			if(element.column === '#') {
				element.state = false
			}
		})
		updateToRender(!toRender)
	}

	function radioHandler(item, index) {
		if(item.column !== '#')
		{
			columnSetting[index].state = !item.state
			updateColumnSettings(columnSetting)
			updateToRender(!toRender)
		}
	}

	async function createProject() {
		await addProject(projectName, sheetLink, sheetName, columnSetting, showAlert)
		setTimeout(() => {
			hideAlert()
		}, 3000)
	}


	return (
		<div className={style.container}>
			<div className={style.projectName}>
				<label>
					Name of Projects
					<input type="text"
						   name="projectName"
						   className="validate"
						   value={projectName}
						   ref={newProjectName}
						   onChange={() => updateProjectName(newProjectName.current.value)}
					/>
				</label>
			</div>
			<div className={style.sheetLink}>
				<label>
					Sheet Link
					<input type="text"
						   name="sheetLink"
						   className="validate"
						   value={sheetLink}
						   ref={newSheetLink}
						   onChange={() => updateSheetLink(newSheetLink.current.value)}
					/>
				</label>
			</div>
			<div className={style.sheetName}>
				<label>
					Sheet Name
					<input type="text"
						   name="sheetName"
						   className="validate"
						   value={sheetName}
						   ref={newSheetName}
						   onChange={() => updateSheetName(newSheetName.current.value)}
					/>
				</label>
			</div>
			<div className={style.columnRedactor}>
				<div className={style.columnHeader}>
					<div>Column</div>
					<div>Data Name</div>
					<div>Off/On</div>
				</div>
				{columnSetting && columnSetting.map((item, index) => {
					return (
						<div key={item.data} className={style.column}>
							<div className={style.columnName}>
								<div id={item.data}>
									<Select onChange={event => {selectHandler(event, item)} }>
										<option value='#' selected={true}>#</option>
										{columnName && columnName.map((item) => {
											return (
												<option key={item} value={item}>{item}</option>
											)
										})}
									</Select>
								</div>
								<div>
									({item.column})
								</div>
							</div>
							<div className={style.dataName}>
								{item.data}
							</div>
							<div className={style.switcher}>
								<div className="switch">
									<label>
										<input type="checkbox"
											   checked={item.state}
											   onClick={() => {radioHandler(item, index)}}
										/>
										<span className="lever"></span>
									</label>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			{alertText && <Alert text={alertText} type={alertType}/>}
			<a className="waves-effect waves-light btn col s10 push-s1" onClick={createProject}>Create Project</a>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		updateProjectName: (projectName) => {
			dispatch(updateProjectName(projectName));
		},
		updateSheetLink: (sheetLink) => {
			dispatch(updateSheetLink(sheetLink));
		},
		updateSheetName: (sheetName) => {
			dispatch(updateSheetName(sheetName));
		},
		updateColumnSettings: (settings) => {
			dispatch(updateColumnSettings(settings));
		},
		updateToRender: (arr) => {
			dispatch(updateToRender(arr));
		},
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
		projectName: state.project.projectName,
		sheetLink: state.project.sheetLink,
		sheetName: state.project.sheetName,
		columnSetting: state.project.columnSetting,
		toRender: state.project.toRender,
		alertText: state.app.alertText,
		alertType: state.app.alertType,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);