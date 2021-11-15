const gqlRequest =  require('graphql-request')
const functions = require("firebase-functions");
const app = require("express")();
const firebase = require("firebase-admin");
var cors = require('cors')
var Twitter = require('twitter');
app.use(cors())
firebase.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.post("/createDate", (req, res) => {
	firebase
		.firestore()
		.collection("Dates")
		.doc(new Date().toLocaleDateString("en-GB").replace("/", " ").replace("/", " "))
		.set({});
	res.send(200);
});

app.post('/interest', async(req, res)=>{
	const {email} = req.query
	let date = new Date()
	let str = date.toUTCString()
	await firebase.firestore().collection('Interested').doc(str).set({
		email: email
	})
	res.send(200)
})

app.post("/submission", async (req, res) => {
	const id = req.query.id;
    const graphQLClient = new gqlRequest.GraphQLClient("https://api.producthunt.com/v2/api/graphql", {
        headers: {
          authorization: 'Bearer fBSWL2aT4eZJf3q_cVfE_MXcfXUnRTTfdDAcR5tO8uc',
        },
      })
	const query = gqlRequest.gql`
		{
			post(id: "${id}") {
				topics {
					edges {
						node {
							name
						}
					}
				}
				name
				thumbnail {
					url
				}
				makers {
					twitterUsername 
				}
			}
		}
	`;
	const data = await graphQLClient.request(query);
    if(data){
        firebase.firestore().collection('Dates').doc(new Date().toLocaleDateString("en-GB").replace("/", " ").replace("/", " ")).set({
            id: id,
            img: data.post.thumbnail.url.split('?')[0],
			url: `https://cards.producthunt.com/cards/posts/${id}?v=1`,
            topics: data.post.topics.edges.map(edge=>edge.node.name),
            date: new Date(),
        })
    }

	var client = new Twitter({
		consumer_key: 'cxm55l3vGkb6AnEe2emCDD4fT',
		consumer_secret: 'V6MS7BtIIYz3ukx7qsUPID5tvtbNqGoKrGv3cfEMdKKBTgqS2n',
		access_token_key: '1335882169206575104-SAyZkbkFWdrey6jA74bUkw6mrygYka',
		access_token_secret: 'LO8UPh2FBbagzWn6SpBuGNc76UZ1Zt7rePFbQo8f8KnlA'
		});

	const makers = data.post.makers
	let str = ''
	makers.map(maker=>{
		if(maker.twitterUsername != null){
			str += ' @' +  maker.twitterUsername
		}
	});
	let _status = `🐱 My Product Hunt 365 selection today is...\n\n${data.post.name}!! 🥳\n\nHave a look at ${data.post.name}'s @ProductHunt listing along with all of my other selections over at https://ph-365.web.app\n\n
	Big congratulations to ${str.length ? str : 'another #IndieMaker!'}`
	
	client.post('statuses/update', {status: _status},  function(error, tweet, response) {
		if(error) throw error;
		console.log(tweet);  // Tweet body.
		console.log(response);  // Raw response object.
	  });

    res.send(data)
});

app.get('/dates', async (req, res)=>{
    let arr = []
    await firebase.firestore().collection('Dates').orderBy("id", "asc").get().then(snap=>{
        snap.forEach(doc=>{
            arr.push(doc.data())
        })
    })
    res.send(arr)
})

app.get("/", (req, res) => {
	res.send("working...");
});

exports.api = functions.https.onRequest(app);
