import { environment } from "../environments/environment";
import { Iconcert } from "../models/concert.interface";
import { IconcertCreate } from "../models/concertCreate.interface";

export default class HttpRequests {
    static async getData(endpoint: string) {
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        })
        if (!response.ok){
            throw new Error("Unknown error ocurred")    
        }
        else {
            const result: Iconcert[] = await response.json();
            return result;
        }
        
    }

    static async createData(endpoint: string, data: IconcertCreate){
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok){
            const result = await response.json();
            throw new Error(result.message || "Unknown error occurred");
        }
        else {
            return await response.json();
        }
    }

    static async updateData(endpoint: string, data: object, id: number){
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        if (!response.ok){
            throw new Error(result.message || "Unknown error occurred");
        }
        else {
            return result;
        }
    }

    static async deleteData(endpoint: string, id: number){
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        })

        const result = await response.json();
        if (!response.ok){
            throw new Error(result.message || "Unknown error occurred");
        }
        else {
            return result;
        }
    }
}