import Chart from "chart.js/auto";

const API_URL = "https://dummyjson.com";

const getAllProducts = () => {
  return fetch(`${API_URL}/products`).then((response) => response.json());
};

getAllProducts().then((dataFromJson) => {

    function compareValues(productA, productB) {
      if (productA.price < productB.price) {
        return 1;
      }
      if (productA.price > productB.price) {
        return -1;
      }
      return 0;
    };
    
    const dataSorted = dataFromJson.products.sort(compareValues);
    
    const productsName = dataFromJson.products.map((product) => {
        return product.title;
    });
    
    const productsPrice = dataFromJson.products.map((product) => {
        return product.price;
    });
    
    const backgroundColors = dataFromJson.products.map((product) => {
        if (product.price > 1200) {
            return "rgba(255, 99, 132, 0.2)";
        } else return "rgba(54, 162, 235, 0.2)";
    });

    new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
            labels: productsName,
            datasets: [
                {
                    label: "Product's price",
                    data: productsPrice,
                    backgroundColor: backgroundColors,
                    borderColor: "rgba(255, 99, 132, 1)",
                    hoverBackgroundColor: "rgba(255, 99, 132, 0.3)",
                },
            ],
        },
    });
});
