import express from 'express';

import { TokenMiddleware } from '../Auth/Middlewares/TokenMiddleware.js';

// RESTAURANTS
import { CreateRestaurantController } from '../Restaurants/Controllers/CreateRestaurantController.js';
import { DeleteRestaurantController } from '../Restaurants/Controllers/DeleteRestautantController.js';
import { GetAllRestaurantController } from '../Restaurants/Controllers/GetAllRestaurantController.js';
import { ChangeActiveRestaurantController } from '../Restaurants/Controllers/ChangeActiveRestaurantController.js';
import { GetLastRestaurantAddedController } from '../Restaurants/Controllers/GetLastRestaurantAddedController.js';
import { GetRestaurantByID } from '../Restaurants/Controllers/GetRestaurantByID.js';
import { GetActiveRestaurantController } from '../Restaurants/Controllers/ShowActiveRestaurantsController.js';
import { UpdateRestaurantController } from '../Restaurants/Controllers/UpdateRestaurantController.js';

// ADMIN USERS
import { AddUserAppController } from '../UsuarioApp/Controllers/AddUserAppController.js';
// import { GetAllUserAppController } from '../UsuarioApp/Controllers/GetAllUsersAppController.js';
import { AuthUserAppController } from '../UsuarioApp/Auth/AuthUserAppController.js';
import { GetRolUserAppController } from '../UsuarioApp/Controllers/GetRolUserAppController.js';
import { VerifyIfUserExistController } from '../UsuarioApp/Controllers/VerifyIfUserExistController.js';

// REGISTROS DE RECOGIDA
import { GetAllRegistrosRecogida } from '../RegistrosRecogida/Controllers/GetAllRegistrosRecogida.js';
import { AddRegistroRecogidaByIDController } from '../RegistrosRecogida/Controllers/AddRegistroRecogidaByIDController.js';
import { GetPrimerMasDonante } from '../RegistrosRecogida/Controllers/GetPrimerMasDonante.js';
import { GetSegundoMasDonante } from '../RegistrosRecogida/Controllers/GetSegundoMasDonante.js';
import { GetTercerMasDonante } from '../RegistrosRecogida/Controllers/GetTercerMasDonante.js';
import { GetNumberOfRecogidasByIDUserController } from '../RegistrosRecogida/Controllers/GetNumberOfRecogidasByIDUser.js';
import { GetRecogidaByIDUser } from '../RegistrosRecogida/Controllers/GetRecogidaByIDUser.js';
import { GetNumberOfEntregasByIDRestaurantController } from '../RegistrosRecogida/Controllers/GetNumberOfEntregasByIDRestaurantController.js'
import { GetAllRestaurantEntregas } from '../RegistrosRecogida/Controllers/GetAllRestaurantEntregas.js';
import { GetRecogidasHoyController } from '../RegistrosRecogida/Controllers/GetRecogidasHoyController.js';

// ENVIO DE EMAILS
import { EmailSenderController } from '../Emails/Controllers/EmailSenderController.js';
import { EmailSenderByAppController } from '../Emails/Controllers/EmailSenderByAppController.js';
import { EmailSenderIncidentUserController } from '../Emails/Controllers/EmailSenderIncidentUserController.js';


// NOTICIAS
import { GetAllNoticiasController } from '../Noticia/Controllers/GetAllNoticiasController.js';
import { CreateNoticiaController } from '../Noticia/Controllers/CreateNoticiaController.js';
import { GetThreeLastNoticias } from '../Noticia/Controllers/GetThreeLastNoticiasController.js';
import { GetLastNoticiaController } from '../Noticia/Controllers/GetLastNoticiaController.js';

// PUBLICIDAD
import { GetAllPublicidadController } from '../Publicidad/Controllers/GetAllPublicidadController.js';
import { AddPublicidadController } from '../Publicidad/Controllers/AddPublicidadController.js';
import { GetThreeLastPublicidad } from '../Publicidad/Controllers/ThreeLastPublicidadController.js';
import { GetLastPublicidadController } from '../Publicidad/Controllers/GetLastPubliAdded.js';

// IMAGENES
import { AddRestaurantImageController } from '../Images/Controllers/AddRestaurantImageController.js';
import { AddImageRouteController } from '../Images/Controllers/AddImageRouteController.js';
import { GetImagePathByRestaurantIDController } from '../Images/Controllers/GetPathImageByRestaurantID.js';
import { ServeImageController } from '../Images/Controllers/ServeImageController.js';

// RUTAS DE IMAGENES NOTICIAS
import { AddNoticiaRouteController } from '../NoticiasImage/Controllers/AddNoticiaRouteController.js';
import { AddNoticiaImageController } from '../NoticiasImage/Controllers/AddNoticiaImageController.js';
import  { ServeNewsImageController } from '../NoticiasImage/Controllers/ServeNoticiasImageController.js';
import { GetImagePathByNoticiaIDController } from '../NoticiasImage/Controllers/GetPathImageByIDController.js';

// RUTAS IMAGENES PUBLICIDAD
import { AddPublicidadImageController } from '../PublicidadImage/Controllers/UploadPubliImageController.js';
import { AddPublicidadRouteController } from '../PublicidadImage/Controllers/AddPubliRouteController.js';
import { GetImagePathByPublicidadIDController } from '../PublicidadImage/Controllers/GetPathPubliImageController.js';
import { ServePublicidadImageController } from '../PublicidadImage/Controllers/ServePubliImageController.js';

// USUARIOS RESTAURANTES APP
import { AddUsuarioRestauranteAppController } from '../UsuarioRestaurante/Controllers/AddUsuarioRestauranteAppController.js';
import { AuthUsuarioRestauranteAppController } from '../UsuarioRestaurante/Auth/AuthUsuarioRestauranteAppController.js';


// DONACIONES
import { AddDonacionController } from '../Donaciones/Controllers/AddDonacionController.js';
import { GetDonacionesController } from '../Donaciones/Controllers/GetDonacionesController.js';
import { CheckTodayDonationsController } from '../Donaciones/Controllers/CheckTodayDonationsController.js';
import { GetTodayDonationsController } from '../Donaciones/Controllers/GetTodayDonationsController.js';


// USUARIOS
import { AddUsuarioController } from '../Usuarios/Controllers/AddUsuarioController.js'
import { GetAllUsersController } from '../Usuarios/Controllers/GetAllUsersController.js';
import { GetLastUserAddedController } from '../Usuarios/Controllers/GetLastUserAddedController.js';
import { checkUserController } from '../Usuarios/Controllers/CheckUserController.js';
import { ChangeActiveUserController } from '../Usuarios/Controllers/ChangeActiveUserController.js';
import { EditUserController } from '../Usuarios/Controllers/EditUserController.js';

// RUTAS DE IMAGENES DE USUARIOS
import { UploadUsuarioImageController } from '../UsuariosImage/Controllers/UploadUsuarioImageController.js';
import { AddUsuarioRouteController } from '../UsuariosImage/Controllers/AddUsuarioRouteController.js';
import { GetPathImageUsuarioController } from '../UsuariosImage/Controllers/GetPathImageUsuarioController.js';
import { ServeImageUsuarioController } from '../UsuariosImage/Controllers/ServeImageUsuarioController.js';


const router = express.Router();

// GET all restaurants
router.get('/api/rest/all', GetAllRestaurantController);
// POST to add a new restaurant
router.post('/api/rest/add', TokenMiddleware, CreateRestaurantController);
// DELETE a restaurant by id
router.delete('/api/rest/delete/:id', TokenMiddleware, DeleteRestaurantController);
// PUT to change the active status of a restaurant
router.put('/api/rest/active/:id', TokenMiddleware, ChangeActiveRestaurantController);
// GET to get the last restaurant added
router.get('/api/rest/lastone', TokenMiddleware, GetLastRestaurantAddedController);
// GET a restaurant by id
router.get('/api/rest/:id', GetRestaurantByID);
// GET active restaurants
router.get('/api/rest/active', GetActiveRestaurantController);
// PUT to update a restaurant
router.put('/api/rest/:id', TokenMiddleware, UpdateRestaurantController);

// POST to authenticate an admin user
router.post('/api/user/auth', AuthUserAppController);
// POST to add a new admin user
router.post('/api/user/add', TokenMiddleware, AddUserAppController);
// GET the role of an admin user
router.get('/api/user/rol', TokenMiddleware, GetRolUserAppController);
// POST to verify if a user exists
router.post('/api/user/verify', VerifyIfUserExistController);


// GET all registros de recogida
router.get('/api/registros/all', TokenMiddleware, GetAllRegistrosRecogida);
// POST to create a new registro de recogida
router.post('/api/registros/add',TokenMiddleware, AddRegistroRecogidaByIDController);
// GET top donor restaurant
router.get('/api/registros/first', GetPrimerMasDonante);
// GET second top donor restaurant
router.get('/api/registros/second', GetSegundoMasDonante);
// GET third top donor restaurant
router.get('/api/registros/third', GetTercerMasDonante);
// GET the number of recogidas by user
router.get('/api/registros/count/:id_recogida', GetNumberOfRecogidasByIDUserController);
// GET the number recodigas by user
router.get('/api/registros/user/:id_recogida', GetRecogidaByIDUser);
// GET the number of deliveries by restaurant
router.get('/api/registros/restaurant/:id_restaurante', GetNumberOfEntregasByIDRestaurantController);
// GET all deliveries by restaurant
router.get('/api/entregas/restaurant/:id_restaurante', GetAllRestaurantEntregas);
//GET de to see how many recogidas are today
router.get('/api/registros/today/:id_recogida', GetRecogidasHoyController);


// POST to send an email
router.post('/api/email/send', EmailSenderController);
// POST to send an email by the app
router.post('/api/email/sendByApp', TokenMiddleware, EmailSenderByAppController);
// POST to send an email by the app
router.post('/api/email/incidentUser', EmailSenderIncidentUserController);

// GET all noticias
router.get('/api/noticias/all', GetAllNoticiasController);
// POST to create a new noticia
router.post('/api/noticias/add', TokenMiddleware, CreateNoticiaController);
// GET de las 3 últimas noticias
router.get('/api/noticias/lastthree', GetThreeLastNoticias);
// GET de la ultima noticia añadida
router.get('/api/noticias/lastone', GetLastNoticiaController);

// GET all publicidad
router.get('/api/publicidad/all', GetAllPublicidadController);
// POST to add a new publicidad
router.post('/api/publicidad/add', TokenMiddleware, AddPublicidadController);
// GET de las tres ultimas publicidades
router.get('/api/publicidad/lastthree', GetThreeLastPublicidad);
// GET de la ultima publicidad añadida
router.get('/api/publicidad/lastone', GetLastPublicidadController);


// POST IMAGENES
router.post('/api/rest/addimage', TokenMiddleware, AddRestaurantImageController);
// POST subir imagen
router.post('/api/image/fill', TokenMiddleware, AddImageRouteController);
// GET obtener ruta de imagen
router.get('/api/image/:id', GetImagePathByRestaurantIDController);
// GET obtener imagen
router.get('/api/image/serve/:filename', ServeImageController);

// Rutas de imagenes
// Ruta para añadir una ruta de imagen de una noticia
router.post('/api/noticias/route/add', AddNoticiaRouteController);
// Ruta para subir una imagen de noticia
router.post('/api/noticias/image/upload', AddNoticiaImageController);
// Obtener el campo de path de la imagen por ID de noticia
router.get('/api/noticias/image/:id', GetImagePathByNoticiaIDController);
// Servir imagenes de noticias
router.get('/api/image/noticias/:filename', ServeNewsImageController);

// Subir la imagen de la publicidad al controlador
router.post('/api/publicidad/image/upload', TokenMiddleware, AddPublicidadImageController);
// Añadir la ruta de la imagen de la publicidad
router.post('/api/publicidad/route/add', AddPublicidadRouteController);
// Obtener el nombre de la imagen de la publicidad por ID de publicidad
router.get('/api/publicidad/image/:id', GetImagePathByPublicidadIDController);
// Servir imagenes de publicidad
router.get('/api/image/publicidad/:filename', ServePublicidadImageController);

// POST to add a new user restaurant
router.post('/api/user/restaurante/add', TokenMiddleware, AddUsuarioRestauranteAppController);
// POST to authenticate a restaurant user
router.post('/api/user/restaurante/auth', AuthUsuarioRestauranteAppController);

// POST to add a new donation
router.post('/api/donaciones/add', TokenMiddleware, AddDonacionController);
// GET all donations
router.get('/api/donaciones/all', GetDonacionesController);
// GET to check if a restaurant has donations for today
router.get('/api/donaciones/check/:id_restaurante', TokenMiddleware, CheckTodayDonationsController);
// GET to get the donations of today
router.get('/api/donaciones/today', GetTodayDonationsController);


// POST to add a new user
router.post('/api/usuario/add', TokenMiddleware, AddUsuarioController);
// GET all users
router.get('/api/usuario/all', GetAllUsersController);
// GET ultimo usuario añadido
router.get('/api/usuario/lastone', GetLastUserAddedController);
// POST to check if a user exists
router.post('/api/usuario/check', checkUserController);
// POST to change the active status of a user
router.put('/api/usuario/active/:id', TokenMiddleware, ChangeActiveUserController);
// PUT to update a user
router.put('/api/usuario/:id', TokenMiddleware, EditUserController);


// Subir la imagen de la publicidad al controlador
router.post('/api/user/image/upload', TokenMiddleware, UploadUsuarioImageController);
// Añadir la ruta de la imagen de la publicidad
router.post('/api/user/route/add', AddUsuarioRouteController);
// Obtener el nombre de la imagen de la publicidad por ID de publicidad
router.get('/api/user/image/:id', GetPathImageUsuarioController);
// Servir imagenes de publicidad
router.get('/api/image/user/:filename', ServeImageUsuarioController);

export { router };
