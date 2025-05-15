import React, { useEffect, useState } from 'react';
import './Home.css';
import { getObjectIds, getObjectDetails } from '../api';
import ArtCard from './ArtCard';

function Home() {
    const [objectIds, setObjectIds] = useState([]);
    const [artData, setArtData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtData = async () => {
            try {
                setLoading(true);

                // First, get a list of object IDs
                const idsResponse = await getObjectIds();
                setObjectIds(idsResponse.objectIDs || []);

                // Then select a random ID from the list
                if (idsResponse.objectIDs && idsResponse.objectIDs.length > 0) {
                    const randomIndex = Math.floor(Math.random() * idsResponse.objectIDs.length);
                    const randomObjectId = idsResponse.objectIDs[randomIndex];

                    // Get details for the random object
                    const details = await getObjectDetails(randomObjectId);
                    setArtData(details);
                }
            } catch (err) {
                console.error("Failed to fetch art data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='firstDiv'>
            {artData ? (
                <>
                    {artData.primaryImage ? (
                        <img src={artData.primaryImage} alt={artData.title || "Artwork"} />
                    ) : (
                        <p>No Image Available</p>
                    )}
                    <h2>{artData.title || "Untitled"}</h2>
                    <p>{artData.artistDisplayName || "Artist unknown"}</p>
                    <p>{artData.objectDate || "Date unknown"}</p>
                </>
            ) : (
                <p>No artwork data available</p>
            )}
        </div>
    );
}

export default Home;