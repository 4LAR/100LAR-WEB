
var page_names = ['page_news', 'page_chats', 'page_home', 'page_settings', 'page_not_found'];
var current_page = "page_home";
//var closed_page = "";

for (let i = 0; i < page_names.length; i++){
  document.getElementById(page_names[i]).style.left = -1900;
}

function closeModal(modalId) {
  try {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  } catch {
  }
}

function openModal(modalId) {
  try {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  } catch {
  }
}

open_page("page_home");

function open_page(page_name, animation=false){ //переключение страниц
  var opened = false;

  document.getElementById("hmt").checked = false;

  document.getElementById(current_page).style.left = -1900;

  for (let i = 0; i < page_names.length; i++){
    if (page_names[i] == page_name){

      openModal(page_names[i]);
      opened = true;
    } else {

    }

  }
  if (!opened){
    openModal("page_not_found");
    document.getElementById("page_not_found").style.left = 100;
    current_page = "page_not_found";
    document.getElementById("vl_left_hotbar").style.opacity = 0;
  } else {
    document.getElementById("vl_left_hotbar").style.opacity = 1;
    document.getElementById("vl_left_hotbar").style.top = document.getElementById(page_name + "_button").getBoundingClientRect().top + 8;
    document.getElementById(page_name).style.left = 100;
    current_page = page_name;
  }
}

function close_main_loading() {
  document.getElementById("loading_background").style.display = "none";
}
document.getElementById("loading_background").style.opacity = 0;
var element = document.getElementById("loading_background");
element.addEventListener("transitionend", close_main_loading, false);
