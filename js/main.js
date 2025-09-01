document.addEventListener('DOMContentLoaded', function() {
    // Botón subir arriba
    const btnSubir = document.getElementById('btnSubir');
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btnSubir.classList.add('visible');
        } else {
            btnSubir.classList.remove('visible');
        }
    });
    
    // Acción de subir al hacer clic
    btnSubir.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modal para compartir
    const modal = document.getElementById('shareModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const compromisosItems = document.querySelectorAll('.compromiso-item');
    const shareNativeBtn = document.getElementById('shareNative');
    const downloadBtn = document.getElementById('downloadImage');
    
    // Abrir modal al hacer clic en una imagen
    compromisosItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            modalImg.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Compartir nativo (si el navegador lo soporta)
    shareNativeBtn.addEventListener('click', function() {
        if (navigator.share) {
            fetch(modalImg.src)
                .then(response => response.blob())
                .then(blob => {
                    const file = new File([blob], 'vivesincobertura.webp', { type: 'image/webp' });
                    navigator.share({
                        title: 'Vive Sin Cobertura',
                        text: 'Me uno al movimiento #ViveSinCobertura',
                        files: [file]
                    })
                    .catch(error => console.log('Error al compartir:', error));
                });
        } else {
            alert('Tu navegador no soporta la función de compartir. Puedes descargar la imagen y compartirla manualmente.');
        }
    });
    
    // Descargar imagen
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = modalImg.src;
        link.download = 'vivesincobertura.webp';
        link.click();
    });
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Menú hamburguesa
    const menuBtn = document.getElementById('menuHamburguesa');
    const navUl = document.querySelector('nav ul');
    menuBtn.addEventListener('click', function() {
        navUl.classList.toggle('active');
    });
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !navUl.contains(e.target)) {
            navUl.classList.remove('active');
        }
    });
}); 