let p = new Promise((resolve, reject) => {
    console.log('Promise is running');
    resolve("value");
    // highlight-next-line
    console.log('Promise is running2');
});

console.log('After creating the Promise');
