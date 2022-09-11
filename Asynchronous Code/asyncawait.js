const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (1 == 1) {
            resolve('Hello world');
        } else {
            reject('Rejected')
        }
    }, 1000);
});

p.then((value) => {
    console.log(value);
})

async function doWork() {

}