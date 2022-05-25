const express=require('express')
const app= express()



const moviesRoutes = require('./src/routes/moviesRotues')
const usersRoutes = require('./src/routes/userRoutes')
const genresRoutes = require('./src/routes/genreRoutes')
const charactersRoutes = require('./src/routes/characterRoutes')





const PORT= 3000


app.use(express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/movies',moviesRoutes);
app.use('/auth',usersRoutes);
app.use('/genres',genresRoutes);
app.use('/characters',charactersRoutes);


app.listen(PORT,()=>console.log(`Escuchando puerto : ${PORT}`))
