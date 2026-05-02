# UTS PPL SOA - sistem donor darah
Nama: Albi Mulfi
NIM: 2410511083
Kelas: B

## Deskripsi
Sistem ini merupakan implementasi Service-Oriented Architecture (SOA) yang terdiri dari beberapa microservice yang saling berkomunikasi melalui REST API.

Sistem ini digunakan untuk:
- Mengelola data donor darah
- Autentikasi pengguna menggunakan JWT
- Login alternatif menggunakan OAuth (GitHub)
- Integrasi antar service melalui API Gateway

## Arsitektur
Sistem terdiri dari 3 microservice dan 1 API Gateway:

- API Gateway (Port 3000) → Single Entry Point
- Auth Service (Port 3001) → JWT & - OAuth GitHub
- Donor Service (Port 8000 - Laravel) → Data donor + MySQL
- Blood Service (Port 3002) → Data darah & integrasi donor

Semua request dari client harus melalui API Gateway.

## Routing API Gateway
Endpoint	Service Tujuan
/auth	     Auth Service
/donors	     Donor Service
/blood	     Blood Service
/blood-donor Blood → Donor (inter-service)

## Teknologi yang Digunakan
- Node.js (Express)
- Laravel (PHP MVC)
- MySQL
- JWT Authentication
- OAuth 2.0 (GitHub)
- Axios (inter-service communication)

## Autentikasi (JWT)
1. Login menggunakan username & password
2. Menghasilkan:
- Access Token (15 menit)
- Refresh Token (7 hari)
3. Endpoint:
- /auth/login
- /auth/refresh
- /auth/logout
4. Validasi token dilakukan di API Gateway (middleware)

## OAuth 2.0 (GitHub)
1. Menggunakan Authorization Code Flow
2. Endpoint:
- /auth/github
3. Data yang diambil:
- Username
- Email
- Avatar
4. Disimpan ke database dengan:
- oauth_provider = github

## Donor Service (Laravel)
Fitur:
- CRUD Donor
- Paging
- Filtering
- Searching

Endpoint:
Method	Endpoint	                Deskripsi
GET	    /donors	                    Ambil semua donor
GET	    /donors?blood_type=A	    Filter
GET	    /donors?name=abc	        Search
GET	    /donors?page=1&per_page=5	Paging
POST	/donors	                    Tambah donor
PUT	    /donors/{id}	            Update donor
DELETE	/donors/{id}	            Hapus donor

## Blood Service
Fitur:
- Data darah
- Integrasi dengan Donor Service

Endpoint:
Method	Endpoint	    Deskripsi
GET	    /blood	        Data darah
GET	    /blood-donor	Data gabungan (inter-service)

## Inter-Service Communication
Blood Service mengambil data dari Donor Service menggunakan HTTP request (Axios).

## Rate Limiting
Diterapkan di API Gateway:
- Maksimal request per menit
- Mencegah abuse sistem

## Cara Menjalankan Sistem
1. Jalankan Auth Service
cd services/auth-service
node index.js
2. Jalankan Donor Service (Laravel)
cd services/donor-service
php artisan serve
3. Jalankan Blood Service
cd services/blood-service
node index.js
4. Jalankan API Gateway
cd services/api-gateway
node index.js

## Testing
Testing dilakukan menggunakan Postman melalui API Gateway:
/postman
Berisi:
- Collection JSON
- Screenshot hasil testing

## Demo Video
Link Youtube: 
https://www.youtube.com/watch?v=nNAC4m8qXJ0

## Struktur Repository
uts-pplos-b-2410511083/
│
├── README.md
├── services/
│   ├── auth-service/
│   ├── donor-service/
│   ├── blood-service/
│   └── api-gateway/
│
├── docs/
│   ├── laporan-uts.pdf
│   └── arsitektur.png
│
├── postman/
│   ├── collection.json
│   └── screenshots

## Kesimpulan
Sistem ini berhasil mengimplementasikan konsep SOA dengan:
1. Microservices terpisah
2. API Gateway sebagai entry point
3. JWT Authentication
4. OAuth GitHub
5. Inter-service communication
6. Paging, filtering, dan searching
7. Rate limiting