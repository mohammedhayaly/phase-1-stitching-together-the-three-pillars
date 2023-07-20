document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Uncomment the code that locates the heart element
  const articleHearts = document.querySelectorAll(".like-glyph");

  // Step 2: Uncomment the code that mocks server communication
  const mockServerResponse = { likeCount: 100 };

  function likeCallback(event) {
    const heart = event.target;
    mimicServerCall()
      .then(function (serverResponse) {
        heart.innerText = serverResponse;
        if (heart.innerText === "FAILED!") {
          throw new Error("Request failed");
        }
        return heart.innerText;
      })
      .then(function (numLikes) {
        heart.textContent = `${numLikes} likes`;
      })
      .catch(function (error) {
        alert("Request failed");
        heart.innerText = "♡";
      });
  }

  // Step 3: Uncomment the code that listens for "click" events on the heart elements
  for (const heart of articleHearts) {
    heart.addEventListener("click", likeCallback);
  }
});

// Do not modify below this point.
function mimicServerCall() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Request failed");
      } else {
        resolve(mockServerResponse.likeCount);
      }
    }, 300);
  });
}