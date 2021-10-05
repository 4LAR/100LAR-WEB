function login(name='', password='') {
  if (name.length == 0){
    var name = document.getElementById('login_username').value;
    var password = document.getElementById('login_password').value;
  }
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      if (xhr.responseText.toString() == 'OK') {
        readName();
        document.getElementById('login_username').value = '';
        document.getElementById('login_password').value = '';
      }
    }

  }
  xhr.send(encodeURI('username=' + name + '&password=' + password));
}

readName();
function readName() {
  var xhr = new XMLHttpRequest();
    xhr.open('GET', '/user_info', true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        if (xhr.responseText != 'ERROR'){ // если мы авторизованы
          var userArr = xhr.responseText.toString().replace(/\n$/, "").split(/\n/);
          document.getElementById('username_top_bar').innerHTML = userArr[1];
          document.getElementById('home_page_username').innerHTML = userArr[1];

        }else{ // если мы не авторизованы
          document.getElementById('username_top_bar').innerHTML = 'GUEST';
          document.getElementById('home_page_username').innerHTML = 'GUEST';
          
        }

      }
    };

    xhr.send();
}


function register(name='', password='', password_replay='') {
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/register');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert(xhr.responseText.toString())
    }

  }
  xhr.send(encodeURI('username=' + name + '&password=' + password + '&password_replay=' + password_replay));
}

function logout() {
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/logout');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      readName();
    }
  };
  xhr.send()
}
