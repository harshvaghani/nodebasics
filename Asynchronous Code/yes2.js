function getStudents(id, callback) {
    setTimeout(() => {
        callback({ id: id, username: 'Harsh' })
    }, 1000);
}

getStudents(2, getStudents2)

function getStudents2(value) {
    getRepo(value.username, getRepo2)

}

function getRepo2(value) {
    getCommits(repo, displayCommits)
}

function displayCommits(commits) {
    console.log(commits);
}

function getRepo(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2'])
    }, 1000);
}