window.addEventListener("load", function () {
    var form = document.getElementById("registerForm");
    var params;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      params = {
            familyname: document.querySelector('#family_name').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
            creationDate: getCurrentDate()
      }

      register();
  });

  function register() {

        var url = "http://localhost:3000/family";
        var request = new XMLHttpRequest();

        request.addEventListener("load", function(event) {
          getMaxID();
        });

        request.addEventListener("error", function(event) {
          alert('Oops! Something went wrong.');
        });


        request.open("POST", url);
        request.setRequestHeader('Content-type', 'application/json');

        request.send(JSON.stringify(params));

  }
});

 function logout(){
   localStorage.clear();
 }

window.addEventListener("load", function () {
    var nextBtn = document.getElementById("nextBtn");
    var submitBtn = document.getElementById("submitBtn");
    var params;
    var redirect = "";

    nextBtn.addEventListener("click", function (event) {
      event.preventDefault();
      params =
        {
              firstname: document.querySelector('#first_name').value,
              lastname: document.querySelector('#last_name').value,
              birthdate: document.querySelector('#birthdate').value,
              gender: document.querySelector('#gender').value,
              role: document.querySelector('#role').value,
              balance: "0",
              famId: localStorage.getItem("id")
          }

      redirect = "creation.html";

      addMember();
  });

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    params =
      {
            firstname: document.querySelector('#first_name').value,
            lastname: document.querySelector('#last_name').value,
            birthdate: document.querySelector('#birthdate').value,
            gender: document.querySelector('#gender').value,
            role: document.querySelector('#role').value,
            balance: "0",
            famId: localStorage.getItem("id")
        }

    redirect = "app.html";

    addMember();
});

  function addMember() {
    var url = "http://localhost:3000/member";
    var request = new XMLHttpRequest();

    request.addEventListener("load", function(event) {
      window.location.href = redirect;
    });

    request.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify(params));

  }
});

function getMaxID() {
  var url = "http://localhost:3000/family";
  var request = new XMLHttpRequest();
  var maxID;


  request.addEventListener("load", function(event) {
  });

  request.addEventListener("error", function(event) {
    alert('Oops! Something went wrong.');
  });

request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var arr = JSON.parse(this.responseText);
        console.log(arr);
        maxID = arr.length - 1;
        getCurrentFamily(maxID);
    }
};

  request.open("GET", url, true);

  request.send(null);
}

  function getCurrentFamily(famID) {
    var url = "http://localhost:3000/family/" + famID;
    var request = new XMLHttpRequest();
    var fam;

    request.addEventListener("load", function(event) {
    });

    request.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        fam = JSON.parse(this.responseText);
        localStorage.setItem("name", fam.familyname);
        localStorage.setItem("email", fam.email);
        localStorage.setItem("id", fam.id);
        localStorage.setItem("cDate", fam.creationDate);
        window.location.href = "creation.html";
      }
  };

    request.open("GET", url, true);
    request.send();
  }

  function getMembers(famID){
    var url = "http://localhost:3000/member?famId=" + famID;
    var request = new XMLHttpRequest();
    var members;
    var memberCount;

    request.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          localStorage.setItem("members",this.responseText);
          var members = JSON.parse(this.responseText);
          memberCount = members.length;
          localStorage.setItem("mCount", memberCount.toString());

          var memberTag = [];

          $.each(members, function(index,value){
            memberTag.push({tag:members[index].firstname});
          });
          localStorage.setItem("memberTag",JSON.stringify(memberTag));
      }
  };

    request.open("GET", url, true);

    request.send(null);
  }

  function getTasks(){
    var famID = localStorage.getItem("id");
    var url = "http://localhost:3000/task?famId=" + famID;
    var request = new XMLHttpRequest();

    request.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

    request.addEventListener("load", function(event) {
      localStorage.setItem("tasks",this.responseText);
    });

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          localStorage.setItem("tasks",this.responseText);
      }
  };

    request.open("GET", url, true);

    request.send(null);
  }

  function generateTable(){
    var members = JSON.parse(localStorage.getItem("members"));
    var avatarSrc;
    var id;
    $('#memberList').append('<div id="remove">');
    $.each(members, function( index, value ){
      avatarSrc = LetterAvatar(members[index].firstname, 60);
      id = members[index].id;
      $('#memberList').append('<div id="' + id + '"><li class="collection-item avatar">' + '<img src="' + avatarSrc + '"class="circle">' + '<span class="title">Name: '
      + members[index].firstname + '</span><p>Birthdate: ' + members[index].birthdate + ' <br>Role: ' + calcRole(members[index].role)
      + '</p> <a onclick="removeMember('+ id +');remove(' + id + ');"class="secondary-content btn-floating orange waves-effect waves-light">'
      + '<i class="material-icons">clear</i></a> </li> </div>');
    });
    $('#memberList').append('</div>');
  }

  function generateMemberNav(){
    var members = JSON.parse(localStorage.getItem("members"));
    var avatarSrc;
    var id;
    $.each(members, function( index, value ){
      avatarSrc = LetterAvatar(members[index].firstname, 60);
      id = members[index].id;
      $('#memberNav').append('<li class="" style="margin-left:5px;margin-top:5px;display: inline-block;">'
      + '<a onclick=""><img src="' + avatarSrc + '"class="circle" height="60" width="60"></li></a>');
      $('#memberNav').append('<br>');
  });
}

  function generateTasks(){
    remove("taskDiv");
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var id;
    $.each(tasks, function( index, value ){
      id = tasks[index].id;
      $('#taskDiv').append('<div class="col s9 l3">'
                          + '<div class="card small cardHover orange" onhover="">'
                          + '<div class="card-tabs">'
                            + '<ul class="tabs tabs-fixed-width orange lighten-1">'
                              + '<li class="tab"><a href="#'+ id +'info" class="active">Info</a></li>'
                              + '<li class="tab"><a href="#'+ id +'minfo">More info</a></li>'
                              + '<li class="tab"><a href="#'+ id +'desc">Desc</a></li>'
                            + '</ul>'
                          +'</div>'
                          +'<div class="orange white-text">'
                            +'<div id="'+ id +'info" class="card-content">'
                              + '<div class="row">'
                                + '<div class="col s12 l2">'
                                  + '<p style="font-size: 25px;"><u>Title: </u></p>'
                                + '</div>'
                                + '<div class="col s10">'
                                  + '<p style="font-size: 27px;"> ' + tasks[index].title + '</p>'
                                + '</div>'
                              + '</div>'
                              + '<div class="row">'
                                + '<div class="col s12">'
                                  + '<p style="font-size: 25px;"><u>Due-Date: </u></p>'
                                + '</div>'
                                + '<div class="col s12">'
                                  + '<p style="font-size: 27px;">' + tasks[index].duedate + ' ' + tasks[index].duetime + '</p>'
                                + '</div>'
                              + '</div>'
                            +'</div>'
                            +'<div id="'+ id +'minfo" class="card-content">'
                              + '<p style="font-size: 27px;">Topic: ' + JSON.stringify(tasks[index].what[0].tag)  + '</p>'
                            +'</div>'
                            +'<div id="'+ id +'desc" class="card-content">'
                              + '<p>' + tasks[index].desc + '</p>'
                            +'</div>'
                          + '</div>'
                        + '</div>'
                      + '</div>');
    });
  }



  function remove(elementId){
    $('#'+elementId).html('');
  }

  function calcRole(id) {
    if (id == 1) {
      return "Parent";
    } else if (id == 2) {
      return "Child";
    } else if (id == 3) {
      return "Grandmother";
    } else if (id == 4) {
      return "Grandfather";
    } else if (id == 5) {
      return "Other";
    }
  }

  function removeMember(id){
    var url = "http://localhost:3000/member/"+id;
    var request = new XMLHttpRequest();

    request.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

    request.open("DELETE", url);

    request.send(null);
  }

window.addEventListener("load", function () {
    var form = document.getElementById("taskForm");
    var params;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      params = {
            title: document.querySelector('#taskTitle').value,
            duedate: document.querySelector('#duedate').value,
            duetime: document.querySelector('#duetime').value,
            desc: document.querySelector('#description').value,
            who: $('#memberTag').material_chip('data'),
            mandatory: document.querySelector('#mandatory').value,
            what: $('#topicTag').material_chip('data'),
            famId: localStorage.getItem("id")
      }
      addTask();
  });

  function addTask() {

        var url = "http://localhost:3000/task";
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              generateTasks();
          }
      };

        request.addEventListener("error", function(event) {
          alert('Oops! Something went wrong.');
        });


        request.open("POST", url);
        request.setRequestHeader('Content-type', 'application/json');

        request.send(JSON.stringify(params));

  }
});

  function initApp() {
        generateTasks();
  }

  var reloadID;

  function automaticReload(){
    remove("memberList");
    remove("memberNav");
    getMembers(localStorage.getItem("id"));
    getTasks();
    document.getElementById("familyTitle").innerHTML = localStorage.getItem("name");
    document.getElementById("familyName").value = localStorage.getItem("name");
    document.getElementById("cDate").value = localStorage.getItem("cDate");
    document.getElementById("mCount").value = localStorage.getItem("mCount");
    generateTable();
    generateMemberNav();


    reloadID = setTimeout(automaticReload, 1000);
  }

  function stopReloading(){
    clearTimeout(reloadID);
  }

  function loadBtn(){
    console.log("test");
    document.getElementById("loadBtn").innerHTML = 'PRESS F5';
  }

defaultTags = [
    {tag: 'Housework'},
    {tag:'Gardening'},
];

  function activateBlueMenu(){
    document.body.style.setProperty('--main-color',"#2196F3");
    document.body.style.setProperty('--time-color',"rgb(33, 150, 243, 0.25)");

    //taskMenu tag init
    var memberTags = JSON.parse(localStorage.getItem("memberTag"));
    $('#memberTag').material_chip({
        data: memberTags
    });

    $('#topicTag').material_chip({
        data: defaultTags
	  });
  }

  function activateYellowMenu(){
    document.body.style.setProperty('--main-color',"#fbc02d");
    document.body.style.setProperty('--time-color',"rgb(251, 192, 45, 0.25)");
  }

  function activateGreenMenu(){
    document.body.style.setProperty('--main-color',"#4CAF50");
    document.body.style.setProperty('--time-color',"rgb(76, 175, 80, 0.25)");
  }

  function activateOrangeMenu(){
    document.body.style.setProperty('--main-color',"#ff9800");
    document.body.style.setProperty('--time-color',"rgb(255, 152, 0, 0.25)");
  }

  var forms = document.getElementsByTagName('form');
  for (var i = forms.length; i--;)
      forms[i].addEventListener('reset', handleFormReset.bind(), false);
  function handleFormReset() {
      Materialize.updateTextFields();
  }

  function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd = '0'+dd
    }

    if(mm<10) {
      mm = '0'+mm
    }

    today = dd + '.' + mm + '.' + yyyy;
    return today;
  }

  $( document ).ready(function() {
    $('#overviewModal').modal({
        dismissible: false
    })
  })


function LetterAvatar(name, size) {

  name = name || '';
  size = size || 60;

  var colours = [
      "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
      "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ],

    nameSplit = String(name).toUpperCase().split(' '),
    initials, charIndex, colourIndex, canvas, context, dataURI;


  if (nameSplit.length == 1) {
    initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
  } else {
    initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
  }

  if (window.devicePixelRatio) {
    size = (size * window.devicePixelRatio);
  }

  charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
  colourIndex = charIndex % 20;
  canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  context = canvas.getContext("2d");

  context.fillStyle = colours[colourIndex - 1];
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = Math.round(canvas.width / 2) + "px Arial";
  context.textAlign = "center";
  context.fillStyle = "#FFF";
  context.fillText(initials, size / 2, size / 1.5);

  dataURI = canvas.toDataURL();
  canvas = null;

  return dataURI;
}
