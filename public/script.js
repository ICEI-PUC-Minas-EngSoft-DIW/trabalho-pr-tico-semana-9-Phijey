const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 14",
      preco: 4999.90,
      categoria: "Celulares",
      imagem: "iphone14.jpg",
      descricao: "Smartphone Apple com ótimo desempenho.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Galaxy S23",
      preco: 4299.90,
      categoria: "Celulares",
      imagem: "galaxys23.jpg",
      descricao: "Celular Samsung com câmera avançada.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Dell Inspiron",
      preco: 3899.90,
      categoria: "Notebooks",
      imagem: "delinspiron.jpg",
      descricao: "Notebook ideal para estudos e trabalho.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air",
      preco: 7999.90,
      categoria: "Notebooks",
      imagem: "macair.jpg",
      descricao: "Notebook leve e rápido da Apple.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 199.90,
      categoria: "Acessórios",
      imagem: "mousegamer.jpg",
      descricao: "Mouse com alta precisão.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 349.90,
      categoria: "Acessórios",
      imagem: "tecladomecanico.jpg",
      descricao: "Teclado mecânico com iluminação RGB.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4499.90,
      categoria: "Games",
      imagem: "playstation5.jpg",
      descricao: "Console da Sony de última geração.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox Series X",
      preco: 4299.90,
      categoria: "Games",
      imagem: "xboxX.jpg",
      descricao: "Console poderoso da Microsoft.",
      emEstoque: true
    }
  ]
};


const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");


const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");


const allButtons = document.querySelectorAll("button");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function renderCategories() {
  categorySelect.innerHTML = "";

  const optionTodas = document.createElement("option");
  optionTodas.value = "Todas";
  optionTodas.textContent = "Todas";
  categorySelect.appendChild(optionTodas);

  const categorias = [];

  data.produtos.forEach(function (produto) {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorias.forEach(function (categoria) {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categorySelect.appendChild(option);
  });
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  card.style.border = "1px solid #ccc";
  card.style.padding = "10px";
  card.style.margin = "10px";
  card.style.width = "200px";
  card.style.display = "inline-block";
  card.style.verticalAlign = "top";

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = produto.nome;

  const image = document.createElement("img");
  image.setAttribute("src", produto.imagem);
  image.setAttribute("alt", produto.nome);
  image.style.width = "100%";

  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.textContent = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.textContent = "Destacar";

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${
      produto.emEstoque ? "Disponível" : "Indisponível"
    }</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);

    const buttons = card.querySelectorAll("button");

    buttons[0].addEventListener("click", function () {
      showProductDetails(produto);
    });

    buttons[1].addEventListener("click", function () {
      card.classList.toggle("highlight");

      if (card.classList.contains("highlight")) {
        card.style.boxShadow = "0 0 10px #333";
      } else {
        card.style.boxShadow = "none";
      }
    });

    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    console.log(card.getAttribute("data-id"));
  });
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  return data.produtos.filter(function (produto) {
    const matchesName = produto.nome
      .toLowerCase()
      .includes(searchText);

    const matchesCategory =
      selectedCategory === "Todas" ||
      produto.categoria === selectedCategory;

    return matchesName && matchesCategory;
  });
}

searchInput.addEventListener("input", function () {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);