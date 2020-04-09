var deDom = document.getElementsByTagName("html");
console.log(deDom);
getWoordenlijst();
            
function loadStoredVariable() {
    document.getElementById("here12").innerHTML = sessionStorage.getItem("selectedLesson");
}

//Get woord(en)		
			
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

//Add woord
			
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

//Delete woord
			
function deleteWoord(idVertaling) {
	console.log(idVertaling);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8082/deleteVertaling" + sessionStorage.getItem("selectedLesson") + "en" + idVertaling;
    //var url = "http://localhost:8082/D" + idVertaling
    xhr.open("DELETE", url, "true");
	xhr.send();
						
	getWoordenlijst();
}  

//Update woord

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
				
	getWoordenlijst();
}

//Get Les(sen)

function getLessonList() {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if (this.readyState==4) {
            document.getElementById("lessenLijst").innerHTML = "";
            var lessonArray = JSON.parse(this.responseText);
            for (var a = 0; a<lessonArray.length; a++) {
                placeButton(lessonArray[a].id, lessonArray[a].naam);
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/lesLijst", "true")
    xhr.send();
}

//Add les

function addLesson() {
    var lesObject = {};
    lesObject.naam = document.getElementById("lessonToevoegen").value;
    document.getElementById("lessonToevoegen").value = "";
    var loJSON = JSON.stringify(lesObject);

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8082/lesMaken", "true");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(loJSON);
}

//Delete les
            
function deleteLes() {
    var xhr = new XMLHttpRequest();
    alert(sessionStorage.getItem("selectedLesson"))
    var url = "http://localhost:8082/deleteLesson" + sessionStorage.getItem("selectedLesson");

    xhr.open("DELETE", url, "true");
    xhr.send()

    sessionStorage.removeItem("selectedSession");
    window.open("file:///D:/Spring%20WT/TaalAppProject/LesPagina.html", "_parent")
}

//Update les

function changeLessonName() {
	var url = "http://localhost:8082/changeLessonName" +document.getElementById("newNameLesson").value+"in"+sessionStorage.getItem("selectedLesson");
	document.getElementById("newNameLesson").value="";
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, "true");
	xhr.send();
}

//Button function

function placeButton(id, naam) {
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
    //alert(sessionStorage.getItem("selectedLesson"));
    
    window.open("file:///D:/Spring%20WT/TaalAppProject/testinglocalstorage.html", "_parent")
}

//Pop-Up window functions

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