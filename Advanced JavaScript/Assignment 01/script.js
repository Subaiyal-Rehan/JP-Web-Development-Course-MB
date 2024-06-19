var a = {
    mobiles: {
        Samsung: {
            SamsungA10: {
                name: "Samsung A10",
                ram: "4gb",
                rom: "64gb",
                camera: "13",
                price: "22,000 PKR"
            },
            SamsungA20: {
                name: "Samsung A20",
                ram: "4gb",
                rom: "64gb",
                camera: "18",
                price: "28,000"
            },
            SamsungA30: {
                name: "Samsung A30",
                ram: "4gb",
                rom: "64gb",
                camera: "25",
                price: "29,000"
            }
        },
        IPhone: {
            IPhone11: {
                name: "IPhone11",
                ram: "4gb",
                rom: "64gb",
                camera: "12",
                price: "100,000"
            },
            IPhone12: {
                name: "IPhone12",
                ram: "4gb",
                rom: "64gb",
                camera: "12",
                price: "150,000"
            },
            IPhone13: {
                name: "IPhone13",
                ram: "6gb",
                rom: "128gb",
                camera: "24",
                price: "200,000"
            }
        },
        Oppo: {
            OppoV20: {
                name: "OppoV20",
                ram: "8gb",
                rom: "128gb",
                camera: "64",
                price: "54,999"
            },
            OppoF19: {
                name: "OppoF19",
                ram: "6gb",
                rom: "128gb",
                camera: "48",
                price: "36,999"
            },
            OppoF11: {
                name: "OppoF11",
                ram: "4gb",
                rom: "64gb",
                camera: "48",
                price: "35,999"
            }
        },
        Vivo: {
            VivoY20: {
                name: "VivoY20",
                ram: "4gb",
                rom: "64gb",
                camera: "13",
                price: "26,999"
            },
            VivoY21: {
                name: "VivoY21",
                ram: "4gb",
                rom: "64gb",
                camera: "13",
                price: "43,999"
            },
            VivoY55: {
                name: "VivoY55",
                ram: "8gb",
                rom: "128gb",
                camera: "50",
                price: "64,999"
            }
        }
    }
}

const brandSelect = document.getElementById("brandSelect");
const modelSelect = document.getElementById("modelSelect");
const resultBox = document.getElementById("resultBox");
const address = document.getElementById("address");
const finalModel = document.getElementById("finalModel");
const ModelDiv = document.querySelector(".ModelDiv");
const specsUL = document.querySelector("#specsUL");
let brands = Object.keys(a.mobiles);

brandSelect.innerHTML = "";
for (let i = 0; i < brands.length; i++) {
    brandSelect.innerHTML += `<option value="${brands[i]}">${brands[i]}</option>`
}

function brandSelectFunc() {
    resultBox.style.display = "none";
    ModelDiv.style.display = "flex"
    let modelNames = Object.keys(a.mobiles[brandSelect.value]);
    modelSelect.innerHTML = "";
    for (let i = 0; i < modelNames.length; i++) {
        console.log(modelNames[i])
        modelSelect.innerHTML += `<option value="${modelNames[i]}">${modelNames[i]}</option>`
    }
}

function modelSelectFunc() {
    address.innerHTML = `${brandSelect.value} > ${modelSelect.value}`
    finalModel.innerHTML = modelSelect.value;
    resultBox.style.display = "block";
    let specsKeys = Object.keys(a.mobiles[brandSelect.value][modelSelect.value])
    let specsValues = Object.values(a.mobiles[brandSelect.value][modelSelect.value])
    specsUL.innerHTML = ""
    for (let i = 0; i < specsKeys.length; i++) {
        specsUL.innerHTML += `<li><span style="font-weight: bold;">${specsKeys[i].toUpperCase()}:</span> ${specsValues[i]}</li>`
    }
}