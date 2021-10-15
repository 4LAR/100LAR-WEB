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
        //readName();
        //document.getElementById('login_username').value = '';
        //document.getElementById('login_password').value = '';
        location.reload();
      }
    }

  }
  xhr.send(encodeURI('username=' + name + '&password=' + password));
}

readName();

function users_buttons(open=false) {
  var display = (open)? 'block': 'none';

  document.getElementById('notifications_container').style.display = display;

  document.getElementById('page_home_button').style.display = display;
  document.getElementById('page_chats_button').style.display = display;
  //document.getElementById('page_home_button').style.display = display;

}

var lvl_access = {
  0: '(BAN)',
  1: '(A)',
  2: '(B)',
  3: '(C)',
  4: '(CC)',
  5: '(S)'
}

function readName() {
  var xhr = new XMLHttpRequest();
    xhr.open('GET', '/user_info', true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        if (xhr.responseText != 'ERROR'){ // если мы авторизованы
          var userArr = xhr.responseText.toString().replace(/\n$/, "").split(/\n/);
          document.getElementById('username_top_bar').innerHTML = userArr[1];
          document.getElementById('login_li').style.display = 'none';
          document.getElementById('user_info_li').style.display = 'block';

          document.getElementById('home_page_username').innerHTML = userArr[1];
          document.getElementById('home_page_id').innerHTML = '#' + ('0000' + userArr[0]).slice(-4);//userArr[0];
          document.getElementById('home_page_lvl').innerHTML = 'LVL: ' + userArr[2] + ' ' + lvl_access[userArr[2]];
          document.getElementById('home_page_coins').innerHTML = 'COINS: ' + userArr[3];
          users_buttons(true);

          open_page('page_home');

        }else{ // если мы не авторизованы
          document.getElementById('username_top_bar').innerHTML = 'GUEST';
          document.getElementById('home_page_username').innerHTML = 'GUEST';

          document.getElementById('login_li').style.display = 'block';
          document.getElementById('user_info_li').style.display = 'none';

          users_buttons(false);

          open_page('page_news');

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
      location.reload();
    }
  };
  xhr.send()
}
