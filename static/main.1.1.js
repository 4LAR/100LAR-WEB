
var page_names = ['page_news', 'page_chats', 'page_home', 'page_settings', 'page_not_found'];
var current_page = "page_home";
//var closed_page = "";

for (let i = 0; i < page_names.length; i++){
  document.getElementById(page_names[i]).style.left = 2000;//-1900;
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

/*document.getElementById("left_hotbar").addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  console.log('open')

  // reset the color after a short delay
  setTimeout(function() {
    console.log('close')
  }, 500);
}, false);*/

function left_hot_bar() {
  if (!document.getElementById("hmt").checked){
    document.getElementById(current_page).style.transition = "0.2s all";
    document.getElementById(current_page).style.left = 100;
  } else {
    document.getElementById(current_page).style.transition = "0.5s all";
    document.getElementById(current_page).style.left = 310;
  }
}

function open_page(page_name, animation=false){ //переключение страниц
  var opened = false;

  //document.getElementById("hmt").checked = false;

  document.getElementById(current_page).style.left = 2000;//1900;
  document.getElementById(current_page).style.transition = "0.2s all";

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
    document.getElementById(page_name).style.transition = "0.2s all";
    document.getElementById(page_name).style.left = 100;
    current_page = page_name;
    left_hot_bar();
  }
}

var left_hotbar = document.getElementById('left_hotbar');
left_hotbar.onmouseover = function() {
  document.getElementById("hmt").checked = true;
  left_hot_bar();
}
left_hotbar.onmouseout = function(e) {
  document.getElementById("hmt").checked = false;
  left_hot_bar();
}

function close_main_loading() {
  document.getElementById("loading_background").style.display = "none";
}
document.getElementById("loading_background").style.opacity = 0;
var element = document.getElementById("loading_background");
element.addEventListener("transitionend", close_main_loading, false);

function resize() {
  document.body.style.zoom = document.body.clientWidth / (1920);
}

resize();
window.addEventListener('resize', resize, true);
