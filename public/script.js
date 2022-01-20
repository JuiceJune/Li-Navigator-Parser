async function getData() {

	function getElementByXpath(path) {
		return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	function getFirstName(fullNameElement) {
		let firstName = fullNameElement.textContent.trim()
		const array = firstName.split(" ");
		return array[0];
	}
	function getSecondName(fullNameElement) {
		let secondName = fullNameElement.textContent.trim()
		const array = secondName.split(" ");
		return array[array.length - 1];
	}
	function getConnections(connectionsElement) {
		return connectionsElement.textContent.replace(/[^0-9]/g,"")
	}
	function getLinkedinLink(tripleDotBtnElement) {
		tripleDotBtnElement.click()

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				document.querySelector('div[data-control-name="copy_linkedin"]').click()
				resolve(true)
			}, 1500)
		});
	}
	function getLocationElement() {
		const ember41 = document.getElementById('ember41')
		let location = 'null';
		if(ember41) {
			location = ember41.querySelectorAll('[data-anonymize="location"]');
			if(location.length > 0) {
				location = location[0].innerText.trim()
			}
			else{
				location = 'null'
			}
		}
		return location
	}
	function getIndustryElement() {
		const ember41 = document.getElementById('ember41')
		let location = 'null';
		if(ember41) {
			location = ember41.querySelectorAll('[data-anonymize="industry"]');
			if(location.length > 0) {
				location = location[0].innerText.trim()
			}
			else{
				location = 'null'
			}
		}
		return location
	}

	let arr = [];

	const fulNameElement = getElementByXpath("//html/body/main/div[1]/div[1]/div/div[1]/div[1]/div/dl/dt/span")
	const titleElement = getElementByXpath("//html/body/main/div[1]/div[1]/div/div[1]/div[2]/dl/dd[1]/div/div/span/span[1]")
	const companyElement = getElementByXpath("//html/body/main/div[1]/div[1]/div/div[1]/div[2]/dl/dd[1]/div/div/span/a")
	const tripleDotBtnElement = getElementByXpath("//html/body/main/div[1]/div[1]/div/div[2]/div[1]/div[3]/button")
	const connectionsElement = getElementByXpath("//html/body/main/div[1]/div[1]/div/div[1]/div[1]/div/dl/dd[3]/div[2]")
	const leadLocationElement = getElementByXpath("//html/body/main/div[1]/div[1]/div/div[1]/div[1]/div/dl/dd[3]/div[1]")
	const companyLocationElement = getLocationElement()
	const industryElement = getIndustryElement()


	try {
		fulNameElement ? ( () => {
			arr.push(getFirstName(fulNameElement))
			arr.push(getSecondName(fulNameElement))
		})() : (() => {
			arr.push("First name")
			arr.push("Second name")
		})()
		titleElement ? arr.push(titleElement.innerText) : (() => {
			arr.push("Tittle")
		})()
		connectionsElement ? arr.push(getConnections(connectionsElement)) : (() => {
			arr.push("Connections")
		})()
		companyElement ? arr.push(companyElement.innerText) : (() => {
			arr.push("Company name")
		})
		industryElement ? arr.push(industryElement) : (() => {
			arr.push("Industry")
		})()
		companyLocationElement ? arr.push(companyLocationElement) : (() => {
			arr.push("Company location")
		})
		leadLocationElement ? arr.push(leadLocationElement.innerText.trim()) : (() => {
			arr.push("Lead location")
		})


		if(await getLinkedinLink(tripleDotBtnElement)) {
			navigator.clipboard.readText().then(data => {
				arr.push(data)
				chrome.runtime.sendMessage({
					status: 'ok',
					data: arr
				})
			}).catch(err => {
				chrome.runtime.sendMessage({
					status: 'err',
					error: err
				})
				throw "Some problem with copy/paste"
			})
		}

	}catch (err) {
		alert(err)
	}
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(body, sender, sendResponse) {
	alert(body.message)
}

function addBtn() {
	let btnDiv = document.createElement("div");
	btnDiv.className = "copyBtnDiv";
	document.body.appendChild(btnDiv);

	let btn = document.createElement("button")
	btn.className = "copyBtn"
	btn.innerText = "Parse"
	btnDiv.appendChild(btn);

	btn.addEventListener("click", getData);
}

window.onload = function() {
	addBtn()
};

// Next level
function optionalPanel() {
	let panelBlock = document.createElement('div')
	panelBlock.className = 'panelBlockContainer'
	panelBlock.id = 'mydiv'
	document.body.appendChild(panelBlock);

	dragElement(document.getElementById("mydiv"));
}

function dragElement(elmnt) {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
