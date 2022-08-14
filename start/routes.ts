/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PagesController.index').as('home');

Route.get('about/:name?', 'PagesController.about').as('about');
Route.get('contact', 'PagesController.contact').as('contact');

Route.group(() => {
    Route.get('task', 'TasksController.index').as('task.index');
    Route.post('task', 'TasksController.store').as('task.add');
    Route.delete('task/:id', 'TasksController.destroy').as('task.delete');
    Route.patch('task/:id', 'TasksController.update').as('task.update');
}).middleware('auth')


Route.get('register', 'Auth/AuthController.registerShow').as('register.show').middleware('guest');
Route.get('login', 'Auth/AuthController.loginShow').as('login.show').middleware('guest');

Route.post('register', 'Auth/AuthController.register').as('register');
Route.post('login', 'Auth/AuthController.login').as('login');



Route.group(() => {
    Route.get('/', 'Admin/Auth/AuthController.loginShow').as('admin.login.show');
    Route.get('register', 'Admin/Auth/AuthController.registerShow').as('admin.register.show');

    Route.post('register', 'Admin/Auth/AuthController.register').as('admin.register');
    Route.post('login', 'Admin/Auth/AuthController.login').as('admin.login');
}).prefix('/admin')



Route.post('logout', 'Auth/AuthController.logout').as('logout');



