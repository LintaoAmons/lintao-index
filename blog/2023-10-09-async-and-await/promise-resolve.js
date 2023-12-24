console.log("Start");

// highlight-next-line
setTimeout(() => {
    console.log("setTimeout"); // macroTask 宏任务
}, 0);

// highlight-next-line
Promise.resolve().then(() => { // MicroTask 微任务
    console.log("Promise");
});

console.log("End");
