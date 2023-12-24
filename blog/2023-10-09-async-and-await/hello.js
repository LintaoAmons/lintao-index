function sendRequest() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("Lintao")
    }, 2000)
  });
}

let promise = sendRequest();
// highlight-start
promise.then(function(username) {
  console.log(username)
})
// highlight-end
