

let quantity = document.querySelector('.quantity').textContent


//Count Button ///////////////////////////////////////////
document.querySelector('.quantity').textContent = 1

document.querySelector('.plusbtn').addEventListener('click', e => {
    quantity = +quantity + 1
    // console.log(quantity);
    document.querySelector('.quantity').textContent = quantity
});

document.querySelector('.minusbtn').addEventListener('click', e => {
    if (+quantity >= 2) {
        quantity = +quantity - 1
        document.querySelector('.quantity').textContent = quantity
    }
});
