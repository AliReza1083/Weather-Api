import express from 'express';
const app = express();
const port = 3000;

import fetch from 'node-fetch';


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.get('/', (req, res) => {
    res.render('home')
})



let api = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=f88e5d58f9da413209e8ccd1c634eeb1';

app.get('/D-weatherapi', (req, res) => {
    const data1 = fetch(api)
        .then((val) => {
            return val.json()
        })
        .then((data) => {
            // const cDegree = Math.floor(data.main.temp - 273.15);
            if (data.cod == '404') {
                res.render('dark', {data, convertTimestamp, randImg});
            } else {
                res.render('dark', {data, convertTimestamp, randImg});
            }
            console.log(data)
        })
})

app.post('/D-weatherapi', (req, res) => {
    const {search} = req.body;
    console.log(search);
    api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f88e5d58f9da413209e8ccd1c634eeb1`
    res.redirect('/D-weatherapi')
})


// light
app.get('/L-weatherapi', (req, res) => {
    const data1 = fetch(api)
        .then((val) => {
            return val.json()
        })
        .then((data) => {
            // const cDegree = Math.floor(data.main.temp - 273.15);
            if (data.cod == '404') {
                res.render('light', {data, convertTimestamp, randImg});
            } else {
                res.render('light', {data, convertTimestamp, randImg});
            }
        })
})

app.post('/L-weatherapi', (req, res) => {
    const {search} = req.body;
    console.log(search);
    api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f88e5d58f9da413209e8ccd1c634eeb1`
    res.redirect('/L-weatherapi')
})

const imgs = ['img/clear.png', 'img/clear2.png', 'img/cloudy and rainy.png', 'img/cloudy.png', 'img/full moon.png', 'img/heavyrain and storm.png', 'img/night cloudy.png', 'img/night rain.png', 'img/night.png', 'img/rainy.png', 'img/sunny.png', 'img/sunny2.png', 'img/thunder.png']
const randImg = (path) => {
    const rand = Math.floor(Math.random() * imgs.length);
    return imgs[rand];
}

function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
          yyyy = d.getFullYear(),
          mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
          ampm = 'AM',
          time;
              
      if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
      } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
      } else if (hh == 0) {
          h = 12;
      }
      
      // ie: 2013-02-18, 8:35 AM	
      time = h + ':' + min + ' ' + ampm;
          
      return time;
  }



app.listen(port, () => {
    console.log(`Listening to ${port}`);
})