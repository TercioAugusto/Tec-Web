//troca de imagem
document.querySelectorAll('.imagem-troca-container').forEach(container => {
    const img = container.querySelector('.imagem-troca');
    const imgNormal = container.getAttribute('data-img-normal');
    const imgHover = container.getAttribute('data-img-hover');

    container.addEventListener('mouseover', () => {
        img.src = imgHover; // Troca para a imagem de hover
    });

    container.addEventListener('mouseout', () => {
        img.src = imgNormal; // Retorna para a imagem normal
    });
});
//troca de imagem