import { collection, addDoc , getDocs , Timestamp  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseConfig.js"


const form = document.querySelector("#form");
const title = document.querySelector("#user-title");
const description = document.querySelector("#user-description");
var div = document.querySelector(".container")

var userPosts = [];

function render (arr){
    arr.map((items) => {
        div.innerHTML += `
        <div class="card">
            <h3 class="title"><span class="title-description-span">Title</span> : ${items.title}</h3>
            <p id="description"><span class="title-description-span">Description</span> : ${items.description}</p>
        </div>`
    })    
  }
async function getData(){

    div.innerHTML = ""
    userPosts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {

      userPosts.push(doc.data())
      console.log(userPosts);
      
    });
    
render(userPosts)
}


form.addEventListener("submit" , async(event) => {
    event.preventDefault();


    console.log(title.value);
    console.log(description.value);

    try {
        div.innerHTML = ""

        const docRef = await addDoc(collection(db, "posts"), {
          title: title.value,
          description: description.value,
          postDate : Timestamp.fromDate(new Date()),

        });
        title.value = "";
        description.value = "";

        getData()

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
})
getData()