# DevOfWeeks
Each and every week, members of the [Evanta](https://www.evanta.com) Dev Team cast their vote to decide who is truly deserving of the title "Dev of Weeks". This vote has historically been submitted by post-it note, but due to the troubling times of the [Covid Era](https://en.wikipedia.org/wiki/Coronavirus_disease_2019), the need for a new platform was born.

Aside from being able to vote for the developer of the week, the app also includes a [scrum poker](https://en.wikipedia.org/wiki/Planning_poker) tool as well as a random icebreaker generator.

## Deploying the project to Heroku for your own team
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Running the project locally
`mkdir -p tmp/pids`

`docker-compose build`

`docker-compose run webpacker yarn`

`docker-compose run dow_app rake db:create`

`docker-compose up`

`open http://localhost:3001`

Click button to migrate.

### Add some Icebreakers
`docker-compose run dow_app rake db:seed`
