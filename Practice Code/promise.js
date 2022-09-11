function first() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    })
}

first()
    .then(() => second())
    .then(() => third())
    .catch(() => fourth())



function second() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}



function third() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 1000);
    })
}



function fourth() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Promise 4'))
        }, 1000);
    })
}

// async function run() {
//     console.time("Time");
//     // await first()
//     // await second()
//     // await third()
//     await Promise.all([first(), second(), third()])
//     console.timeEnd("Time");
// }

// run()


// rank: {
//     type: Number,
//     required: function() { return this.isPublished }
// }, //we can includ a function where we can use boolean value