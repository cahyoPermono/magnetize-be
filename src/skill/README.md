# Feature skill

#### Terdiri dari Applicant Skill, Job, Other Applicant Skill, Skill, dan Sub Skill

1. Applicant Skill

    service yang digunakan yaitu :
    
    a. save, digunakan untuk menyimpan data applicant skill
    
    b. find, digunakan untuk mendapatkan semua data applicant skill include subskill dan applicant
    

    router yang digunakan yaitu :
    
    a. post dengan api '/api/1.0/applicantskills', sebagai perutean untuk menyimpan data applicant skill
    
    b. get dengan api '/api/1.0/applicantskills', sebagai perutean untuk mendapatkan semua data applicant skill

2. Job

    service yang digunakan yaitu :
    
    a. save, digunakan untuk menyimpan data job
    
    b. find, digunakan untuk mendapatkan semua data job
    
    c. findOne, digunakan untuk mendapatkan satu data job berdasarkan id include skill


    router yang digunakan yaitu :
    
    a. post dengan api '/api/1.0/jobs', sebagai perutean untuk menyimpan data job ke database
    
    b. get all dengan api '/api/1.0/jobs', sebagai perutean untuk mendapatkan semua data job
    
    c. get by id dengan api '/api/1.0/jobs/:id', sebagai perutean untuk mendapatkan satu data job berdasarkan id
    
    d. put dengan api '/api/1.0/update_job/:id', sebagai perutean untuk update data job berdasarkan id

3. Other Applicant Skill

    service yang digunakan yaitu :
    
    a. save, digunakan untuk menyimpan data other applicant skill
    
    b. find, digunakan untuk mendapatkan semua data other applicant skill


    router yang digunakan yaitu :
    
    a.post dengan api '/api/1.0/otherapplicantskills', digunakan sebagai perutean untuk menyimpan data other applicant skill
    
    b. get dengan api '/api/1.0/otherapplicantSkills', digunakan sebagai perutean untuk mendapatkan semua data other applicant skill

4. Skill

    service yang digunakan yaitu :
    
    a. save, untuk menyimpan data skill ke database
    
    b. find, untuk mendapatkan semua data skill
    
    c. findbyIdJob, untuk mendapatkan satu data skill berdasarkan jobId


    router yang digunakan yaitu :
    
    a. post dengan api '/api/1.0/skills', sebagai perutean untuk menyimpan data skill
    
    b. get all dengan api '/api/1.0/skills', sebagai perutean untuk mendapatkan semua data skill
    
    c. get by jobId dengan api '/api/1.0/skills/:jobId', sebagai perutean untuk mendapatkan skill berdasarkan jobId

5. Sub Skill

    service yang digunakan yaitu :
    
    a. save, untuk menyimpan data subskill
    
    b. find, untuk mendapatkan semua data subskill include skill
    
    c. findbyIdSkill, untuk mendapatkan data subskill berdasarkan skillId


    router yang digunakan yaitu :
    
    a. post dengan api '/api/1.0/subskills', sebagai perutean untuk menyimpan data subskill
    
    b. get all dengan api '/api/1.0/subskills', sebagai perutean untuk mendapatkan semua data subskill
    
    c. get by skill id dengan api '/api/1.0/subskills/:skillId', sebagai perutean untuk mendapatkan data subskill berdasarkan skillId
