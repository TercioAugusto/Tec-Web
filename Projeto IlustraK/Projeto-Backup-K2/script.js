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

// recaptcha
// Lista de palavras
const palavras = ['Cabeçalho', 'Nemesís', 'Labírinto', 'NaMes@'];
const checkbox = document.getElementById('meuCheckbox');
const button = document.getElementById('button-disable');
// Seleciona uma palavra aleatória
let palavraCorreta = palavras[Math.floor(Math.random() * palavras.length)];
checkbox.addEventListener('change', function() {
    if (this.checked) {
        let input = '';
        while (input !== palavraCorreta) {
            input = prompt(`Digite a palavra: ${palavraCorreta}`); // Mostra a palavra aleatória
            if (input === null) { // Verifica se o usuário clicou em Cancelar
                this.checked = false; // Desmarca o checkbox
                return; // Encerra a validação
            }
            if (input === palavraCorreta) {
                alert('Acesso liberado!');
                button.id = 'button-active'; // Altera o ID do botão
            } else {
                alert('Palavra incorreta. Tente novamente.');
            }
        }
    }
});
// recaptcha