function register() {
  var url = "http://localhost:3000/family";
  var data = {};
  data.familyname = "Test";
  data.email = "test@gmail.com";
  data.password = "123456";

  var json = JSON.stringify(data);


  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "201") {

    }
  }
  xhr.send(json);
}
