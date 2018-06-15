window.addEventListener("load", function () {
    var form = document.forms.namedItem("registerForm");
    var params;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      params = {
            familyname: document.querySelector('#family_name').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
      }

      console.log(params);

      register();    var form = document.forms.namedItem("registerForm");
  });

  function register() {

        var url = "http://localhost:3000/family";
        var request = new XMLHttpRequest();

        request.addEventListener("load", function(event) {
          window.location.href = "creation.html";
        });

        request.addEventListener("error", function(event) {
          alert('Oops! Something went wrong.');
        });

        request.open("POST", url);
        request.setRequestHeader('Content-type', 'application/json');

        console.log(JSON.strin)
        request.send(JSON.stringify(params));

  }
});

window.addEventListener("load", function () {
    var form = document.forms.namedItem("memberAddForm");
    var params;

    form.addEventListener("next", function (event) {
      event.preventDefault();
      params = {
            famid: 0,
            firstname: document.querySelector('#first_name').value,
            lastname: document.querySelector('#last_name').value,
            birthdate: document.querySelector('#birthdate').value,
            gender: document.querySelector('#gender').value,
            role: document.querySelector('#role').value,
      }

      console.log(params);

      addMember();
  });

  function addMember() {
    var url = "http://localhost:3000/member";
    var request = new XMLHttpRequest();

    request.addEventListener("load", function(event) {
      window.location.href = "creation.html";
    });

    request.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/json');

    console.log(JSON.strin)
    request.send(JSON.stringify(params));

  }
});

  function activateBlueMenu(){
    document.body.style.setProperty('--main-color',"#2196F3");
  }

  function activateYellowMenu(){
    document.body.style.setProperty('--main-color',"#fbc02d");
  }

  function activateGreenMenu(){
    document.body.style.setProperty('--main-color',"#4CAF50");
  }
