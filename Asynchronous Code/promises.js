const p = new Promise((resolve, reject) => {
    //Async Work
    setTimeout(() => {
        resolve(1); //Pending => resolve fulfilled
        reject(new Error('message')); //pending => rejected 
    }, 1000);
});

p.then(result = (result) => console.log('Result', result)).catch(err = (er) => console.log('Error', er.message));
//or 
// p.then(result => console.log('Result', result)) //without parameter