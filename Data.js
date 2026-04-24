let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let disc = document.getElementById('disc');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');

let totalProducts = document.getElementById('totalProducts');
let totalValue = document.getElementById('totalValue');

let mood = 'create';
let tmp;
let searchMood = 'title';

let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];


// ================= TOTAL =================
function getTotal(){
    if(price.value != ""){
        let result = (+price.value||0)+(+taxes.value||0)+(+ads.value||0)-(+disc.value||0);
        total.innerHTML = result;
        total.style.background = "green";
    }else{
        total.innerHTML = 0;
        total.style.background = "red";
    }
}


// ================= CREATE =================
submit.onclick = function(){

    if(title.value.trim() === '' || price.value === '' || category.value.trim() === ''){
        alert("Please fill required fields!");
        return;
    }

    getTotal();

    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        disc: disc.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if(mood === 'create'){

        if(newPro.count > 1){
            for(let i=0;i<newPro.count;i++){
                dataPro.push({...newPro});
            }
        }else{
            dataPro.push(newPro);
        }

    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create Product';
        count.style.display = 'block';
    }

    clearData();
    saveData();
    showData();
};


// ================= CLEAR =================
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    disc.value='';
    count.value='';
    category.value='';
    total.innerHTML=0;
}


// ================= SAVE =================
function saveData(){
    localStorage.setItem('product', JSON.stringify(dataPro));
}


// ================= SHOW =================
function showData(){

    let table = '';
    let totalVal = 0;

    for(let i=0;i<dataPro.length;i++){

        totalVal += Number(dataPro[i].total);

        table += `
<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].disc}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>

<td><button onclick="updateData(${i})">Update</button></td>
<td><button onclick="deleteData(${i})">Delete</button></td>
</tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    // ================= STATS =================
    totalProducts.innerHTML = dataPro.length;
    totalValue.innerHTML = totalVal;

    // delete all button
    let btn = document.getElementById('deleteAll');

    if(dataPro.length > 0){
        btn.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    }else{
        btn.innerHTML = "";
    }
}

showData();


// ================= DELETE =================
function deleteData(i){
    dataPro.splice(i,1);
    saveData();
    showData();
}


// ================= DELETE ALL =================
function deleteAll(){
    dataPro = [];
    saveData();
    showData();
}


// ================= UPDATE =================
function updateData(i){

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    disc.value = dataPro[i].disc;
    category.value = dataPro[i].category;

    getTotal();

    count.style.display = "none";

    submit.innerHTML = "Update Product";
    mood = "update";
    tmp = i;

    scroll({top:0, behavior:'smooth'});
}


// ================= SEARCH =================
function getSearchMood(id){

    if(id === 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }

    search.value = '';
    showData();
}


function searchData(value){

    let table = '';
    let v = value.toLowerCase();

    for(let i=0;i<dataPro.length;i++){

        if(searchMood === 'title'){
            if(dataPro[i].title.includes(v)){
                table += row(i);
            }
        }else{
            if(dataPro[i].category.includes(v)){
                table += row(i);
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}


// ================= ROW =================
function row(i){
    return `
<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].disc}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>

<td><button onclick="updateData(${i})">Update</button></td>
<td><button onclick="deleteData(${i})">Delete</button></td>
</tr>
    `;
}