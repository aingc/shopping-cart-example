const ready = () => {
  let removeCartItemButtons = document.getElementsByClassName('btn-danger');
  console.log(removeCartItemButtons);

  // for nodeList and HTMLCollection, it is better to iterate over with a for loop
  // instead of for/in because its meant for iterating props of an obj
  // for nodeList and HTMLCollection there can be other props that can be return with for/in
  // that aren't wanted
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let j = 0; j < quantityInputs.length; j++) {
    let input = quantityInputs[j];
    input.addEventListener('change', quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (let k = 0; k < addToCartButtons.length; k++) {
    let button = addToCartButtons[k];
    button.addEventListener('click', addToCartClicked);
  }
};

const removeCartItem = (event) => {
  let currentButtonClicked = event.target;
  currentButtonClicked.parentElement.parentElement.remove();
  updateCartTotal();
};

const quantityChanged = (event) => {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
};

const addToCartClicked = (event) => {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let itemTitle = shopItem.getElementsByClassName('shop-item-title')[0]
    .innerText;
  let itemPrice = shopItem.getElementsByClassName('shop-item-price')[0]
    .innerText;
  let itemImgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(itemTitle, itemPrice, itemImgSrc);
  updateCartTotal();
};

const addItemToCart = (title, price, imgSrc) => {
  let cartRow = document.createElement('div');
  cartRow.className = 'cart-row';
  let cartItems = document.getElementsByClassName('cart-items')[0];
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert('This item is already added to the cart');
      return;
    }
  }

  let cartRowContents = `
    <div class="cart-item cart-column">
      <img
        class="cart-item-image"
        src="${imgSrc}"
        width="100"
        height="100"
      />
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" />
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  let cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
  let cartRemoveBtn = cartRow.getElementsByClassName('btn-danger')[0];
  cartQuantity.addEventListener('change', quantityChanged);
  cartRemoveBtn.addEventListener('click', removeCartItem);

  cartItems.append(cartRow);
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

const updateCartTotal = () => {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');

  let cartTotal = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElem = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElem = cartRow.getElementsByClassName('cart-quantity-input')[0];
    let price = parseFloat(priceElem.innerHTML.replace('$', ''));
    let quantity = parseInt(quantityElem.value);
    cartTotal += price * quantity;
  }
  cartTotal = Math.round(cartTotal * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerHTML =
    '$' + cartTotal;
};
