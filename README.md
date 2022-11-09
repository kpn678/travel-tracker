# Travel Tracker

## Overview
**Travel Tracker** is an application that allows for a traveler to view their past, current, future, and pending trips that they book via this application. Travelers can create the trip of their dreams and choose their own dates, duration, and number of travelers and select from a set list of destinations.

#### Goals
- Use object-oriented programming and full separation of the data model and DOM to create non-repetitive, modular code
- Work with an API to retrieve and upload data
- Create a robust and thorough test suite that tests all functionality of a client-side application

#### Project Specs
The rubric and specs can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).

## Set Up
1. Fork this [repository](https://github.com/kpn678/travel-tracker.git), and clone it into your local machine.
2. Navigate into the repository.
3. Run `npm install` from your command line, which will install Webpack.
4. Open another command line tab, and remain in the repository. Each time you use the application, run `npm start`, and copy the local host link, `http://localhost:8080/`, to your browser to view the application.
5. For the username, it is *traveler##* with *##* being any number from 1-50. The password is *travel*.
6. To run the testing suite, ensure that `npm install` was run when the project was cloned. Then, run `npm test` in the command line tab where `npm start` is not being run.

## Deployed Link
The website can be accessed [here](https://the-best-travel-tracker.vercel.app/).

## Visual Walkthrough
- User can access a login page with proper verification of username and password
![Login Page](src/images/Login.gif)

- User can view their past, current, future, and pending trips
![Trips Grids](src/images/Grids.gif)

- User can submit a trip request and view it on their pending trips page
![Submit Trip](src/images/Submit-Trip.gif)

## Technologies Implemented
- Javascript
- CSS
- HTML
- Fetch API
- Mocha/Chai
- Day.js

## Future Directions
- Implement the third-party library, Micromodal, so that modals can display messages more apparently for the user
- Develop a travel agent user that can approve and deny traveler trips

## Image Credits
- Background: https://unsplash.com/photos/qyAka7W5uMY
- Passport Icon: https://www.flaticon.com/free-icons/passport

## Contributor
- [Kristy Nguyen](https://github.com/kpn678)
