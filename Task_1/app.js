'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


class Cart{
    constructor(){
        this.goods = [];
    }

    add_to_cart(name, price) {      
        name.toString();
        price.toString();
        let re_name = /(?<=\s)\w.+\w(?=\s)/;
        let re_price = /\d+\.\d+/;
        name = name.match(re_name)[0];
        price = price.match(re_price)[0];
        
        if (this.goods.includes(name)){
            this.rewrite_line(name, 1, price); 
        } else {
            this.goods.push(name);
            this.add_line(name, 1 ,price);
        }
    }

    add_line(name, count, price) {
        document.querySelector(".btm_line").insertAdjacentHTML("beforebegin",
        '<div class="cart_line">'+
        `<span class="el_data product_name" id="${name}">${name}</span>`+
        `<span class="el_data product_count">${count}</span>`+
        `<span class="el_data product_price">${price}</span>`+
        `<span class="el_data product_total_price">${price}</span></div>`);
        let gl_price = document.querySelector(".global_price");
        gl_price.textContent = Number(gl_price.textContent) + Number(price);
    }
    
    rewrite_line(name, count, price){
        let cart_line = document.getElementById(`${name}`).parentElement;
        let all_lines = cart_line.querySelectorAll(".el_data");
        all_lines[1].textContent = Number(all_lines[1].textContent) + count;
        all_lines[3].textContent = Number(all_lines[3].textContent) + Number(price);
        let gl_price = document.querySelector(".global_price");
        gl_price.textContent = Number(gl_price.textContent) + Number(price);
    }
}
let crt = new Cart();

document.querySelector(".cartIcon").addEventListener("click", function() {
    document.querySelector(".cart_wrapper").style.display = "flex";
});

let buttons = document.querySelectorAll(".featuredImgDark");
buttons.forEach(function(elem) {
    elem.children[0].addEventListener("click", print_price);  
});

function print_price(event){
    let number = 3;
    if (event.target.children.length == 0){
        number = 4;
    } 
    let p_el = event.target;
    for (let num = 0; num < number; num++){
        p_el = p_el.parentElement;
    }
    crt.add_to_cart(p_el.querySelector(".featuredName").textContent, p_el.querySelector(".featuredPrice").textContent);
}
