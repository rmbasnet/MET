export const getData = async () => {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    // const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    const response = await fetch(url);
    const data = await response.json();
    return data.objectIDs
    // console.log(data)
}
