let productInlocalStorage = JSON.parse(localStorage.getItem("product")); //---------On récupère les données du localstorage pour les mettre dans la variable 
main();

async function main(){
    productCount();
    const id = getUrlId();
    const product = await getUniProduct(id);
    displayProduct(product);
    addToCart(product);
}




function getUrlId(){
const query_url_id= window.location.search;

const urlSearchParams = new URLSearchParams(query_url_id);
const urlId= urlSearchParams.get("id");
return urlId;    
}

function getUniProduct(id){
    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(function(response){
            return response.json()
        })
        .then(function(product){
            return product
        })
        .catch((error)=>{
            alert("une erreur est survenue")
        })
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
function displayProduct(product){
    

    document.getElementById("uniProductName").textContent= product.name;
    document.getElementById("uniProductImage").src = product.imageUrl;
    document.getElementById("uniProductPrice").textContent =`PRIX: `+ product.price/100+`€`;
    document.getElementById("uniProductDescription").textContent = product.description;

    let options = product.colors;
    let optionStructure = [];
    for(let i=0; i<options.length;i++){
        optionStructure = optionStructure + `<option value="${options[i]}">${options[i]}</option>`;
    }
    
    const optionsLocation = document.getElementById("productOption");
    optionsLocation.innerHTML = optionStructure;
 }


 function addToCart (product){
    const btn_ajouter=document.querySelector("#addProduct");
    btn_ajouter.addEventListener("click",(event)=>{
        event.preventDefault();
        const idForm = document.querySelector("#productOption");
        const formChoice = idForm.value;
        const qtyForm = document.getElementById("productQuantity");
        const qty= qtyForm.value;
        let formProduct = {
            productName: product.name,
            _id: product._id,
            productOption: formChoice,
            quantité: qty, 
            productPrice: product.price/100,
            subTotal: (product.price/100)*qty
        }
        // const popupValider = () => {
        //     if(window.confirm(`l'article ${product.name} couleur ${formChoice} a bien été ajouté au panier Consulter le panier avec OK ou continuer vos achat avec ANNULER` )){
        //         window.location.href = "./panier.html";
        //     }
        //     else{
        //         window.location.href = "./test-bootstrap.html"
        //     }
        // }


        if(productInlocalStorage){
            productInlocalStorage.push(formProduct);
            localStorage.setItem("product", JSON.stringify(productInlocalStorage));
            // popupValider();
        }
        else{
            productInlocalStorage= [];
            productInlocalStorage.push(formProduct);
            localStorage.setItem("product", JSON.stringify(productInlocalStorage));
            // popupValider();
        }
        sortLocalStorage()
    })
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
 
