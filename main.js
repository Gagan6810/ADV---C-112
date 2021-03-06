Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});

Webcam.attach("camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('snapshot_div').innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
        console.log('Image is Captured');
    });
}   

console.log('ml5 version is' + ml5.version);

classifier = ml5.imageClassifier('//https://teachablemachine.withgoogle.com/models/_jRlcL02z/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model is Loaded');
}

function predict_guesture(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById('guesture_text').innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak_this();
        if (prediction_1 == 'victory'){
            document.getElementById('guesture_predict').innerHTML = '&#128512;';
        }
        if (prediction_1 == 'amazing'){
            document.getElementById('guesture_predict').innerHTML = '&#128545;';
        }
        if (prediction_1 == 'best'){
            document.getElementById('guesture_predict').innerHTML = '&#128532;';
        }
    }
}