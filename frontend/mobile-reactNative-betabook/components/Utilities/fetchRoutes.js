import React from 'react'

export async function fetchRoutes(userToken) {
    const authToken = "Token " + userToken;
    
    const response = await fetch('http://127.0.0.1:8000/api/routes/',{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": authToken
          }
        }
      )

    return await response.json()
}

