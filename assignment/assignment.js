function showpass() {
    let password = document.getElementById('password_idl');

    if (password.type == 'password') {
        password.type = 'text';

        document.getElementById('showpass').innerHTML = 'Hide password';
    } else {
        password.type = 'password';

        document.getElementById('showpass').innerHTML = 'show password';
    }
    return false;
}

function register() {
    const firstName = document.getElementById("first_id").value;
    const lastName = document.getElementById("last_id").value;
    const email = document.getElementById("email_id").value;
    const address = document.getElementById("address_id").value;
    const password = document.getElementById("password_id").value;

    const user = {
        "firstname": firstName,
        "lastname" : lastName,
        "email" : email,
        "address" : address,
        "password": password,
    }

        // check if the user exists already..
    let users = localStorage.getItem("users");

    if (users == undefined || users == null) {
        // no user has been registered
        users = [];

        users.push(user);

        // save back to local storage
        users = JSON.stringify(users);

        localStorage.setItem('users',users);

        alert('user registered successfully');

        window.location.href = 'assignwelcome.html';
    } else {
        users = JSON.parse(users);

        success = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i]["email"] == email) {
                success.push(1);
                break;
            }
            
        }
        if(!success.includes(1)){
            // the user is not registered..
            users.push(user);

            users = JSON.stringify(users);

            localStorage.setItem("users",users);
            alert("New User "+user['firstname'] + " registered successfully!");
            
        } else {

            alert("user exists already");
            
        }
    }
}

function login () {
    let users = localStorage.getItem('users');

    users = JSON.parse(users);

    let emaillog = document.getElementById('email_idl').value;
    let passwordlog = document.getElementById('password_idl').value;

    for (i = 0; i < users.length; i++) {
      if  (users[i]['email'] == emaillog && users[i]['password'] == passwordlog) {

        localStorage.setItem('login_status', JSON.stringify(emaillog));
        window.location.href = 'assignwelcome.html';

        
      } else {
        document.getElementById('signup').innerHTML = `<strong style='color:red;'>wrong email and password</strong>`;
      }
    }
}

function update() {
    let users = localStorage.getItem('users');

    users = JSON.parse(users);
    
    success = [];
    for(let i = 0;i < users.length; i++) {

        if(users[i]['email'] == document.getElementById('email_old').value) {

            success.push(1);

            users[i]['email'] = document.getElementById('email_new').value;

            users = JSON.stringify(users);

            localStorage.setItem('users',users);

            document.getElementById('check').innerHTML = `<strong style='color:blue;'>email changed successfully..Go back to your <a href='assignwelcome.html'>profile..</a></strong>`;

            break;
        } else {
            document.getElementById('check').innerHTML = `<strong style='color:red;'>wrong email</strong>`;

        }
    }    
}

function logout() {

    localStorage.removeItem('login_status');

    window.location.href = 'assignlogin.html';

    
}


/**
 * This function checks to see if a user is currently logged in
 */
function checkLogin(){

    let check_login = localStorage.getItem('login_status');
    if(check_login == null || check_login == undefined){
        //then this means no user is logged in
        //location.href='assignlogin.html';
    }else{
        //is a user logged in?
        check_login = JSON.parse(check_login);

        if(check_login == ''){
            //mo user is logged in
            //location.href='assignlogin.html';
        }else{
            // a user is logged in..
            location.href='assignwelcome.html';
        }
        
    }

}


function checkLogout(){

    let check_login = localStorage.getItem('login_status');

    if(check_login == null || check_login == undefined){
        location.href='assignlogin.html';
    }
}

function createNote(){

    let date = new Date();
    timestamp = date.getTime();

    const title = document.getElementById('note_id').value;
    const body = document.getElementById('note_body_id').value;


    note = {

        'id': timestamp,
        'title': title,
        'body': body
    }

    let stored_notes = localStorage.getItem('notes');

    if(stored_notes == null || stored_notes == undefined){
        //No note has been stored..
        stored_notes = [];
        stored_notes.push(note);
        stored_notes = JSON.stringify(stored_notes);
        localStorage.setItem('notes', stored_notes);

        alert("New Note Created!");

    }else{

        stored_notes = JSON.parse(stored_notes);

        stored_notes.push(note);

        localStorage.setItem('notes', JSON.stringify(stored_notes));

        alert("New Note Created!");

    
    }



}

function getNotes(){

    let stored_notes = localStorage.getItem('notes');

    if(stored_notes == null || stored_notes == undefined){
        document.getElementById('notes_info').innerHTML = "There are no notes at the moment";
    }else{
        stored_notes = JSON.parse(stored_notes);
        num_of_notes = stored_notes.length;
        document.getElementById('notes_info').innerHTML = `There are ${num_of_notes} notes at the moment`;

        let note_code = `<div>`;

        for(let i=0; i< stored_notes.length; i++){
            title = stored_notes[i]['title'];
            body = stored_notes[i]['body'];
            id = stored_notes[i]['id'];

            note_code += `<h4>${title}</h4>
                            <hr>
                            <p>${body}</p>`;

        }

        note_code += `</div>`;

        document.getElementById('notes_content_id').innerHTML = note_code;



    }



}