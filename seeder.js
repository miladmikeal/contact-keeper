const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config()

// Load models
const Contact = require('./models/Contact')
const User = require('./models/User')

// Conne to DB
mongoose
  .connect(process.env.TEST_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(res => console.log('TEST DB connected'))
  .catch(err => console.log(err))

const contacts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contact.json`, 'utf-8')
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/user.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Contact.create(contacts)
    await User.create(users)

    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Contact.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
