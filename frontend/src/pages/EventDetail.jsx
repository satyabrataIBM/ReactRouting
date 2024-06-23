import { Suspense } from "react";
import { 
    Await,
    // useParams, Link,
    defer, json,
    redirect,
    useRouteLoaderData, 
    } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetail(){
    // const params = useParams(); // to get id from route
    const {event} = useRouteLoaderData('event-detail'); // from loader of parent route
    
    return(
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent)=> <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
        </>
    );
}

const loadEvent = async (id) => {
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if(!response.ok){
        throw json({message: 'Could not fetch details for selected event.'},
            {status: 500}
        )
    }else{
        const resData = await response.json();
        return resData.event;
    }
}

export async function loader({request, params}){
    const id = params.eventID;
    return defer({
        event: await loadEvent(id)
    })
}

export const action = async({params, request}) => {
    const id = params.eventID;
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: request.method
    })

    if(!response.ok){
        throw json({message: 'Could not delete event.'}, { status: 500 })
    }

    return redirect('/events');

} 