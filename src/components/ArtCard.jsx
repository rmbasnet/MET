import React, { useEffect, useState } from 'react'
import './ArtCard.css'
import { getData } from '../api';

function ArtCard() {
    const [data, setData] = useState('');
    const objectID = Math.floor(Math.random() * 100000);
    // console.log(objectID)
    // const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    // const response = await fetch(url);
    // const data = await response.json();

    // setData({
    //     primaryImage: data.primaryImage,
    // });
    // console.log(data)

    useEffect(() => {
        const getArt = async () => {
            try {
                const artInformation = await getData()
                setData(artInformation)
            } catch (err) {
                console.log(err)
            }
        }
        getArt();
        // fetchData(objectID);
    }, [])


    return (
        <>
            <div className='firstDiv'>
                {data.primaryImage != '' ? <img src={data.primaryImage} alt="" /> : <p>No Image Found</p>}

            </div>
        </>
    )
}

export default ArtCard