function checkCode() {
  const input = document.getElementById("code").value;

  if (input === ACCESS_CODE) {
    window.location.href = "walentynka.html";
  } else {
    alert("❌ Dziubas podaj dobre hasło, pomyśl trochę...");
  }
}
