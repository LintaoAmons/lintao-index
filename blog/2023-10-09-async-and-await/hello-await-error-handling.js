function sendRequest() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject("Lintao");
        }, 2000);
    });
}

async function getUsername() {
    // put inside try..catch block
    // highlight-next-line
    try {
        console.log(await sendRequest());
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

getUsername();
