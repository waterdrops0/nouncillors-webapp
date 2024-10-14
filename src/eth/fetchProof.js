"use client";

export const fetchProof = async (address) => {
  if (!address) {
    throw new Error("Address is required to fetch proof");
  }

  try {
    const response = await fetch(
      `/api/getProof?address=${encodeURIComponent(address)}`
    );
    const data = await response.json();

    if (!response.ok) {
      // Throw an error with the message from the response
      throw new Error(data.error || `Error: ${response.status}`);
    }

    return data.proof;
  } catch (error) {
    console.error("Error fetching Merkle Proof:", error.message);
    throw error;
  }
};
