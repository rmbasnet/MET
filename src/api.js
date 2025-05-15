const API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const getObjectIds = async () => {
    const response = await fetch(`${API_BASE}/objects`);
    if (!response.ok) {
        throw new Error('Failed to fetch object IDs');
    }
    return response.json();
};

export const getObjectDetails = async (objectId) => {
    const response = await fetch(`${API_BASE}/objects/${objectId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch details for object ${objectId}`);
    }
    return response.json();
};