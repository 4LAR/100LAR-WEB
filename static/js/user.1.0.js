function login(name='', password='') {
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert(xhr.responseText.toString())
    }

  }
  xhr.send(encodeURI('username=' + name + '&password=' + password));
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
      alert(xhr.responseText.toString())
    }
  };
  xhr.send()
}
