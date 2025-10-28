let users = [];
const BASE_URL = 'https://remotestorage-162fc-default-rtdb.europe-west1.firebasedatabase.app/';

async function init(){
    console.log('Hallo');
    // await loadData('/users/type');
    let newUser = {
        "mail" : "papa@test.de",
        "password" : "Papa123"
    };
    // await postData('/users', newUser);
    let userResponse = await getAllUsers('/users');
    let userKeysArr = Object.keys(userResponse);
    console.log(userKeysArr);
    fillArrayOfUsers(userKeysArr, userResponse);
}

async function login(){
    let loginData = getInputData();
    await createArrayOfUsers();
    checkIfUserExist(loginData);
}

function getInputData(){
    const contentUserMailRef = document.getElementById('login_mail');
    const contentUserPasswordRef = document.getElementById('login_pw');
    let userMail = contentUserMailRef.value;
    let userPassword = contentUserPasswordRef.value;
    let loginData = {
        "mail" : userMail,
        "password" : userPassword
    };
    return loginData;
}

async function createArrayOfUsers(){
    let userResponse = await getAllUsers('/users');
    let userKeysArr = Object.keys(userResponse);
    console.log(userKeysArr);
    fillArrayOfUsers(userKeysArr, userResponse);
}

function checkIfUserExist(userObj){
    let amountOfUsers = users.length;
    let numberOfAttempts = 0;
    for (let index = 0; index < amountOfUsers; index++) {
        if ((users[index].mail == userObj.mail) && (users[index].password == userObj.password)){
            window.location.href = './html/dragDrop.html';
        }else{
            numberOfAttempts += 1;
        }
    }
    showMessageBox(amountOfUsers, numberOfAttempts);
}

function showMessageBox(amountOfUsers, numberOfAttempts){
    if(numberOfAttempts >= amountOfUsers){
        // window.location.href = './html/createUser.html';
        document.getElementById('form_container').classList.add('invisible');
        document.getElementById('msg_box').classList.remove('invisible');
    }
}

async function loadData(path=''){
    let response = await fetch(BASE_URL + path + '.json');
    console.log(response);
    // let responseAtJason = await response.json();
    // console.log(responseAtJason);
}

async function getAllUsers(path=''){
    let response = await fetch(BASE_URL + path + '.json');
    console.log(response);
    let responseAtJason = await response.json();
    console.log(responseAtJason);
    return responseAtJason;
}

async function postData(path='', data={}){
    await fetch(BASE_URL + path + '.json',{
        method : "POST",
        header : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(data)
    });
}

function fillArrayOfUsers(objKeysArr, userObj){
    let keysArr = objKeysArr;
    let amountOfUsers = objKeysArr.length;

    for (let index = 0; index < amountOfUsers; index++) {
        users.push({
            "mail" : `${userObj[keysArr[index]].mail}`,
            "password" : `${userObj[keysArr[index]].password}`
        });
    }
    console.log(users);
}

function tryAgain(){
    window.location.reload();
}