let productInlocalStorage = JSON.parse(localStorage.getItem("product")); //---------On récupère les données du localstorage pour les mettre dans la variable 
main()

async function main() {
    productCount();

    const teddies = await getTeddies();
    for (teddie of teddies){
        displayteddie(teddie)
    }
    addTeddie(teddies);
      
}



function getTeddies(){
    return fetch("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse){
            return httpBodyResponse.json()
        })
        .then(function(teddies){
            return teddies
        })
        .catch((error)=>{
            alert("Une erreur est survenue")
        })
    
}



function displayteddie(teddie) {
    const template = document.getElementById("productTemplate")
    const clone = document.importNode(template.content, true)

    clone.getElementById("productImage").src = teddie.imageUrl
    clone.getElementById("productName").textContent = teddie.name
    clone.getElementById("productDescription").textContent = teddie.description
    clone.getElementById("productPrice").textContent = teddie.price/100+`€`
    clone.getElementById("productLink").href = "./produit.html?id=" + teddie._id
    

    document.getElementById("teddies").appendChild(clone)
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


 
 async function addTeddie(teddies){
    
    let addCart = document.querySelectorAll("#addCart");
    for (i = 0; i < addCart.length; i++){
        let teddie = teddies[i];
        let option = teddie.colors[0];

        addCart[i].addEventListener("click", (event)=>{
            event.preventDefault();
            let product = {
            productName: teddie.name,
            _id: teddie._id,
            productOption: option,
            quantité: 1, 
            productPrice: teddie.price/100,
            subTotal: (teddie.price/100)
            }

            if(productInlocalStorage){
                productInlocalStorage.push(product);
                localStorage.setItem("product", JSON.stringify(productInlocalStorage));
            }
            else{
                productInlocalStorage= [];
                productInlocalStorage.push(product);
                localStorage.setItem("product", JSON.stringify(productInlocalStorage));
            }
            sortLocalStorage();
        })
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
    location.reload();
 }


