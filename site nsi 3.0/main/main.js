//panier
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Les variables pour l'icône du panier, le panier lui-même et le bouton de fermeture du panier

// bordel en rapport avec le js et le panier
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Vérifie si le document est chargé, puis appelle la fonction "ready" ou attend l'événement "DOMContentLoaded" pour appeler la fonction "ready"

//fonction
function ready() {
    cartIcon = document.querySelector('#cart-icon');
    cart = document.querySelector('.cart');
    closeCart = document.querySelector('#close-cart');

    // Initialise les variables cartIcon, cart et closeCart pour les utiliser dans la fonction ready

    //enlever les items du panier
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Récupère les boutons de suppression des articles du panier et ajoute un écouteur d'événements "click" à chacun pour appeler la fonction "removeCartItem"

    //changer les quantitées
    var quantityInput = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    // Récupère les champs d'entrée de quantité des articles du panier et ajoute un écouteur d'événements "change" à chacun pour appeler la fonction "quantityChanged"

    //ajouter au panier
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }

    // Récupère les boutons "Ajouter au panier" et ajoute un écouteur d'événements "click" à chacun pour appeler la fonction "addCartClicked"
}

//ouvrir panier
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Ajoute la classe "active" au panier lorsque l'icône du panier est cliquée

//fermer panier
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Supprime la classe "active" du panier lorsque le bouton de fermeture du panier est cliqué

//enlever les items du panier
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Supprime un élément du panier lorsque le bouton de suppression correspondant est cliqué et met à jour le total du panier

//quantity change
function quantityChanged(envent) {
    var input = envent.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Met à jour la quantité d'un article du panier lorsque la quantité est modifiée et met à jour le total du panier

//ajout au panier
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

// Ajoute un produit au panier lorsque le bouton "Ajouter au panier" correspondant est cliqué, en récupérant le titre, le prix et l'image du produit, puis met à jour le total du panier

function addProductToCart(title, price, productImg) {
    console.log(productImg)
    var cartShopBox = document.createElement('div');
    var cartIems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartIems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title) {
            alert("Vous avez déjà ajouté ceci dans votre panier");
            return;
        }
    }
    cartShopBox.classList.add('cart-box');
    var cartBoxContent = `
                <img src=${productImg} alt=" " class="cart-img">
                <div class="detail-box">
                     <div class="cart-product-title">${title}</div>
                     <div class="cart-price">${price}</div>
                     <input type="number" value="1" class="cart-quantity">
                </div>
                <!--enlever du panier-->
                <i class='bx bx-trash cart-remove' ></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartIems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Crée un élément d'article du panier avec les détails du produit (titre, prix, image) et l'ajoute au panier. Ajoute également des écouteurs d'événements pour la suppression et la modification de la quantité.

// mettre à jour le total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
        // les centimes
        total = Math.round(total * 100) / 100;
    }
    document.getElementsByClassName("total-price")[0].innerText = '$' + total;
}