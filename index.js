const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = Express()
app.use(bodyParser.json())
app.use(cors());

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './Query/Testing')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({ storage: Storage })

app.get('/', (req, res) => {
    res.status(200).send('You can post to /api/upload.')
})

function createJson(data){
    datalast = data.split('\n');
    console.log(datalast);
    datalast = datalast[datalast.length-2];
    console.log(datalast);
    datalast = datalast.replace(/\[/g , "");
    console.log(datalast);
    datalast = String(datalast).replace(/\]/g, '');
    console.log(datalast);
    datalast = String(datalast).split('), (');
    console.log(datalast);

    var returnData = {};
    returnData.meta = {count: datalast.length};
    returnData.data = [];
    for(let i = 0; i < datalast.length; i++){
        var temp = datalast[i].split(',')[0].replace(/\(/g, "").replace(/\)/g,"").replace(/\'/g, '');
        var confi= parseFloat(datalast[i].split(',')[1].replace(/\(/g, "").replace(/\)/g,"").replace(/\'/g, ''));
        if(String(temp).charAt(0) != 'L'){
            temp = "ROOM " + temp;
        }
        returnData.data[i] = {position: temp, confidence:confi};
    }
    return returnData
}
app.post('/api/upload', upload.array('photo', 3), (req, res) => {
    console.log('file', req.files)
    console.log('body', req.body);
    let dataget = "";
    var spawn = require("child_process").spawn;
    console.log(req.files)
    console.log(req.files[0].path)
    var process = spawn('python',["./Location_Estimation.py",
        '-qd',req.files[0].path,'-td','training_set/','-lm',
        'model_newest.h5', '-mode', 'c', '-kd', 'keypoints_database.p', '-m', '10']);
    process.stdout.on('data', function (data) {
    console.log(data.toString());
    dataget = dataget + data.toString();
    console.log(dataget);
    Jsonreturn = createJson(dataget);
    console.log(Jsonreturn);
    const fs = require('fs');
    fs.unlink(req.files[0].path, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  })
    res.status(200).json(
        Jsonreturn
    )
});
})

app.listen(3000, '192.168.0.115', () => {
    console.log('App running on http://localhost:3000')
})
