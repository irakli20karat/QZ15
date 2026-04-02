const express = require('express');
const app = express();
const port = 5000;

let cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2021, price: 25000, color: 'Black' },
    { id: 2, brand: 'BMW', model: 'M5', year: 2023, price: 105000, color: 'Blue' },
    { id: 3, brand: 'Honda', model: 'Civic', year: 2019, price: 18000, color: 'White' }
];

app.use(express.json());

app.get('/api/cars', (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            cars: cars
        })
    } catch {
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
})

app.get('/api/cars/:id', (req, res) => {
    try {
        let id = +req.params.id;
        let car = cars.find(c => c.id === id);
        if (car) {
            res.status(200).json({
                status: 200,
                cars: [car]
            })
        }
        res.status(400).json({
            status: 400,
            error: 'მანქანა ამ ID-ით ვერ მოიძებნა'
        })
    } catch {
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
})

app.post('/api/cars', (req, res) => {
    try {
        let brand = req.body.brand;
        let model = req.body.model;
        let year = +req.body.year;
        let price = +req.body.price;
        let color = req.body.color;

        if (brand && model) {
            let car = {
                id: Date.now(),
                brand: brand,
                model: model,
                year: year || 0,
                price: price || 0,
                color: color || 'unknown'
            }

            cars.push(car);
            res.status(201).json({
                status: 201,
                cars: [car]
            })
        }
        res.status(400).json({
            status: 400,
            error: 'ბრენდი და მოდელი სავალდებულოა!'
        })
    } catch {
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
})

app.put('/api/cars/:id', (req, res) => {
    try {
        let id = +req.params.id;
        let car = cars.find(c => c.id === id);

        if (car) {
            let brand = req.body.brand;
            let model = req.body.model;
            let year = +req.body.year;
            let price = +req.body.price;
            let color = req.body.color;

            car.brand = brand ? brand : car.brand;
            car.model = model ? model : car.model;
            car.year = year ? year : car.year;
            car.price = price ? price : car.price;
            car.color = color ? color : car.color;

            res.status(200).json({
                status: 200,
                cars: [car]
            })
        }
        res.status(404).json({
            status: 404,
            error: 'მანქანა არ არსებობს'
        })
    } catch {
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
})

app.delete('/api/cars/:id', (req, res) => {
    try {
        let id = +req.params.id;
        let car = cars.find(c => c.id === id);

        if (car) {
            cars = cars.filter(c => c.id != id);
            res.status(200).json({
                status: 200,
                message: 'მანქანა წარმატებით გაიყიდა (წაიშალა ბაზიდან)'
            })
        }
        res.status(404).json({
            status: 404,
            error: 'მანქანა არ არსებობს'
        })
    } catch {
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
})

app.listen(port, () => {
    console.log('Listening to port', port);
})