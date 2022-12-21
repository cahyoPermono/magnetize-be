# Feature disc

#### Feature ini digunakan untuk membuat model, service dan router dari question dan answer test disc
#### Feature ini dibagi 2 yaitu question dan answer

1. question

    service yang digunakan yaitu :
    
    a. save, digunakan untuk menyimpan question ke database
    
    b. find, untuk mendapatkan data question

    router yang digunakan yaitu :
    
    a. post dengan api '/api/1.0/questions', digunakan sebagai perutean untuk menyimpann data question
    
    b. get dengan api '/api/1.0/questions', digunakan sebagai perutean untuk mendapatkan data question

2. answer

    service yang digunakan yaitu :
    
    a. save, digunakan untuk menyimpan answer ke database
    
    b. findByEmail, untuk mendapatkan data answer berdasarkan email

    router yang digunakan yaitu :
    
    a. post dengan api '/api/1.0/answers', digunakan sebagai perutean untuk menyimpann data answer dimana terdapat check data name tidak boleh kosong, 
    email tidak boleh kosong, email harus valid, dan role tidak boleh kosong
    
    b. get dengan api '/api/1.0/answers/:email', digunakan sebagai perutean untuk mendapatkan data answer berdasarkan email
