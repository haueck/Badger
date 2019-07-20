/*global process exports*/
//const Firestore = require("@google-cloud/firestore")
//const firestore = new Firestore({ projectId: process.env.GCP_PROJECT })

exports.processCard = (event, context) => {
  const resource = context.resource
  console.log("Function triggered by change to: " + resource + " - " + process.env.GCP_PROJECT)
  // Verify a card
  /*if (event.value && event.value.fields["Type"].stringValue === "English") {
    console.log("Processing English card")
    if ("CutExamples" in event.value.fields) {
      console.log("Updating...")
    } else {
      console.log("Inserting...")
      let cut = []
      const doc = firestore.doc(resource.split("/documents/")[1])
      for (let example of event.value.fields["Examples"].arrayValue.values) {
        cut.push(example.stringValue)
      }
      return doc.set({ "CutExamples": cut }, { merge: true })
    }
  }*/
}
