# Feature rolepermission

#### rolepermission merupakan table perantara antara role dan permission karena role dan permission memiliki hubungan many to many.

Pada feature ini terdapat Model, Service dan Router.

Model (RolePermission.js) berisi inisialisasi field yang akan digunakan di rolepermission beserta tipe datanya.

Service (RolePermissionService.js) digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature rolepermission. 

Di service terdapat beberapa service yang dapat dilakukan yaitu :

  1. save, digunakan untuk menyimpan data rolepermission ke database.
  
  2. all, digunakan untuk memanggil semua data role permission.
  
  3. byroleId, digunakan untuk memanggil semua data role permission berdasarkan roleId
  
  4. bypermission, digunakan untuk mendapatkan semua data role permission berdasarkan permissionId
  
  5. deleterolepermission, digunakan untuk menghapus data role permission berdasarkan roleId


Router (RolePermissionRouter.js) disini terdapat 5 (lima) router yaitu :

  1. post dengan api '/api/1.0/rolepermissions', dimana router ini digunakan untuk menambahkan role permission baru sesuai dengan role yang ada dan permission yang ada
  
  2. get all role permission dengan api '/api/1.0/all_rolepermissions', router ini digunakan untuk mendapatkan semua data role permission
  
  3. get role permission by roleId dengan api '/api/1.0/rolepermissions/:id',digunakan untuk mendapatkan semua data role permission berdasarkan roleId
  
  4. get role permission berdasarkan permissionId dengan api '/api/1.0/permission/:id', digunakan untuk mendapatkan semua data role permission berdasarkan permissionId
  
  5. delete role permission dengan api '/api/1.0/rolepermissions/:id', digunakan untuk menghapus data role permission berdasarkan roleId. disini sebelum dihapus terlebih dahulu dicek apakah data dengan Id tersebut ada atau tidak.
