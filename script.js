var name = undefined;
var phone = undefined;
var email = undefined;
var message = undefined;



function Show(){
	document.getElementById('window').style.display = "block";
	document.getElementById('overlay').style.display = "block";
}

function Close(){
	document.getElementById('window').style.display = "none";
	document.getElementById('overlay').style.display = "none";
}

function Send(){
	if(document.getElementById('name').value && document.getElementById('phone').value.length===11 && 
	document.getElementById('message').value){
	name = document.getElementById('name').value;
	phone = document.getElementById('phone').value;
	email = document.getElementById('email').value;
	message = document.getElementById('message').value;
	let m = {
		name: name,
		phone: phone,
		email: email,
		message: message
	}
	console.log(JSON.stringify(m));
	
	let xhr = new XMLHttpRequest();
	xhr.open('POST',"./ajax.json");
	xhr.send(new FormData(obForm), obForm, "./ajax.json");
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
			} else{}
		}
		
	}

	alert("Отправлено");
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
