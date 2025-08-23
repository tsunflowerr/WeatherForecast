import express from 'express'
import cors from 'cors'
import  'dotenv/config'
import axios from 'axios'


 const app = express()
 const port = process.env.PORT || 4000 

app.use(cors())
app.use(express.json())

app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city
    const day = req.query.days || 3; // Số ngày dự báo, mặc định là 3 ngày
    try {
         const response = await axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${day}&aqi=no&alerts=no`
        );
        res.json(response.data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
