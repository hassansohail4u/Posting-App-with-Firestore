import { collection, addDoc , getDocs , Timestamp , query , orderBy , doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseConfig.js"


const form = document.querySelector("#form");
const title = document.querySelector("#user-title");
const description = document.querySelector("#user-description");
var div = document.querySelector(".container")

var userPosts = [];

function render (arr){
  div.innerHTML = ""
    arr.map((items) => {
        div.innerHTML += `
        <div class="card">
            <h3 class="title"><span class="title-description-span">Title</span> : ${items.title}</h3>
            <p id="description"><span class="title-description-span">Description</span> : ${items.description}</p>
            <button class="deleteBtn card-btn"><i class="fa-solid fa-trash delete-icon"></i></button> 
            <button class="editBtn card-btn"><i class="fa-regular fa-pen-to-square edit-icon"></i></button>
        </div>`
     

      })

        
const deleteBtn = document.querySelectorAll(".deleteBtn")
const editBtn = document.querySelectorAll(".editBtn")

deleteBtn.forEach((items , index) => {

  items.addEventListener("click" , async() => {
    // console.log("delete");
    await deleteDoc(doc(db, "userPosts", userPosts[index].docId));
    // console.log(userPosts[index].docId);
    userPosts.splice(index , 1)
    
    render(userPosts)
  })
})


editBtn.forEach((items , index)=> {

  items.addEventListener("click" , async() => {
    console.log("edit");

    const updateTitle = prompt("Enter Update Title")
    const updateDescription = prompt("Enter Update Description")

    const updatePost = doc(db, "userPosts", userPosts[index].docId);

      await updateDoc(updatePost, {

        title: updateTitle,
        description: updateDescription
    });

    userPosts.splice(index , 1 , {
      title: updateTitle,
      description: updateDescription,
      postDate : Timestamp.fromDate(new Date()),
      docId: userPosts[index].docId
    })
  
render(userPosts)
})


}) 

  }


  
async function getData(){
 div.innerHTML = ""
    userPosts = [];

const q = query(collection(db, "userPosts"), orderBy("postDate", "desc"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {

        userPosts.push({...doc.data() , docId:doc.id})
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

        const docRef = await addDoc(collection(db, "userPosts"), {
          title: title.value,
          description: description.value,
          postDate : Timestamp.fromDate(new Date()),

        });
        userPosts.unshift({
          title: title.value,
          description: description.value,
          postDate : Timestamp.fromDate(new Date()),
          docId: docRef.id
        })
        console.log(userPosts);
        
        title.value = "";
        description.value = "";

        render(userPosts)
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
})





getData()