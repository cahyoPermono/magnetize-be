# Feature Notes

## Pada feature ini terdapat Model, Service dan Router.

### Model (Notes.js)
berisi inisialisasi field yang akan digunakan di notes beserta tipe datanya.

### Service (NotesService.js)

digunakan untuk mendefinisikan service atau hal apa saja yang bisa dilakukan di feature Notes. 

Di service terdapat beberapa service yang dapat dilakukan yaitu :

  1. notesPost, digunakan untuk menyimpan data note ke database.
  
  2. allNoteGet, digunakan untuk mendapatkan data semua note.
  
  3. noteGet, digunakan untuk mendapatkan data note berdasarkan Id.
  
  4. noteGetbyDepartement, digunakan untuk mendapatkan data note berdasarkan Id Departement.
  
  5. noteDelete, digunakan untuk menghapus note berdasarkan Id.

### Router (NotesRouter.js)
disini terdapat 4 (tiga) router yaitu :

  1. post dengan API '/api/1.0/notes', dimana router ini digunakan untuk menambahkan note baru dengan validasi.
  
  2. get notes dengan API '/api/1.0/notes', router ini digunakan untuk mendapatkan semua data Notes.
  
  3. get note by id dengan API '/api/1.0/notes/:id', digunakan untuk mendapatkan data note berdasarkan Id.

  4. get note by departement id dengan API '/api/1.0/notes/dept/:id, digunakan untuk mendapatkan data note yang sesuai dengan id departement.

  5. delete note by id dengan API '/api/1.0/notes/:id', digunakan untuk menghapus data note
