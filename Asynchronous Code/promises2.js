const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
        reject(new Error('message'));
    }, 1000);
})

p.then((result) => console.log(result))
    .catch((err) => console.log('Erorr', err.message));



function getStudents(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: id, name: 'Harsh' });
        }, 1000);
    })
}


getStudents(1).then((value) => getRepositories(value.name))
    .then((resolveValue) => { console.log(resolveValue); })


//async await 
const user = await getStudents(1)
const repo = await getRepositories(user.name)

// getStudents(1, callback = (user) => {
//     console.log(user)
//     getRepositories(user.name, (repos) => {
//         console.log('Repos', repos);
//         getCommits(repos, (value) => console.log(value));
//     });
// });

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['repo1', 'repo2', 'repo3']);
        }, 1000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['commit']);
        }, 1000);
    })
}