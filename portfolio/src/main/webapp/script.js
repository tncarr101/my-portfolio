// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
// function addRandomGreeting() {
//   const greetings =
//       ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

//   // Pick a random greeting.
//   const greeting = greetings[Math.floor(Math.random() * greetings.length)];

//   // Add it to the page.
//   const greetingContainer = document.getElementById('greeting-container');
//   greetingContainer.innerText = greeting;
// }



//   //setting volume of audio    
//   var aud = document.getElementById("song");
//   aud.volume = 0.2;


//Gallery
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}

/** Creates an element that represents a task, including its delete button. */
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.className = 'task';

  const comment = document.createElement('span');
  comment.innerText = task.postedComment;
  const fUser = document.createElement('span');
  fUser.innerText = task.fname;
  const lUser = document.createElement('span');
  lUser.innerText = task.lname;


  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(task);

// Remove the task from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(comment);
  //taskElement.appendChild(fUser);
  //taskElement.appendChild(lUser);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

//Method that retrieves data from the select element
function setNumComment() {
    const maxComments = document.getElementById('numOfCom').value;

  return maxComments;

}


//Fetches comment and adds to the DOM
function loadTasks() {
  fetch('/data?maxComments='+setNumComment()).then(response => response.json()).then((tasks) => {
    const taskListElement = document.getElementById('comment-list');
    tasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
}

/** Tells the server to delete the task. */
function deleteTask(task) {
  const params = new URLSearchParams();
  params.append('id', task.id);
  fetch('/delete-task', {method: 'POST', body: params});
}


/*Google Map */

function createMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

   
 
}
