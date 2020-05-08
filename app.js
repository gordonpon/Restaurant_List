const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantsList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    console.log('request', req)
    const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', {restaurant: restaurant})
})


app.get('/search', (req, res) => {
    console.log('req.query.keyword ', req.query.keyword)
    const keyword = req.query.keyword
    const restaurants = restaurantsList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', {restaurants: restaurants, keyword: keyword})
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})