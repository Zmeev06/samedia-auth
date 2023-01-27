function sendRequest(url, method, body = null) {
  return fetch(url, {
    method: method,
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}


const btn = document.querySelector(".login-form__btn");
const login = document.querySelector(".login-form__login");
const pass = document.querySelector(".login-form__pass");

btn.addEventListener("click", () => {
  if (login.value.trim() !== "" || pass.value.trim() !== "") {
    loginValue = login.value;
    passValue = pass.value;
    login.value = ''
    pass.value = ''
    const requestUrl = `https://test-works.pr-uni.ru/api/login/index.php?login=${loginValue}&password=${passValue}`;
  sendRequest(requestUrl, "GET")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  } else {
    alert("Введите логин и пароль!")
  }
  
});