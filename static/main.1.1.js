
var page_names = ['page_news', 'page_chats', 'page_home', 'page_settings', 'page_not_found']; // список доступных страниц
var current_page = "page_home"; // текущая страница
//var closed_page = "";

for (let i = 0; i < page_names.length; i++){ // перемещаем все страницы за границы экрана
  document.getElementById(page_names[i]).style.left = 2000;//-1900;
}

function closeModal(modalId) { // функция для скрытия эелемента
  try {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  } catch {
  }
}

function openModal(modalId) { // функция для показа эелемента (если элемент скрыт)
  try {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  } catch {
  }
}

open_page("page_home"); // открываем страницу которую пользователь должен увидеть первой

var user_container = document.getElementById('user_container');
var user_container_show_bool = false;

function user_container_show() {
  if (!user_container_show_bool){
    document.getElementById('user_container_checkbox').checked = true;
    user_container_show_bool = true;
  }
}

function user_container_close() {
  if (user_container_show_bool){
    document.getElementById('user_container_checkbox').checked = false;
    user_container_show_bool = false;
  }

}

var notifications_container_show_bool = false;
function notifications_container_show() {
  if (!notifications_container_show_bool){
    document.getElementById('notifications_container_checkbox').checked = true;
    notifications_container_show_bool = true;
  }
}

function notifications_container_close() {
  if (notifications_container_show_bool){
    document.getElementById('notifications_container_checkbox').checked = false;
    notifications_container_show_bool = false;
  }

}

$(document).mouseup(function (e) { // херня для закрытия блоков с уведомлениями и авторизацией
    var container = $(document.getElementById('user_container'));
    if (container.has(e.target).length === 0){
        user_container_close();
    }

    var container = $(document.getElementById('mail_container'));
    if (container.has(e.target).length === 0){
        notifications_container_close();
    }
});


function left_hot_bar() { // функция для открытия и закрытия левой панели быстрого доступа
  if (!document.getElementById("hmt").checked){
    document.getElementById(current_page).style.transition = "0.2s all";
    document.getElementById(current_page).style.left = 100;
  } else {
    document.getElementById(current_page).style.transition = "0.5s all";
    document.getElementById(current_page).style.left = 310;
  }
}

function open_page(page_name, animation=false){ //функция для переключения страниц
  var opened = false;

  document.getElementById(current_page).style.left = 2000; // перемещение прошлой страницы за границы экрана
  document.getElementById(current_page).style.transition = "0.2s all"; // задаём время за которое должна пройти анимация

  for (let i = 0; i < page_names.length; i++){ // цикл для поиска нужной страницы
    if (page_names[i] == page_name)
      opened = true;
  }

  if (!opened){ // если не нашли нужную страницу показываем <<404 not found>>
    openModal("page_not_found");
    document.getElementById("page_not_found").style.left = 100;
    current_page = "page_not_found";
    document.getElementById("vl_left_hotbar").style.opacity = 0;
  } else { // если нужная страница есть, то показываем её и перемещаем ползунок показывающий страницу на которой находится пользователь
    try{
      document.getElementById("vl_left_hotbar").style.opacity = 1;
      document.getElementById("vl_left_hotbar").style.top = document.getElementById(page_name + "_button").getBoundingClientRect().top + 8;
    } catch {
      document.getElementById("vl_left_hotbar").style.opacity = 0;
    }
    document.getElementById(page_name).style.transition = "0.2s all";
    document.getElementById(page_name).style.left = 100;
    current_page = page_name;
    left_hot_bar();
  }
}

// взаимодействие с панелью быстрого доступа
var left_hotbar = document.getElementById('left_hotbar');
left_hotbar.onmouseover = function() { // если пользователь навёлся на панель, то мы её расширяем
  document.getElementById("hmt").checked = true;
  left_hot_bar();
}
left_hotbar.onmouseout = function(e) { // если пользователь убрал курсор с панели, то  мы уменьшаем её
  document.getElementById("hmt").checked = false;
  left_hot_bar();
}

// взаимодействие с экраном загрузка (для того чтобы пользователь не видел как страница подгружается)
function close_main_loading() { // функция для полного скрытия экрана загрузки
  document.getElementById("loading_background").style.display = "none";
}
document.getElementById("loading_background").style.opacity = 0; // делаем страницу загрузки прозрачной
var element = document.getElementById("loading_background");
element.addEventListener("transitionend", close_main_loading, false); // евент который следит за анимацией скрытия загруки (если эелемент полностью пропал мы его отключаем, чтоб пользователь мог пользоваться сайтом, иначе он не сможет нажиматоь на кнопки)


function resize() { // функция для расчёта размера страницы взависимости от размера окна и экрана
  document.body.style.zoom = document.body.clientWidth / (1920);
}

resize(); // расчитываем размер страницы
window.addEventListener('resize', resize, true); // добавляем евент для расчёта размера страницы при любом изменении размера окна
