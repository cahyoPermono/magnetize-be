Feature User

Pada feature ini terdapat Model, Service dan Router.
Model (User.js) berisi inisialisasi field yang akan digunakan di user beserta tipe datanya.

Service (UserService.js) digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature user. Di service terdapat beberapa service yang dapat dilakukan yaitu :
  1. save, digunakan untuk menyimpan data user ke database.
  2. findByEmail, digunakan untuk mendapatkan data user berdasarkan email yang digunakan. Service ini nantinya digunakan untuk cek email yang didaftarkan user agar tidak sama
  3. find, digunakan untuk mendapatkan seluruh data user beserta role data role setiap user
  4. findbyId, digunakan untuk mendapatkan data 1 (satu) user berdasarkan ID user tersebut
  5. login, digunakan untuk akses masuk atau login user ke aplikasi

Router (UserRouter.js) disini terdapat 5 (lima) router yaitu :
  1. post dengan api '/api/1.0/users',
      dimana router ini digunakan untuk menambahkan user baru didalam router post ini terdapat fungsi check email yaitu not null (email tidak boleh kosong), invalid email (email yang digunakan harus sesuai dengan format email), dan inuse (dimana email yang digunakan tidak boleh sama). 
  2. login dengan api '/api/1.0/login', 
      digunakan untuk akses user login ke aplikasi. User yang password dan emailnya sesuai maka bisa login dan mendapatkan token.
  3. get all user dengan api '/api/1.0/all_users/:id'
      router ini akan mendapatkan semua user yang ada. namun sebelum itu, router ini akan terlebih dahulu melakukan check permission berdasarkan roleId dan nama permission. Jika sesuai dengan permission maka data semua user akan ditampilkan.
  4. get user by Id dengan api '/api/1.0/users/:id'
      router ini digunakan untuk mendapatkan data 1 (satu) user berdasarkan Id user
  5.put dengan api '/api/1.0/update/:id'
      router ini akan melakukan update data user sesuai dengan id user yang ingin diupdate