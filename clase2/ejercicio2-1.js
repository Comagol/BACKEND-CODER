class CourseManager {
    constructor() {
        this.courses = []; // Aca se van a almacenar los cursos
        this.coursesId = 1; // ID autoincrementable
    }

    getCourses() {
        return this.courses;
    }

    addNewCourse(subject, teacher, duration, capacity = 30, date = new Date()) {
        const newCourse = {
            id: this.coursesId++,
            subject,
            teacher,
            duration,
            capacity,
            date,
            students: [],
        };
        this.courses.push(newCourse);
    }

    addStudent(idCourse, idStudent) {
        const course = this.courses.find(course => course.id === idCourse);

        if (!course) {
            console.log("Curso no encontrado");
            return;
        }

        if (course.students.includes(idStudent)) {
            console.log("Este estudiante ya está registrado en el curso.");
            return;
        }

        if (course.students.length < course.capacity) {
            course.students.push(idStudent);
            console.log(`Estudiante ${idStudent} agregado con éxito al curso ${idCourse}.`);
        } else {
            console.log("El curso ya está lleno.");
        }
    }

    duplicateCourse(idCourse, newDate) {
        const course = this.courses.find(course => course.id === idCourse);

        if (!course) {
            console.log("El curso que quieres duplicar no existe.");
            return;
        }

        const duplicateCourse = {
            ...course,
            id: this.coursesId++,
            date: newDate, 
            students: [], // Resetear la lista de estudiantes
        };

        this.courses.push(duplicateCourse);
        console.log(`Curso ${idCourse} duplicado con éxito. Nuevo curso ID: ${duplicateCourse.id}`);
    }
}

// Creamos un manager
const manager = new CourseManager();

// Agregamos cursos
manager.addNewCourse("JavaScript", "Hernan Perez", "30 hs");
manager.addNewCourse("English", "Raul Lopez", "15 hs");
manager.addNewCourse("Python", "Hernan Perez", "40 hs");

// Mostramos los cursos antes de duplicar
console.log("📌 Cursos antes de agregar estudiantes:");
console.log(manager.getCourses());

// Agregamos estudiantes
manager.addStudent(1, 101);
manager.addStudent(1, 102);
manager.addStudent(2, 101);
manager.addStudent(3, 103);
manager.addStudent(3, 104);
manager.addStudent(1, 101); // Intenta agregar un estudiante repetido

// Mostramos los cursos después de agregar estudiantes
console.log("📌 Cursos después de agregar estudiantes:");
console.log(manager.getCourses());

// Duplicamos el curso de JavaScript
manager.duplicateCourse(1, new Date());

// Mostramos los cursos después de duplicar
console.log("📌 Cursos después de duplicar:");
console.log(manager.getCourses());
