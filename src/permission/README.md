Feature permission

Pada feature ini terdapat Model, Service dan Router.
Model (Permission.js) berisi inisialisasi field yang akan digunakan di permission beserta tipe datanya.

Service (PermissionService.js) digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature permission. Di service terdapat beberapa service yang dapat dilakukan yaitu :
  1. save, digunakan untuk menyimpan data permission ke database.
  2. find, digunakan untuk mendapatkan data semua permission dimana disini langsung include role.
  3. byOne, digunakan untuk mendapatkan data permission berdasarkan nama permission.

Router (PermissionRouter.js) disini terdapat 3 (tiga) router yaitu :
  1. post dengan api '/api/1.0/permissions',
       dimana router ini digunakan untuk menambahkan permission baru.
  2. get all permission dengan api '/api/1.0/permissions', 
       router ini digunakan untuk mendapatkan semua data permission.
  3. get permission by permission dengan api '/api/1.0/permissions/:permission',
       digunakan untuk mendapatkan data permission berdasarkan nama permission.
