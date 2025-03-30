import { useEffect, useState } from "react";
import { Iconcert } from "../models/concert.interface";
import HttpRequests from "../services/httpRequest.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function FirstPage() {
    const [concertData, setConcertData] = useState<Iconcert[]>([])

    useEffect(() => {
        getConcertData()
    }, [])

    async function getConcertData(){
        try {
            const data = await HttpRequests.getData("koncertek");
            setConcertData(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateData(id: number){
        try {
            const response = await HttpRequests.updateData("koncertek", {isCancelled: true}, id);
            if (!response.ok){
                console.log("An error occurred while updating");
            } else {
                getConcertData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteData(id: number){
        try {
            const response = await HttpRequests.deleteData("koncertek", id);
            if (!response.ok){
                console.log("An error occurred while updating");
            } else {
                getConcertData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Fellépő</th>
                        <th>Időtartam</th>
                        <th>Kezdési idő</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        concertData.map((concert) => (
                            !concert.isCancelled ?
                            <tr key={concert.id}>
                                <td>{concert.performer}</td>
                                <td>{concert.duration}</td>
                                <td>{concert.startTime.toLocaleDateString()}</td>
                                <td><button className="btn btn-warning" onClick={() => updateData(concert.id)} type="button">Elmarad</button></td>
                                <td><button className="btn btn-danger" onClick={() => deleteData(concert.id)} type="button">Törlés</button></td>
                            </tr>
                            :
                            <tr key={concert.id} style={{backgroundColor: "crimson"}}>
                                <td>{concert.performer}</td>
                                <td>{concert.duration}</td>
                                <td>{concert.startTime.toLocaleDateString()}</td>
                                <td><button disabled type="button">Elmarad</button></td>
                                <td><button className="btn btn-danger" onClick={() => deleteData(concert.id)} type="button">Törlés</button></td>
                            </tr>
                        ))
                    }
                    <button type="button" className="btn btn-secondary"><Link to="/secondpage" >Új koncert felvétele</Link></button>
                </tbody>
            </table>
        </div>
    </>
    )
}