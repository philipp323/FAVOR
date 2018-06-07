window.addEventListener("load", function () {
    var params;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      params = {
            familyname: document.querySelector('#family_name').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
      }

      console.log(params);

      register();
  });

  function register() {

        var url = "http://localhost:3000/family";
        var request = new XMLHttpRequest();

        request.addEventListener("load", function(event) {
          //window.location.href = "creation.html";
        });

        request.addEventListener("error", function(event) {
          alert('Oops! Something went wrong.');
        });

        request.open("POST", url);
        request.setRequestHeader('Content-type', 'application/json');

        console.log(JSON.stringify(params));
        request.send(JSON.stringify(params));

  }
});
