
const classes = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space'];

function increment() {
    var value = parseInt(document.getElementById('count').innerHTML);
    value++;
    if (value == 1) {
        document.getElementById('count').innerHTML = "1 prediction made!";
    }
    else {
        document.getElementById('count').innerHTML = value + " predictions made!";
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
    var value = parseInt(document.getElementById('correctcount').innerHTML);
    value++;
    if (value == 1) {
        document.getElementById('correctcount').innerHTML = "1 correct prediction made!";
    }
    else {
        document.getElementById('correctcount').innerHTML = value + " correct predictions made!";
    }
    swapbuttons();
}

function incorrect() {
    var value = parseInt(document.getElementById('incorrectcount').innerHTML);
    value++;
    if (value == 1) {
        document.getElementById('incorrectcount').innerHTML = "1 incorrect prediction made!";
    }
    else {
        document.getElementById('incorrectcount').innerHTML = value + " incorrect predictions made!";
    }
    swapbuttons();
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
