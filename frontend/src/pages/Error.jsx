import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

export default function ErrorPage() {
    const error = useRouteError();

    let title = 'An Error Occurred!!';
    let message = 'Someothing Went Wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        // wrong route
        title = 'Not Found!';
        message = 'Could not find resource or page';
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}