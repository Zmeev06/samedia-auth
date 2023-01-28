async function sendRequest(url, method, body = null) {
  try {
    const data = await fetch(url, { method: method, mode: "cors" });
    return data.json();
  } catch (e) {
    throw new Error(e);
  }
}

const success = document.querySelector(".success");
const successText = document.querySelector(".success__text");
const btn = document.querySelector(".login-form__btn");
const login = document.querySelector(".login-form__login");
const pass = document.querySelector(".login-form__pass");

btn.addEventListener("click", () => {
  login.disabled = true;
  pass.disabled = true;
  document.querySelector(".preloader").style.display = "block";
  const requestUrl = `https://test-works.pr-uni.ru/api/login/index.php?login=${login.value}&password=${pass.value}`;

  sendRequest(requestUrl, "get").then((response) => {
    if (response.status === "ok") {
      document.querySelector(".preloader").style.display = "none";
      successText.textContent = `${response.user.name}, Вы успешно авторизованы!`;
      success.style.display = "flex";
      document.cookie = `token=${response.token}`;
    } else if (response.status ==="error") {
      document.querySelector(".preloader").style.display = "none";
      document.querySelector('.login-form__error').textContent=response.errorMessage;
      document.querySelector('.login-form__error').style.display = "block";
      login.disabled = false;
      pass.disabled = false;
      throw new Error(response.errorCode);
    }
  });
});
