# ParkMe

## Inspiration
Parking in big cities (i.e. LA, Seattle, NYC) can be a pain a lot of the time and we wanted to decrease the amount of time cars drive around trying to look for parking spots. In this way, drivers would be less frustrated, parking would be less time consuming, and less pollutants would be released into the air while drivers are looking for parking spots.

## What it does
It notifies users of parking spots within a certain radius to them.

## How we built it
Each user has a webcam that records footage of what is in front of them while they are driving. This webcam takes note of all open parking spots by taking screenshots and recording the location (latitude, longitude) of the user every x number of seconds and pinging the backend (which identifies where parking spots are in each screenshot). After the backend receives the screenshots and locations where they were taken, it analyzes each screenshot for parking spots. It does this by using OpenCV to apply contour and line detection, and filtering out lines to identify possible parking spots. It then sends back a list of parking spots with locations to the frontend. The frontend then puts the locations on a map using the Google Maps API and displays it to users looking for parking spots.

## Challenges we ran into
For the frontend, a challenge we faced was finding a usable react module that would be able to screenshot what was on the webcam every few seconds. Integration between the frontend and the backend was difficult because there were many bugs with the frontend sending a null screenshot even though there should’ve been a screenshot that was sent. A challenge we faced on the backend was tuning filters to extract the correct edges because images would have different lighting.

## Accomplishments that we're proud of
We’re really proud of our backend—particularly the computer vision aspect. In such a short amount of time, we were able to implement a fairly accurate algorithm to detect parallel parking spots from raw camera data alone. We’re also extremely proud of all other aspects of our project as well. From the clean, friendly user interface to the efficient and powerful backend, each part of this project is the result of our team members’ hard work and dedication.

## What we learned
From this project, we each gained extremely valuable experience in the respective areas we worked on. We utilized many different client and server libraries, including Google Maps, Geocoding, and OpenCV, to accomplish the many different tasks our project had to perform. In addition, we were also able to figure out what is and isn’t practical for a hackathon project, and we had to cut some aspects out because they either weren’t feasible for the demo or were too complex to implement in such a short timespan. Lastly, we were able to see things from an end-user’s perspective and leverage that to fine-tune the friendliness and usability of our user interface.

## What's next for ParkMe
Although our implementation is far from perfect, our team truly believes that this idea can be useful to anyone who regularly drives around in a city. We hope to continue this project after HackMIT, and we have many more features in mind, including support for both specialized and general handicap-friendly spots, dashcam and meter integration, and integration with navigation apps such as Waze or Google Maps.
