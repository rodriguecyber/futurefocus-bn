import { MongoClient } from "mongodb";

// Replace with your source and destination MongoDB connection details
const sourceUrl = '';
const sourceDbName = 'futurefocus';

const destinationUrl = '';
const destinationDbName = 'futurefocus';

export async function migrateAllCollections() {
  const sourceClient = new MongoClient(sourceUrl);
  const destinationClient = new MongoClient(destinationUrl);

  try {
    // Connect to both source and destination databases
    await sourceClient.connect();
    await destinationClient.connect();

    const sourceDb = sourceClient.db(sourceDbName);
    const destinationDb = destinationClient.db(destinationDbName);

    // Get the list of all collections in the source database
    const collections = await sourceDb.listCollections().toArray();

    // Loop through each collection in the source database
    for (const collection of collections) {
      const sourceCollection = sourceDb.collection(collection.name);
      const destinationCollection = destinationDb.collection(collection.name);

      // Fetch all documents from the source collection
      const documents = await sourceCollection.find().toArray();
      console.log(`Found ${documents.length} documents in collection: ${collection.name} to migrate.`);

      // Insert documents into the destination collection
      if (documents.length > 0) {
        const result = await destinationCollection.insertMany(documents);
        console.log(
          `Successfully inserted ${result.insertedCount} documents into the destination collection: ${collection.name}.`
        );
      } else {
        console.log(`No documents to migrate for collection: ${collection.name}.`);
      }
    }

    console.log("Migration completed successfully for all collections.");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close both connections
    await sourceClient.close();
    await destinationClient.close();
  }
}

// Run the migration

  