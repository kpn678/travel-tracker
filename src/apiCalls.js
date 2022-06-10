let apiTravelerData, apiTripData, apiDestinationData;

export const getAll = () => {
  apiTravelerData = getData("travelers");
  apiTripData = getData("trips");
  apiDestinationData = getData("destinations");
  return Promise.all(
    [
      apiTravelerData,
      apiTripData,
      apiDestinationData,
    ]
  );
};

const getData = (dataset) => {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then(response => response.json())
    .catch(error => console.log(dataset))
};
