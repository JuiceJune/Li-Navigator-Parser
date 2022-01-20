/*global chrome*/
export function addProject(projectName, sheetLink, sheetName, columnSetting, showAlert) {
	chrome.storage.sync.get({Projects: []}, function(result) {
		let Projects = result.Projects;
		let flag = 1;
		if(Projects) {
			Projects.forEach(project => {
				if(project.projectName === projectName) {
					showAlert('Project name already exist', false)
					flag = 0;
				}
			})
		}

		if(flag) {
			let data = {
				projectName: projectName,
				sheetLink: sheetLink,
				sheetName: sheetName,
				columnSetting: columnSetting
			}
			Projects.push(data);
			chrome.storage.sync.set({
				Projects: Projects
			});
			showAlert('Project created', true)
		}
	})
}

export function deleteProject(projectName) {
	chrome.storage.sync.get(['Projects', 'CurrentProject'], function(results) {
		let arr = results.Projects
		let currentProject = results.CurrentProject
		if(currentProject === projectName) {
			chrome.storage.sync.set({
				CurrentProject: null
			});
		}
		arr.forEach((element, index) => {
			if(element.projectName === projectName) {
				arr.splice(index, 1);
				chrome.storage.sync.set({
					Projects: arr
				});
			}
		})
	});
}

export function chooseCurrentProject(project) {
	chrome.storage.sync.set({'CurrentProject': project}, function() {
		console.log('Value is set to ' + project);
	});
}

export function updateList(setProjects, setCurrentProject) {
	chrome.storage.sync.get(['Projects', 'CurrentProject'], function(results) {
		let projects = results.Projects
		let currentProject = results.CurrentProject
		if(projects)
		{
			setProjects(projects)
		}
		else {
			setProjects(null)
		}

		if(currentProject) {
			setCurrentProject(currentProject)
		}
		else {
			setCurrentProject('Project not found')
		}

	});
}
