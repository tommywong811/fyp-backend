# Image-based Indoor positioning system (Backend API)
## Introduction 
Image-based indoor positioning system allowed user to know their location in HKUST by simply take a photo or upload a existing photo. This system consist of the following project:
* Web Application Frontend
* Mobile Application
* Backend API
* Image Extraction Program  

This project is the Backend API of the system.

## Getting Started
### Software Requirement
* [Node](https://nodejs.org/en/)
* [Anaconda](https://www.anaconda.com/)
### Environment Setup
1. Download the project
2. Download the model, FLANN database, test set and training set image [here](https://drive.google.com/drive/folders/1R8c3Mna_QV83St3ptBfroM696IFsrgzZ?usp=sharing) and put it in the project directory.
3. Create a directory `Query/Testing`
3. Activate an anaconda environment in the project directory using python version 3.7
4. Install packages using the following command  
```
conda install opencv tensorflow-gpu matplotlib keras pillow
```
   If you do not have a GPU please install `tensorflow` instead of `tensorflow-gpu`.
### Run the Backend API
You can run by the following command :
```
node index.js
```
Then you can visit your API at `your_ip_address:3000`.