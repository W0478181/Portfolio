/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const words = ["HTML & CSS", "JavaScript", "Python", "SQL", "Windows", "Linux", "Networking", "Servers", "Active Directory"];
let currentWord = 0;
let currentLetter = 0;
let typing = true;
const speed = 100;

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("typing");

  function type() {
    const word = words[currentWord];

    if (typing) {
      typingElement.textContent = word.substring(0, currentLetter + 1);
      currentLetter++;
      if (currentLetter === word.length) {
        typing = false;
        setTimeout(type, 1000);
        return;
      }
    } else {
      typingElement.textContent = word.substring(0, currentLetter - 1);
      currentLetter--;
      if (currentLetter === 0) {
        typing = true;
        currentWord = (currentWord + 1) % words.length;
        setTimeout(type, 500);
        return;
      }
    }

    setTimeout(type, speed);
  }

  type();
});