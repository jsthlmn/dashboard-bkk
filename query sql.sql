## to show peserta with id loker clause

SELECT nama AS Name, alamat AS Alamat, tgl_lahir AS Tanggal_lahir, jurusan AS jurusan, no_telp AS Telepon, email AS Email, id_loker AS id_loker, nama_loker AS Lowongan
FROM peserta_seleksi
JOIN lowongan_pekerjaan ON peserta_seleksi.id_loker = lowongan_pekerjaan.id
WHERE peserta_seleksi.id_loker = 32


## to show users with id role clause

SELECT name AS Nama, email AS Email, password AS Password, id_role AS id_role, role_name AS Role
FROM users
JOIN roles ON users.id_role = roles.id
WHERE users.id_role = 2

## to show lowongan pekerjaan dan jumlah pesertanya

SELECT jadwal AS Jadwal,  nama_loker AS Lowongan, nama_perusahaan AS Perusahaan, COUNT(id_loker) AS Jumlah_Peserta
FROM peserta_seleksi 
JOIN lowongan_pekerjaan ON peserta_seleksi.id_loker = lowongan_pekerjaan.id 
WHERE peserta_seleksi.id_loker = 32


##
[db.fn('COUNT', db.col('id_loker')), 'Jumlah']

##
[db.fn('date_format', db.col('jadwal'), '%d-%m-%Y'), 'Jadwal']


##
,
            include: [
                {
                    model: Loker,
                    attributes: [
                        [db.fn('date_format', db.col('jadwal'), '%Y-%m-%d'), 'Jadwal'],
                        'nama_loker',
                        'nama_perusahaan'
                    ],
                    where: {
                        jadwal: {
                            $lt: new Date('2021-11-16'),
                            $gt: new Date(new Date('2021-11-16') - 24 * 60 * 60 * 1000)
                         }
                    }
                }
            ]






SELECT COUNT(id_loker) AS Jumlah_Peserta
FROM peserta_seleksi 
JOIN lowongan_pekerjaan ON peserta_seleksi.id_loker = lowongan_pekerjaan.id 

UNION

SELECT AVG(id_loker) AS Rata_rata
FROM peserta_seleksi