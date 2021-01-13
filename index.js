const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development)

const server = express();

const port = process.env.PORT || 5000;

server.use(helmet());

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({message: `This server is live on port ${port}`})
})

// Retrieve cars from Database

server.get('/api/cars', async (req,res) => {
    try {
        const cars = await db('cars');

        res.status(200).json(cars);
        
    } catch (error) {
        console.log('Error Incurred Getting Cars')
        res.status(500).json(error)

    }
})

//Get car by ID

server.get('/api/cars/:id', async(req,res) => {
    //Get each car by id

    try {
        const car = await db('cars')
            .where({id: req.params.id})
            .first();
        res.status(200).json(car);
    } catch (error) {

        res.status(500).json(error);
        
    }
})

//Create Car Data

server.post('/api/cars', async (req,res) => {
    try {
        const newCar = await db('cars').insert(req.body);

        const car = await db('cars')
            .where( req.body )
            .first();

        res.status(201).json(car);

    } catch (error) {
        
        res.status(500).json(error)

    }
})

// Update unique car data

server.put('/api/cars/:id', async(req,res) => {
    try {
        console.log("Attempt to PUT")
        const unique_id = await db('cars')
            .where({id: req.params.id})
            .update( req.body );

        if(unique_id > 0){
            const car = await db('cars')
                .where({ id : req.params.id })
                .first();
            
            res.status(200).json(car)
        } else {
            res.status(404).json({ message: 'Records not found' })
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete a car entry

server.delete('/api/cars/:id', async(req,res) => {
    try {
        const unique_id = await db('cars')
            .where({ id: req.params.id })
            .del();
            
        if(unique_id > 0){
            res.sendStatus(204)

        } else {
            res.status(404).json({message: "ERROR 404 Record Not Found"})
        }
    } catch (error) {
        
    }
})

server.listen(port, () => {
    console.log(`=== Server Live on Port ${port}`)
})
