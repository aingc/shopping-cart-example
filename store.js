if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

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
};
const removeCartItem = (event) => {
  let currentButtonClicked = event.target;
  currentButtonClicked.parentElement.parentElement.remove();
  updateCardTotal();
};

const updateCardTotal = () => {
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
  document.getElementsByClassName('cart-total-price')[0].innerHTML =
    '$' + cartTotal;
};
