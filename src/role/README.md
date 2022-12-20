# Feature role

#### Pada feature ini terdapat Model, Service dan Router.

Model (Role.js) berisi inisialisasi field yang akan digunakan di role beserta tipe datanya.

Service (RoleService.js) digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature role. 

Di service terdapat beberapa service yang dapat dilakukan yaitu :

  1. save, digunakan untuk menyimpan data role ke database.
  
  2. find, digunakan untuk mendapatkan data semua role dimana disini langsung include permission.
  
  3. findById, digunakan untuk mendapatkan data role berdasarkan Id disini telah include dengan permission.

Router (RoleRouter.js) disini terdapat 3 (tiga) router yaitu :

  1. post dengan api '/api/1.0/roles', dimana router ini digunakan untuk menambahkan role baru.
  
  2. get all role dengan api '/api/1.0/roles', router ini digunakan untuk mendapatkan semua data role.
  
  3. get role by id dengan api '/api/1.0/roles/:id', digunakan untuk mendapatkan data role berdasarkan Id.
