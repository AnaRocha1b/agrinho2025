// === VARIÁVEIS GLOBAIS ===
let fundo, telainicial;
let milho = []; // imagens do milho em diferentes fases
let fase = 0;
let mostrarSemente = true;
let mostrarMilhoFinal = false;
let colhido = false;
let transformado = false;

let sementeImg, colherImg, botaoRestart;
let regadorImg, finalImg, moinhoImg;
let tortilha, oleo, pao, broa, biscoito;

let regadorX = 50, regadorY = 300, regadorW = 60, regadorH = 60;
let moinhoX, milhoAnimX;
let mostrarBotao = false;
let animando = false;

let somFundo, somRegar, somColher, somMoinho, somPalmas;

let tela = "inicio";

// === PRÉ-CARREGAR RECURSOS ===
function preload() {
  fundo = loadImage("fundo1.jpg");
  telainicial = loadImage("telainicial.png");

  for (let i = 0; i < 7; i++) {
    milho[i] = loadImage("milho" + (i + 1) + ".png");
  }

  sementeImg = loadImage("semente.png");
  colherImg = loadImage("colher.png");
  botaoRestart = loadImage("restart.png");
  regadorImg = loadImage("regador.png");
  finalImg = loadImage("milhofinal.png");
  moinhoImg = loadImage("moinho.png");
  tortilha = loadImage("tortilha.png");
  oleo = loadImage("oleo.png");
  pao = loadImage("pao.png");
  broa = loadImage("broa.png");
  biscoito = loadImage("biscoito.png");

  soundFormats('mp3');
  somFundo = loadSound("somfundo.mp3");
  somRegar = loadSound("somregador.mp3");
  somColher = loadSound("somcolher.mp3");
  somMoinho = loadSound("sommoinho.mp3");
  somPalmas = loadSound("somfinal.mp3");
}

// === CONFIGURAÇÃO INICIAL ===
function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);

  moinhoX = width / 2;
  milhoAnimX = -60;

  if (!somFundo.isPlaying()) {
    somFundo.setVolume(0.4);
    somFundo.loop();
  }
}

// === DESENHO PRINCIPAL ===
function draw() {
  if (tela === "inicio") {
    desenharTelaInicial();
    return;
  }

  if (tela === "historia") {
    desenharTelaHistoria();
    return;
  }

  if (tela === "referencia") {
    desenharTelaReferencia();
    return;
  }

  desenharJogo();
}

// === CLIQUES DO MOUSE ===
function mousePressed() {
  if (tela === "inicio") {
    if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 60 && mouseY < height / 2 + 100) {
      tela = "jogo";
      return;
    }

    if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 110 && mouseY < height / 2 + 150) {
      tela = "historia";
      return;
    }

    if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 160 && mouseY < height / 2 + 200) {
      tela = "referencia";
      return;
    }
  } else if (tela === "historia") {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height - 80 && mouseY < height - 40) {
      tela = "inicio";
    }
    return;
  } else if (tela === "referencia") {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height - 80 && mouseY < height - 40) {
      tela = "inicio";
    }
    return;
  }

  if (mouseX > 20 && mouseX < 60 && mouseY > 20 && mouseY < 60) {
    fase = 0;
    mostrarSemente = true;
    mostrarMilhoFinal = false;
    colhido = false;
    transformado = false;
    animando = false;
    milhoAnimX = -60;
    somPalmas.stop();
    tela = "inicio";
    return;
  }

  if (mostrarSemente) {
    let x = width / 2;
    let y = height / 2;
    if (mouseX > x - 40 && mouseX < x + 40 &&
        mouseY > y - 40 && mouseY < y + 40) {
      mostrarSemente = false;
    }
    return;
  }

  if (!colhido && !mostrarMilhoFinal &&
      mouseX > regadorX - regadorW / 2 && mouseX < regadorX + regadorW / 2 &&
      mouseY > regadorY - regadorH / 2 && mouseY < regadorY + regadorH / 2) {
    if (fase < 6) {
      fase++;
      somRegar.play();
    }
  }

  if (fase === 6 && mostrarBotao && !colhido && !mostrarMilhoFinal &&
      mouseX > regadorX - 50 && mouseX < regadorX + 50 &&
      mouseY > regadorY - 70 && mouseY < regadorY - 30) {
    mostrarMilhoFinal = true;
    somColher.play();
  }

  if (mostrarMilhoFinal && !animando && !colhido) {
    let x = width / 2;
    let y = height / 2;
    if (mouseX > x - 60 && mouseX < x + 60 &&
        mouseY > y - 60 && mouseY < y + 60) {
      animando = true;
      mostrarMilhoFinal = false;
      milhoAnimX = -60;
      somMoinho.play();
    }
  }
}

// === TELAS ===
function desenharTelaInicial() {
  image(telainicial, width / 2, height / 2, width, height);
  textSize(36);
  fill(255, 240, 100);
  stroke(0);
  strokeWeight(3);
  text("O Milho: da terra ao asfalto!", width / 2, height / 2 - 100);
  noStroke();

  fill(255);
  rect(width / 2 - 60, height / 2 + 60, 120, 40, 10);
  rect(width / 2 - 60, height / 2 + 110, 120, 40, 10);
  rect(width / 2 - 60, height / 2 + 160, 120, 40, 10); // Botão referência

  fill(0);
  textSize(20);
  text("Jogar", width / 2, height / 2 + 80);
  text("História", width / 2, height / 2 + 130);
  text("Referências", width / 2, height / 2 + 180);
}

function desenharTelaHistoria() {
  image(telainicial, width / 2, height / 2, width, height);
  fill(1);
  textSize(20);
  text("Neste jogo, você vai acompanhar o crescimento do \nmilho desde o campo até a transformação em \nprodutos que fazem parte do nosso dia a dia, como \ntortilha e óleo. O milho é muito mais do que um grão: \nele representa a força do campo, o cuidado dos trabalhadores \nrurais e a conexão com a cidade, onde seus derivados alimentam \ne movimentam a vida urbana.", width / 2, height / 3.3);
  fill(255);
  rect(width / 2 - 50, height - 80, 100, 40);
  fill(0);
  text("Fechar", width / 2, height - 60);
}

function desenharTelaReferencia() {
  image(telainicial, width / 2, height / 2, width, height);
  fill(0);
  textSize(20);
  text("Referências:", width / 2, height / 2 - 140);
  text("freesound.org", width / 2, height / 2 - 90);
  text("pt.stardewvalleywiki.com/Stardew_Valley_Wiki", width / 2, height / 2 - 70);
  text("depositphotos.com", width / 2, height / 2 - 50);
  text("pt.vecteezy.com", width / 2, height / 2 - 30);
  text("chatgpt.com", width / 2, height / 2 - 10);
  fill(255);
  rect(width / 2 - 50, height - 80, 100, 40, 10);
  fill(0);
  text("Voltar", width / 2, height - 60);
}

function desenharJogo() {
  image(fundo, width / 2, height / 2, width, height);
  image(botaoRestart, 40, 40, 40, 40);

  if (mostrarSemente) {
    image(sementeImg, width / 2, height / 2, 80, 80);
    fill(255);
    text("Clique na semente para plantar!", width / 2, 50);
    return;
  }

  if (animando) {
    image(finalImg, milhoAnimX, height / 2, 100, 100);
    image(moinhoImg, moinhoX, height / 2, 200, 400);
    milhoAnimX += 3;
    if (milhoAnimX > moinhoX + 10) {
      animando = false;
      colhido = true;
      transformado = true;
      somMoinho.stop();
      somPalmas.play();
    }
    return;
  }

  if (!mostrarMilhoFinal && !colhido) {
    let imgMilho = fase < 6 ? milho[fase] : milho[5];
    image(imgMilho, width / 2, height - 120, 100, 100);
    image(regadorImg, regadorX, regadorY, regadorW, regadorH);
  }

  if (fase === 6 && !mostrarMilhoFinal && !colhido) {
    image(colherImg, regadorX, regadorY - 50, 100, 40);
    mostrarBotao = true;
    fill(255);
    text("Hora da colheita!", width / 2, 30);
  }

  if (mostrarMilhoFinal && !colhido) {
    image(finalImg, width / 2, height / 2, 120, 120);
    fill(255);
    text("Clique para transformar!", width / 2, 50);
  }

  if (transformado) {
    image(oleo, width / 2 - 160, height / 2, 80, 80);
    image(pao, width / 2 - 80, height / 2, 80, 80);
    image(broa, width / 2, height / 2, 80, 80);
    image(biscoito, width / 2 + 80, height / 2, 80, 80);
    image(tortilha, width / 2 + 160, height / 2, 80, 80);
    fill(255);
    text("Parabéns! Você agregou valor ao milho!", width / 2, 50);
  }

  if (!colhido && fase < 6 && !mostrarMilhoFinal) {
    fill(255);
    text("Clique no regador para regar e fazer o milho crescer!", width / 2, 30);
  }
}
