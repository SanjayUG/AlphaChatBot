// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Example endpoint
app.get('/', (req, res) => {
  res.send('Chatbot backend is running!');
});

// Helper function to generate 10 long words starting with a given letter
const generateLongWords = (letter) => {
    const allWords = [
      'accomplish', 'achievement', 'anticipate', 'appointment', 'availability',
      'admiration', 'adjustment', 'affectionate', 'agriculture', 'appearance',
      'beautiful', 'beneficiary', 'biotechnology', 'breakthrough', 'business',
      'brilliant', 'boundaries', 'blossoming', 'breathtaking', 'bargaining',
      'challenge', 'characteristic', 'circumstance', 'collaboration', 'commitment',
      'consequence', 'consultation', 'creativity', 'compassionate', 'complicated',
      'dedication', 'diplomatic', 'discovery', 'distinction', 'diversification',
      'determination', 'documentary', 'discontinued', 'developmental', 'destruction',
      'education', 'electrification', 'enterprise', 'environment', 'evaluation',
      'empowerment', 'encouraging', 'examination', 'enlightenment', 'elaboration',
      'facilitate', 'fundamental', 'functionality', 'grandfather', 'gratitude',
      'friendliness', 'forgiveness', 'flexibility', 'fascinating', 'flourishing',
      'happiness', 'harmonious', 'housekeeping', 'humanitarian', 'hydrogen',
      'hierarchical', 'hospitality', 'hypothesis', 'humiliation', 'highlighting',
      'imagination', 'improvement', 'independent', 'innovation', 'integrity',
      'individuality', 'institution', 'investigator', 'invulnerability', 'illumination',
      'journalism', 'jurisdiction', 'justification', 'knowledge', 'kaleidoscope',
      'kindhearted', 'kilometers', 'keystrokes', 'kindergarten', 'kitchenware',
      'laboratory', 'legislation', 'localization', 'luminescence', 'leadership',
      'liberation', 'loneliness', 'landscaping', 'liquidation', 'lightweight',
      'management', 'manufacturing', 'mathematics', 'mechanical', 'memorization',
      'medication', 'motivation', 'mischievous', 'modification', 'magnificent',
      'navigation', 'negotiation', 'neighborhood', 'nomination', 'notification',
      'neutralized', 'necessities', 'nourishment', 'naturalistic', 'nonexistent',
      'observation', 'optimization', 'organization', 'ornamentation', 'outstanding',
      'obligations', 'opportunities', 'obstruction', 'observatory', 'orchestrated',
      'partnership', 'perseverance', 'philanthropy', 'planetarium', 'preliminary',
      'preparation', 'participate', 'philosopher', 'polarization', 'progressive',
      'qualification', 'quantitative', 'quarterfinal', 'quintessential', 'questionnaire',
      'quickening', 'quotability', 'quadruplets', 'questionable', 'quarantines',
      'reliability', 'representation', 'research', 'responsibility', 'satisfaction',
      'scholarship', 'significant', 'specialization', 'sustainability', 'technological',
      'telecommunication', 'transformation', 'understanding', 'undertaking', 'unification',
      'unprecedented', 'validation', 'verification', 'veterinarian', 'visualization',
      'volunteering', 'willingness', 'wonderful', 'workmanship', 'worthwhile',
      'xenophobia', 'xeroxography', 'xylophonists', 'xenogenesis', 'xenocryst',
      'yesterday', 'yielding', 'youthfulness', 'yearnings', 'yourselves',
      'zoological', 'zoologist', 'zealously', 'zenithal', 'zephyr', 'zookeeper', 
      'zoology'
    ];
  
    // Filter words starting with the given letter and have at least 6 letters
    const filteredWords = allWords.filter(word => word.toLowerCase().startsWith(letter.toLowerCase()) && word.length >= 6);
    return filteredWords.length >= 10 ? filteredWords.slice(0, 10) : filteredWords;
  };
  

// API endpoint to handle messages
app.post('/api/messages', (req, res) => {
  const userMessage = req.body.message;
  let botResponse;

  if (/^[a-zA-Z]$/.test(userMessage)) {
    botResponse = generateLongWords(userMessage);
  } else {
    botResponse = 'Please enter a single letter to get long words starting with it.';
  }
  
  res.json({ botMessage: botResponse.join(', ') });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
