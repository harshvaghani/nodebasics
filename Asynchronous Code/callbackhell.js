console.log('Before');

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHub: 'Harsh' });
    }, 1000);
}
getUser(1, getRepositories);


function getRepositories(user) {
    getRepositories(user.gitHub, getCommits);
}

function getCommits(repos) {
    getCommits(repo, displayCommit);
}

function displayCommit(commits) {
    console.log(commits);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2']);
    }, 1000);
}



console.log('After');