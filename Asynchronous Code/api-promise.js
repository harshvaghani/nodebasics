//it will return already resolved promise authometically
const p = Promise.resolve({ id: 2 })
p.then((result) => { console.log(result) });

//it will return already rejected promise authometically

const p4 = Promise.reject(new Error('message'));
p4.catch(err = (error) => { console.log(error) });