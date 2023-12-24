function sendRequest() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject("Lintao");
        }, 2000);
    });
}

async function getUsername() {
    // put inside try..catch block
    try {
        // highlight-next-line
        let username = await fetch('https://jsonplaceholder.typicode.com/users')
        username = await username.json()
        console.log(username);
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

getUsername();
