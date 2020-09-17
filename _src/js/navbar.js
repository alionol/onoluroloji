const specifiedElement = document.getElementById('navbarNavDropdown');

document.addEventListener('click', function(event) {
  let isClickInside = specifiedElement.contains(event.target);
  let isShown = specifiedElement.classList.contains('show');

  if (!isClickInside && isShown) {
    document.getElementById("navbarTogglerButton").click();
  }
});
