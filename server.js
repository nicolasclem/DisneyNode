const express=require('express')
const app= express()



const moviesRoutes = require('./src/routes/moviesRotues')
const usersRoutes = require('./src/routes/userRoutes')
const genresRoutes = require('./src/routes/genreRoutes')
const charactersRoutes = require('./src/routes/characterRoutes')
const charactersMoivesRoutes = require('./src/routes/character_movieRoutes')





const PORT= 3000


app.use(express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/movies',moviesRoutes);
app.use('/auth',usersRoutes);
app.use('/genres',genresRoutes);
app.use('/characters',charactersRoutes);
app.use('/charactersmovie',charactersMoivesRoutes);


app.listen(PORT,()=>console.log(`Escuchando puerto : ${PORT}`))
