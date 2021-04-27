const express = require('express')
const app = express();
const request = require('request')
const pool = require('./db');

app.use(express.json());


//Routes

app.get("/breeds", async(req, res)=>{
    try {
        const breeds = await pool.query("SELECT * FROM breeds" );
        res(breeds)
        console.log(typeof(breeds))
    } catch (error) {
        
    }
});

//Add Data
app.post("/ss", async(req, res) =>{
    try {
        const {name} = req.body;
        const newSs = await pool.query("INSERT INTO ss (name) VALUES ($1) RETURNING *",[name])
    } catch (error) {
        
    }
});

app.get("/names", async (req, res) => {
    try {
        const names = await pool.query("SELECT * FROM ss");
        res.json(names.rows)
    } catch (error) {
        console.log(error)
        
    }
})


app.get('/', async (req,res)=> {
    const saveData = (data) => {
        Object.keys(data).forEach(key => {
            console.log(data[key].name);
            console.log('show data');
            var BreakException = {};
                try {
                    // check the value is already exists or not
                  const check = pool.query("SELECT * FROM breeds where name = $1", [data[key].name]);
                  if(check){
                    // throw an error for duplicate values
                  }else{
                      // insert the values into the database
                    const newSs =  pool.query("INSERT INTO breeds (name, adaptability, affection_level, child_friendly, description, energy_level, weight, stranger_friendly ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",[data[key].name, data[key].adaptability, data[key].affection_level, data[key].child_friendly, data[key].description, data[key].energy_level, data[key].weight, data[key].stranger_friendly, ])
                  }    
                } catch (error) {
                    console.log(error)
                }
            // res.json(newBreed)
        });
    };

    request('https://api.thecatapi.com/v1/breeds?x-api-key="0b29a319-6ef1-4d90-bb62-bbc920d20e82"', function(error, response, body){
        if(response.statusCode ===200){
            let data = JSON.parse(body);
            console.log(Object.keys(data).length)
            // console.log(data[1].name);
            saveData(data);
            res.send(data);
        }

    
        console.log('statusCode: ', response && response.statusCode);
       
    })
});



app.listen(3000, () => console.log('listening on port 3000'));