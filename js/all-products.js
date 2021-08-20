const container = document.querySelector(".prod-container");
const buttonLowToHigh = document.querySelector(".lowhigh");
let newBox = document.querySelector("#new");
let used = document.querySelector("#used");
const removeFilters = document.querySelector(".remove-filters");
let productArr = [];
let usedArr = [];
let newArr = [];
let id;
let game;
let usedClicked = false;
let newClicked = false;

async function getAllProducts(url) {

  try {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products);

    for (let i = 0; i < products.length; i++) {
      game = products[i];
      id = game.id;
      productArr.push(game);

      createHTML(products);
    }
  } catch (error) {
    console.log("ERROR: " + error);
    container.innerHTML = errorMessage();
  }
}

getAllProducts("https://gamehub-maria.digital/wp-json/wc/store/products");

function usedIsChecked() {
  usedArr = [];
  if (newBox.checked && used.checked) {
    newBox.checked = false;
    used.checked = false;
  }

  createHTML(productArr);
  if (this.checked) {
    listUsed();
  }
}

function newIsChecked() {
  newArr = [];
  if (newBox.checked && used.checked) {
    newBox.checked = false;
    used.checked = false;
  }

  createHTML(productArr);
  if (this.checked) {
    listNew();
  }
}

function listNew() {
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].tags[0].name === "new") {
      newArr.push(productArr[i]);
      createHTML(newArr);
    }
  }
}

function listUsed() {
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].tags[0].name === "used") {
      usedArr.push(productArr[i]);
      createHTML(usedArr);
    }
  }
}

function sortLowHigh() {
  newClicked = true;
  usedClicked = true;

  for (let i = 0; i < productArr.length; i++) {
    if (newBox.checked) {
      if (newClicked) {
        for (let j = 0; j < newArr.length; j++) {
          newArr.sort((a, b) => a.prices.price - b.prices.price);
        }
      }
      createHTML(newArr);
    }
    else if (used.checked) {
      if (usedClicked) {
        for (let j = 0; j < usedArr.length; j++) {
          usedArr.sort((a, b) => a.prices.price - b.prices.price);
        }
      }
      createHTML(usedArr);
    } else {
      productArr.sort((a, b) => a.prices.price - b.prices.price);
      createHTML(productArr);
    }
  }
}

function sortHighLow() {
  newClicked = true;
  usedClicked = true;

  for (let i = 0; i < productArr.length; i++) {
    if (newBox.checked) {
      if (newClicked) {
        for (let j = 0; j < newArr.length; j++) {
          newArr.sort((a, b) => b.prices.price - a.prices.price);
        }
      }
      createHTML(newArr);
    }
    else if (used.checked) {
      if (usedClicked) {
        for (let j = 0; j < usedArr.length; j++) {
          usedArr.sort((a, b) => b.prices.price - a.prices.price);
        }
      }
      createHTML(usedArr);
    } else {
      productArr.sort((a, b) => b.prices.price - a.prices.price);
      createHTML(productArr);
    }
  }
}

document.querySelector(".az").addEventListener("click", function () {
  for (let i = 0; i < productArr.length; i++) {
    productArr.sort(
      function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      }
    );
    createHTML(productArr);

    if (used.checked) {
      usedArr.sort(
        function (a, b) {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        }
      );
      createHTML(usedArr);
    } else if (newBox.checked) {
      newArr.sort(
        function (a, b) {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        }
      );
      createHTML(newArr);
    } else {
      createHTML(productArr);
    }
  }
});

document.querySelector(".za").addEventListener("click", function () {
  for (let i = 0; i < productArr.length; i++) {
    prodName = productArr[i];
    productArr.sort(
      function (a, b) {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      }
    );
    createHTML(productArr);

    if (used.checked) {
      usedArr.sort(
        function (a, b) {
          if (a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
            return 1;
          } else {
            return 0;
          }
        }
      );
      createHTML(usedArr);
    } else if (newBox.checked) {
      newArr.sort(
        function (a, b) {
          if (a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
            return 1;
          } else {
            return 0;
          }
        }
      );
      createHTML(newArr);
    } else {
      createHTML(productArr);
    }
  }
});

function createHTML(prodArray) {
  container.innerHTML = "";
  prodArray.forEach(function (game) {
    container.innerHTML +=
      `<div class="product">
      <a href="product.html?id=${id}"><img src="${game.images[0].src}" class="img-product"></a>
      <div class="sub-content">
        <a href="product.html?id=${id}">${game.name}</a>
        <p class="price">${game.price_html}</p>
        <button class="button add-to-cart" data-game="${game.name}">BUY</button>
      </div>
    </div>`;
  });
}

removeFilters.addEventListener("click", function () {
  let productArrRemove = [];
  for (let i = 0; i < productArr.length; i++) {
    productArr.sort((a, b) => a.id - b.id);
    productArrRemove.push(productArr);
  }
  createHTML(productArrRemove);
  used.checked = false;
  newBox.checked = false;
});

used.addEventListener("change", usedIsChecked);
newBox.addEventListener("change", newIsChecked);
document.querySelector(".lowhigh").addEventListener("click", sortLowHigh);
document.querySelector(".highlow").addEventListener("click", sortHighLow);