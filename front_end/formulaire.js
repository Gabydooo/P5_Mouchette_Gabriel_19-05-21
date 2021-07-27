let productInlocalStorage = JSON.parse(localStorage.getItem("product"));

formInLocalStorage = JSON.parse(localStorage.getItem("form"));

productCount();

let prenom = document.getElementById("prenom");
let nom = document.getElementById("nom");
let email = document.getElementById("email");
let cde_post = document.getElementById("cde_post");
let ville = document.getElementById("ville");
let adresse = document.getElementById("adresse");

checkForm(prenom,nom,email,cde_post,ville,adresse);

let btn_valider = document.getElementById("commandValidator");
if (!(formInLocalStorage ==0 || formInLocalStorage ==null)){
    prenom.value = formInLocalStorage.firstName;
    nom.value = formInLocalStorage.lastName;
    email.value = formInLocalStorage.email;
    cde_post.value = formInLocalStorage.cde_post;
    ville.value = formInLocalStorage.city;
    adresse.value=formInLocalStorage.address;

}
if(productInlocalStorage == 0 || productInlocalStorage == null){
    btn_valider.style.backgroundColor = '#d3895b';
    btn_valider.disabled = true;
}



    

btn_valider.addEventListener(`click`, (event) =>{
    event.preventDefault();
    if (controleNom()&&controlePrenom()&&controleEmail()&&controleCde_Post()&&controleVille()&&controleAdresse()){
        console.log("bon");
        let form = {
            firstName : prenom.value.toString(),
            lastName:nom.value.toString(),
            address:adresse.value.toString(),
            city:ville.value.toString(),
            email:email.value.toString(),
            cde_post:cde_post.value
        }
    
        localStorage.setItem('form',JSON.stringify(form));
        
    getOrder(form);
    btn_valider.style.backgroundColor = '#d3895b';
    btn_valider.disabled = true;
    }
    else{
        document.getElementById("error").style.display="inline";
    }

})



function checkForm(prenom,nom,email,cde_post,ville,adresse){
    prenom.addEventListener(`change`, (event) =>{
        event.preventDefault();
        controlePrenom();
    })
    nom.addEventListener(`change`, (event) =>{
        event.preventDefault();
        controleNom();
    })
    email.addEventListener(`change`, (event) =>{
        event.preventDefault();
        controleEmail();
    })
    cde_post.addEventListener(`change`, (event) =>{
        event.preventDefault();
        controleCde_Post();
    })
    ville.addEventListener(`change`, (event) =>{
        event.preventDefault();
        controleVille();
    })
    adresse.addEventListener(`change`, (event) =>{
        event.preventDefault();
        controleAdresse();
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


function getOrder(form){  
    let products=[];
    for (i=0; i< productInlocalStorage.length; i++){
        products.push(productInlocalStorage[i]._id.toString());
    }
    const data = {
        contact: { 
            firstName:form.firstName,
            lastName:form.lastName,
            address:form.address,
            city:form.city,
            email:form.email,
    },
        products: products,
}

    let req = new Request ("http://localhost:3000/api/teddies/order" , {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
    return fetch(req)
        .then ((res)=>res.json())
        .then ((json) => {
             document .getElementById("orderId").innerHTML=json.orderId;
             document .getElementById("confirmation").style.transform = "scale(1)";
             document .getElementById("confirmation").style.display = "flex";
             localStorage.removeItem("product");

        }
        )
    }



function controlePrenom(){
    if(/^([A-Za-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$/ .test(prenom.value)){
        document.getElementById("warningPrenom").style.display = 'none';
        
        prenom.style.border = 'green 2px solid';
        return true;
    }
    else{
        const badPrenom= '<span>Veuillez renseigner un prénom valide</span>';
        document.getElementById("warningPrenom").innerHTML = badPrenom;
        document.getElementById("warningPrenom").style.display = 'inline';

        prenom.style.border = 'red 2px solid';
        return false;
    }
}
function controleNom(){
    if(/^([A-Za-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$/ .test(nom.value)){
        document.getElementById("warningNom").style.display = 'none';
        nom.style.border = 'green 2px solid';
        return true;
    }
    else{
        const badNom= '<span>Veuillez renseigner un nom valide</span>';
        document.getElementById("warningNom").innerHTML = badNom;
        document.getElementById("warningNom").style.display = 'inline';

        nom.style.border = 'red 2px solid';
        return false;
    }
}
function controleCde_Post(){
    if(/^[0-9]{5}$/ .test(cde_post.value)){
        document.getElementById("warningCde_post").style.display = 'none';
        
        cde_post.style.border = 'green 2px solid';
        return true;
    }
    else{
        const badCde_post= '<span>Veuillez renseigner un code postal valide</span>';
        document.getElementById("warningCde_post").innerHTML = badCde_post;
        document.getElementById("warningCde_post").style.display = 'inline';

        cde_post.style.border = 'red 2px solid';
        return false;
    }
}
function controleEmail(){
    document.getElementById("warningEmail").style.display = 'none';

    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ .test(email.value)){
        email.style.border = 'green 2px solid';
        return true;
    }
    else{
        const badEmail= '<span>Veuillez renseigner un Email valide</span>';
        document.getElementById("warningEmail").innerHTML = badEmail;
        document.getElementById("warningEmail").style.display = 'inline';

        email.style.border = 'red 2px solid';
        return false;
    }
}
function controleVille(){
    if(/^([A-Za-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$/ .test(ville.value)){
        document.getElementById("warningVille").style.display = 'none';
        
        ville.style.border = 'green 2px solid';
        return true;
    }
    else{
        const badVille= '<span>Veuillez renseigner un nom de ville valide</span>';
        document.getElementById("warningVille").innerHTML = badVille;
        document.getElementById("warningVille").style.display = 'inline';

        ville.style.border = 'red 2px solid';
        return false;
    }
}
function controleAdresse(){
    if(/^[A-Za-zàáâäçèéêëìíîïñòóôöùúûü0-9\s]{5,60}$/ .test(adresse.value)){
        document.getElementById("warningAdresse").style.display = 'none';
        
        adresse.style.border = 'green 2px solid';
        return true;
    }
    else{
        const badAdresse= '<span>Veuillez renseigner une adresse valide</span>';
        document.getElementById("warningAdresse").innerHTML = badAdresse;
        document.getElementById("warningAdresse").style.display = 'inline';

        adresse.style.border = 'red 2px solid';
        return false;
    }
}
