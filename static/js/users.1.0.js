var users_column = 1;

function append_to_users(id, name, lvl) {
  var ul = document.getElementById("users_list_" + users_column);

  users_column += 1;
  if (users_column > 4)
    users_column = 1;

	var li = document.createElement("li");

  li.innerHTML = text;

  li.setAttribute("id", "element4");
	ul.appendChild(li);

}

