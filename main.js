// Selecting all required files and folders

const wrapper = document.querySelector(".wrapper"),
  toast = document.querySelector(".toast"),
  wifiIcon = document.querySelector(".icon"),
  title = document.querySelector("span"),
  subTitle = document.querySelector("p"),
  closeIcon = document.querySelector(".close-content");

window.onload = () => {
  // once window loads
  function ajax() {
    let xhr = new XMLHttpRequest(); //creating a new xml object
    // sending a GET request to this url
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    // once ajax is loaded
    xhr.onload = () => {
      // check status code
      if (xhr.status === 200 && xhr.status < 300) {
        toast.classList.remove("offline");
        title.innerText = "You're Back online";
        subTitle.innerText = "Hurray! internet is connected.";
        wifiIcon.innerHTML = '<i class="fas fa-wifi"></i>';

        closeIcon.onclick = () => {
          wrapper.classList.add("hide");
        };

        // delete the toast automatically after 5 seconds
        setTimeout(() => {
          wrapper.classList.add("hide");
        }, 5000);
      } else {
        // user isn't online or is getting some other kind of error
        offline();
      }
    };
    xhr.onerror = () => {
      // if passed url is incorrect or running 404 / other error
      offline();
    };
    xhr.send();
  }

  const offline = () => {
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "You're currently offline";
    subTitle.innerText = "Opps! Internet is disconnected.";
    wifiIcon.innerHTML =
      '<img src="img/4024576.png" alt="wifi-close" class="grayscale" />';
  };

  // Let's put the ajax call inside a setInterval function so we can call it after
  // every 100ms. So we don't need to refresh the page to see the updated status
  setInterval(() => {
    ajax();
  }, 100);
};
