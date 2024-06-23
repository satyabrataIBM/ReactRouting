import { Await, defer, json, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

export default function Event() {
    const { events } = useLoaderData(); // from loader of same route

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents)=> <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw json({
            message: 'Could not fetch events.'
        }, {
            status: 500
        })
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export const loader = () => {
    return defer({
        events: loadEvents(),
    })
}