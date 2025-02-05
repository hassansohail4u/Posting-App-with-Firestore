import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js"


const form = document.querySelector("#form")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const loginBtn = document.querySelector(".loginBtn");

loginBtn.addEventListener("click", () => {
    window.location = "./index.html";
})



form.addEventListener("submit" , (event) => {
    event.preventDefault();
    
    // console.log(email.value);
    // console.log(password.value);
    
    createUserWithEmailAndPassword(auth, email.value , password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sign up successfully",
            showConfirmButton: false,
            timer: 1500
          });
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
    
    })