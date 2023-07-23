document.addEventListener("DOMContentLoaded", function () {
    // Ambil referensi ke elemen body
    const body = document.body;
  
    // Buat elemen img untuk gambar pointer
    const customPointer = document.createElement("img");
    customPointer.src = "pointer.svg";
    customPointer.style.position = "absolute";
    customPointer.style.pointerEvents = "none"; // Mencegah gambar pointer menerima event klik
  
    // Tambahkan gambar pointer ke dalam body
    body.appendChild(customPointer);
  
    // Fungsi untuk mengikuti posisi mouse
    function movePointer(event) {
      const x = event.clientX;
      const y = event.clientY;
  
      // Atur posisi gambar pointer sesuai dengan posisi mouse
      customPointer.style.left = `${x}px`;
      customPointer.style.top = `${y}px`;
    }
  
    // Panggil fungsi movePointer saat mouse bergerak
    document.addEventListener("mousemove", movePointer);
  });
  