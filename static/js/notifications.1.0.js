function append_to_notifications_messages_list(name, message, time) {
	var ul = document.getElementById("notifications_list");
	var li = document.createElement("li");

	li.innerHTML = `
	<div class="mail_message_container">
	  <image class="icon" width="60" height="60" src="static/img/profile.svg">
	  <h2>` + name + `</h1>
	  <h3>` + message + `</h3>
    <p class="message_time_class  ">` + time + `</p>
	</div>
  <br>
	`;

	li.setAttribute("id", "element4");
	ul.appendChild(li);
}

function notifications_list_clear() {
  document.getElementById("notifications_list").innerHTML = '';
}

append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
append_to_notifications_messages_list('100LAR', 'HELLO WORLD', '9:52 09.09.2021');
