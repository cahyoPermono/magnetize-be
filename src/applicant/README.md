Feature applicant

Feature applicant dibagi menjadi beberapa Model, service dan router yaitu :
1. Applicant
    Model (Applicant.js), digunakan untuk inisialisasi field yang dibutuhkan untuk data applicant.

    Service yang digunakan yaitu :
    a. save, untuk menyimpan data applicant
    b. find, untuk mendapatkan semua data applicant
    c. findOrder, untuk mendapatkan satu data applicant terakhir
    d. byId, untuk mendapatkan satu data applicant berdasarkan id yang sudah include family,formal education, nonformal education, employment history, job description, computer literate, other information, attachment

    Router yang digunakan yaitu :
    a. post dengan api '/api/1.0/applicants', untuk post semua data applicant dengan menggunakan masing-masing service yg ada
    b. get applicant dengan api '/api/1.0/applicants', untuk mendapatkan data aplicant terakhir
    c. get all applicant dengan api '/api/1.0/allapplicants', untuk mendapatkan data semua applicant
    d. get applicant by id dengan api '/api/1.0/applicants/:id', untuk mendapatkan data applicant berdasarkan id
    e. put dengan api '/api/1.0/tocandidate/:id', untuk melakukan update data applicant berdasarkan id

2. AttachmentApplicant
    service yang digunakan yaitu
    a. save, untuk menyimpan data attachment
    b. save2, untuk menyimpan data attachment sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data attachment applicant
    d. byIdApplicant, untuk mendapatkan 1 data attachment berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/attachmentapplicants', digunakan untuk menyimpan data attachment
    b. get dengan api '/api/1.0/attachmentapplicants', digunakan untuk mendapatkan semua data attachment
    c. get dengan api '/api/1.0/attachmentapplicants/:id', digunakan untuk mendapatkan attachment berdasarkan id applicant

3. ComputerLiterate
    service yang digunakan yaitu :
    a. save, untuk menyimpan data computer literate
    b. save2, untuk menyimpan data computer literate sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data computer literate applicant
    d. byIdApplicant, untuk mendapatkan 1 data computer litarate berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/computerliterates', digunakan untuk menyimpan data computer literate
    b. get dengan api '/api/1.0/computerliterates', digunakan untuk mendapatkan semua data computer literate
    c. get dengan api '/api/1.0/computerliterates/:id', digunakan untuk mendapatkan computer literate berdasarkan id applicant

4. EmploymentHistory
    service yang digunakan yaitu :
    a. save, untuk menyimpan data employment history
    b. save2, untuk menyimpan data employment history sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data employment history applicant
    d. byIdApplicant, untuk mendapatkan 1 data employment history berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/employmenthistories', digunakan untuk menyimpan data employment history
    b. get dengan api '/api/1.0/employmenthistories', digunakan untuk mendapatkan semua data employment history
    c. get dengan api '/api/1.0/employmenthistories/:id', digunakan untuk mendapatkan employment history berdasarkan id applicant

5. Family
    service yang digunakan yaitu :
    a. save, untuk menyimpan data family
    b. save2, untuk menyimpan data family sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data family applicant
    d. byIdApplicant, untuk mendapatkan 1 data family berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/families', digunakan untuk menyimpan data family
    b. get dengan api '/api/1.0/families', digunakan untuk mendapatkan semua data family
    c. get dengan api '/api/1.0/families/:id', digunakan untuk mendapatkan family berdasarkan id applicant

6. Formal Education
    service yang digunakan yaitu :
    a. save, untuk menyimpan data formal education
    b. save2, untuk menyimpan data formal education sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data formal education applicant
    d. byIdApplicant, untuk mendapatkan 1 data formal education berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/formaleducations', digunakan untuk menyimpan data formal education
    b. get dengan api '/api/1.0/formaleducations', digunakan untuk mendapatkan semua data formal education
    c. get dengan api '/api/1.0/formaleducations/:id', digunakan untuk mendapatkan formal education berdasarkan id applicant

7. Job Description
    service yang digunakan yaitu :
    a. save, untuk menyimpan data job description
    b. save2, untuk menyimpan data job description sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data job description applicant
    d. byIdApplicant, untuk mendapatkan 1 data job description berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/jobdescriptions', digunakan untuk menyimpan data job description
    b. get dengan api '/api/1.0/jobdescriptions', digunakan untuk mendapatkan semua data job description
    c. get dengan api '/api/1.0/jobdescriptions/:id', digunakan untuk mendapatkan job description berdasarkan id applicant

8. Non Formal Education
    service yang digunakan yaitu :
    a. save, untuk menyimpan data non formal education
    b. save2, untuk menyimpan data non formal education sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data non formal education applicant
    d. byIdApplicant, untuk mendapatkan 1 data non formal education berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/nonformaleducations', digunakan untuk menyimpan data non formal education
    b. get dengan api '/api/1.0/nonformaleducations', digunakan untuk mendapatkan semua data non formal education
    c. get dengan api '/api/1.0/nonformaleducations/:id', digunakan untuk mendapatkan non formal education berdasarkan id applicant

9. Other Information
    service yang digunakan yaitu :
    a. save, untuk menyimpan data other information
    b. save2, untuk menyimpan data other information sesuai dengan id applicant terakhir digunakan di ApplicantRouter.js
    c. find, untuk mendapatkan semua data other information applicant
    d. byIdApplicant, untuk mendapatkan 1 data other information berdasarkan id applicant

    router yang digunakan yaitu :
    a. post dengan api '/api/1.0/otherinformations', digunakan untuk menyimpan data other information
    b. get dengan api '/api/1.0/otherinformations', digunakan untuk mendapatkan semua data other information
    c. get dengan api '/api/1.0/otherinformations/:id', digunakan untuk mendapatkan other information berdasarkan id applicant
