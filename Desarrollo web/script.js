function cambiarImagen() {
    const box = document.getElementById("contenedor-foto");
    // Reemplaza por la segunda imagen y la deja estática
    box.innerHTML = `
        <img src="prueba_1.png" alt="Foto de mi persona"
             style="width: 200px;height: 200px; display:block; user-select:none; pointer-events:none;">
    `;
}
