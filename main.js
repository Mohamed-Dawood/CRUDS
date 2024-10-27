let title = document.getElementById("title");
let prices = document.getElementById("prices");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
//mood create 
let mood = "create";

//store i index ot element you need to update
let tmp;

//get total
function getTotal() {
    if (prices.value !== '') {
        let result = (+prices.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#080"
    } else {
        total.innerHTML = '';
        total.style.background = "rgb(185, 8, 8)"
    }
};
//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
// let dataPro = [];
submit.onclick = function() {
    newData = {
            title: title.value.toLowerCase(),
            prices: prices.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }
        //count
    if (title.value != '' && prices.value != '' && category.value != '' && newData.count < 100) {
        if (mood === "create") {
            if (newData.count > 1) {
                for (let i = 0; i < newData.count; i++) {
                    dataPro.push(newData);
                }
            } else { dataPro.push(newData); }
        } else {
            dataPro[tmp] = newData;
            // after you update return to create mood 
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block"
        }
    } {
        clearInput();
    }

    // dataPro.push(newData);
    // console.log(dataPro);
    //has problem if you change and empty input will remove all old data
    localStorage.setItem("product", JSON.stringify(dataPro)); //JSON.stringify handling data
    // clearInput();
    showData();
}

//save in local storage


//clear input
function clearInput() {
    title.value = '';
    prices.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        //but + to concat element old and new when you put = only new element only
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].prices}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteDate(${i})" >delete</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length != '') {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()" >delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

//delete
function deleteDate(i) {
    // console.log(i);
    // delete current index i
    dataPro.splice(i, 1);
    //update in local storage
    localStorage.product = JSON.stringify(dataPro);
    //reload or update date or show data
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


//update
function updateData(i) {
    // console.log(i);
    title.value = dataPro[i].title;
    prices.value = dataPro[i].prices;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = "none";
    submit.innerHTML = "update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
//search
let searchMood = "title";

function getSearchMood(id) {
    if (id == "searchTitle") {
        searchMood = "title";
        // search.placeholder = "search by title";
    } else {
        searchMood = "category";
        // search.placeholder = "search by category";
    }
    //improve my code to petter
    search.placeholder = "search by " + searchMood
    search.focus();
    // when you swatch to search by category and search by title input search clear value
    search.value = '';
    //turn on show data
    showData();
}

function getSearch(value) {
    let table = "";
    //i have two for in search by category and search by title and i make one for both to make code better
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            // for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].prices}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteDate(${i})" >delete</button></td>
            </tr>
                `
            }
            // }
        } else {
            // for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].prices}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteDate(${i})" >delete</button></td>
            </tr>
                `
            }
            // }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}



//clean data