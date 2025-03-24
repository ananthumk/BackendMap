const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true } )
.then(() => console.log('Connect to Db'))
.catch((err) => console.log('Error in DB coonection: ',err) )

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema)




//Login API 

app.post('/api/login', async (req, res) => {

    const { email , password } = req.body 
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({"message" : 'User Not Found'})
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch){
        return res.status(400).json({"message": "Invalid Password"}) 
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '10h'})
    res.status(200).json({token})

})


// DashBoard 

app.get('/api/dashBoard', authenicateUser, async(req, res) => {
    return res.status(200).json({
        cards: 
        [
            {id: 1, Location: 'New Delhi', place: 'Dwarka', image_url: 'https://imgs.search.brave.com/hVXxVQk-iNwwhkmiaC79C5x0PqrE6rEZHceRYaE7cbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGtzaW5jLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8w/OS9OZXctRGVsaGkz/LTEtc2NhbGVkLmpw/Zw', team_member: 10, status: 'active'},
            {id: 2, location: 'Mumbai HQ',  place: 'Andheri', image_url: 'https://imgs.search.brave.com/I2g6xn4l4C0sb9ihXdfiqjmmSSOaRhpxIp6MM3aRnRA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIx/NjAyNDc5MC9waG90/by9nYXRld2F5LW9m/LWluZGlhLW11bWJh/aS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9QXNTSm1SZDVE/OGtIdHN2SGR6Ymdj/R1NuOGsxTTVxS3RG/SGlkYXVhamRyaz0', team_member: 20, status: 'active' }, 
            {id: 3, location: 'Hyderbad Office',  place: 'Gachibowli', image_url: 'https://imgs.search.brave.com/J7Uhw7JjePQ5XNiNCrqZMLCz4DZ6qySyi_e7jLFn_Vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vcGhvdG9z/L2hpZ2gtYW5nbGUt/dmlldy1vZi1zdHJl/ZXQtcGFja2VkLXdp/dGgtdHJhZmZpYy1j/aGFybWluYXItYmF6/YWFyLXBpY3R1cmUt/aWQ0ODE2ODg1MjM_/az0yMCZtPTQ4MTY4/ODUyMyZzPTYxMng2/MTImdz0wJmg9a28w/QUdoSGlpVnZreHhM/aFVEdy00RDZEWThE/U3hXNFl6LXVieG1K/d3lEYz0', team_member: 15, status: 'inactive'},
            {id: 4, location: 'Banglore Tech',  place: 'Whitefield', image_url: 'https://imgs.search.brave.com/sOzj1P8DrUDHEOvcOXMNRe9gu2L_S-vDxKCVri-spnk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzAyLzE1LzYw/LzM2MF9GXzMwMjE1/NjAxMV9qZGlSOTg3/d3B1Wk42T2ZWZVVh/a2xOTGd5REtOMzVI/Yy5qcGc', team_member: 20, status: 'active'}
        ]})
})

//map

app.get('/api/map', authenicateUser, async(req, res) => {
    return res.status(200).json({message: 'Map Data',  location:[
       {
         location_coordinates: {lat: 28.6139, lng: 77.2090 }, place_coordinates: {lat: 28.5970, lng: 77.0366} 
       },
       {
        location_coordinates: {lat: 19.0760, lng: 72.8777 }, place_coordinates: {lat: 19.1197, lng: 72.8464} 
       },
       {
        location_coordinates: {lat: 17.3850, lng: 78.4867 }, place_coordinates: {lat: 17.4401, lng: 78.3489} 
       },
       {
        location_coordinates: {lat: 12.9716, lng: 77.5946 }, place_coordinates: {lat: 12.9698, lng: 77.7500} 
       },
    ] })
})

function authenicateUser( req, res, next) {
     const authHeader = req.headers['authorization']
     console.log(authHeader)
     if(!authHeader) {
        return res.status(400).json({message: 'User Not Logged In'})
     }
     
     const token = authHeader.split(' ')[1]
     console.log(token)
     try{
        const decoded =  jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
     }catch(err){
        return res.status(401).json({message: 'Invalid Token'})
     }
}


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})