const express = require('express');
const cors = require('cors');
const scraper = require('./scraper.js');

const app = express();
const PORT = process.env.PORT || 5000; // Menggunakan port dinamis dari Vercel saat online

app.use(cors());
app.use(express.json());

// Jalur data ongoing (Disederhanakan karena routePrefix Vercel sudah /api)
app.get('/ongoing', async (req, res) => {
  try { const data = await scraper.ongoingList(); res.json(data); } 
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Jalur data populer
app.get('/popular', async (req, res) => {
  try { const data = await scraper.popularSeries(); res.json(data); } 
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Jalur data jadwal
app.get('/jadwal', async (req, res) => {
  try { const data = await scraper.jadwalRilis(); res.json(data); } 
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Jalur pencarian anime
app.get('/search', async (req, res) => {
  try { const data = await scraper.search(req.query.q); res.json(data); } 
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Jalur detail anime
app.get('/anime', async (req, res) => {
  try { const data = await scraper.animeDetail(req.query.url); res.json(data); } 
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Jalur link streaming & download episode
app.get('/episode', async (req, res) => {
  try { const data = await scraper.episodeDetail(req.query.url); res.json(data); } 
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Tetap jalankan listen jika dijalankan di lokal komputer
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server Jembatan API aktif di http://localhost:${PORT}`));
}

// WAJIB UNTUK DEPLOY VERCEL SERVERLESS
module.exports = app;
