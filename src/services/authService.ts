import { gql } from '@apollo/client';
import client from './providers';

const VALIDATE_TOKEN = gql`
 query ValidateToken {
    validateToken
 }`;

 export const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const { data } = await client.query({
            query: VALIDATE_TOKEN,
            context: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            fetchPolicy: "no-cache",
        });
        return data.validateToken;
    } catch (error) {
        console.error("Error validating token:", error);
        return false;
    }
 };