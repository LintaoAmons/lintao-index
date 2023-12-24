function sendRequest() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Lintao");
        }, 2000);
    });
}


// must put await inside async function
// highlight-next-line
async function getUsername() {
    // put await in front of a function which returns a Promise object
    // highlight-next-line
    console.log(await sendRequest());
}

getUsername()
