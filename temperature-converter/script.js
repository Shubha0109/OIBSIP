function convert() {
    let temp = document.getElementById("temp").value;
    let unit = document.getElementById("unit").value;
    let result = document.getElementById("result");

    if(temp === "") {
        result.innerText = "Please enter a value!";
        return;
    }

    if(unit === "celsius") {
        let f = (temp * 9/5) + 32;
        result.innerText = "Fahrenheit: " + f;
    } else {
        let c = (temp - 32) * 5/9;
        result.innerText = "Celsius: " + c;
    }
}
