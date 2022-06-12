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
    .catch(error => console.log(dataset))
};
