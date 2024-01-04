const Category = {
    switches: "Network Switch",
    accesspoint: "Access Point",
    videodoorphone: "Video Door Phone",
    cctvcamera: "CCTV Camera",
    accessories: "Accessories",
    ZERugged: "ZE Rugged",
};
function getQueryParams(url) {
    if (url.indexOf('?') == -1) {
        return { category: Category.AccessPoint };
    }

    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};

    paramArr.map(param => {
        const [key, val] = param.split('=');
        if (key != "" && val != "") {
            params[key] = decodeURIComponent(val);
        }
    });

    if (params === undefined || params.length < 1) {
        return { category: "switches" };
    }

    return params;
}

let params = getQueryParams(location.search);

document.getElementsByClassName("breadcrumbs-title")[0].innerHTML = Category[params.category];


const uri = "https://zeindia.com/productmanagement/api/Product/GetProductList";

const request = {
    category: params.category,
    page: 0,
    pageSize: 100,
};

(async () => {
    fetch(uri, {
        method: "POST",
        mode: "cors",
        referrerPolicy: "no-referrer",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
        .then((response) => response.json())
        .then((data) => {
            const productList = data.results;
            if (productList.length > 0) {
                constructProdGrid(productList);
            }
        })
        .catch((error) => console.error("Unable to load product.", error));
})();

function constructProdGrid(productList) {
    let currentProduct = productList;
    localStorage.setItem('CurrentProduct',JSON.stringify(currentProduct));
    let myvar = '';
    productList.forEach(element => {
        myvar += '<div class="col-lg-4 col-md-6 mt-20">' +
            '<div class="product-item">' +
            '<div class="product-img">' +
            '<a href="/productdetails.html?id='+ element.productId +'">' +
            '<img src="'+ element.imageUrl[0] +'" alt="" />' +
            '</a>' +
            '</div>' +
            '<div class="product-info">' +
            '<h6 class="product-title">' +
            '<a href="/productdetails.html?id='+ element.productId +'">' + element.modelNumber + '</a>' +
            '</h6>' +
            '</div>' +
            '</div>' +
            '</div>'
        document.getElementById('product-list').innerHTML = myvar;
    });
    // productList.forEach((element) => {

    //     const card = document.createElement("div");
    //     card.classList.add("product-grid-flip-card");

    //     const cardInner = document.createElement("div");
    //     cardInner.classList.add("product-grid-flip-card-inner");

    //     const cardFront = document.createElement("div");
    //     cardFront.classList.add("product-grid-flip-card-front");

    //     const thumbNail = document.createElement("img");
    //     if (element.imageUrl && Array.isArray(element.imageUrl) && element.imageUrl.length > 0) {
    //         thumbNail.src = element.imageUrl[0];
    //     } else {
    //         thumbNail.src = "images/noimage.png";
    //     }
    //     thumbNail.alt = element.modelNumber;
    //     thumbNail.style.width = "200px";
    //     thumbNail.style.height = "180px";

    //     cardFront.appendChild(thumbNail);

    //     const prodTitle = document.createElement("div");
    //     prodTitle.classList.add("product-grid-flip-card-title");
    //     prodTitle.innerHTML = element.modelNumber;

    //     cardFront.appendChild(prodTitle);

    //     const cardBack = document.createElement("div");
    //     cardBack.classList.add("product-grid-flip-card-back");

    //     const prodHeader = document.createElement("h1");
    //     prodHeader.innerText = element.modelNumber;

    //     cardBack.appendChild(prodHeader);

    //     const prodDescription = document.createElement("div");
    //     prodDescription.classList.add("product-grid-flip-card-back-detail");

    //     prodDescription.innerHTML = element.shortDescription;

    //     cardBack.appendChild(prodDescription);

    //     const detailLinkWrapper = document.createElement("div");
    //     detailLinkWrapper.classList.add("product-grid-detail-link");

    //     const detailLink = document.createElement("a");
    //     detailLink.href = "productdetails.html?id=" + element.productId;
    //     detailLink.target = "_blank";

    //     const linkIcon = document.createElement("i");
    //     linkIcon.classList.add("fa-solid");
    //     linkIcon.classList.add("fa-up-right-from-square");

    //     detailLink.appendChild(linkIcon);

    //     detailLinkWrapper.appendChild(detailLink);

    //     cardBack.appendChild(detailLinkWrapper);

    //     cardInner.appendChild(cardFront);
    //     cardInner.appendChild(cardBack);
    //     card.appendChild(cardInner);

    //     document.getElementById("productGrid").appendChild(card);
    // });
}


function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })
    return params;
}
