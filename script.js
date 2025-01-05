let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2";
let senhaJogador1 = "";
let senhaJogador2 = "";
let turnoAtual = 1;
let historico = [];

function confirmarNomes() {
    const nome1 = document.getElementById("nome-jogador1").value.trim();
    const nome2 = document.getElementById("nome-jogador2").value.trim();

    if (!nome1 || !nome2) {
        alert("Por favor, insira um nome para ambos os jogadores.");
        return;
    }

    nomeJogador1 = nome1;
    nomeJogador2 = nome2;

    document.getElementById("setup-nomes").style.display = "none";
    document.getElementById("setup-phase").style.display = "block";

    document.getElementById("prompt-jogador1").textContent = `${nomeJogador1}, defina sua senha:`;
    document.getElementById("prompt-jogador2").textContent = `${nomeJogador2}, defina sua senha:`;
}

function definirSenha(jogador) {
    const inputId = jogador === 1 ? "senha-jogador1" : "senha-jogador2";
    const input = document.getElementById(inputId).value;

    if (input.length === 4 && !isNaN(input)) {
        if (jogador === 1) {
            senhaJogador1 = input;
        } else {
            senhaJogador2 = input;
        }

        document.getElementById(inputId).value = "";
        document.getElementById(inputId).disabled = true;

        if (senhaJogador1 && senhaJogador2) {
            document.getElementById("setup-phase").style.display = "none";
            document.getElementById("game-phase").style.display = "block";

            document.getElementById("titulo-jogador1").textContent = `${nomeJogador1}, tente adivinhar a senha do ${nomeJogador2}:`;
            document.getElementById("titulo-jogador2").textContent = `${nomeJogador2}, tente adivinhar a senha do ${nomeJogador1}:`;
        }
    } else {
        alert("A senha deve conter exatamente 4 dígitos.");
    }
}

function fazerTentativa(jogador) {
    const tentativaInput = jogador === 1 ? "tentativa-jogador1" : "tentativa-jogador2";
    const feedbackId = jogador === 1 ? "feedback-jogador1" : "feedback-jogador2";
    const senhaSecreta = jogador === 1 ? senhaJogador2 : senhaJogador1;
    const nomeJogador = jogador === 1 ? nomeJogador1 : nomeJogador2;

    const tentativa = document.getElementById(tentativaInput).value;

    if (tentativa.length !== 4 || isNaN(tentativa)) {
        alert("A tentativa deve conter exatamente 4 dígitos.");
        return;
    }

    let acertosExatos = 0;
    let acertosParciais = 0;
    const usadosNaSenha = [];
    const usadosNaTentativa = [];

    for (let i = 0; i < 4; i++) {
        if (tentativa[i] === senhaSecreta[i]) {
            acertosExatos++;
        } else {
            usadosNaSenha.push(senhaSecreta[i]);
            usadosNaTentativa.push(tentativa[i]);
        }
    }

    for (let i = 0; i < usadosNaTentativa.length; i++) {
        const index = usadosNaSenha.indexOf(usadosNaTentativa[i]);
        if (index !== -1) {
            acertosParciais++;
            usadosNaSenha.splice(index, 1);
        }
    }

    const feedback = document.getElementById(feedbackId);
    feedback.textContent = `${nomeJogador}: ${acertosExatos} número(s) na posição correta, ${acertosParciais} número(s) certo(s) mas na posição errada.`;

    const tentativaNumero = historico.filter(item => item.jogador === jogador).length + 1;
    const mensagem = `${tentativaNumero}° Tentativa de ${nomeJogador}: Tentativa "${tentativa}", ${acertosExatos} número(s) na posição correta, ${acertosParciais} número(s) certo(s) mas na posição errada.`;

    historico.push({ jogador, tentativa, mensagem });

    const listaHistorico = document.getElementById(
        jogador === 1 ? "lista-historico-jogador1" : "lista-historico-jogador2"
    );
    const li = document.createElement("li");
    li.textContent = mensagem;
    listaHistorico.appendChild(li);

    if (acertosExatos === 4) {
        alert(`${nomeJogador} venceu ao descobrir a senha!`);
        location.reload();
    } else {
        turnoAtual = turnoAtual === 1 ? 2 : 1;
        document.getElementById("turn-jogador1").style.display = turnoAtual === 1 ? "block" : "none";
        document.getElementById("turn-jogador2").style.display = turnoAtual === 2 ? "block" : "none";
    }

    document.getElementById(tentativaInput).value = "";

    // Adiciona os títulos ao histórico no início do jogo
    document.getElementById("titulo-historico-jogador1").textContent = `Histórico de ${nomeJogador1}`;
    document.getElementById("titulo-historico-jogador2").textContent = `Histórico de ${nomeJogador2}`;

}

