# Feature Attachments

## Pada feature ini terdapat Model, Service dan Router.

### Model (Attachments.js)
berisi inisialisasi field yang akan digunakan di attachment beserta tipe datanya.

### Service (AttachmentsService.js)

digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature Attachments. 

Di service terdapat beberapa service yang dapat dilakukan yaitu :

  1. attachmentPost, digunakan untuk menyimpan data attachment ke database.
  
  2. allAttachmentGet, digunakan untuk mendapatkan data semua attachment.
  
  3. attachmentGet, digunakan untuk mendapatkan data attachment berdasarkan Id.
  
  4. attachmentGetbyDepartement, digunakan untuk mendapatkan data attachment berdasarkan Id Departement.
  
  5. attachmentDelete, digunakan untuk menghapus attachment berdasarkan Id.

### Router (AttachmentsRouter.js)
disini terdapat 4 (tiga) router yaitu :

  1. post dengan API '/api/1.0/attachments', dimana router ini digunakan untuk menambahkan attachment baru dengan validasi.
  
  2. get all Attachments dengan API '/api/1.0/attachments', router ini digunakan untuk mendapatkan semua data Attachments.
  
  3. get attachment by id dengan API '/api/1.0/attachments/:id', digunakan untuk mendapatkan data attachment berdasarkan Id.

  4. get attachment by departement id dengan API '/api/1.0/attachments/dept/:id, digunakan untuk mendapatkan data attachment yang sesuai dengan id departement.

  5. delete departement by id dengan API '/api/1.0/departements/:id', digunakan untuk menghapus data attachment
