var express = require('express');
const mongoose = require("mongoose");
var app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

const RecordSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const Record = mongoose.model("Record", RecordSchema);


app.set("view engine", "pug");// configuraciòn para unir con pug
app.set("views", "views"); //  decimos donde queremos guardar esos archivos
app.use(express.urlencoded({extended: true}));


app.get('/register', (req, res) => {
  res.render("new")
});

app.post('/register', async (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const record = new Record(data);
    await record.save();
  } catch(e) {
    return next(e);
  }
  res.redirect("/");
});

app.get('/', async(req, res) => {
  const records = await Record.find();
  res.render("index", { records })
});

app.listen(3000, () => console.log('Listening on port 3000!'));
