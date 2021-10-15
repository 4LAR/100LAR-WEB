function append_to_chat_messages_list(name, message, time) {
	var ul = document.getElementById("chat_messages_list");
	var li = document.createElement("li");

	li.innerHTML = `
	<div class="message_container">
	  <image class="icon" width="60" height="60" src="static/img/profile.svg">
	  <h2 class="message_username_class">` + name + `</h1>
	  <h3 class="message_text_class">` + message + `</h3>
	  <p class="message_time_class  ">` + time + `</p>
	</div>
	`;

	li.setAttribute("id", "element4");
	ul.appendChild(li);
}

function chat_messages_list_clear() {
  document.getElementById("chat_messages_list").innerHTML = '';
}


function append_to_chats(name, type) {
	var ul = document.getElementById("chats_list");
	var li = document.createElement("li");

	li.innerHTML = `
	<div class="chats_names_list">
	  <image style="float: left" class="icon" width="60" height="60" src="static/img/profile.svg">
	  <h2>` + name + `</h1>
	  <h3>` + type + `</h3>
	</div>
	`;

	li.setAttribute("id", "element4");
	ul.appendChild(li);
}
var user_container = document.getElementById('newchat_container');
var newchat_container_show_bool = false;

function newchat_container_show() {
  if (!newchat_container_show_bool){
    document.getElementById('newchat_container_checkbox').checked = true;
    newchat_container_show_bool = true;
  } else {
    document.getElementById('newchat_container_checkbox').checked = false;
    newchat_container_show_bool = false;
  }
}

function newchat_container_close() {
  if (newchat_container_show_bool){
    document.getElementById('newchat_container_checkbox').checked = false;
    newchat_container_show_bool = false;
  }
}
