console.log('Before');

// getUser = (id, callback) => {
//     setTimeout(() => {
//         console.log('Hello World');
//         callback({ id: id, gitHub: 'harsh' });
//     }, 1000);

// }
// let user = getUser(1, callback);

// function callback(user) {
//     console.log('User', user);
// }

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHub: 'harsh' });
    }, 2000);
}

let user = getUser(1, (user) => {
    console.log('User: ', user);
    console.log(user.gitHub);


    getRepositories(user.gitHub, (repos) => {
        console.log('repos', repos);
    })
})

console.log('After');

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API');
        callback(['repo1', 'repo2', 'repo3'])
    }, 1000);
}