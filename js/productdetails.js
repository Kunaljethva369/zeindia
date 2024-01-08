function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })
    return params;
}

let params = getQueryParams(location.search);

const uri = "https://zeindia.com/productmanagement/api/Product/GetProduct";

const request = {
    productId: params.id,
};

(async () => {
    fetch(uri, {
        method: "POST",
        // mode: "cors",
        referrerPolicy: "no-referrer",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(request),
    })
        .then((response) => response.json())
        .then((data) => {
            setProductData(data);
        })
        .catch((error) => console.error("Unable to add item.", error));
})();

function setProductData(data) {
    let currentItem = JSON.parse(localStorage.getItem('CurrentProduct'));
    document.getElementsByClassName("breadcrumbs-title")[0].innerHTML = data.name;
    document.getElementById('modelName').innerHTML = data.modelNumber;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('shortDescription').innerHTML = data.shortDescription;
    document.getElementById('img').src = data.document[1].url || data.document[0].url;
    document.getElementById('pdflink').href = data.document[0].url || data.document[1].url;

    let myvar = '';
    data.specification.forEach(function (ele) {
        myvar += '<div class="product-spec-row">' +
            '<div style="align-self:flex-start; color:#575757;"><b>' + ele.propertyName + '</b></div>' +
            '<div>' +
            '<ul>';
        if (ele.propertyContent.length == 1) {
            myvar += '<li>' + ele.propertyContent[0] + ' ';
        }
        else {
            ele.propertyContent.forEach(function (el) {
                myvar += '<li>' + el + ' ';
            });
        }
        myvar += '</li>' +
            '</ul>' +
            '</div>' +
            '</div>';
        document.getElementById('product-des').innerHTML = myvar;
    });

    if(Object.keys(data).length > 0){
        document.querySelector('.reviews-tab').classList.remove('d-none');
        document.querySelector('.uppercase').classList.remove('d-none');
    }

    let myvar2 = '';
    currentItem.forEach(element => {
        element.productId == request.productId ? '' : 
        myvar2 += '<div class="col-lg-4 col-md-6 mt-20">' +
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
        document.getElementById('product-list').innerHTML = myvar2;
    });
    $('.active-related-product').slick({
        speed: 700,
        arrows: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {  breakpoint: 991,   settings: { slidesToShow: 2,  }  },
            {  breakpoint: 767,   settings: { slidesToShow: 1, }   },
            {  breakpoint: 479,   settings: { slidesToShow: 1, }   },
        ]
    });    
}