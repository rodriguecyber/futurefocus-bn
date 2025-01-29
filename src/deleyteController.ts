import Student from "./models/Students";

export async function delete1547thDocument() {
  try {
    // Find the 1547th document by sorting and skipping the first 1546
    const document = await Student.find()
      .skip(1981)  // Skip the first 1546 documents
      .limit(1).select('_id')    // Get the 1547th document
         // Execute the query

    if (document.length > 0) {
      const docId = document[0]._id;  // Get the ID of the 1547th document

      // Delete the 1547th document
      const result = await Student.deleteOne({ _id: docId });

      if (result.deletedCount === 1) {
        console.log("The 1547th document was deleted."); 
      } else {
        console.log("The document could not be deleted.");
      }
    } else {
      console.log("No document found at the 1547th position.");
    }
  } catch (error) {
    console.error("Error deleting the 1547th document:", error);
  }
}
