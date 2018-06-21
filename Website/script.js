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
          localStorage.setItem("mCount", memberCount);

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

  function generateTable(){
    var members = JSON.parse(localStorage.getItem("members"));
    var avatarSrc;
    $('#memberList').append('<div id="remove">');
    $.each(members, function( index, value ){
      avatarSrc = LetterAvatar(members[index].firstname, 60);
      $('#memberList').append('<li class="collection-item avatar">' + '<img src="' + avatarSrc + '"class="circle">' + '<span class="title">Name: '
      + members[index].firstname + '</span><p>Birthdate: ' + members[index].birthdate + ' <br>Role: ' + calcRole(members[index].role) + '</p> </li>');
    });
    $('#memberList').append('</div>');
  }

  function clearTable(){
    $('#remove').html('');
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
            what: $('#topicTag').material_chip('data')
      }
      addTask();
  });

  function addTask() {

        var url = "http://localhost:3000/task";
        var request = new XMLHttpRequest();

        request.addEventListener("load", function(event) 
        });

        request.addEventListener("error", function(event) {
          alert('Oops! Something went wrong.');
        });


        request.open("POST", url);
        request.setRequestHeader('Content-type', 'application/json');

        request.send(JSON.stringify(params));

  }
});

  function initApp() {
    getMembers(localStorage.getItem("id"));
    document.getElementById("familyTitle").innerHTML = localStorage.getItem("name");
    document.getElementById("familyName").value = localStorage.getItem("name");
    document.getElementById("cDate").value = localStorage.getItem("cDate");
    document.getElementById("mCount").value = localStorage.getItem("mCount");
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
