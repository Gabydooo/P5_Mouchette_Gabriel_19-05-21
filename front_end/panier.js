let productInlocalStorage = JSON.parse(localStorage.getItem("product")); 

productCount();

let cartListPos = document.getElementById("cartList");
if (productInlocalStorage === null || productInlocalStorage == 0){
    const emptyCart = `<div><h2 id = "emptyCart"> Votre panier est vide !</h2></div>`; //-Si le panier est vide on l'affiche 
    cartListPos.innerHTML = emptyCart; 
    document.getElementById("cartTotal").remove();
}

    
    else{//-----------------------------------------------------------------------------------Sinon :
        
        sortLocalStorage();

        for (i = 0; i < productInlocalStorage.length; i++) {
            displayCart(productInlocalStorage[i]);

        }
        totalCalc();
        clearRow();
        clearCart();
        qtyGesture();
    
}



function displayCart(product){
    const template = document.getElementById("cartTemplate")
    const clone = document.importNode(template.content, true)

    clone.getElementById("cartDescription").textContent = product.productName + ' ' + product.productOption;
    clone.getElementById("cartPrice").textContent = product.productPrice;
    clone.getElementById("cartQuantite").textContent = product.quantité;
    clone.getElementById("cartSubTotal").textContent = product.productPrice * product.quantité;

    document.getElementById("cartList").appendChild(clone);
}




function productCount(){
    let nbArticlePos = document.getElementById("nbArticle");
    if (!(productInlocalStorage === null || productInlocalStorage == 0)){
        let nbArticle= 0;
        for (h=0; h< productInlocalStorage.length; h++){
            nbArticle += parseInt(productInlocalStorage[h].quantité);
        }
        nbArticlePos.textContent= nbArticle;
    } 
    else{
        nbArticlePos.remove();
    }
 }


 

 function sortLocalStorage(){
    for (h=0; h < productInlocalStorage.length; h++){
            
        let qty1 = parseInt(productInlocalStorage[h].quantité);
            for(k = h+1; k < productInlocalStorage.length  ; k++){
                if (productInlocalStorage[h].productName  === productInlocalStorage[k].productName && productInlocalStorage[h].productOption === productInlocalStorage[k].productOption){
                    
                    qty1 += parseInt(productInlocalStorage[k].quantité);
                    productInlocalStorage[h].quantité = qty1;
                    
                    productInlocalStorage.splice(k,1);
                
                    
                }
            }
        }

    localStorage.setItem("product", JSON.stringify(productInlocalStorage));
    
 }




 function totalCalc(){
    for(z = 0; z < productInlocalStorage.length; z++){
        let valSubTotal = productInlocalStorage[z].quantité * productInlocalStorage[z].productPrice;
        productInlocalStorage[z].subTotal = valSubTotal;
    }

    let calculTotal = [];
    for (let f=0; f<productInlocalStorage.length; f++){
        console.log(productInlocalStorage[f].subTotal);
        calculTotal.push(productInlocalStorage[f].subTotal);
    }

    const reducer = (accumulator, currentValue)=> accumulator+ currentValue;
    const prixTotal= calculTotal.reduce(reducer,0);

    document.getElementById("total").insertAdjacentHTML("beforeend", " " + prixTotal + "€");
    let round = Math.round(prixTotal/3 * 100)/100;
    document.getElementById("3timesResult").insertAdjacentHTML("beforeend"," " +round + "€");
 }




function clearRow(){
    let clear_btn =document.querySelectorAll(".deleteButton") ;                                            //
        for (y=0; y < clear_btn.length; y++) {
            let supProduct = productInlocalStorage[y]._id + productInlocalStorage[y].productOption;

            clear_btn[y].addEventListener("click", (event)=>{
                event.preventDefault();
                productInlocalStorage = productInlocalStorage.filter( elt => elt._id+elt.productOption !== supProduct);

                localStorage.removeItem("product");
                
                localStorage.setItem("product", JSON.stringify(productInlocalStorage));
                  
                
                
                window.location.reload();
                
            })
        }
}




function clearCart(){
    let eraser = document.getElementById("deleteButtonAll");
    eraser.addEventListener("click", (event)=>{
        event.preventDefault();
        productInlocalStorage = [];
        localStorage.removeItem("product");

        location.reload();
    })
}




function qtyGesture(){
    let add_btn =document.querySelectorAll(".plusButton") ; 
    for (p=0; p < add_btn.length; p++) {
        let addProduct = productInlocalStorage[p];
        add_btn[p].addEventListener("click", (event)=>{
            event.preventDefault();
            let newQty=parseInt(addProduct.quantité);
            newQty+=1;
            addProduct.quantité=newQty;
            localStorage.removeItem("product");

            localStorage.setItem("product", JSON.stringify(productInlocalStorage));
            window.location.reload();
        })
    }
    let moins_btn =document.querySelectorAll(".moinsButton") ; 
        for (t=0; t < add_btn.length; t++) {
            let moinsProduct = productInlocalStorage[t];
            moins_btn[t].addEventListener("click", (event)=>{
                event.preventDefault();
                moinsProduct.quantité-=1;
                localStorage.removeItem("product");

                localStorage.setItem("product", JSON.stringify(productInlocalStorage));
                window.location.reload();
            })
        }
    for(g=0 ; g < productInlocalStorage.length; g++){
        let zero = productInlocalStorage[g];
        if(zero.quantité == 0){
            productInlocalStorage.splice(g,1);
            localStorage.removeItem("product");

            localStorage.setItem("product", JSON.stringify(productInlocalStorage));
            window.location.reload();
        }
    }
}






