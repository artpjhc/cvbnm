const questions = [
  {
    category: "FESTAS & TRADIÇÕES",
    title: "Quadrilha, bandeirinhas e quentão: que festa chegou?",
    options: ["Festa Junina", "Folia de Reis", "Festa do Divino", "Congado"],
    answer: 0,
    fact: "As festas juninas são celebradas em todo o Sudeste, com quadrilhas, fogueiras, bandeirinhas e comidas típicas.",
    image: "FestaJunina.jpg",
    alt: "Decoração colorida de uma festa junina brasileira",
    credit: "Festa Junina — Wikimedia Commons · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:FestaJunina.jpg"
  },
  {
    category: "SABORES DE MINAS",
    title: "O pão de queijo é um clássico de qual estado?",
    options: ["São Paulo", "Minas Gerais", "Rio de Janeiro", "Espírito Santo"],
    answer: 1,
    fact: "O pão de queijo é um quitute tradicional mineiro, feito com polvilho e queijo. Café passado costuma fazer companhia.",
    image: "Pao_de_queijo_com_cafe.jpg",
    alt: "Pães de queijo servidos com café",
    credit: "Pão de queijo com café — nwerneck / Wikimedia Commons · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Pao_de_queijo_com_cafe.jpg"
  },
  {
    category: "SABORES CAPIXABAS",
    title: "Qual prato do Espírito Santo vai direto para a panela de barro?",
    options: ["Virado à paulista", "Tutu à mineira", "Moqueca capixaba", "Feijoada carioca"],
    answer: 2,
    fact: "A moqueca capixaba é preparada tradicionalmente em panela de barro. O ofício das paneleiras de Goiabeiras é patrimônio cultural brasileiro.",
    image: "Moqueca_capixaba.jpg",
    alt: "Moqueca capixaba com peixe e temperos",
    credit: "Moqueca capixaba — Jsilvares / Wikimedia Commons · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Moqueca_capixaba.jpg"
  },
  {
    category: "MÚSICA & CARNAVAL",
    title: "A Sapucaí recebe o desfile das escolas de samba de qual cidade?",
    options: ["Belo Horizonte", "Vitória", "Rio de Janeiro", "São Paulo"],
    answer: 2,
    fact: "O Sambódromo da Marquês de Sapucaí recebe os desfiles das escolas de samba do Carnaval do Rio de Janeiro.",
    image: "Samba_schools_parade_carnival_2009_at_rio_de_janeiro-brazil_(53254087980).jpg",
    alt: "Desfile de uma escola de samba no Carnaval do Rio de Janeiro",
    credit: "Desfile de escola de samba — Wim Gevonden / Wikimedia Commons · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Samba_schools_parade_carnival_2009_at_rio_de_janeiro-brazil_(53254087980).jpg"
  },
  {
    category: "CULTURAS POPULARES",
    title: "No Congado, tradição de Minas Gerais, o que se encontra?",
    options: ["Dança, música e devoção", "Corrida de cavalos", "Desfile de carros alegóricos", "Competição de barcos"],
    answer: 0,
    fact: "O Congado é uma manifestação afro-brasileira que reúne música, dança, cortejos e devoção, com formas diferentes em cada comunidade.",
    image: "Congado_in_Minas_Gerais_1876.jpg",
    alt: "Registro histórico de uma celebração do Congado em Minas Gerais, em 1876",
    credit: "Congado em Minas Gerais, 1876 — Rui Santos / Wikimedia Commons · Domínio Público",
    source: "https://commons.wikimedia.org/wiki/File:Congado_in_Minas_Gerais_1876.jpg"
  }
];

const intro = document.querySelector("#quiz-intro");
const play = document.querySelector("#quiz-play");
const cover = document.querySelector("#quiz-cover");
const quizCard = document.querySelector("#quiz-card");
const result = document.querySelector("#quiz-result");
const answers = document.querySelector("#answers");
let questionIndex = 0;
let score = 0;
let locked = false;

document.querySelector("#start-quiz").addEventListener("click", startQuiz);

function startQuiz() {
  questionIndex = 0;
  score = 0;
  intro.hidden = true;
  result.hidden = true;
  cover.hidden = true;
  play.hidden = false;
  quizCard.classList.add("is-playing");
  renderQuestion();
  document.querySelector("#quiz-card").scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderQuestion() {
  locked = false;
  const question = questions[questionIndex];
  const image = document.querySelector("#question-image img");
  image.src = `https://commons.wikimedia.org/wiki/Special:FilePath/${question.image}?width=1200`;
  image.alt = question.alt;
  const credit = document.querySelector("#question-image a");
  credit.href = question.source;
  credit.textContent = question.credit;

  document.querySelector("#question-category").textContent = question.category;
  document.querySelector("#question-count").textContent = `${String(questionIndex + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  document.querySelector("#progress-fill").style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  document.querySelector("#question-title").textContent = question.title;
  document.querySelector("#answer-feedback").textContent = "";
  answers.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-text"></span><span class="answer-chevron">↗</span>`;
    button.querySelector(".answer-text").textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    answers.append(button);
  });
  document.querySelector("#question-title").focus({ preventScroll: true });
}

function chooseAnswer(selected) {
  if (locked) return;
  locked = true;
  const question = questions[questionIndex];
  const correct = selected === question.answer;
  if (correct) score++;

  [...answers.children].forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("is-correct");
    else if (index === selected) button.classList.add("is-wrong");
  });
  document.querySelector("#answer-feedback").textContent = `${correct ? "Acertou!" : "Quase!"} ${question.fact}`;

  window.setTimeout(() => {
    if (questionIndex + 1 < questions.length) {
      questionIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  }, 1900);
}

function showResult() {
  play.hidden = true;
  result.hidden = false;
  const headline = score === 5 ? "Você é quase guia local!" : score >= 3 ? "Olha só, conhece bem!" : "O passeio valeu a pena!";
  const message = score === 5
    ? "Você acertou tudo. Dá pra ver que conhece as histórias e sabores da região."
    : score >= 3
      ? "Você já conhece um bocado do Sudeste e acabou de descobrir mais algumas histórias."
      : "Agora você já leva algumas curiosidades novas sobre o Sudeste na bagagem.";

  result.innerHTML = `
    <div class="result-burst" aria-hidden="true">✳</div>
    <p class="quiz-eyebrow">FIM DO PASSEIO</p>
    <h3>${headline}</h3>
    <div class="result-score"><strong>${score}</strong><span>/ ${questions.length}<small>respostas certas</small></span></div>
    <p class="result-message">${message}</p>
    <button class="button button-green" id="restart-quiz" type="button">Jogar de novo <span>↻</span></button>`;
  document.querySelector("#restart-quiz").addEventListener("click", () => {
    result.hidden = true;
    cover.hidden = false;
    intro.hidden = false;
    quizCard.classList.remove("is-playing");
    quizCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
