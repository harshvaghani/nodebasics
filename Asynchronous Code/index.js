function getStudent(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHub: 'harsh' });
    }, 1000);
}

getStudent(1, (student) => {
    console.log(student);
    getRepositories(student.gitHub, (repo) => { console.log('repos', repo); })
})

getRepositories(userName, (repo) => {
    repo =
})