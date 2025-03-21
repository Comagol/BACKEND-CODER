class LibraryManager {
    constructor() {
        this.books = []; // Almacén de libros
        this.currentID = 1; // ID autoincrementable para los libros
        this.maxBooksPerUser = 3; // Máximo de libros prestados por usuario
        this.loans = new Map(); // Mapa donde almacenamos los préstamos
    }

    // Método para obtener todos los libros
    getBooks() {
        return this.books;
    }

    // Método para agregar un libro
    addBook(titulo, autor, genero, anioPublicacion) {
        const available = true; // Inicialmente disponible

        const nuevoLibro = {
            id: this.currentID++, // Se incrementa el ID automáticamente
            titulo,
            autor,
            genero,
            anioPublicacion,
            available, // Estado del libro
        };

        this.books.push(nuevoLibro);
    }

    // Método para pedir prestado un libro
    borrowBook(idLibro, idUsuario) {
        const libro = this.books.find(libro => libro.id === idLibro);

        if (!libro) {
            console.log("Libro no encontrado.");
            return;
        }

        if (!libro.available) {
            console.log("El libro ya está prestado.");
            return;
        }

        // Obtener la cantidad de libros que tiene el usuario
        const librosPrestados = this.loans.get(idUsuario) || [];

        if (librosPrestados.length >= this.maxBooksPerUser) {
            console.log("El usuario ya tiene el máximo de libros prestados.");
            return;
        }

        // Registrar el préstamo
        librosPrestados.push(idLibro);
        this.loans.set(idUsuario, librosPrestados);
        libro.available = false; // Se marca como no disponible
    }

    // Método para devolver un libro
    returnBook(idLibro, idUsuario) {
        const libro = this.books.find(libro => libro.id === idLibro);

        if (!libro) {
            console.log("Libro no encontrado.");
            return;
        }

        // Verificar si el usuario realmente tomó prestado el libro
        const librosPrestados = this.loans.get(idUsuario) || [];
        const index = librosPrestados.indexOf(idLibro);

        if (index === -1) {
            console.log("El usuario no tiene este libro en préstamo.");
            return;
        }

        // Eliminar el libro de la lista de préstamos del usuario
        librosPrestados.splice(index, 1);
        this.loans.set(idUsuario, librosPrestados);
        libro.available = true; // Se marca como disponible nuevamente
    }

    // Método para obtener los libros prestados por un usuario
    getUserLoans(idUsuario) {
        return this.loans.get(idUsuario) || [];
    }
}

// Pruebas
const manager = new LibraryManager();

// Agregar libros
manager.addBook("1984", "George Orwell", "Distopía", 1949);
manager.addBook("Cien años de soledad", "Gabriel García Márquez", "Realismo mágico", 1967);
manager.addBook("El Principito", "Antoine de Saint-Exupéry", "Fábula", 1943);

// Mostrar los libros disponibles
console.log("Libros disponibles:", manager.getBooks());

// Usuario 1 toma prestado el libro 1
manager.borrowBook(1, 101);
console.log("Libros prestados por usuario 101:", manager.getUserLoans(101));

// Usuario 1 intenta tomar el mismo libro de nuevo
manager.borrowBook(1, 101);

// Usuario 1 devuelve el libro 1
manager.returnBook(1, 101);
console.log("Libros prestados por usuario 101 después de la devolución:", manager.getUserLoans(101));

// Verificar que el libro 1 está disponible nuevamente
console.log("Libros después de devolución:", manager.getBooks());
