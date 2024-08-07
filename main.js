let inputList = new Array(17).fill(false);
let costArray = [
    [30, 0, 25, 25],
    [30, 0, 30, 25],
    [30, 0, 30, 25],
    [30, 0, 30, 25],
    [25, 30, 0, 0]
];
let Costs = 0

let flag_discount = false

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const buttonNumber = button.getAttribute('data-number');
            toggleButton(buttonNumber);
            inputArray = convertListToMatrix();
            calculateCosts();
        });
    });
    document.querySelectorAll('.discount-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            flag_discount = !flag_discount
            calculateCosts();
        });
    });
});



function toggleButton(number) {
    inputList[number] = !inputList[number];
}

function calculateCosts() {
    Costs = 0;
    let WeekendCosts = 0;
    let WeekCosts = 0;

    let stackOfTrainingsWEEK = [];
    let stackOfTrainingsWEEKEND = [];
    let stackOfTrainingsALL = [];

    //Variables to generate the description of the Cost Calculation 
    let description = "Something went wrong"
    let counter3Trainings = 0
    let counterSingleTrainingsYu = 0
    let counterSingleTrainingsKo = 0

    let maxSeminarCosts = calculateMaxCosts()[0];
    let maxWeekendCosts = calculateMaxCosts()[1];


    // WEEK ------------------------------------------------------------------------------------------------
    for (let i = 0; i < inputArray.length - 2; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            if (inputArray[i][j]) {
                stackOfTrainingsWEEK.push(inputArray[i][j] * costArray[i][j]);
            }
        }
    }
    let tempDesc_WEEK = ""
    stackOfTrainingsWEEK.sort((a, b) => b - a);
    while (stackOfTrainingsWEEK.length >= 3 && arraySum(stackOfTrainingsWEEK.slice(0, 3)) > 80) {
        stackOfTrainingsWEEK.splice(0, 3);
        WeekCosts += 80;
        tempDesc_WEEK += "<br><br> +80.00 € for a set of 3 trainings";
    }
    WeekCosts += arraySum(stackOfTrainingsWEEK);
    for (let i=0; i < stackOfTrainingsWEEK.length; i++) {
        tempDesc_WEEK += "<br><br> +" + stackOfTrainingsWEEK[i] + ",00 € for single training"
    }
    //console.log(tempDesc_WEEK)

    // WEEKEND ------------------------------------------------------------------------------------------------
    for (let i = 3; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            if (inputArray[i][j]) {
                stackOfTrainingsWEEKEND.push(inputArray[i][j] * costArray[i][j]);
            }
        }
    }
    let tempDesc_WEEKEND = ""
    stackOfTrainingsWEEKEND.sort((a, b) => b - a);
    while (stackOfTrainingsWEEKEND.length >= 3 && arraySum(stackOfTrainingsWEEKEND.slice(0, 3)) > 80) {
        stackOfTrainingsWEEKEND.splice(0, 3);
        WeekendCosts += 80;
        tempDesc_WEEKEND += "<br><br> +80.00 € for a set of 3 trainings"
    }
    WeekendCosts += arraySum(stackOfTrainingsWEEKEND);
    for (let i=0; i < stackOfTrainingsWEEKEND.length; i++) {
        tempDesc_WEEKEND += "<br><br> +" + stackOfTrainingsWEEKEND[i] + ",00 € for single training"
    }
    //console.log(tempDesc_WEEKEND)


    // ALL ------------------------------------------------------------------------------------------------
    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            if (inputArray[i][j]) {
                stackOfTrainingsALL.push(inputArray[i][j] * costArray[i][j]);
            }
        }
    }
    let tempDesc_ALL = ""
    stackOfTrainingsALL.sort((a, b) => b - a);
    while (stackOfTrainingsALL.length >= 3 && arraySum(stackOfTrainingsALL.slice(0, 3)) > 80) {
        stackOfTrainingsALL.splice(0, 3);
        Costs += 80;
        tempDesc_ALL += "<br><br> +80.00 € for a set of 3 trainings"
    }
    Costs += arraySum(stackOfTrainingsALL);
    for (let i=0; i < stackOfTrainingsALL.length; i++) {
        tempDesc_ALL += "<br><br> +" + stackOfTrainingsALL[i] + ",00 € for single training"
    }
    //console.log(tempDesc_ALL)


    // Check for best combination -----------------------------------------------------------------------------
    let flatRateWE = false;
    let flatRateSeminar = false;
    let flagWeek_WE_combined = false;

    if (WeekendCosts >= maxWeekendCosts) {
        WeekendCosts = maxWeekendCosts;
        flatRateWE = true;
        tempDesc_WEEKEND = "-Single trainings Cost exceeds flat rate for whole Weekend <br> Cost for whole Weekend is: " + WeekendCosts + ",00 €";
    }

    let tempCosts = WeekCosts + WeekendCosts;

    if (Costs > tempCosts) {
        Costs = tempCosts;
        description = tempDesc_WEEK + "<br><br>" + tempDesc_WEEKEND
    } else {
        flagWeek_WE_combined = true;
        description = tempDesc_ALL
    }

    if (Costs >= maxSeminarCosts) {
        Costs = maxSeminarCosts;
        flatRateSeminar = true;

        description = "-Single trainings Cost exceeds flat rate for whole seminar <br> Cost for whole seminar is: " + Costs + ",00 €"
    }

    if (inputArray[3][1]) { 
        Costs += 25; 
        description += "<br><br> -Additional 25,00 € for 5. dan kodansha training"
    }
    if (inputList[16]) { 
        Costs += 19; 
        description += "<br><br> -Additional 19,00 € for visit of the Samurai Museum"
    }

    //Catch special case if only 5.Dan Kodansha + 2 30€ Trainings 
    if (Costs === 85 && inputArray[3][1]) {
        Costs = 80;
    }

    if (flag_discount) {
        let discount = roundTo(Costs*0.15,2)
        Costs = Costs - discount
        description += "<br><br> -You get a discount of 15 % on the total seminar cost <br> this amounts to: -" + discount + " €" 
    }

    displayCosts(Costs, WeekendCosts);
    describeCostCalculation(description)



    //Debug Console...
    console.log("Flatrate Weekend: " + flatRateWE 
        + "\n" + "Flatrate Seminar: " + flatRateSeminar 
        + "\n" + "whole Week calculated together: " + flagWeek_WE_combined
        + "\n" + "Kodansha Training: " + inputArray[3][1]
        + "\n" + "Samurai Museum: " + inputList[16]
    );
}

function calculateMaxCosts() {
    let maxSeminarCosts = 300;
    let maxWeekendCosts = 120;

    if (!inputArray[4][0]) { maxSeminarCosts = 285; }
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3]) { maxSeminarCosts = 255; }
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3] && !inputArray[0][3] && !inputArray[2][3]) { maxSeminarCosts = 215; }
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3] && !inputArray[0][3] && !inputArray[2][3] && !inputArray[0][2]) { maxSeminarCosts = 200; }
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3] && !inputArray[0][3] && !inputArray[2][3] && !inputArray[0][2] && !inputArray[1][2] && !inputArray[2][2] && !inputArray[3][2]) { maxSeminarCosts = 125; }
    if (matrixSum(inputArray) === 0) { maxSeminarCosts = 0; }

    if (!inputArray[4][0]) { maxWeekendCosts = 100; }
    if (!inputArray[4][0] && !inputArray[3][3]) { maxWeekendCosts = 80; }
    if (!inputArray[4][0] && !inputArray[3][3] && !inputArray[3][2]) { maxWeekendCosts = 55; }
    if (matrixSum(inputArray.slice(3, 5)) === 0) { maxWeekendCosts = 0; }

    return [maxSeminarCosts, maxWeekendCosts];
}

function displayCosts(SeminarCosts, WECosts) {
    document.getElementById('costsTxt').innerHTML = "Costs: " + roundTo(SeminarCosts,2).toFixed(2) + " €";
}

function convertListToMatrix() {
    let retArray = Array.from({ length: 5 }, () => new Array(4).fill(false));
    retArray[0][0] = inputList[0];
    retArray[0][2] = inputList[7];
    retArray[0][3] = inputList[11];

    retArray[1][0] = inputList[1];
    retArray[1][2] = inputList[8];
    retArray[1][3] = inputList[12];

    retArray[2][0] = inputList[2];
    retArray[2][2] = inputList[9];
    retArray[2][3] = inputList[13];

    retArray[3][0] = inputList[3];
    retArray[3][1] = inputList[5];
    retArray[3][2] = inputList[10];
    retArray[3][3] = inputList[14];

    retArray[4][0] = inputList[4];
    retArray[4][1] = inputList[6];

    return retArray;
}

function arraySum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function matrixSum(matrix) {
    let sum = 0;
    for (let arr of matrix) {
        sum += arraySum(arr);
    }
    return sum;
}

function roundTo(num, precision) {
    const factor = Math.pow(10, precision)
    return Math.round(num*factor) / factor
}

function describeCostCalculation(description) {
    document.getElementById('descr-calc').innerHTML = description
}
