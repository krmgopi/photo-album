// Get ID

let username = document.getElementById('username');
let userpwd = document.getElementById('userpwd');
let userlogin = document.getElementById('userlogin');

userlogin.addEventListener('click', validateUser);

function validateUser(e){
    e.preventDefault();
    if(username.value === ''){
        alert("please enter your username");
        username.focus();
        return false;
    }
    if(userpwd.value === ''){
        alert("please enter your password");
        userpwd.focus();
        return false;
    }
    if(username.value !== 'admin' || userpwd.value !== 'admin'){
        alert('incorrect username or password')
        return false;
    }
    if(username.value === 'admin' && userpwd.value === 'admin'){
        window.open('album.html', '_self', '', 'index.html');
        return true;
    }
}


