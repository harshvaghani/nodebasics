function getStudents(id, callback) {
    setTimeout(() => {
        callback({ id: id, name: 'Harsh' });
    }, 1000);
}

getStudents(1, callback = (user) => {
    console.log(user)
    getRepositories(user.name, (repos) => {
        console.log('Repos', repos);
    });
});

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
}