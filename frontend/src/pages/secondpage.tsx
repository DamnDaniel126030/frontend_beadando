import HttpRequests from "../services/httpRequest.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconcertCreate } from "../models/concertCreate.interface";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SecondPage(){
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState<IconcertCreate>(
        {
            performer: "",
            duration: 0,
            startTime: new Date()
        }
    )


    function setValues(e: React.ChangeEvent<HTMLInputElement>, name: string){
        setConcertData({
            ...concertData,
            [name]: e.target.value
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newConcert: IconcertCreate = {
            performer: concertData.performer,
            duration: concertData.duration,
            startTime: new Date(concertData.startTime)
        }

        try {
            const response = await HttpRequests.createData("koncertek", newConcert);
            if (!response.ok){
                console.log("An error ocurred while creating data");
            } else {
                navigate("/firstpage")
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="performer" className="form-label">Fellépő neve</label>
                    <input type="text" className="form-control" id="performer" required placeholder="Fellépő" onChange={(value) => setValues(value, "performer")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Koncert időtartama</label>
                    <input type="text" className="form-control" id="duration" required placeholder="Időtartam" onChange={(value) => setValues(value, "duration")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">Kezdés ideje</label>
                    <input type="text" className="form-control" id="startTime" required placeholder="Kezdési idő" onChange={(value) => setValues(value, "startTime")}/>
                </div>
                <button type="submit" className="btn btn-info">Hozzáadás</button>
                <button type="button" className="btn btn-secondary"><Link to="/firstpage">Koncertek</Link></button>
            </form>
        </>
    )
}