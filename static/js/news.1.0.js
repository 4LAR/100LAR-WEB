var news_column = 1;

function append_to_news(text) {
  var ul = document.getElementById("news_list_" + news_column);

  news_column = (news_column == 1)? 2: 1;

	var li = document.createElement("li");

  li.innerHTML = text;

  li.setAttribute("id", "element4");
	ul.appendChild(li);

}

function read_news() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/read_news');
  xhr.onload = function () {
    var msgArr = xhr.responseText.toString().replace(/\n$/, "").split(/\n/);
    msgArr.forEach(function (entry) {
      append_to_news(entry);
    });

  };
  xhr.send();
}

read_news()
