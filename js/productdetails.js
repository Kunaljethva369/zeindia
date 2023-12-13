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
            setProductData(data);
        })
        .catch((error) => console.error("Unable to add item.", error));
})();

function setProductData(data) {
    document.getElementsByClassName("breadcrumbs-title")[0].innerHTML = data.name;
    document.getElementById('modelName').innerHTML = data.modelNumber;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('shortDescription').innerHTML = data.shortDescription;
    document.getElementById('img').src = data.document[1].url;
    document.getElementById('pdflink').href = data.document[0].url;

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
}