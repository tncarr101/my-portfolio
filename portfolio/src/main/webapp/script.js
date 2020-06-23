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

//Completing the translate action after button is pressed
const translateButtonElement = document.createElement('button');
  translateButtonElement.innerText = 'Translate';
  translateButtonElement.addEventListener('click', () => {
    requestTranslation(task); });

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
    var tacoma = {lat: 47.258728, lng: -122.4443};
    var charlotte = {lat: 35.227085, lng: -80.843124};
    var sanFran = {lat: 37.773972, lng: -122.431297};
    var tillar = {lat: 33.7123, lng: -91.4529};
    var auburn = {lat: 32.609856, lng: -85.480782};
    var wichita = {lat: 37.697948, lng: -97.314835};
    var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.0119, lng: -98.4842},
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
   var markerTacoma = new google.maps.Marker({position: tacoma, map: map});
   var markerCharlotte = new google.maps.Marker({position: charlotte, map: map});
   var markerSanFran = new google.maps.Marker({position: sanFran, map: map});
   var markerTillar = new google.maps.Marker({position: tillar, map: map});
   var markerAuburn = new google.maps.Marker({position: auburn, map: map});
   var markerWichita = new google.maps.Marker({position: wichita, map: map}); 
    
    //Tacoma Marker Content
 var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">Tacoma, WA</h1>'+
      '<div id="bodyContent">'+
      '<p> Tacoma is my birth place. I was born here and lived in this city until ' +
      'I was 10 years old.  '+
      '</div>'+
      '</div>';

  var infowindowTac = new google.maps.InfoWindow({
    content: contentString
  });
  markerTacoma.addListener('click', function() {
    infowindowTac.open(map, markerTacoma);
  });

    //Charlotte Marker Content
   var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">Charlotte, NC</h1>'+
      '<div id="bodyContent">'+
      '<p> I moved to Charlotte, North Carolina at 10 years. I have called this city ' +
      'home since then.' +
      '</div>'+
      '</div>';

  var infowindowChar = new google.maps.InfoWindow({
    content: contentString
  });
  markerCharlotte.addListener('click', function() {
    infowindowChar.open(map, markerCharlotte);
  });

    //San Fran Marker Content
   var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">San Francisco, CA</h1>'+
      '<div id="bodyContent">'+
      '<p> This is the birthplace of my mother, she lived here until she moved to Seattle. ' +
      '</div>'+
      '</div>';

  var infowindowSanFran = new google.maps.InfoWindow({
    content: contentString
  });
  markerSanFran.addListener('click', function() {
    infowindowSanFran.open(map, markerSanFran);
  });

    //Tillar Marker Content
   var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">Tillar, AR</h1>'+
      '<div id="bodyContent">'+
      '<p> This is the birthplace of my paternal grandmother. Her family lived on a farm ' +
      '</div>' +
      '</div>';

  var infowindowTillar = new google.maps.InfoWindow({
    content: contentString
  });
  markerTillar.addListener('click', function() {
    infowindowTillar.open(map, markerTillar);
  });

    //Auburn Marker Content
   var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">Auburn, AL</h1>'+
      '<div id="bodyContent">'+
      '<p> This is the home of my maternal grandmother. Her family owns land.   ' +
      '</div>'+
      '</div>';

  var infowindowAub = new google.maps.InfoWindow({
    content: contentString
  });
  markerAuburn.addListener('click', function() {
    infowindowAub.open(map, markerAuburn);
  });

    //Wichita Marker Content
   var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">Wichita, KS</h1>'+
      '<div id="bodyContent">'+
      '<p> This is the birthplace and hometown of my father. He grew up here until he left for the military at 17. ' +
      '</div>'+
      '</div>';

  var infowindowWitchita = new google.maps.InfoWindow({
    content: contentString
  });
  markerWichita.addListener('click', function() {
    infowindowWitchita.open(map, markerWichita);
  });

}



/* Translation Functions */

function getLanguageVal() {
    const langVal = document.getElementById('translate').value;
    return langVal;
}

function requestTranslation(task) {
    // const text = document.getElementById('text').value;
     const languageCode = document.getElementById('translate').value;

    // const resultContainer = document.getElementById('result');
    // resultContainer.innerText = 'Loading...';

    const params = new URLSearchParams();
    params.append('id', task.id);
    params.append('languageCode', languageCode);

    fetch('/data', {
        method: 'GET',
        body: params
        }).then(response => response.text())
        .then((translatedMessage) => {
        resultContainer.innerText = translatedMessage;
        });
}

 