import { UnsplashUser } from "@/models/unsplash-image";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps{
    params: {username: string};
}

async function getUser(username: string):Promise<UnsplashUser> {
    const response= await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    return response.json();
}

export async function generateMetadata({params: {username}}: PageProps): Promise<Metadata>{
    const user = await getUser(username)
    return{
        // title: user.first_name + user.last_name
        title: [user.first_name , user.last_name].filter(Boolean).join(" ") || user.username + " - NextJS 14 Image Gallery",
    }
}
const page = async ({params: {username}}: PageProps) => {
    const result = await getUser(username);
    
    return (
        <div>
            <h1>{result.username}</h1>
            <p>First name: {result.first_name}</p>
            <p>Last name: {result.last_name}</p>
            <Link href={`http://unsplash.com/`+ result.username}>Unsplash Profile</Link>
        </div>
    );
}

export default page;
