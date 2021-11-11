const gqlRequest =  require('graphql-request')
const functions = require("firebase-functions");
const app = require("express")();
const firebase = require("firebase-admin");
var cors = require('cors')
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
				thumbnail {
					url
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
            date: new Date()
        })
    }
    res.send(data)
});

app.get('/dates', async (req, res)=>{
    let arr = []
    await firebase.firestore().collection('Dates').orderBy("id", "desc").get().then(snap=>{
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
