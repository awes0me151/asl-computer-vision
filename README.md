# asl-computer-vision

### Introduction
This project was completed for my DS 4400 class (Machine Learning + Data Mining 1) during the Spring 2022 semester. In this project, my partner and I used neural networks to translate ASL signs into the English alphabet. Rather than compiling images of ourselves making signs for the dataset, we used [this dataset](https://www.kaggle.com/grassknoted/asl-alphabet): 

This is essentially a multiclass classification task, as we are classifying a given image into 1 of 29 classes: 
- 26 (each letter of the English alphabet) 
- 1 (delete) 
- 1 (space)
- 1 (nothing, essentially an image with no sign)

In total, our dataset has 87,000 entries, and 3,000 images per class. In order to feed this data into our models, we convert an image with size (1, x, x, 3) to (1, 3x<sup>2</sup>).

### Models Used
First, we used a logistic regression model to perform binary classification on two arbitrary labels. This acts as a proof-of-concept model to illustrate this this task can be tackled by a simple model.

Next, we built various neural network architectures and compared their performances. Here are the architectures of the 4 convolutional neural networks we built:
1. 3 hidden layers (20, 40, 40 filters), input size (20, 20) → 25,069 parameters
2. 3 hidden layers (32, 64, 64 filters), input size (32, 32) → 123,805 parameters
3. 3 hidden layers (45, 90, 90 filters), input size (32, 32) → 243,119 parameters
4. 1 hidden layer (32 filters), input size (32, 32) → 232,285 parameters

### Findings
Overall, the neural networks had great performance, with testing accuracy of about 97%. I was able to understand how neural network architectures impact its performance. Although work has been done in this field already, I was able to learn more about neural networks and computer vision in practical applications. Feel free to look inside the notebook and report for more detailed findings!

### Next Steps
I would like to diversify my image dataset to account for more background noise, skin tone, and lighting variations. In addition, gestures also play a role in ASL which I would want to try to capture in a neural network. However, this would involve videos instead of images.

### Technical Specifications
In order to run this file, you will need the 64-bit installation of Python 3.7.6 or higher. You may also need to pip install various libaries, which are listed below:

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install these libraries.

```bash
pip install pandas
pip install sklearn
pip install matplotlib
pip install opencv-python
pip install tensorflow
pip install numpy
pip install keras
pip install keras-metrics
pip install scikeras
```

### Update: Website created! (5/13/2022)
I was able to create a website using [Tensorflow.js](https://www.tensorflow.org/js) that uses model 2 from my notebook! A user is able to upload an image and click a "predict" button that outputs a label. The user is then able to indicate whether the prediction was correct or not. The site keeps track of the total predictions made, as well as how many were correct or incorrect, along with an accuracy metric. In addition, there are short descriptions about the model itself and how it was trained. If you're interested in the final product, click [here](https://awes0me151.github.io/asl-computer-vision/).
