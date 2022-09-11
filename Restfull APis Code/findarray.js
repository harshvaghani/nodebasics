let array1 = [1, 2, 3];

// let arr2 = array1.find();

let arr2 = array1.findIndex(c => c == 2)
console.log(arr2);

let students = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course1' },
    { id: 4, name: 'course2' },
    { id: 5, name: 'course1' },
    { id: 6, name: 'course2' },
]

let student = students.forEach(element => {
    students.find(c => c.name == 'course1')
});

console.log(student);