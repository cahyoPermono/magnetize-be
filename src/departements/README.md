# Feature Departments

## Pada feature ini terdapat Model, Service dan Router.

### Model (Departements.js)
berisi inisialisasi field yang akan digunakan di Departements beserta tipe datanya.

### Service (DepartementsService.js)

digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature departements. 

Di service terdapat beberapa service yang dapat dilakukan yaitu :

  1. departementPost, digunakan untuk menyimpan data departement ke database.
  
  2. allDepartmentGet, digunakan untuk mendapatkan data semua departement (termasuk Notes, Attachments).
  
  3. departementGet, digunakan untuk mendapatkan data departement berdasarkan Id (termasuk Notes, Attachments).

  4. departementDelete, digunakan untuk menghapus departement, termasuk attachments dan notes yang memiliki relasi.

### Router (DepartementsRouter.js)
disini terdapat 4 (tiga) router yaitu :

  1. post dengan API '/api/1.0/departments', dimana router ini digunakan untuk menambahkan departement baru dengan validasi dan pengecekan autentifikasi login.
  
  2. get all departements dengan API '/api/1.0/all_departements/:id', router ini digunakan untuk mendapatkan semua data departements dengan melakukan pengecekan permission dari parameter id. 
  
  3. get departement by id dengan API '/api/1.0/departements/:id', digunakan untuk mendapatkan data departement berdasarkan Id.

  4. delete departement by id dengan API '/api/1.0/departements/:id', digunakan untuk menghapus data departement termasuk notes dan attachment
