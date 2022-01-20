// const requestURL = 'http://localhost:8000/toSheet'
const requestURL = 'https://safe-ocean-40366.herokuapp.com/toSheet'
const linkedInLink = "https://www.linkedin.com"
const chromeExtension = "chrome-extension"
const Projects = 'Projects'
const CurrentProject = 'CurrentProject'
const ColumnName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function sendToContent(message) {
	let body = {
		message: message,
		status: 0
	}
	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, gotTabs);

	function gotTabs(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, body);
	}
}

function sendRequest(method, url, body = null) {

	return fetch(url, {
		method: method,
		//mode: 'no-cors', // It can be no-cors, cors, same-origin
		//credentials: 'same-origin', // It can be include, same-origin, omit
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(data => {
		return data.json();
	}).then(data => {
		if(data.status === "ok") {
			sendToContent(data.message)
		}
		else {
			sendToContent(data.systemMessage + "\n"+ data.adminMessage)
		}
	}).catch(err => {
		sendToContent(err.message)
	})
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	if(sender.origin === linkedInLink) {
		if(request.status === 'ok') {
			buttonClicked(request.data)
		}
	}
})

function generateBody(projectData, copiedData) {
	let body = {
		data: {},
		sheet: {}
	}

	let columnNameArr = []
	let columnDataArr = []

	projectData.columnSettings.forEach((project, index) => {
		if(project.state === true && project.column !== '#') {
			columnNameArr.push(project.column)
			columnDataArr.push(project.data)
		}
	})

	ColumnName.forEach((columnName, index) => {
		let indx = columnNameArr.indexOf(columnName)
		if(indx >= 0) {
			body.data[`${index}`] = copiedData[`${columnDataArr[indx]}`]
		}
		else {
			body.data[`${index}`] = ''
		}
	})

	body.sheet.linkSheet = projectData.sheetLink
	body.sheet.nameSheet = projectData.sheetName

	return body
}

function getDate() {
	let today = new Date();
	let dd = today.getDate();

	let mm = today.getMonth()+1;
	const yyyy = today.getFullYear();
	if(dd<10)
	{
		dd=`0${dd}`;
	}

	if(mm<10)
	{
		mm=`0${mm}`;
	}
	return `${mm}/${dd}/${yyyy}`;
}

function buttonClicked(response) {

	chrome.storage.sync.get([Projects, CurrentProject], function(results) {

		if(results.Projects && results.CurrentProject){
			let projectData = {
				sheetLink: null,
				sheetName: null,
				columnSettings: null
			}
			results.Projects.forEach( (project, index) => {
				if (project.projectName === results.CurrentProject) {
					projectData.sheetLink = project.sheetLink
					projectData.sheetName = project.sheetName
					projectData.columnSettings = project.columnSetting
				}
			})

			if(projectData.sheetLink && projectData.sheetName && projectData.columnSettings) {
				let copiedData =  {
					'First Name': response[0],
					'Last Name': response[1],
					'Title': response[2],
					'Linkedin Link': response[8],
					'Connections': response[3],
					'Company': response[4],
					'Industry': response[5],
					'Company Location': response[6],
					'Lead Location': response[7],
					'Date': getDate()
				}

				let body = generateBody(projectData, copiedData)
				sendRequest('POST', requestURL, body)
			}
			else {
				sendToContent('Sheet link or Sheet name not found. Create a new project and choose it')
			}
		}
		else {
			sendToContent('List of Projects or Current Project not found. Create a new project or choose one')
		}
	})
}