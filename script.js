let buttons = {
    register : true,
    userInfo : false,
    play : false,
    generateToken : false
}

let users = [];
let id = 0;

let reg = document.getElementById('register');
let userinfo = document.querySelector('.user-info');
reg.addEventListener('click',registerUser);

let form = document.querySelector('.form');
// register new user and store the info of user

function registerUser(){
    // console.log(buttons);
    if(buttons.register){
        console.log('cliked');
        form.classList.remove('hide');
    
        let submitBtn = document.getElementById('submit');
        console.log(submitBtn);
        submitBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            console.log('submit');
            let name = document.getElementById('name');
            let email = document.getElementById('email');
            let username = document.getElementById('userName');

            console.log(name.value,email.value,username.value);

            let user = {};
            user.id = ++id;
            user.name = name.value;
            user.email = email.value;
            user.username = username.value;

            users.push(user);
            // console.log(user);
            // console.log(users);
            localStorage.setItem('users',JSON.stringify(users));
            buttons.register = false;
            buttons.userInfo = true;
            // buttons.play = true;

            console.log(buttons);
            alert("Successfully Registered");

            form.classList.add('hide');
        
        }); 
    }
    else{
        alert("Already Registered");
    }
}


let uInfo = document.getElementById('userInfo');
uInfo.addEventListener('click',showUserInfo);

// display users info

function showUserInfo(){
    // console.log("userinfo");
    if(buttons.userInfo){
        userinfo.classList.remove('hide');
        let u =JSON.parse(localStorage.getItem('users'));
        for(let o of u){
            let div = [];
            for(let i = 0; i < 4; i++){
                div[i] = document.createElement('div');
                div[i].setAttribute('class','col');
            }
            div[0].innerText = o.id;
            div[1].innerText = o.name;
            div[2].innerText = o.email;
            div[3].innerText = o.username;
            for(d of div){
                userinfo.appendChild(d);
            }
            // console.log(div);
        }
        buttons.play = true;
    }
}

let play = document.getElementById('play');
let diceDiv = document.querySelector('.play-dice');
let count = 0;
let sum = 0;
let roll = 0;
play.addEventListener('click',() =>{
    // console.log('play');
    console.log(buttons);
    if(buttons.play){
        ++count;
        console.log(count);
        userinfo.classList.add('hide');
        buttons.userInfo = false;
        
        diceDiv.classList.remove('hide');
        let dice = document.getElementById('dice');
        dice.addEventListener('click',()=>{
            if(count <= 2){
                // console.log('cliked on dice');
                let x = rollTheDice();
                let h2 = diceDiv.querySelector('h2');
                let span = diceDiv.querySelector('span');
                sum += x;
                h2.innerText = x;
                span.innerText = sum;
                ++roll;
                console.log('roll',roll);
                console.log('sum',sum);
                    if(roll == 3 && sum >= 10){
                        h2.innerText = x;
                        span.innerText = sum;
                        alert(`Your able to generate token sum is : ${sum}`);
                        sum = 0;
                        buttons.play = false; //changed to fasle imp
                        buttons.generateToken = true;
                        diceDiv.classList.add('hide');
                    }
                    else if(roll == 3 && sum < 10 && count < 2){
                        h2.innerText = x;
                        span.innerText = sum;
                        roll = 0;
                        sum = 0;
                        alert("Try Once Again");
                        h2.innerText = 0;
                        span.innerText = 0;
                        diceDiv.classList.add('hide');
                    }
                    else if(roll == 3 && sum < 10 && count == 2){
                        alert("Bad luck!!!");
                        buttons.play = false; //changed to fasle imp
                        diceDiv.classList.add('hide');
                    }
            }
            else if(count > 2){
                alert("Bad luck!!!");
                buttons.play = false; //changed to fasle imp
                diceDiv.classList.add('hide');
            }
        });
    }
});

function rollTheDice(){
    // console.log('cliked dice');
    let number = Math.floor(Math.random()*6)+1;
    return number;
}


let genToken = document.getElementById('generateToken');
genToken.addEventListener('click',makeToken);
let congrats = document.querySelector('.congrats');
// genrate token
const digits = "0123456789";
function makeToken(){
    console.log('cliked');
    if(buttons.generateToken){
        congrats.classList.remove('hide');

        let token = "";
        const len = digits.length;

        for(let i = 0; i < 12; i++){
            token += digits.charAt(Math.floor(Math.random()*len));
        }

        console.log(token);

        let spanText = congrats.querySelector('span');
        spanText.innerText = token;
    }
}


