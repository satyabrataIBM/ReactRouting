import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

export default function Newsletter(){
    return(
        <PageContent title="Join our awesome newsletter!">
            <NewsletterSignup />
        </PageContent>
    );
}

export async function action({request}){
    const data = await request.formData();
    const email = data.get('email');

    console.log(email);
    return { message: 'Signup Successfull!'};
}