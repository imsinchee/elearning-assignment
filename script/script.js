var firebaseConfig = {
  apiKey: "AIzaSyBp5fcszCQFcGwkTsSAZwMWsrTO9zbJr3I",
  authDomain: "stitch-368f4.firebaseapp.com",
  databaseURL: "https://stitch-368f4.firebaseio.com",
  projectId: "stitch-368f4",
  storageBucket: "stitch-368f4.appspot.com",
  messagingSenderId: "943998937999",
  appId: "1:943998937999:web:3eb8361263496333ebb9fa",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var phone = "-999";

function clearTable() {
  var table = document.getElementById("course-table");
  var tableRows = table.getElementsByTagName("tr");
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x > 0; x--) {
    table.deleteRow(x);
  }
}

function run() {
  var table = document.getElementById("course-table");
  document.getElementById("login").style = "display: block";
  document.getElementById("addNewUser").style = "display: none";
  document.getElementById("main").style = "display: none";
  document.getElementById("addNewItem").style = "display: none";

  //route to course
  document.getElementById("login-user").onclick = function () {
    phone = document.getElementById("getUserPhone").value;
    var pass = document.getElementById("getPassword").value;
    console.log(phone);
    console.log(pass);
    var auth = db.ref("elearning/kie/user/" + phone);
    auth.once("value", function (snapshot) {
      if (pass != snapshot.val()) {
        alert("Incorrect Password");
        return;
      } else {
        document.getElementById("getUserPhone").value = "";
        document.getElementById("getPassword").value = "";
        document.getElementById("login").style = "display: none";
        document.getElementById("addNewUser").style = "display: none";
        document.getElementById("main").style = "display: block";
        document.getElementById("addNewItem").style = "display: none";
      }
    });
  };

  //route to register new user
  document.getElementById("register-new-user").onclick = function () {
    document.getElementById("login").style = "display: none";
    document.getElementById("addNewUser").style = "display: block";
    document.getElementById("main").style = "display: none";
    document.getElementById("addNewItem").style = "display: none";
  };

  //register new user
  document.getElementById("registerNewUser").onclick = function () {
    var newPhone = document.getElementById("getNewPhone").value;
    var password = document.getElementById("getNewPassword").value;
    if (newPhone == "") {
      alert("Enter Phone Number");
    } else if (password == "") {
      alert("Enter Password");
    } else {
      var registerNew = db.ref("elearning/kie/user/" + newPhone);
      registerNew.set(password);
      document.getElementById("getNewPhone").value = "";
      document.getElementById("getNewPassword").value = "";
    }
  };

  //back to login
  document.getElementById("back").onclick = function () {
    document.getElementById("login").style = "display: block";
    document.getElementById("addNewUser").style = "display: none";
    document.getElementById("main").style = "display: none";
    document.getElementById("addNewItem").style = "display: none";
  };

  //view item
  document.getElementById("buttonCourse").onclick = function () {
    clearTable();
    var courseSelected = document.getElementById("select_course").value;
    if (courseSelected == "") {
      alert("Select a course");
    } else if (courseSelected == "1") {
      var groupData = db.ref("elearning/kie/instrumentation");
      groupData.once("value", function (snapshot) {
        data = snapshot.val();
        data = data.split("?");
        data.shift();
        for (var i = 0; i < data.length; i++) {
          var eachData = data[i].split(":");
          var item = eachData[0];
          var time = eachData[1];
          var check = eachData[2];
          var row = table.insertRow(i + 1);
          var ITEM = row.insertCell(0);
          var TIME = row.insertCell(1);
          var CHECK = row.insertCell(2);
          ITEM.innerHTML = item;
          TIME.innerHTML = time;
          CHECK.innerHTML = check;
        }
      });
    } else if (courseSelected == "2") {
      var groupData = db.ref("elearning/kie/power-electronics");
      groupData.once("value", function (snapshot) {
        data = snapshot.val();
        data = data.split("?");
        data.shift();
        for (var i = 0; i < data.length; i++) {
          var eachData = data[i].split(":");
          var item = eachData[0];
          var time = eachData[1];
          var check = eachData[2];
          var row = table.insertRow(i + 1);
          var ITEM = row.insertCell(0);
          var TIME = row.insertCell(1);
          var CHECK = row.insertCell(2);
          ITEM.innerHTML = item;
          TIME.innerHTML = time;
          if (check == "y") {
            CHECK.innerHTML = "Given";
          } else {
            CHECK.innerHTML = "Not Given";
          }
        }
      });
    } else if (courseSelected == "3") {
      var groupData = db.ref("elearning/kie/ec-hvt");
      groupData.once("value", function (snapshot) {
        data = snapshot.val();
        data = data.split("?");
        data.shift();
        for (var i = 0; i < data.length; i++) {
          var eachData = data[i].split(":");
          var item = eachData[0];
          var time = eachData[1];
          var check = eachData[2];
          var row = table.insertRow(i + 1);
          var ITEM = row.insertCell(0);
          var TIME = row.insertCell(1);
          var CHECK = row.insertCell(2);
          ITEM.innerHTML = item;
          TIME.innerHTML = time;
          if (check == "y") {
            CHECK.innerHTML = "Given";
          } else {
            CHECK.innerHTML = "Not Given";
          }
        }
      });
    }
  };

  //route to login
  document.getElementById("buttonAdd").onclick = function () {
    clearTable();
    //TODO: none login(c), addNewUser, main, addNewItem
    document.getElementById("login").style = "display: none";
    document.getElementById("addNewUser").style = "display: none";
    document.getElementById("main").style = "display: none";
    document.getElementById("addNewItem").style = "display: block";
  };

  //add new assignment
  document.getElementById("addNewAssignment").onclick = function () {
    var course = document.getElementById("new-assignment-course").value;
    var item =
      document.getElementById("new-assignment-item").value +
      " (Updated by " +
      phone +
      ")";
    var deadline = document.getElementById("new-assignment-deadline").value;
    var location = document.getElementById("new-assignment-location").value;
    if (
      course != null ||
      item != " (Updated by " + phone + ")" ||
      deadline != null ||
      location != null
    ) {
      var data = "?" + item + ":" + deadline + ":" + location;
      var path = "elearning/kie/" + course;
      var updateItem = db.ref(path);
      var previous = "";
      updateItem
        .once("value", function (snapshot) {
          console.log(snapshot.val());
          previous = snapshot.val();
          data = previous + data;
        })
        .then(() => {
          updateItem.set(data);
          document.getElementById("new-assignment-course").value = "";
          document.getElementById("new-assignment-item").value = "";
          document.getElementById("new-assignment-deadline").value = "";
          document.getElementById("new-assignment-location").value = "";
        });
    } else {
      alert("Not complete");
      return;
    }
  };

  //route to main
  document.getElementById("backToCourse").onclick = function () {
    document.getElementById("login").style = "display: none";
    document.getElementById("addNewUser").style = "display: none";
    document.getElementById("main").style = "display: block";
    document.getElementById("addNewItem").style = "display: none";
  };
}
