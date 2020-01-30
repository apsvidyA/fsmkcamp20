const express = require("express");
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.json());
const mongoose = require("mongoose");
const port = 3000;

const Product = require("./product");

var mongoDB = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(mongoDB, { useNewUrlParser: true }, (error)=> {
	if (!error) {
		console.log("Successfully connected");
	}
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get("/", (req, res, next) => {
	res.send('Hello World!');
});

// Fetch alll the records
app.get("/all", (req, res, next) => {
	Product.find()
	  .exec()
	  .then(docs => {
		console.log(docs);
		//   if (docs.length >= 0) {
		res.status(200).json(docs);
		//   } else {
		//       res.status(404).json({
		//           message: 'No entries found'
		//       });
		//   }
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  });


// Enter a record
app.post("/", (req, res, next) => {
	const product = new Product({
	  _id: new mongoose.Types.ObjectId(),
	  name: req.body.name,
	  price: req.body.price
	});
	product
	  .save()
	  .then(result => {
		console.log(result);
		res.status(201).json({
		  message: "Handling POST requests to /products",
		  createdProduct: result
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  });


// Fetch a record by a given id
app.get("/:id", (req, res, next) => {
	const id = req.params.id;
	Product.findById(id)
	  .exec()
	  .then(doc => {
		console.log("From database", doc);
		if (doc) {
		  res.status(200).json(doc);
		} else {
		  res
			.status(404)
			.json({ message: "No valid entry found for provided ID" });
		}
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
});

// delete a record
app.delete("/delete/record", (req, res, next) => {
	const id = req.body.id;
	console.log(id);
	Product.remove({ _id: id })
	  .exec()
	  .then(result => {
		res.status(200).json(result);
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  });

  // update a record
  app.put("/update/record", (req, res, next) => {
	const id = req.body.id;
	const updateOps = {};
	updateOps["name"] = req.body.name;
	updateOps["value"] = req.body.price;

	Product.update({ _id: id }, { $set: updateOps })
	  .exec()
	  .then(result => {
		console.log(result);
		res.status(200).json(result);
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.delete("/delete/record", (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  Product.remove({ _id: id })
    .exec()
    .then(result => {
    res.status(200).json(result);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
    });
  });
  
  app.put("/update/record", (req, res, next) => {
  const id = req.body.id;
  const updateOps = {};
  updateOps["name"] = req.body.name;
  updateOps["price"] = req.body.price;

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
    console.log(result);
    res.status(200).json(result);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
    });
  });

  
 
  

  
  
  
  

  
  
  
  
  
  
  

  
  