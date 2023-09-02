const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();

}

function loadContent(){
  //Remove Food Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

  //Product Cart
  
  let cartBtns=document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();
}


//Remove Item
function removeItem(){
  if(confirm('Are Your Sure to Remove')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];

//Add Cart
function addCart(){
 let food=this.parentElement;
 let title=food.querySelector('.food-title').innerHTML;
 let price=food.querySelector('.food-price').innerHTML;
 let image=food.querySelector('.food-img').src;
 //console.log(title,price,imgSrc);
 
 let newProduct={title,price,image}

 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
  itemList.push(newProduct);
 }


let newProductElement= createCartProduct(title,price,image);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}


function createCartProduct(title,price,image){

  return `
  
  <div id="food-box" >
            
  <div id="vvvv">
    <img src="${image}" style="width: 300px; height: 250px;" class="food-img">

    </div>
  <div class="pic"><img class="food-img"></div>
<h2 class="food-title "style="text-align: center;">${title}</h2>
<p style="text-align: center;"><img src="./image/Group 13.png"></p>
<p style="text-align: center;"><span class="me-2" style="text-decoration: line-through; color:#8B8E99;">$300.00 </span><span class="food-price" >$ ${price}
</span></p>
<button onclick="addtocart()"> <ion-icon name="cart" class="add-cart"></ion-icon></button>
<span class="wish-list"><img src="image/Wish List.png">
</div> 
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("$",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="$"+(price*qty);

  });

  totalValue.innerHTML='$'+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}





fetch("https://fakestoreapi.com/products")


.then((data) =>{
  //console.log(data);
  return data.json();
}).then((completdata) =>{
  //console.log(completdata);
 // console.log(completdata[2].title);
  
let data1="";
completdata.map((values) => {
  data1 +=`
  <div id="food-box" >
            
            <div id="vvvv">
              <img src="${values.image}" style="width: 300px; height: 250px;" class="food-img">

              </div>
            <div class="pic"><img class="food-img"></div>
          <h2 class="food-title "style="text-align: center;">${values.title}</h2>
          <p style="text-align: center;"><img src="./image/Group 13.png"></p>
          <p style="text-align: center;"><span class="me-2" style="text-decoration: line-through; color:#8B8E99;">$300.00 </span><span class="food-price" >$ ${values.price}
          </span></p>
          <ion-icon name="cart" class="add-cart"></ion-icon>
          <span class="wish-list"><img src="image/Wish List.png">
        </div> 
  `
});
document.getElementById('main').innerHTML=data1;
//console.log(data1);

 


 

  

  
}).catch((error)=> {
 console.log(error);
})




