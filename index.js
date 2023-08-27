let flag = false;
let mainData="";
let myProducts="";

const baseUrl = "https://dummyjson.com/products";
const fetchController = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      mainData=data;
      displayUsers(data);
    })
    .catch((error) => {
      console.error("Error in fetching data");
    });
};

const numberPerPage = 8;
let pageNumber = 1;
let numberOfPages = 30;

const fetchPosts = (pageNumber) => {
  flag = true;
  fetchController(`${baseUrl}?limit=${numberPerPage}&skip=${pageNumber}`);
};

const fetchPostById = (id) =>{
  fetchController(`${baseUrl}/${id}`)
}

function generateUserHTML(products) {
  return `
        <div  class="products">
            <div class="productImg"><img class ="imgDiv" src = "${products.images[0]}"></div>     
            <p class="productName">Name: ${products.title}</p>
            <p class="productID">Id: ${products.id}</p>
            <p class="productDesc">Description: ${products.description}</p>
        </div>
    `;
}

function displayUsers(data) {
  const output = data.products
    .map((products) => generateUserHTML(products))
    .join("");
  document.querySelector(".app").innerHTML = output;

}

const prev = document.querySelector(".prev");
prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageNumber > 1) {
    pageNumber--;

    fetchPosts(pageNumber);
  }
});

const next = document.querySelector(".next");
next.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageNumber < numberOfPages) {
    pageNumber += 8;

    fetchPosts(pageNumber);
  }
});

fetchPosts(pageNumber);

if (flag) {
  document.querySelector(".app").addEventListener("click", (e) => {
    debugger;
    if (e.target.closest(".products")) {
      localStorage.setItem("mykey",JSON.stringify());
      alert("Clicked");
    }
  });
}

document.querySelector(".smartphones").addEventListener("click",(e)=>{
  alert("smartphones")
})

document.querySelector(".laptops").addEventListener("click",(e)=>{
  alert("laptops")
})

document.querySelector(".furniture").addEventListener("click",(e)=>{
  alert("furniture")
})

document.querySelector(".automotive").addEventListener("click",(e)=>{
  alert("automotive")
})

document.querySelector(".tenPage").addEventListener("click",(e)=>{
  document.querySelector(".dropBtn").innerHTML=10;
})

document.querySelector(".fifteenPage").addEventListener("click",(e)=>{
  document.querySelector(".dropBtn").innerHTML=15;
})

document.querySelector(".twentyPage").addEventListener("click",(e)=>{
  document.querySelector(".dropBtn").innerHTML=20;
})





const getData = (key) => {
  document.querySelector(".searchBar").addEventListener("input", (e) => {
    let value = e.target.value;
  
  
    document.querySelector(".app").innerHTML = mainData.products
      .filter((val) => {
        console.log(val);
        return val.title.includes(value);
      })
      .map((val) => {
        console.log(val);
        return `
        <div class="products">
            <div class="productImg"><img class ="imgDiv" src = "${val.products.images[0]}"></div>     
            <p class="productName">Name: ${val.products.title}</p>
            <p class="productID">Id: ${val.products.id}</p>
            <p class="productDesc">Description: ${val.products.description}</p>
        </div>
    `;
      });
  });
};

const debouncingTime = function (fun, delay) {
  let timer;
  return function () {
    clearTimeout(timer);        
    timer = setTimeout(() => {
      fun.apply();
    }, delay);
  };
};

const betterFun = debouncingTime(getData, 500);




