// Get ID
let userlogout = document.getElementById("userlogout");
let listalbums = document.getElementById("listalbums");
let albumName = document.getElementById("albumname");
let addalbums = document.getElementById("addalbums");

// Event Listeners
userlogout.addEventListener("click", logoutUser);
addalbums.addEventListener("click", addAlbum);
listalbums.addEventListener("click", showListAlbum);

document.getElementById("formData").addEventListener("click", editRow);
document.getElementById("formData").addEventListener("click", deleteRow);
document.getElementById("formData").addEventListener("click", photos);

var tbody = document.getElementById("formData"); //get the tbody element

function logoutUser() {
  window.open("index.html", "_self", "", "album.html");
  return true;
}

var serialNum = 0;
function getSno() {
  serialNum++;
  return serialNum;
}

let output = "";
function showListAlbum() {
  fetch("https://jsonplaceholder.typicode.com/albums/")
    .then((response) => response.json())
    // .then((json) => console.log(json))
    .then((data) => {
      console.log(data);
      i = 0;
      data.forEach(function (data) {
        i++;
        if (i <= 10) {
          // insert new row at bottom
          var newRow = tbody.insertRow();

          //set id for new row
          newRow.id = data.id;

          let sno = newRow.insertCell(0);
          sno.innerHTML = getSno();

          let albname = newRow.insertCell(1);
          albname.innerHTML = data.title;

          let edit = newRow.insertCell(2);
          edit.innerHTML = `<a href="#" class="edit"><i class="material-icons">edit</i></a>`;

          let del = newRow.insertCell(3);
          del.innerHTML = `<a href="#" class="delete"><i class="material-icons">delete</i></a>`;

          let photo = newRow.insertCell(4);
          photo.innerHTML = `<a href="#" class="photos"><i class="material-icons">add_a_photo</i></a>`;
        }
      });
    });
}

function addAlbum() {
  let albumName = prompt("please enter album name to save");
  if (albumName) {
    fetch(`https://jsonplaceholder.typicode.com/albums`, {
      method: "POST",
      body: JSON.stringify({
        title: albumName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
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
        albname.innerHTML = albumName;

        let edit = newRow.insertCell(2);
        edit.innerHTML = `<a href="#" class="edit"><i class="material-icons">edit</i></a>`;

        let del = newRow.insertCell(3);
        del.innerHTML = `<a href="#" class="delete"><i class="material-icons">delete</i></a>`;

        let photo = newRow.insertCell(4);
        photo.innerHTML = `<a href="#" class="photos"><i class="material-icons">add_a_photo</i></a>`;
      });
  } else {
    return false;
  }
}

function editRow(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    selectedRow = e.target.parentElement.parentElement.parentElement;
    console.log(selectedRow);
    let updatedAlbumName = prompt("Please enter title to update");

    if (updatedAlbumName != null) {
      selectedRow.cells[1].textContent = updatedAlbumName;
      console.log(selectedRow.id);
      fetch(`https://jsonplaceholder.typicode.com/albums/${selectedRow.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: selectedRow.id,
          title: updatedAlbumName,
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
    alert("Are you sure to delete the album");
    selectedRow.remove();
    fetch(`https://jsonplaceholder.typicode.com/albums/${selectedRow.id}`, {
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


function photos(e){
  if (e.target.parentElement.classList.contains("photos")) {
    console.log('photos');
    selectedRow = e.target.parentElement.parentElement.parentElement;
    localStorage.setItem('id', selectedRow.id);
    window.open("photo.html", "_self", "", "album.html");
  } 
}
