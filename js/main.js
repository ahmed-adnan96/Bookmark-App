var nameInput = document.getElementById("siteName");
var siteInput = document.getElementById("siteUrl");
var tBody = document.getElementById("innerTbody");
var websites = [];
if (localStorage.getItem("totalWebsites") != null) {
  websites = JSON.parse(localStorage.getItem("totalWebsites"));
  showWebsites(websites);
}
nameInput.addEventListener("keydown", function () {
  if (validateNameBook() == true) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
  }
});
siteInput.addEventListener("keydown", function () {
  if (validationUrl() == true) {
    siteInput.classList.add("is-valid");
    siteInput.classList.remove("is-invalid");
  } else {
    siteInput.classList.remove("is-invalid");
    siteInput.classList.remove("is-valid");
  }
});
function addSite() {
  if (validateNameBook() == true && validationUrl() == true) {
    var bookmarkSame = false;
    var website = {
      nameBookmark: nameInput.value,
      siteBookmark: siteInput.value,
    };
    for (var i = 0; i < websites.length; i++) {
      if (websites[i].nameBookmark.includes(nameInput.value)) {
        bookmarkSame = true;
        break;
      }
    }
    if (bookmarkSame === true) {
      swal({ title: "name is here" });
    } else {
      websites.push(website);
    }
    nameInput.classList.add("is-invalid");
    siteInput.classList.add("is-invalid");
    localStorage.setItem("totalWebsites", JSON.stringify(websites));
    clearInput();
    showWebsites(websites);
  } else {
    swal({
      title: `Site Name or Url is not valid 
         Please follow the rules below :`,
      text: `Site name must contain at least 3 characters
            the first letter is Capitalize
            Site URL must be a valid one
             
      `,
    });
  }
}

function clearInput() {
  nameInput.value = "";
  siteInput.value = "";
}
function showWebsites(arr) {
  var show = ``;
  for (var i = 0; i < arr.length; i++) {
    show += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${arr[i].nameBookmark}</td>
    <td>
      <a
        class="text-white btn btn-visit btn-sm"
        href="${arr[i].siteBookmark}"
        target="_blank"
      >
        <i class="fa-solid fa-eye pe-2"></i>Visit</a
      >
    </td>
    <td>
      <button onclick="deletBookmark(${i})" class="text-white btn btn-sm btn-danger">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>`;
  }

  tBody.innerHTML = show;
}

function deletBookmark(indx) {
  websites.splice(indx, 1);
  localStorage.setItem("totalWebsites", JSON.stringify(websites));
  showWebsites(websites);
}

function validationUrl() {
  var regexUrl = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  return regexUrl.test(siteInput.value);
}
function validateNameBook() {
  var regex = /^[A-Z][a-z]{3,8}/;
  return regex.test(nameInput.value);
}
