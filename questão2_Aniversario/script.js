// Obtém os elementos do DOM necessários
const fileInput = document.getElementById("fileInput");
const resultadoDiv = document.getElementById("resultado");
const downloadButton = document.getElementById("downloadAniversariantes");

// Adiciona um ouvinte de evento para o evento "change" do elemento de entrada de arquivo
fileInput.addEventListener("change", function () {
    // Verifica se um arquivo foi selecionado
    if (fileInput.files.length === 0) {
        resultadoDiv.innerHTML = "Selecione um arquivo de texto primeiro.";
        downloadButton.style.display = "none";
        return;
    }

    // Obtém o arquivo selecionado
    const file = fileInput.files[0];
    const reader = new FileReader();

    // Quando o arquivo é lido
    reader.onload = function (event) {
        // Obtém o conteúdo do arquivo
        const fileContent = event.target.result;
        const consultores = fileContent.split("\n");
        const mesAtual = new Date().getMonth() + 1; // Obtém o mês atual (1 a 12)

        // Filtra os consultores que são aniversariantes no mês atual
        const aniversariantes = consultores
            .map(consultor => consultor.split("|")) // Divide os dados usando o caractere "|"
            .filter(dados => dados.length >= 3 && parseInt(dados[2].split("/")[1], 10) === mesAtual);

        // Exibe os aniversariantes no elemento "resultadoDiv"
        if (aniversariantes.length > 0) {
            const resultado = aniversariantes.map(aniversariante => {
                return `
                    <div class="aniversariante">
                        <span><strong>Nome:</strong> ${aniversariante[0]}</span>,
                        <span><strong>E-mail:</strong> ${aniversariante[1]}</span>,
                        <span><strong>Data de Nascimento:</strong> ${aniversariante[2]}</span>
                    </div>
                `;
            }).join("");
            resultadoDiv.innerHTML = `<strong>Aniversariantes do mês:</strong> <br>${resultado}`;
        
            // Torna o botão de download visível e configura um ouvinte de evento para baixar o arquivo
            downloadButton.style.display = "block";
            downloadButton.addEventListener("click", () => {
                const aniversariantesTexto = aniversariantes.map(aniversariante => {
                    return aniversariante.join(" | ");
                }).join("\n");
                downloadFile("aniversariantes.txt", aniversariantesTexto);
            });
        } else {
            resultadoDiv.innerHTML = "Não há aniversariantes neste mês.";

            // Torna o botão de download oculto se não houver aniversariantes
            downloadButton.style.display = "none";
        }
    };

    // Lê o conteúdo do arquivo de texto
    reader.readAsText(file);
});
