import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

const signupBtn = document.querySelector(".signupBtn");
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


signupBtn.addEventListener("click" , () => {
    window.location = "./signup.html"
})

form.addEventListener("submit" , (event) => {
    event.preventDefault();

    console.log(email.value);
    console.log(password.value);

    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    // console.log(user);
    window.location = "./home.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
  });
    
    
}
)


