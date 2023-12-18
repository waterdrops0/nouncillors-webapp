"use client"
export const fetchProof = async (address) => {
    if (!address) {
        throw new Error("Address is required to fetch proof");
    }

    try {
        const response = await fetch(`/api/getProof?address=${encodeURIComponent(address)}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.proof;
    } catch (error) {
        console.error('Error fetching Merkle Proof:', error);
        throw error; 
    }
};
