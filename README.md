# DevOfWeeks
Each and every week, members of the [Evanta](https://www.evanta.com) Dev Team cast their vote to decide who is truly deserving of the title "Dev of Weeks". This vote has historically been submitted by post-it note, but due to the troubling times of the [Covid Era](https://en.wikipedia.org/wiki/Coronavirus_disease_2019), the need for a new platform was born.

## Running the project locally 
### Redis
Install Redis if you don't already have it on your machine
```
brew update
brew install Redis
```

Fire it up
```
brew services start redis
```
If you want to stop it
```
brew services stop redis
```
#### Testing your connection
```
redis-cli ping
```
You should receive a `PONG`

### Installing dependancies 
This project uses Ruby '2.5.1'
Use [RVM](https://rvm.io/) to easily manage Ruby versions
Rails 6.0.0

`bundle`
`rails s`


