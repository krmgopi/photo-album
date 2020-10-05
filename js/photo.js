// Get ID
let userlogout = document.getElementById("userlogout");
let backtoalbum = document.getElementById("backtoalbum");
let addphoto = document.getElementById("addphoto");
let  userid = document.getElementById('userID');

// Event Listeners
userlogout.addEventListener("click", logoutUser);
backtoalbum.addEventListener("click", backToAlbum);
addphoto.addEventListener("click", addPhotos);

document.getElementById("formData").addEventListener("click", editRow);
document.getElementById("formData").addEventListener("click", deleteRow);

var tbody = document.getElementById("formData"); //get the tbody element
function logoutUser() {
  window.open("index.html", "_self", "", "photo.html");
  return true;
}

function backToAlbum() {
  window.open("album.html", "_self", "", "photo.html");
  return true;
}

var serialNum = 0;
function getSno() {
  serialNum++;
  return serialNum;
}

function addPhotos(){
    let photoName = prompt("please enter photo name to save");

    let randomID = Math.floor(Math.random() * 100 + 1);

    if (photoName) {
        fetch(`https://jsonplaceholder.typicode.com/photos/${randomID}`)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
  
          // insert new row at bottom
          var newRow = tbody.insertRow();
  
          //set id for new row
          newRow.id = data.id;
  
          let sno = newRow.insertCell(0);
          sno.innerHTML = getSno();
  
          let albname = newRow.insertCell(1);
          albname.innerHTML = photoName;

          console.log(data.url);
          let photo = newRow.insertCell(2);
          photo.innerHTML = `<img src="${data.thumbnailUrl}" width="150" height="150" />`;

          let edit = newRow.insertCell(3);
          edit.innerHTML = `<a href="#" class="edit"><i class="material-icons">edit</i></a>`;
  
          let del = newRow.insertCell(4);
          del.innerHTML = `<a href="#" class="delete"><i class="material-icons">delete</i></a>`;
        });
    } else {
      return false;
    }
}


function editRow(e) {
    if (e.target.parentElement.classList.contains("edit")) {
      selectedRow = e.target.parentElement.parentElement.parentElement;
      console.log(selectedRow);
      let updatedPhotoName = prompt("Please enter title to update");
  
      if (updatedPhotoName != null) {
        selectedRow.cells[1].textContent = updatedPhotoName;
        console.log(selectedRow.id);
        fetch(`https://jsonplaceholder.typicode.com/photos/${selectedRow.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: selectedRow.id,
            title: updatedPhotoName,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      } else {
        return false;
      }
    }
  }

  function deleteRow(e) {
    if (e.target.parentElement.classList.contains("delete")) {
      selectedRow = e.target.parentElement.parentElement.parentElement;
      serialNum--;
      console.log(selectedRow);
      alert("Are you sure to delete the photo");
      selectedRow.remove();
      fetch(`https://jsonplaceholder.typicode.com/photos/${selectedRow.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
  
    var tb = document.getElementById("formData");
    var tempSerial = 1;
    for (i = 0; i < tb.rows.length; i++) {
      var d = tb.rows[i].cells[0];
      d.textContent = tempSerial++;
    }
  }

document.addEventListener('DOMContentLoaded', function(){
    init();
});

function init(){
    let id = localStorage.getItem('id');
    userid.innerHTML = `The user id is ${id}`
    console.log(id)
}