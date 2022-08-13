
let msgerrorlogin = document.querySelector("#errorlogin");
let msgerrorpassword = document.querySelector("#errorpassword");
let msgerrorpasswordrep = document.querySelector("#errorpasswordrep");
let msgerrorfirstname = document.querySelector("#errorfirstname");
let msgerrorlastname = document.querySelector("#errorlastname");
let msgerrorphone = document.querySelector("#errorphone");
let msgerrordupemail = document.querySelector("#errordupemail");

let logincheck = false;
let passwordcheck = false;
let passwordrepcheck = false;
let firstnamecheck = false;
let lastnamecheck = false;
let phonecheck = false;

function registerApi() {
  event.preventDefault();
  let myemail = document.querySelector("#email").value;
  let mypassword = document.querySelector("#password").value;
  let mypasswordrep = document.querySelector("#passwordrep").value;
  let myfirstname = document.querySelector("#firstname").value;
  let mylastname = document.querySelector("#lastname").value;
  let myphone = document.querySelector("#phone").value;

  if (
    myemail.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    msgerrorlogin.innerHTML = "";
    logincheck = true;
  } else {
    msgerrorlogin.innerHTML = `<p>This e-mail is invalid. Please follow the standard xxx@xxx.xxx</p>`;
    logincheck = false;
  }
  
  if (
    mypassword.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    )
  ) {
    msgerrorpassword.innerHTML = "";
    passwordcheck = true;
  } else {
    msgerrorpassword.innerHTML = `<p>Password must have at least 8 characters, one upper case, one lower case, one number and one special character.</p>`;
    passwordcheck = false;
  }

  if (mypasswordrep == mypassword) {
    msgerrorpasswordrep.innerHTML = "";
    passwordrepcheck = true;
  } else {
    msgerrorpasswordrep.innerHTML = `<p>Please check the password.</p>`;
    passwordrepcheck = false;
  }

  if (myfirstname.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
    msgerrorfirstname.innerHTML = "";
    firstnamecheck = true;
  } else {
    msgerrorfirstname.innerHTML = `<p>Invalid name</p>`;
    firstnamecheck = false;
  }

  if (mylastname.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
    msgerrorlastname.innerHTML = "";
    lastnamecheck = true;
  } else {
    msgerrorlastname.innerHTML = `<p>Invalid surname</p>`;
    lastnamecheck = false;
  }


  if (
    myphone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  ) {
    msgerrorphone.innerHTML = "";
    phonecheck = true;
  } else {
    msgerrorphone.innerHTML = `<p>Invalid phone number.</p>`;
    phonecheck = false;
  }

  if (
    logincheck == true &&
    passwordcheck == true &&
    passwordrepcheck == true &&
    firstnamecheck == true &&
    lastnamecheck == true &&
    phonecheck == true
  ) {
    console.log("Ready to fetch");
    fetch("http://localhost:8090/api/newuser", {
      method: "POST",
      body: JSON.stringify({
        email: myemail,
        firstname: myfirstname,
        lastname: mylastname,
        password: mypassword,
        phone: myphone,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data == true) {
          msgerrordupemail.innerHTML = "";
          let signupcontainer = document.querySelector(
            "#signupcontainer"
          );
          let checkcontainer = document.querySelector(
            "#checkcontainer"
          );
          signupcontainer.classList.add("successcontainer");
          checkcontainer.classList.remove("successcontainer");
        } else {
          msgerrordupemail.innerHTML = `<p>You already have an account. Please <a href="./login.html">login</a></p>`;
        }
      });
  } else {
    console.log("Please check your information.");
  }
}