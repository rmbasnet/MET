import React from 'react'

function ArtCard({ artwork, index }) {
    return (
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
    )
}

export default ArtCard