# Proyecto Final - Backend E-commerce

Este proyecto es una aplicación de e-commerce desarrollada como proyecto final para el curso de Backend. La aplicación permite gestionar productos y carritos de compra, con funcionalidades de paginación, filtrado y ordenamiento.

## Características

- Gestión de productos con MongoDB
- Sistema de carritos de compra
- Paginación y filtrado de productos
- Ordenamiento por precio
- Interfaz de usuario con Handlebars
- API RESTful

## Requisitos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd proyecto-final
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
- Copiar el archivo `.env.example` a `.env`
- Modificar las variables según sea necesario

4. Iniciar la aplicación:
```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── config/         # Configuraciones
├── models/         # Modelos de MongoDB
├── routers/        # Rutas de la aplicación
├── views/          # Vistas de Handlebars
├── public/         # Archivos estáticos
└── app.js          # Punto de entrada
```

## API Endpoints

### Productos

- `GET /api/products` - Listar productos (con paginación y filtros)
- `GET /api/products/:pid` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:pid` - Actualizar un producto
- `DELETE /api/products/:pid` - Eliminar un producto

### Carritos

- `GET /api/carts/:cid` - Obtener un carrito específico
- `POST /api/carts` - Crear un nuevo carrito
- `POST /api/carts/:cid/products/:pid` - Agregar producto al carrito
- `PUT /api/carts/:cid` - Actualizar carrito
- `PUT /api/carts/:cid/products/:pid` - Actualizar cantidad de producto
- `DELETE /api/carts/:cid/products/:pid` - Eliminar producto del carrito
- `DELETE /api/carts/:cid` - Vaciar carrito

## Vistas

- `/products` - Lista de productos con paginación
- `/products/:pid` - Detalle de producto
- `/carts/:cid` - Vista del carrito

## Filtros y Paginación

La API de productos soporta los siguientes parámetros de consulta:

- `limit`: Número de productos por página (default: 10)
- `page`: Número de página (default: 1)
- `sort`: Ordenamiento por precio ('asc' o 'desc')
- `query`: Filtro por categoría o disponibilidad

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. 