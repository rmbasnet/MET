import React, { useEffect, useState } from 'react';
import './Home.css';
import { getObjectIds, getObjectDetails } from '../api';

function Home() {
    const [objectIds, setObjectIds] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [artworkCount] = useState(10); // Set to 5-10 as needed

    // Check if it's a new day (returns true if it's time to refresh)
    const isNewDay = () => {
        const lastFetchDate = localStorage.getItem('lastArtFetchDate');
        const today = new Date().toDateString(); // e.g., "Mon May 20 2024"

        if (!lastFetchDate || lastFetchDate !== today) {
            localStorage.setItem('lastArtFetchDate', today);
            return true; // New day → fetch new art
        }
        return false; // Same day → use cached art
    };

    useEffect(() => {
        const fetchArtData = async () => {
            try {
                setLoading(true);

                // Check if we need to fetch new data (new day) or use cached
                const cachedArt = localStorage.getItem('dailyArtworks');
                const shouldRefresh = isNewDay();

                if (!shouldRefresh && cachedArt) {
                    setArtworks(JSON.parse(cachedArt));
                    setLoading(false);
                    return;
                }

                // Fetch new artworks if it's a new day
                const idsResponse = await getObjectIds();
                if (idsResponse.objectIDs?.length > 0) {
                    const shuffled = [...idsResponse.objectIDs].sort(() => 0.5 - Math.random());
                    const selectedIds = shuffled.slice(0, artworkCount);

                    const artworkPromises = selectedIds.map(id => getObjectDetails(id));
                    const artworkResults = await Promise.all(artworkPromises);

                    const validArtworks = artworkResults.filter(art =>
                        art.primaryImage && art.primaryImage !== ''
                    );

                    // Cache the new artworks
                    localStorage.setItem('dailyArtworks', JSON.stringify(validArtworks));
                    setArtworks(validArtworks);
                }
            } catch (err) {
                console.error("Failed to fetch art data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtData();
    }, [artworkCount]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="art-gallery">
            <h1>Metropolitan Museum Art Collection</h1>
            <div className="art-grid">
                {/* ART CARD */}
                {artworks.length > 0 ? (
                    artworks.map((artwork, index) => (
                        <a href={artwork.objectURL} className='linkReference'>
                            <div key={index} className="art-card">
                                {artwork.primaryImage ? (
                                    <img
                                        src={artwork.primaryImage}
                                        alt={artwork.title || "Artwork"}
                                        className="art-image"
                                    />
                                ) : (
                                    <div className="no-image">No Image Available</div>
                                )}
                                <div className="art-info">
                                    <h3>{artwork.title || "Untitled"}</h3>
                                    <p>{artwork.artistDisplayName || "Artist unknown"}</p>
                                    <p>{artwork.objectDate || "Date unknown"}</p>
                                    {artwork.department && <p>Department: {artwork.department}</p>}
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <p>No artworks found with images</p>
                )}
            </div>
        </div>
    );
}

export default Home;