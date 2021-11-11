const gqlRequest =  require('graphql-request')
const functions = require("firebase-functions");
const app = require("express")();
const firebase = require("firebase-admin");
firebase.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
app.get("/", (req, res) => {
	res.send("working...");
});

app.post("/createDate", (req, res) => {
	firebase
		.firestore()
		.collection("Dates")
		.doc(new Date().toLocaleDateString().replace("/", " ").replace("/", " "))
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
    res.send(data)
});

exports.api = functions.https.onRequest(app);
