var name = undefined;
var phone = undefined;
var email = undefined;
var message = undefined;




function Show(){
	document.getElementById('window').style.display = "block";
	document.getElementById('overlay').style.display = "block";
	document.getElementById('back').style.display = "block";
	document.getElementById('window').style.position = "absolute";
	document.getElementsByTagName('body')[0].style.overflow = "hidden";
	document.getElementById('overlay').scrollTo(0,0);
}


function Close(){
	document.getElementById('window').style.display = "none";
	document.getElementById('overlay').style.display = "none";
	document.getElementById('back').style.display = "none";
	document.body.style.overflow = "scroll";
}

function Send(obForm, event){
	event.preventDefault()
	if(document.getElementById('name').value && document.getElementById('phone').value.length===11 && 
	document.getElementById('message').value){

	let xhr = new XMLHttpRequest();
	xhr.open('POST',"./ajax.json");
	xhr.send(new FormData(obForm));
	xhr.onload = function(){
		if(xhr.status != 200){
			alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
		}
		else{
			var json = JSON.parse(xhr.responseText)
			if(!json.success){
				let errorStr = '';
				for (let fieldKey in json.errors){
					errorStr += json.error[fieldKey] + '<br>';
				}
				document.getElementById('error-msg').innerHTML = errorStr;
			} else{
				alert("Отправлено");
			}
		}
	}
	xhr.onerror = function () {
		alert("Произошла ошибка");
	}

	}
	else if(!document.getElementById('name').value){
		document.getElementById('err').innerHTML = "Введите имя";
	}
	else if(document.getElementById('phone').value.length!=11){
		document.getElementById('err').innerHTML = "Телефон введен неверно";
	}
	else if(!document.getElementById('message').value){
		document.getElementById('err').innerHTML = "Напишите сообщение";
	}
	
}
