async function createUser(){
    let userData = getInput();
    await createArrayOfUsers();
    await checkNewUser(userData, users);
}

function getInput(){
    const contentMailRef = document.getElementById('create_mail');
    let mail = contentMailRef.value;
    const contentPasswordRef = document.getElementById('create_pw');
    let passw = contentPasswordRef.value;
    let userData = {
        "mail" : mail,
        "password" : passw
    };
    return userData
}

async function checkNewUser(userObj, userArr){
    let amountOfUsers = userArr.length;
    let userExistance = false;
    for (let index = 0; index < amountOfUsers; index++) {
        if((userArr[index].mail == userObj.mail) && (userArr[index].password == userObj.password)){
            alert('Benutzer schon vorhanden');
            document.getElementById('create_mail').value = '';
            document.getElementById('create_pw').value = '';
            userExistance = true;
            break;
        } 
    }
    if(userExistance == false){
        await postUserInDatabase(userObj);
    }
}

async function postUserInDatabase(newUserObj){
    await postData('/users', newUserObj);
    alert('Du hast du erfolgreich registriert.');
    window.location.href = '../index.html';
}