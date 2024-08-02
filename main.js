var inputList
var inputArray

var costArray

var Cost

function setup() {
    inputList = new Array(17).fill(false)

    costArray = [[30, 0, 25, 25],
                [30, 0, 30, 25],
                [30, 0, 30, 25],   
                [30, 0, 30, 25],   
                [25, 30, 0, 0]]      

    Costs = 0

    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const buttonNumber = button.getAttribute('data-number');
            toggleButton(buttonNumber);

            inputArray = convertListToMatrix()
            
            calculateCosts()

            /* document.getElementById('dbg1').innerHTML = inputArray[0]
            document.getElementById('dbg2').innerHTML = inputArray[1]
            document.getElementById('dbg3').innerHTML = inputArray[2]
            document.getElementById('dbg4').innerHTML = inputArray[3]
            document.getElementById('dbg5').innerHTML = inputArray[4]

            document.getElementById('dbg6').innerHTML = inputList
 */
        });
    });

    


}

function toggleButton(number) {
    //console.log('Button ' + number + ' was pressed');
    inputList[number] = !inputList[number]
    
}

function calculateCosts() {
    Costs = 0;
    let WeekendCosts = 0;
    let WeekCosts = 0

    let stackOfTrainingsWEEK = []
    let stackOfTrainingsWEEKEND = []
    let stackOfTrainingsALL = []

    let maxSeminarCosts = calculateMaxCosts()[0]
    let maxWeekendCosts = calculateMaxCosts()[1]



    //calculate List with every selected single Training Cost (WEEK ONLY)
    for (let i=0; i<inputArray.length-2; i++) {
        for (let j=0; j<inputArray[i].length; j++) {
            if (inputArray[i][j]) {
                stackOfTrainingsWEEK.push(inputArray[i][j] * costArray[i][j])
            }
        }
    }
    stackOfTrainingsWEEK.sort().reverse()
    while (stackOfTrainingsWEEK.length >= 3 && arraySum(stackOfTrainingsWEEK.slice(0,3)) > 80) {
        stackOfTrainingsWEEK.splice(0,1)
        stackOfTrainingsWEEK.splice(0,1)
        stackOfTrainingsWEEK.splice(0,1)
        WeekCosts += 80
    }
    WeekCosts += arraySum(stackOfTrainingsWEEK)



    //calculate List with every selected single Training Cost (WEEKEND ONLY)
    for (let i=3; i<inputArray.length; i++) {
        for (let j=0; j<inputArray[i].length; j++) {
            if (inputArray[i][j]) {
                stackOfTrainingsWEEKEND.push(inputArray[i][j] * costArray[i][j])
            }
        }
    }
    stackOfTrainingsWEEKEND.sort().reverse()
    let stackOfTrainingsWEEK_temp = stackOfTrainingsWEEKEND.slice();
    while (stackOfTrainingsWEEKEND.length >= 3 && arraySum(stackOfTrainingsWEEKEND.slice(0,3)) > 80) {
        stackOfTrainingsWEEKEND.splice(0,1)
        stackOfTrainingsWEEKEND.splice(0,1)
        stackOfTrainingsWEEKEND.splice(0,1)
        WeekendCosts += 80
    }
    WeekendCosts += arraySum(stackOfTrainingsWEEKEND)



    //calculate List with every selected single Training Cost (EVERYTHING)
    for (let i=0; i<inputArray.length; i++) {
        for (let j=0; j<inputArray[i].length; j++) {
            if (inputArray[i][j]) {
                stackOfTrainingsALL.push(inputArray[i][j] * costArray[i][j])
            }
        }
    }
    stackOfTrainingsALL.sort().reverse()
    while (stackOfTrainingsALL.length >= 3 && arraySum(stackOfTrainingsALL.slice(0,3)) > 80) {
        stackOfTrainingsALL.splice(0,1)
        stackOfTrainingsALL.splice(0,1)
        stackOfTrainingsALL.splice(0,1)
        Costs += 80
    }
    Costs += arraySum(stackOfTrainingsALL)


    //Console Debug Flags
    let flatRateWE = false
    let flatRateSeminar = false
    let flagWeek_WE_combined = false


    if (WeekendCosts > maxWeekendCosts) {
        WeekendCosts = maxWeekendCosts
        flatRateWE = true
    }



    let tempCosts = WeekCosts + WeekendCosts

    //Costs = Math.min(tempCosts, Costs)
    if (Costs > tempCosts) {
        Costs = tempCosts
    } else {
        flagWeek_WE_combined = true
    }

    if (Costs > maxSeminarCosts) {
        Costs = maxSeminarCosts
        flatRateSeminar = true
    }

    console.log("Flatrate Weekend: " + flatRateWE 
        + "\n" +"Flatrate Seminar: " + flatRateSeminar 
        + "\n" + "whole Week calculated together: " + flagWeek_WE_combined
        + "\n" + "Kodansha Training: " + inputArray[3][1]
        + "\n" + "Samurai Museum: " + inputList[16]
    )

    //check Kodansha 5.th Dan Saturday
    if (inputArray[3][1]) {Costs += 25}
    //check SamuraiMuseum
    if (inputList[16]) {Costs += 19} 
    displayCosts(Costs, WeekendCosts)
}

function calculateMaxCosts() {
    let maxSeminarCosts = 300
    let maxWeekendCosts = 120

    //calculate maxCosts for whole seminar for comparison
    if (!inputArray[4][0]) {maxSeminarCosts = 285} //ohne Dan4+5
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3]) {maxSeminarCosts = 255} //ohne Dan3
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3] && !inputArray[0][3] && !inputArray[2][3]) {maxSeminarCosts = 215} //ohne Dan1+2
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3] && !inputArray[0][3] && !inputArray[2][3] && !inputArray[0][2]) {maxSeminarCosts = 200} //5.+3.kyu
    if (!inputArray[4][0] && !inputArray[1][3] && !inputArray[3][3] && !inputArray[0][3] && !inputArray[2][3] && !inputArray[0][2] && !inputArray[1][2] && !inputArray[2][2] && !inputArray[3][2]) {maxSeminarCosts = 125} //nur 5. kyu
    if (matrixSum(inputArray) == 0) {maxSeminarCosts = 0}

    //calculate maxCosts for Weekend for comparison
    if (!inputArray[4][0]) {maxWeekendCosts = 100}
    if (!inputArray[4][0] && !inputArray[3][3]) {maxWeekendCosts = 80}
    if (!inputArray[4][0] && !inputArray[3][3] && !inputArray[3][2]) {maxWeekendCosts = 55}
    if (matrixSum(inputArray.slice(3,5)) == 0) {maxWeekendCosts = 0}

    return [maxSeminarCosts, maxWeekendCosts]
}


function displayCosts(SeminarCosts, WECosts) {
    document.getElementById('costsTxt').innerHTML = "Costs: " + SeminarCosts + ",00 €"  

    //document.getElementById('dbg1').innerHTML = "WE_Costs: " + WECosts + ",00 €"  
}

function convertListToMatrix() {
    let retArray = Array.from({ length: 5 }, () => new Array(4).fill(false));
    retArray[0][0] = inputList[0]
    retArray[0][2] = inputList[7]
    retArray[0][3] = inputList[11]

    retArray[1][0] = inputList[1]
    retArray[1][2] = inputList[8]
    retArray[1][3] = inputList[12]

    retArray[2][0] = inputList[2]
    retArray[2][2] = inputList[9]
    retArray[2][3] = inputList[13]

    retArray[3][0] = inputList[3]
    retArray[3][1] = inputList[5]
    retArray[3][2] = inputList[10]
    retArray[3][3] = inputList[14]

    retArray[4][0] = inputList[4]
    retArray[4][1] = inputList[6]
    //retArray[4][3] = inputList[15] -> no Price for attending Exam

    return retArray
}



//Aux Function / Math / etc
function arraySum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function matrixSum(matrix) {
    let sum = 0
    for (let arr of matrix) {
        sum += arraySum(arr)
    }
    return sum
}

