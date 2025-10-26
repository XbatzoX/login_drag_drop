let users = [];
const BASE_URL = 'https://remotestorage-162fc-default-rtdb.europe-west1.firebasedatabase.app/';

async function init(){
    console.log('Hallo');
    // await loadData('/users/type');
    let newUser = {
        "mail" : "henri@test.de",
        "password" : "Henri123"
    };
    // await postData('/users', newUser);
    let userResponse = await getAllUsers('/users');
    let userKeysArr = Object.keys(userResponse);
    console.log(userKeysArr);
    fillArrayOfUsers(userKeysArr, userResponse);
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