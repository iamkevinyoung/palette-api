const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cb3b5289fcec45ed9c6b9ba2a35d5feb'
});

const handleApiCall = (req, res) => {
	app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
	handleApiCall: handleApiCall
};