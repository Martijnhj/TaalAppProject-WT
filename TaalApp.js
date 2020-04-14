var deDom = document.getElementsByTagName("html");
console.log(deDom);

/*
	Vertaling woord CRUD
*/

//GET		
function getWoordenlijst() {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(this.readyState==4){
			var woordenArray = JSON.parse(this.responseText);
			document.getElementById("woordenLijst").innerHTML="";
						
			for(var a=0; a<woordenArray.length; a++) {
				var codeBlock = '<table>'+
									'<tr>' + 
										'<td class="contentColumn">' + woordenArray[a].primaryLanguage + '</td>' +
										'<td class="contentColumn">' + woordenArray[a].targetLanguage + '</td>' +
										'<td class="buttonColumn"><input type="button" value="delete" onclick="openWindow(deleteWoord,'+woordenArray[a].id+')" class="buttonInTable"></td>' +
										'<td class="buttonColumn"><input type="button" value="change" onclick="getSpecificWoordForChange('+woordenArray[a].id+')" class="buttonInTable"></td>' +
	            					'</tr>' + 
								'</table>';
				document.getElementById("woordenLijst").innerHTML += codeBlock;
			}
		}
	}
	var url = "http://localhost:8082/lesVertalingen" + sessionStorage.getItem("selectedLesson");
	xhr.open("GET", url , "true");
    xhr.send();
}

function getSpecificWoordForChange(idVertaling) {
	console.log(idVertaling);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8082/G" + idVertaling;
	document.getElementById("changeOpties").style.display = "block";
				
	xhr.onreadystatechange = function() {
		if (this.readyState==4) {
			
			var specificWoord = JSON.parse(this.responseText);
			document.getElementById("woordVerandering").value = specificWoord.primaryLanguage;
			document.getElementById("vertalingVerandering").value = specificWoord.targetLanguage;
            sessionStorage.setItem("changeWoordId", specificWoord.id);
		}
	}
	xhr.open("GET", url, "true");
	xhr.send();			
}

//POST	
function addWoord() {
	var niewWoord = {};
	niewWoord.primaryLanguage = document.getElementById("woord1").value;
	niewWoord.targetLanguage = document.getElementById("woordVertaling").value;
	var nwJSON = JSON.stringify(niewWoord);
				
	var xhr = new XMLHttpRequest();
                
    var url = "http://localhost:8082/vertalingToevoegen" + sessionStorage.getItem("selectedLesson");
	xhr.open("POST", url, "true");
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(nwJSON);
				
	document.getElementById("woord1").value = "";
	document.getElementById("woordVertaling").value = "";
				
	getWoordenlijst();
}

//DELETE
function deleteWoord(idVertaling) {
	console.log(idVertaling);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8082/deleteVertaling" + sessionStorage.getItem("selectedLesson") + "en" + idVertaling;
    //var url = "http://localhost:8082/D" + idVertaling
    xhr.open("DELETE", url, "true");
	xhr.send();
						
	getWoordenlijst();
}  

//PUT
function updateWoord() {
	var veranderdWoord = {};
	veranderdWoord.primaryLanguage = document.getElementById("woordVerandering").value;
	veranderdWoord.targetLanguage =  document.getElementById("vertalingVerandering").value;
	var vwJSON = JSON.stringify(veranderdWoord);
				
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8082/C" + sessionStorage.getItem("changeWoordId");
    sessionStorage.removeItem("changeWoordId");
                
	xhr.open("PUT", url, "true");
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(vwJSON);
				
	document.getElementById("woordVerandering").value="";
	document.getElementById("vertalingVerandering").value="";
	document.getElementById("changeOpties").style.display = "none";
				
	getWoordenlijst();
}


/*
	Lesson CRUD
*/

//GET
function getLessonList() {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if (this.readyState==4) {
            document.getElementById("lessenLijst").innerHTML = "";
            var lessonArray = JSON.parse(this.responseText);
            for (var a = 0; a<lessonArray.length; a++) {
                placeLessonSelectButton(lessonArray[a].id, lessonArray[a].naam);
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/lesLijst", "true")
    xhr.send();
}

function getSpecificLes() {
	return new Promise(function(resolve,reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState==4) {
				var lessonObject = JSON.parse(this.responseText);
				sessionStorage.setItem("lessonName", lessonObject.naam);
				resolve();
			}
		}
		var url = "http://localhost:8082/specificLesVars" + sessionStorage.getItem("selectedLesson");
		xhr.open("GET", url, "true")
		xhr.send();
	})
}


//POST
function addLesson() {
    var lesObject = {};
    lesObject.naam = document.getElementById("lessonToevoegen").value;
    document.getElementById("lessonToevoegen").value = "";
    var loJSON = JSON.stringify(lesObject);

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8082/lesMaken", "true");
    xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(loJSON);
	getLessonList();
}

//DELETE     
function deleteLes() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8082/deleteLesson" + sessionStorage.getItem("selectedLesson");

    xhr.open("DELETE", url, "true");
    xhr.send()

    sessionStorage.removeItem("selectedSession");
    window.open("file:///D:/Spring%20WT/TaalAppProject/LesPagina.html", "_parent")
}

//PUT
function changeLessonName(newValue) {
	var url = "http://localhost:8082/changeLessonName" +newValue+"in"+sessionStorage.getItem("selectedLesson");
	console.log(newValue);
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, "true");
	xhr.send();
}

/* 
	Course CRUD
*/

//GET
function getCourseList() {
		var xhr = new XMLHttpRequest;
		xhr.onreadystatechange = function() {
			if (this.readyState==4) {
				document.getElementById("courseListBlock").innerHTML = "";
				var lessonArray = JSON.parse(this.responseText);
				for (var a = 0; a<lessonArray.length; a++) {
					document.getElementById("courseListBlock").innerHTML += lessonArray[a].naam + "<br>";
					//placeLessonSelectButton(lessonArray[a].id, lessonArray[a].naam);
				}
				resolve();
			}
		}
		xhr.open("GET", "http://localhost:8082/courseLijst", "true")
		xhr.send();
}

function getSpecificCourse() {
	return new Promise(function(resolve,reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState==4) {
				var lessonObject = JSON.parse(this.responseText);
				sessionStorage.setItem("courseName", lessonObject.naam);
				resolve();
			}
		}
		var url = "http://localhost:8082/............." + sessionStorage.getItem("selectedLesson");
		xhr.open("GET", url, "true")
		xhr.send();
	})
}


//POST
function addCourse() {
	return new Promise(function(resolve,reject){
		var courseObject = {};
		courseObject.naam = document.getElementById("newCourseName").value;
		document.getElementById("newCourseName").value = "";
		var coJSON = JSON.stringify(courseObject);

		var xhr = new XMLHttpRequest();
		xhr.open("POST","http://localhost:8082/courseMaken", "true");
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(coJSON);
		getCourseList();
		resolve();
	})
	//still needs to build in a way to wait for this function to finish.
	//It can't await gercourse list because this finishes fine. It is server side ms delay before the addition/change is saved.
}

//DELETE     
function deleteCourse() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8082/............" + sessionStorage.getItem("selectedLesson");

    xhr.open("DELETE", url, "true");
    xhr.send()

    sessionStorage.removeItem("selectedSession");
    window.open("file:///D:/Spring%20WT/TaalAppProject/CoursePagina.html", "_parent")
}

//PUT
function changeCourseName(newValue) {
	var url = "http://localhost:8082/................." +newValue+"in"+sessionStorage.getItem("selectedLesson");
	console.log(newValue);
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, "true");
	xhr.send();
}

/*
	Lesson selection button function
*/
function placeLessonSelectButton(id, naam) {
	var lessonButton = document.createElement("button");
    lessonButton.id = id;
    lessonButton.innerHTML = naam;
    lessonButton.onclick = function() {
		enterLesson(id);
    }
    lessenLijst.appendChild(lessonButton);
}

function enterLesson(id) {
    window.sessionStorage 
    sessionStorage.setItem("selectedLesson", id);
    window.open("file:///D:/Spring%20WT/TaalAppProject/testinglocalstorage.html", "_parent")
}

/*
	Delete pop-Up window functions
*/
function closeWindow() {
	document.getElementById("deletePopUp").style.display = "none";
}

function confirmDeletion(id, deleteFunction) {
	document.getElementById("confirm").onclick = deleteFunction(id);
}
			
function openWindow(deleteFunction, id) {
	placePopUpButton(deleteFunction, id);
	document.getElementById("deletePopUp").style.display = "block";
}

function placePopUpButton(deleteFunction, id) {
	deletePopUpContent.removeChild(deletePopUpContent.lastChild) //delete previous created button
    var lessonButton = document.createElement("button");
    lessonButton.innerHTML = "confirm";
	lessonButton.id = "confirm"
    lessonButton.onclick = function() {
        deleteFunction(id);
	    closeWindow();
    }
    deletePopUpContent.appendChild(lessonButton);
}