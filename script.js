
const classes = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space'];

function increment() {
    var value = getCount('count')
    value++;
    if (value == 1) {
        document.getElementById('count').innerHTML = "Total Predictions: 1";
    }
    else {
        document.getElementById('count').innerHTML = "Total Predictions: " + value;
    }
}

function getCount(id) {
    const str = document.getElementById(id).innerHTML;
    const arr = str.match(/[0-9]+$/);
    var val = parseInt(arr[0]);

    return val;
}
    

function computeAcc() {
    var corr = getCount('correctcount')
    var icorr = getCount('incorrectcount')

    if(corr == 0) {
        document.getElementById('acc').innerHTML = "Accuracy: 0";
    }
    else if (icorr == 0) {
        document.getElementById('acc').innerHTML = "Accuracy: 1";
    }
    else {
        const accuracy = corr / (corr + icorr);
        document.getElementById('acc').innerHTML = "Accuracy: " + accuracy.toFixed(2);
    }
}

function swapbuttons() {
    const cbtn = document.getElementById('correct')
    const ibtn = document.getElementById('incorrect')
    const pbtn = document.getElementById('pred')
    cbtn.setAttribute('hidden', 'hidden')
    ibtn.setAttribute('hidden', 'hidden')
    pbtn.removeAttribute('hidden')
}

function correct() {
    var value = getCount('correctcount')
    value++;
    if (value == 1) {
        document.getElementById('correctcount').innerHTML = "Correct: 1";
    }
    else {
        document.getElementById('correctcount').innerHTML = "Correct: " + value;
    }
    document.getElementById('question').innerHTML = "Let's go! This is a piece of cake."
    swapbuttons();
    computeAcc();
}

function incorrect() {
    var value = getCount('incorrectcount')
    value++;
    if (value == 1) {
        document.getElementById('incorrectcount').innerHTML = "Incorrect: 1";
    }
    else {
        document.getElementById('incorrectcount').innerHTML = "Incorrect: " + value;
    }
    document.getElementById('question').innerHTML = "Aw man! I'll try harder next time."
    swapbuttons();
    computeAcc();
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
async function load() {
    const model = await tf.loadLayersModel('model_js/model.json');
    return model;
    };

var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function predict(model) {
// first we get the value in the input field
    const userInput = document.getElementById('output')
    const inputTensor = tf.browser.fromPixels(userInput).
    resizeNearestNeighbor([32, 32]).toFloat().expandDims(); // then convert to tensor
    
    model.then(model => {
        let result = model.predict(inputTensor);
        result = result.dataSync();
        document.getElementById('prediction').innerHTML =  "The model predicts: " + classes[indexOfMax(result)];
        document.getElementById('question').innerHTML = "Was this prediction correct?"

        const cbtn = document.getElementById('correct')
        const ibtn = document.getElementById('incorrect')
        const pbtn = document.getElementById('pred')

        cbtn.removeAttribute('hidden')
        ibtn.removeAttribute('hidden')
        pbtn.setAttribute('hidden', 'hidden')
    });

};
const model = load();
