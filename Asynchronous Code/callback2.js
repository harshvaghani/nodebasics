console.log('Before');

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHub: 'Harsh' });
    }, 1000);
}
getUser(1, (user) => {
    console.log(user);
    //getRepositories
    getRepositories(user.gitHub, (repos) => console.log(repos));
});


function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2']);
    }, 1000);
}



console.log('After');