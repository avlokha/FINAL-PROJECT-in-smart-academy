const slideShowImages = document.querySelectorAll(".imgdiv .slideshow-img");

const nextImageDelay = 5000;
let currentImageCounter = 0;

slideShowImages[currentImageCounter].style.opacity = 1;
setInterval(nextImage, nextImageDelay);

function nextImage() {
  slideShowImages[currentImageCounter].style.opacity = 0;
  currentImageCounter = (currentImageCounter + 1) % slideShowImages.length;

  slideShowImages[currentImageCounter].style.opacity = 1;
}

// const slideShowImages1 = document.querySelectorAll(".imgimg1 .slideshow-img1");

// const nextImageDelay1 = 2000;
// let currentImageCounter1 = 0;

// slideShowImages1[currentImageCounter1].style.opacity = 1;
// setInterval(nextImage, nextImageDelay1);

// function nextImage() {
//   slideShowImages1[currentImageCounter1].style.opacity = 0;
//   currentImageCounter1 = (currentImageCounter1 + 1) % slideShowImages1.length;

//   slideShowImages1[currentImageCounter1].style.opacity = 1;
// }

// COMMENT modals, popup
const modalEl = document.querySelector(".modal"),
  closeBtn = document.querySelector(".modal-close"),
  openModalSecond = document.querySelector(".open-modal-second");

function showModal() {
  modalEl.classList.add("open");
}

function closeModal() {
  modalEl.classList.remove("open");
}

// closeBtn.addEventListener("click", closeModal);

function dynamicOpenModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.add("open");

    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      dynamicCloseModal(selector);
    });
  }
}

function dynamicCloseModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.remove("open");
  }
}

openModalSecond.addEventListener("click", () => {
  dynamicOpenModal("#sign-up-modal");
});

//
const userForm = document.getElementById("contactForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userWebsite = document.getElementById("userWebsite");
const userMessage = document.getElementById("userMessage");

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    name: userName.value,
    email: userEmail.value,
    website: userWebsite.value,
    message: userMessage.value,
  };
  console.log(userData);
  formData(userData);
});

function formData(userData) {
  fetch("http://borjomi.loremipsum.ge/api/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
      if (response.status == 200) {
        modal.style.display = "flex";
        result.innerHTML =
          "Thank you for getting in touch! <br> We appreciate you contacting us.";
      }
      return response.json();
    })
    .catch((error) => {
      modal.style.display = "flex";
      result.innerHTML = "Something went wrong!";
      console.log(error);
    })
    .then((data) => {
      console.log(data);
      setTimeout(() => {
        userForm.reset();
        modal.style.display = "none";
      }, 10000);
    });
}
