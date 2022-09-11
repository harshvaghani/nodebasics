const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Hello World 1');
        reject(new Error('failed'))
    }, 2000);
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Hello World 2');
        resolve(2)
    }, 1000);
})


Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message));

//result will be available in Array