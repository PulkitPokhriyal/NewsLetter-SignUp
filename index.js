import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.get("/", (req, res)=> {
    res.render("index.ejs")
});
app.post("/submit", async(req, res)=> {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var data = {
          email_address: email,
            status : "subscribed",
            merge_fields: {
              FNAME: firstname,
              LNAME: lastname,
            },
        }


    try {
        const response = await axios.post("https://us11.api.mailchimp.com/3.0/lists/fa1133f9aa/members",data,{
             headers: {
            'Authorization' : 'Bearer 225e84ed8d304efdfe9e82066488cde1-us11',
            'Content-Type': 'application/json'
          },
        
        });
        res.render("success.ejs", );
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("failure.ejs", {
          error: error.message,
        });
      }
})

app.post("/", (req, res) =>{
      res.render("index.ejs")
})
app.listen(port, ()=>{
      console.log(`Server running on port: ${port}`);
})