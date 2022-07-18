// create a database
use jaskis

// create collection
db.createCollection('bounties')

// ensure collection creation was successful
show collections

//Add animal bounties (test 1)
db.bounties.insertOne({
    name: "Thanoceros",
    species: "Rhinoceros",
    location: "Grasslands",
    wantedFor: "Eating too much grass",
    client: "Songbird",
    reward: 10000,
    captured: false
  })

  //Add remaining animal bounties
  db.bounties.insertMany([
    {
      "name": "Lokinkajou",
      "species": "Kinkajou",
      "location": "Tropical rainforest",
      "wantedFor": "Partying too late at night",
      "client": "White tiger",
      "reward": 1000,
      "captured": false
    },
    {
      "name": "Nebullama",
      "species": "Llama",
      "location": "Grasslands",
      "wantedFor": "Drinking all the water from the ocean",
      "client": "Songbird",
      "reward": 2500,
      "captured": false
    },
    {
      "name": "Polarwind",
      "species": "Polar Bear",
      "location": "Arctic",
      "wantedFor": "Not hibernating",
      "client": "Sabertooth",
      "reward": 4000,
      "captured": false
    },
    {
      "name": "Wrecking Crows",
      "species": "Crow",
      "location": "Grasslands",
      "wantedFor": "Cawing too loudly",
      "client": "Red wolf",
      "reward": 40000,
      "captured": false
    },
    {
      "name": "Grandhog",
      "species": "Groundhog",
      "location": "Woodlands",
      "wantedFor": "Not coming out of the hole on time and prolonging winter",
      "client": "Songbird",
      "reward": 50000,
      "captured": false
    },
    {
      "name": "Grim Panda",
      "species": "Giant Panda",
      "location": "Temperate forest",
      "wantedFor": "Eating all the bamboo",
      "client": "Red wolf",
      "reward": 5000,
      "captured": false
    }
    ])

    //Manage the Database
    //Queries
        //1 Query all animals located on grasslands
        db.bounties.find({"location": "Grasslands"})

        //2 Query all anilams with a rewards worth $10000 or more
        db.bounties.find({ reward: {$gt: 10000} })

        //3 Query all animals but exclude the client from being shown
        db.bounties.find({captured: false}, {client: 0})

        //4 Query for the animal using the $and logical operator.... Groundhog located in Woodlands
        
        db.bounties.find({
            $and: [
                { $or: [ { "species": "Groundhog" } , { "location" : "Woodlands" }  ] }
                
            ]
        })
          

    //Update and Delete
        // 1 Update reward for Polarwind to $10,000
        db.bounties.updateOne(
            { "reward" : 4000},
            {$set:{ "reward": 10000}}
            )
            //**check for Polarwind reward update**
            db.bounties.find({ "name": "Polarwind"})

        //2 Remove Lokinkajou from list
        db.bounties.deleteOne({ "name": "Lokinkajou"})
            //**check for Lokinkajou removal**
            db.bounties.find({"name": "Lokinkajou"})

        //3 Delete all animal bounties sent by Songbird
        db.bounties.deleteMany({"client": "Songbird"})
            //**check for deletion of all Songbird sent bounties */
            db.bounties.find({"client": "Songbird"})

        //4 All bounties have been captured
        db.bounties.updateMany(
            {  captured: false}, 
            { $set: {  captured: true }}
        )
            //**check for the update that all bounties have been captured **
            db.bounties.find({ "captured" : true})