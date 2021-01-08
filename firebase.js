var firebaseConfig = {
  apiKey: "AIzaSyDDaQ3rtacsC93xokNVjSyb34JnXwK_brQ",
  authDomain: "meadow-dfc9d.firebaseapp.com",
  projectId: "meadow-dfc9d",
  storageBucket: "meadow-dfc9d.appspot.com",
  messagingSenderId: "400468998957",
  appId: "1:400468998957:web:0c9a971c6fe2b4e01931a4",
  measurementId: "G-DW83QQ6DN5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

console.log("firebase" + firebase);

var database = firebase.database();
var currentSnapshot = {};



//all of these functions are used to read and send data
function getListings(companyName) {
  return database.ref('/companies/' + companyName).once("value");
};

function loadListing(companyName){
  getListings(companyName).then(setListing, showError);
}

function setListing(snapshot){
  console.log(snapshot.val());
  currentSnapshot = snapshot.val();
}

function showError(e){
  console.log(e);
}

function getData(companyName){
  loadListing(companyName);
}


chrome.runtime.onMessage.addListener((msg, sender, res) => {
  if(msg.command == "fetch"){
    var company = msg.data.company;
    for(var i = 0; i < 3; i++){
      getData(company);
      if(currentSnapshot && Object.keys(currentSnapshot).length > 0) break;
    }
    res({type: "result", status: "success", data: currentSnapshot, request: msg});
  }
});






