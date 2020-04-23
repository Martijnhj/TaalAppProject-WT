var deDom = document.getElementsByTagName("html");
console.log(deDom);

/*
	Vertaling woord CRUD
*/

//GET		
function getWoordenlijst() {
	return new Promise(function(resolve,reject){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(this.readyState==4){
			var woordenArray = JSON.parse(this.responseText);
			console.log(woordenArray[0].primaryLanguage)
			resolve(woordenArray);
		}
	}
	var url = "http://localhost:8082/lesVertalingen" + sessionStorage.getItem("selectedLesson");
	xhr.open("GET", url , "true");
	xhr.send();
	})
}

async function getWoordenlijstMakeUp() {
	var woordenArray = await getWoordenlijst();
	//console.log(woordenArray[0].primaryLanguage);
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
				
	getWoordenlijstMakeUp();
}

//DELETE
function deleteWoord(idVertaling) {
	console.log(idVertaling);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8082/deleteVertaling" + sessionStorage.getItem("selectedLesson") + "en" + idVertaling;
    //var url = "http://localhost:8082/D" + idVertaling
    xhr.open("DELETE", url, "true");
	xhr.send();
						
	getWoordenlijstMakeUp();
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
				
	getWoordenlijstMakeUp();
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
	var url = "http://localhost:8082/courseLessenLijst" + sessionStorage.getItem("selectedCourse");
    xhr.open("GET", url, "true")
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
	var url = "http://localhost:8082/lesToevoegen" + sessionStorage.getItem("selectedCourse");
    xhr.open("POST", url, "true");
    xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(loJSON);
	getLessonList();
}

//DELETE     
function deleteLes() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8082/deleteLes" + sessionStorage.getItem("selectedLesson") + "binnen" + sessionStorage.getItem("selectedCourse");

    xhr.open("DELETE", url, "true");
	xhr.send()
	
    sessionStorage.removeItem("selectedLesson");
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
				var courseArray = JSON.parse(this.responseText);
				for (var a = 0; a<courseArray.length; a++) {
					placeCourseSelectButton(courseArray[a].id, courseArray[a].naam);
				}
			}
		}
		var url="http://localhost:8082/taalCoursesLijst" + sessionStorage.getItem("selectedTaal")
		xhr.open("GET", url, "true")
		xhr.send();
}

function getSpecificCourse() {
	return new Promise(function(resolve,reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState==4) {
				var courseObject = JSON.parse(this.responseText);
				sessionStorage.setItem("courseName", courseObject.naam);
				resolve();
			}
		}
		var url = "http://localhost:8082/specificCourseVars" + sessionStorage.getItem("selectedCourse");
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
		var url = "http://localhost:8082/courseToevoegen" + sessionStorage.getItem("selectedTaal")
		xhr.open("POST", url, "true");
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
    var url = "http://localhost:8082/deleteCourse" + sessionStorage.getItem("selectedCourse");

    xhr.open("DELETE", url, "true");
    xhr.send()

    sessionStorage.removeItem("selectedCourse");
    window.open("file:///D:/Spring%20WT/TaalAppProject/CoursePagina.html", "_parent")
}

//PUT
function changeCourseName(newValue) {
	var url = "http://localhost:8082/changeCourseName" +newValue+"in"+sessionStorage.getItem("selectedCourse");
	console.log(newValue);
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, "true");
	xhr.send();
}

/*
	Taal CRUD
*/

//GET
function getTaalList() {
	var xhr = new XMLHttpRequest;
	xhr.onreadystatechange = function() {
		if (this.readyState==4) {
			document.getElementById("taalSelectBlock").innerHTML = "";
			var taalArray = JSON.parse(this.responseText);
			for (var a = 0; a<taalArray.length; a++) {
				placeTaalSelectButton(taalArray[a].id, taalArray[a].naam);
			}
		}
	}
	xhr.open("GET", "http://localhost:8082/taalLijst", "true")
	xhr.send();
}

function getSpecificTaal() {
	return new Promise(function(resolve,reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState==4) {
				var taalObject = JSON.parse(this.responseText);
				sessionStorage.setItem("taalName", taalObject.naam);
				resolve();
			}
		}
		var url = "http://localhost:8082/specificTaalVars" + sessionStorage.getItem("selectedTaal");
		xhr.open("GET", url, "true")
		xhr.send();
	})
}

//POST
function addTaal() {
    var taalObject = {};
    taalObject.naam = document.getElementById("taalToevoegen").value;
    document.getElementById("taalToevoegen").value = "";
    var toJSON = JSON.stringify(taalObject);

	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8082/taalMaken";
    xhr.open("POST", url, "true");
    xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(toJSON);
	getTaalList();
}

//DELETE     
function deleteTaal() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8082/deleteTaal" + sessionStorage.getItem("selectedTaal");

    xhr.open("DELETE", url, "true");
    xhr.send()

	sessionStorage.removeItem("selectedSession");
	
    window.open("file:///D:/Spring%20WT/TaalAppProject/TaalPagina.html", "_parent")
}

//PUT
function changeTaalName(newValue) {
	var url = "http://localhost:8082/changeTaalName" +newValue+"in"+sessionStorage.getItem("selectedTaal");
	console.log(newValue);
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, "true");
	xhr.send();
}


/*
	Lesson, Course selection button function
*/
function placeLessonSelectButton(id, naam) {
	var lessonButton = document.createElement("button");
    lessonButton.id = id;
    lessonButton.innerHTML = naam;
    lessonButton.onclick = function() {
		sessionStorage.setItem("selectedLesson", id);
    	window.open("file:///D:/Spring%20WT/TaalAppProject/testinglocalstorage.html", "_parent")
    }
    lessenLijst.appendChild(lessonButton);
}

function placeCourseSelectButton(id, naam) {
	var courseButton = document.createElement("button");
	courseButton.id = id;
	courseButton.innerHTML = naam;
	courseButton.onclick = function(){
		sessionStorage.setItem("selectedCourse", id);
		window.open("file:///D:/Spring%20WT/TaalAppProject/LesPagina.html", "_parent")
	}
	courseListBlock.appendChild(courseButton);
}

function placeTaalSelectButton(id, naam) {
	var taalButton = document.createElement("button");
	taalButton.id = id;
	taalButton.innerHTML = naam;
	taalButton.onclick = function(){
		sessionStorage.setItem("selectedTaal", id);
		window.open("file:///D:/Spring%20WT/TaalAppProject/CoursePagina.html", "_parent")
	}
	taalSelectBlock.appendChild(taalButton);
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
			
function openWindow(deleteFunction) {
	placePopUpButton(deleteFunction);
	document.getElementById("deletePopUp").style.display = "block";
}

function placePopUpButton(deleteFunction) {
	deletePopUpContent.removeChild(deletePopUpContent.lastChild) //delete previous created button
    var lessonButton = document.createElement("button");
    lessonButton.innerHTML = "confirm";
	lessonButton.id = "confirm"
    lessonButton.onclick = function() {
        deleteFunction();
	    closeWindow();
    }
    deletePopUpContent.appendChild(lessonButton);
}