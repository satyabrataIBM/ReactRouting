import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";
import { useEffect, useRef } from "react";

export default function NewsletterSignup(){
    const fetcher = useFetcher();
    const { data, state } = fetcher;
    const email = useRef();

    useEffect(()=>{
        if(state === 'idle' && data && data.message){
            window.alert(data.message);
            email.current.value = '';
        }
    },[data, state])

    return(
        <fetcher.Form
            method="post"
            action="/newsletter"
            className={classes.newsletter}
        >
            <input type="email" ref={email}
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"/>
            <button>Sign Up</button>
        </fetcher.Form>
    );
}