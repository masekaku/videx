// PENTING: Gunakan path absolut "/links.json"
const jsonFileUrl = '/links.json';

// Ambil elemen tombol
const watchButton = document.getElementById('watch-button');

/**
 * Fungsi untuk mengambil key dari path URL.
 * Contoh: URL "/v/promo" akan mengembalikan "promo".
 */
function getRedirectKey() {
  // window.location.pathname akan berisi "/v/promo"
  const path = window.location.pathname; 
  
  // Pisahkan string berdasarkan '/' -> hasil: ["", "v", "promo"]
  const parts = path.split('/'); 
  
  // Pastikan formatnya benar (/v/KEY) dan ambil KEY-nya
  if (parts[1] === 'v' && parts[2]) {
    return parts[2]; // Ini adalah "promo"
  }
  return null; // Tidak ada key
}

// 1. Dapatkan key saat halaman dimuat
const redirectKey = getRedirectKey();
console.log('Key yang diminta dari URL:', redirectKey);

/**
 * Fungsi yang dijalankan saat tombol diklik
 */
async function redirectToVideo() {
  
  // 2. Buat tombol jadi "loading"
  watchButton.disabled = true;
  watchButton.innerHTML = 'Loading...';

  try {
    // 3. Ambil file JSON
    const response = await fetch(jsonFileUrl);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }
    const data = await response.json();
    
    // 4. Tentukan URL tujuan
    // Jika data['promo'] ada, gunakan itu.
    // Jika tidak, gunakan data['default'].
    const destinationUrl = data[redirectKey] || data.default;

    // 5. Arahkan pengguna
    if (destinationUrl) {
      console.log(`Mengarahkan ke key '${redirectKey || 'default'}': ${destinationUrl}`);
      window.location.replace(destinationUrl);
    } else {
      // Ini terjadi jika 'default' juga tidak ada di JSON
      throw new Error('Key tidak ditemukan dan tidak ada URL default di JSON.');
    }

  } catch (error) {
    // 6. Tangani jika ada error
    console.error('Proses redirect gagal:', error);
    watchButton.disabled = false;
    // (Mengembalikan HTML tombol ke semula butuh penanganan lebih, 
    // tapi 'Coba Lagi' sudah cukup untuk error)
    watchButton.innerHTML = 'Gagal, Coba Lagi';
  }
}

// 7. Pasang fungsi tadi ke event 'click' tombol
watchButton.addEventListener('click', redirectToVideo);
