const express = require('express')
const router = express.Router()
const GenStories = require('../models/GenStories')
const IndStories = require('../models/IndividualStories')
const Tokens = require('../models/Tokens')
const CollegeMajors = require('../models/CollegeMajors')
const axios = require('axios')
const cheerio = require('cheerio')
const AnimalList = [
    'Aardvark',
    'Albatross',
    'Alligator',
    'Alpaca',
    'Ant',
    'Anteater',
    'Antelope',
    'Ape',
    'Armadillo',
    'Donkey',
    'Baboon',
    'Badger',
    'Barracuda',
    'Bat',
    'Bear',
    'Beaver',
    'Bee',
    'Bison',
    'Boar',
    'Buffalo',
    'Butterfly',
    'Camel',
    'Capybara',
    'Caribou',
    'Cassowary',
    'Cat',
    'Caterpillar',
    'Cattle',
    'Chamois',
    'Cheetah',
    'Chicken',
    'Chimpanzee',
    'Chinchilla',
    'Chough',
    'Clam',
    'Cobra',
    'Cod',
    'Cormorant',
    'Coyote',
    'Crab',
    'Crane',
    'Crocodile',
    'Crow',
    'Curlew',
    'Deer',
    'Dinosaur',
    'Dog',
    'Dogfish',
    'Dolphin',
    'Dotterel',
    'Dove',
    'Dragonfly',
    'Duck',
    'Dugong',
    'Dunlin',
    'Eagle',
    'Echidna',
    'Eel',
    'Eland',
    'Elephant',
    'Elk',
    'Emu',
    'Falcon',
    'Ferret',
    'Finch',
    'Fish',
    'Flamingo',
    'Fly',
    'Fox',
    'Frog',
    'Gaur',
    'Gazelle',
    'Gerbil',
    'Giraffe',
    'Gnat',
    'Gnu',
    'Goat',
    'Goldfinch',
    'Goldfish',
    'Goose',
    'Gorilla',
    'Goshawk',
    'Grasshopper',
    'Grouse',
    'Guanaco',
    'Gull',
    'Hamster',
    'Hare',
    'Hawk',
    'Hedgehog',
    'Heron',
    'Herring',
    'Hippopotamus',
    'Hornet',
    'Horse',
    'Hummingbird',
    'Hyena',
    'Ibex',
    'Ibis',
    'Jackal',
    'Jaguar',
    'Jay',
    'Jellyfish',
    'Kangaroo',
    'Kingfisher',
    'Koala',
    'Kookabura',
    'Kouprey',
    'Kudu',
    'Lapwing',
    'Lark',
    'Lemur',
    'Leopard',
    'Lion',
    'Llama',
    'Lobster',
    'Locust',
    'Loris',
    'Louse',
    'Lyrebird',
    'Magpie',
    'Mallard',
    'Manatee',
    'Mandrill',
    'Mantis',
    'Marten',
    'Meerkat',
    'Mink',
    'Mole',
    'Mongoose',
    'Monkey',
    'Moose',
    'Mosquito',
    'Mouse',
    'Mule',
    'Narwhal',
    'Newt',
    'Nightingale',
    'Octopus',
    'Okapi',
    'Opossum',
    'Oryx',
    'Ostrich',
    'Otter',
    'Owl',
    'Oyster',
    'Panther',
    'Parrot',
    'Partridge',
    'Peafowl',
    'Pelican',
    'Penguin',
    'Pheasant',
    'Pig',
    'Pigeon',
    'Pony',
    'Porcupine',
    'Porpoise',
    'Quail',
    'Quelea',
    'Quetzal',
    'Rabbit',
    'Raccoon',
    'Rail',
    'Ram',
    'Rat',
    'Raven',
    'Red deer',
    'Red panda',
    'Reindeer',
    'Rhinoceros',
    'Rook',
    'Salamander',
    'Salmon',
    'Sand Dollar',
    'Sandpiper',
    'Sardine',
    'Scorpion',
    'Seahorse',
    'Seal',
    'Shark',
    'Sheep',
    'Shrew',
    'Skunk',
    'Snail',
    'Snake',
    'Sparrow',
    'Spider',
    'Spoonbill',
    'Squid',
    'Squirrel',
    'Starling',
    'Stingray',
    'Stinkbug',
    'Stork',
    'Swallow',
    'Swan',
    'Tapir',
    'Tarsier',
    'Tiger',
    'Toad',
    'Trout',
    'Turkey',
    'Turtle',
    'Viper',
    'Vulture',
    'Wallaby',
    'Walrus',
    'Wasp',
    'Weasel',
    'Whale',
    'Wildcat',
    'Wolf',
    'Wolverine',
    'Wombat',
    'Woodcock',
    'Woodpecker',
    'Wren',
    'Yak',
    'Zebra',
]

// GET route for all general story categories
router.get('/generalstorycat', async (req, res) => {
    try {
        const stry = await GenStories.find({})
        res.json(stry)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/individualstory', async (req, res) => {
    try {
        const individual = await IndStories.find({})
        res.json(individual)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST route for story submissions
router.post('/storysubmission', async (req, res) => {
    const {
        Title,
        ParagraphText,
        Date,
        StudentMajor,
        StudentCollege,
        StudentYear,
        RelevantCategoryList,
        Token,
        Approved,
    } = req.body

    const newStory = new IndStories({
        Title,
        ParagraphText,
        Date,
        StudentMajor,
        StudentCollege,
        StudentYear,
        RelevantCategoryList,
        Token,
        Approved,
    })

    try {
        const savedStory = await newStory.save()
        res.status(201).json(savedStory)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/tokens', async (req, res) => {
    const { Value, AssociatedStories } = req.body

    const newToken = new Tokens({
        Value,
        AssociatedStories,
    })

    try {
        const savedToken = await newToken.save()
        res.status(201).json(savedToken)
    } catch (err) {
        console.log('failed here')
        console.log(newToken)
        res.status(400).json({ message: err.message })
    }
})

router.put('/tokens', async (req, res) => {
    try {
        const { tokenID, storyID } = req.body
        const token = await Tokens.findOne({ Value: { $eq: tokenID } })

        if (!token) {
            return res.status(404).json({ message: 'Token not found' })
        }

        // checks to see if the storyID already exists in the story array
        if (token.AssociatedStories.includes(storyID)) {
            res.status(400).json({
                message: 'Associated Story ID already exists in token',
            })
        } else {
            token.AssociatedStories.push(storyID)
            const updatedToken = await token.save()
            res.status(200).json(updatedToken)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// PUT route for updating category's story ID list
router.put('/generalstorycat', async (req, res) => {
    try {
        const { categoryId, storyId } = req.body
        console.log('categoryId:', categoryId)
        const category = await GenStories.findById(categoryId)

        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }

        // check if the storyId is already in the category's storyIds array
        const storyIdExists = category.StoryIDList.includes(storyId)

        if (!storyIdExists) {
            // add the storyId to the category's storyIds array
            category.StoryIDList.push(storyId)

            // save the updated category
            const updatedCategory = await category.save()

            res.status(200).json(updatedCategory)
        } else {
            res.status(400).json({
                message: 'Story ID already exists in the category',
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.put('/updateStory', async (req, res) => {
    const { _id, ...updates } = req.body
    // note: we are not checking if its a valid token (done in frontend)
    try {
        const updatedStory = await IndStories.findByIdAndUpdate(
            _id,
            {
                $set: { ...updates },
            },
            { new: true },
        )
        if (updatedStory) {
            res.json(updatedStory)
        } else {
            res.status(404).json({ message: 'Story not found.' })
        }
    } catch (err) {
        console.error('Error updating story:', err)
        res.status(500).json({ message: err.message })
    }
})

// DELETE route for admin to delete stories
// Create the backend endpoint /deleteIndividualStory
// Input: JSON with individualStoryId to delete, e.g., {"individualStoryId": "someId"}
// Remove that story from the MongoDB database
// Return a string indicating success or failure

router.delete('/deleteIndividualStory', async (req, res) => {
    const { individualStoryId } = req.body
    try {
        const deletedStory =
            await IndStories.findByIdAndDelete(individualStoryId)
        if (deletedStory) {
            // Remove from the token as well
            const token = await Tokens.findOne({
                AssociatedStories: individualStoryId,
            })
            if (token) {
                token.AssociatedStories = token.AssociatedStories.filter(
                    (storyId) => storyId.toString() !== individualStoryId,
                )
                await token.save()
            }
            res.json({ message: 'Story successfully deleted.' })
        } else {
            res.status(404).json({ message: 'Story not found.' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// UPDATE route for admin to update stories
router.put('/updateIndividualStory', async (req, res) => {
    const { individualStoryId, ...updates } = req.body

    try {
        const updatedStory = await IndStories.findByIdAndUpdate(
            individualStoryId,
            {
                $set: { Approved: true, ...updates },
            },
            { new: true },
        )
        if (updatedStory) {
            res.json(updatedStory)
        } else {
            res.status(404).json({ message: 'Story not found.' })
        }
    } catch (err) {
        console.error('Error updating story:', err)
        res.status(500).json({ message: err.message })
    }
})

// SEND route for token creation
router.get('/generate-token', async (req, res) => {
    try {
        let randIndex = Math.floor(Math.random() * AnimalList.length)
        let animal = AnimalList[randIndex]
        let randDigits = (Math.floor(Math.random() * 100000000) + 100000000)
            .toString()
            .substring(1)

        const token = animal + randDigits

        res.send(token)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET route for all tokens
router.get('/tokens', async (req, res) => {
    try {
        const stry = await Tokens.find({})
        res.json(stry)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/colleges-and-majors', async (req, res) => {
    try {
        const response = await axios.get(
            'https://www.calpoly.edu/colleges-departments-and-majors',
        )
        const $ = cheerio.load(response.data)
        const college_dict = {}

        $('h2').each((index, element) => {
            const college_name = $(element).text().trim()
            if (college_name.toLowerCase().includes('college')) {
                const $collegeSection = $(element).nextUntil('h2')
                $collegeSection.find('a').each((index, element) => {
                    const major_name = $(element).text().trim()
                    if (
                        major_name.toLowerCase().includes('major') &&
                        major_name !== 'Find a major'
                    ) {
                        college_dict[major_name.replace('Major', '').trim()] =
                            college_name
                    }
                })
            }
        })

        res.json(college_dict)
    } catch (error) {
        console.error('Scraping failed:', error)
        res.status(500).send('Error fetching college data')
    }
})

// GET route for all colleges
router.get('/colleges', async (req, res) => {
    try {
        const colleges = await CollegeMajors.find({})
        if (colleges === null) {
            throw Error('Colleges could not be found')
        }
        res.status(200).json(colleges)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/majors', async (req, res) => {
    try {
        const colleges = await CollegeMajors.find({})
        if (colleges === null) {
            throw Error('Colleges and majors could not be found')
        }
        const majors = colleges.flatMap((college) => college.Majors)
        res.status(200).json(majors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET route for all stories associated with a specific token
router.get('/stories-by-token', async (req, res) => {
    try {
        // find token from request
        const tokenValue = req.query.token || -1
        const token = await Tokens.findOne({ Value: { $eq: tokenValue } })
        if (token === null) {
            throw Error(`Token ${tokenValue} was not found`)
        }

        // get stories with IDs that belong to that token
        const stories = await IndStories.find({
            _id: { $in: token.AssociatedStories },
        })
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
