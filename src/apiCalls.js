import { errorBox, updateData, messageBox } from "./scripts.js";

let apiTravelerData, apiTripData, apiDestinationData;

export const getAll = () => {
  apiTravelerData = getData("travelers");
  apiDestinationData = getData("destinations");
  apiTripData = getData("trips");
  return Promise.all(
    [
      apiTravelerData,
      apiDestinationData,
      apiTripData,
    ]
  );
};

const getData = (dataset) => {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then(response => response.json())
    .catch(error => {
      console.warn(error);
      errorBox.innerText = "Sorry, something went wrong with the connection! Please try again.";
    });
};

export const postTrip = (trip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: "POST",
    body: JSON.stringify({
        id: trip.id,
        userID: trip.userID,
        destinationID: trip.destinationID,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities
      }),
    headers: { "Content-type": "application/json" },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Please make sure all fields are filled out.");
      } else {
        messageBox.innerText = "Your trip has been submitted! Please wait for decision from travel agent.";
        return response.json();
      };
    })
    .then(() => updateData())
    .catch(error => {
      console.warn(error.message);
      if (error.message === "Failed to fetch") {
        return messageBox.innerText = "OOPS, something went wrong with the connection! Please try again.";
      } else {
        return messageBox.innerText = error.message;
      };
    })
};
