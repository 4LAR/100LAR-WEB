var users_column = 1;

function append_to_users(id, name, lvl) {
  var ul = document.getElementById("users_list_" + users_column);

  users_column += 1;
  if (users_column > 4)
    users_column = 1;

	var li = document.createElement("li");

  li.innerHTML = `
  <div class="users_countainer">
    <img style="position: absolute; top: 80px; left: 15px" width="150" height="150" src="static/img/profile.svg" class = "icon">
    <div class="users_countainer_information_id" align="left">
      <h1 style="font-size: 2em; margin: 7px 10px">#` + id + `</h1>
    </div>
    <div class="users_countainer_information_name" align="left">
      <h1 style="font-size: 2em; margin: 7px 10px">` + name + `</h1>
    </div>
    <div class="users_countainer_information_lvl">
      <image style="position: absolute; margin: 4px -5px; left: 5px" class="icon" width="25" height="25" src="static/img/key.svg">
      <h2 style="position: absolute; margin: 4px 30px">LVL: ` + lvl + `<h2>
    </div>
    <div class="users_countainer_information_xz">

    </div>
  </div>
  <br>
  `;

  li.setAttribute("id", "element4");
	ul.appendChild(li);

}

append_to_users('1488', '100LAR', '1 (A)')
append_to_users('1488', '100LAR', '1 (A)')
append_to_users('1488', '100LAR', '1 (A)')
append_to_users('1488', '100LAR', '1 (A)')
append_to_users('1488', '100LAR', '1 (A)')
append_to_users('1488', '100LAR', '1 (A)')
