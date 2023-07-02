


//OPEN AI API KEY.

import { Configuration,OpenAIApi } from "openai";


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const KEY="";


import serverless from 'serverless-http';



// const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors());

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('app is running');
});

app.use('/.netlify/functions/api',router);

module.exports.handler=serverless(app);

// Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://localhost/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// Parse incoming request bodies with body-parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes and middleware
// ...

// Start the server
// const port = 4000;
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });




// app.get("/", async (req, res) => {
//     console.log("Calling OpenAI API to get the Evaluation");
//     // var ans=req.body.text;
   
    
//     var temp1=await API_CALL(answers);
//     res.send(temp1); //sending evaluation string back to the front-END



// });

// router.post("/upload", async (req, res) => {
//     const textData = req.body.textData;
    
  
//     // Process the textData as needed
     
//     var temp1=await API_CALL(textData);
    
//     res.send(temp1); //sending evaluation string back to the front-END
    
  
    
// });

router.post("/upload", async (req, res) => {
  try {
    const textData=req.body.textData;
    // Process the textData as needed
    var temp1 = await API_CALL(textData);
    res.send(temp1); // Sending evaluation string back to the front-END

  }catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
  
 
});




// app.get("/record",(req,res)=>{
//     //display the prev evaluations of the user

 

// });






//API FUNCTION SIU

async function API_CALL(){
    const interviewQuestions = 'What are your strengths?|How do you handle stress?|Tell me about a challenging situation you faced and how you resolved it.';
    const interviewAnswers = 'My strengths include good communication skills and attention to detail but i am lazy sad.|I handle stress by practicing deep breathing and time management.|In a previous role, I had to meet a tight deadline, so I organized a team meeting to delegate tasks and created a timeline to ensure timely completion.';

//Configuration to set up the API KEY


const openai=new OpenAIApi(new Configuration({
    apiKey:KEY
}))

const conversation = [
    { role: 'system', content: 'You are the interviewer evaluate this Interview the evalutation should not be more than 100 words.' },
    { role: 'user', content: interviewQuestions },
    { role: 'assistant', content: interviewAnswers },
  ];


const res=await openai.createChatCompletion({
    model:"gpt-3.5-turbo",
    messages:conversation,
})

return res.data.choices[0].message.content;

}