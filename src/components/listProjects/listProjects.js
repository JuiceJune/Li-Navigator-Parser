/*global chrome*/
import React, {useEffect, useState} from 'react';
import style from './listProjects.module.css'
import {deleteProject, chooseCurrentProject, updateList} from '../../popup_scripts/popup';

const ListProjects = () => {
	const [projects, setProjects] = useState([]);
	const [currentProject, setCurrentProject] = useState();

	useEffect(async () => {
		updateList(setProjects, setCurrentProject)
	}, [projects, currentProject])

	return (
		<div className={style.container}>
			<h5 className={style.headListProjects}>
				List of Projects
			</h5>
			<div className={style.projectsContainer}>
				{projects && projects.map(project => {

					return (<div className={style.projectBlock}>
						<div className={style.project}>
							<label className={style.label} onClick={() => {
								setCurrentProject(project.projectName)
								chooseCurrentProject(project.projectName)
							}}>
								<input name="group1" type="radio"/>
								<span className={style.projectName}>{project.projectName}</span>
							</label>
							<div className={style.btnBlock}>
								<a className="btn-floating btn-small red" onClick={() => {
									deleteProject(project.projectName)
								}}>
									<i className="material-icons">delete</i>
								</a>
							</div>
						</div>
					</div>)
				})}
			</div>
			<div className={style.currentProjectBlock}>
				{currentProject ? <div>Current project: {currentProject}</div> : <div>Project not found</div>}
			</div>
		</div>
	);
};

export default ListProjects;