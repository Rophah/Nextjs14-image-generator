"use client"
import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react"
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
    
    const [searchResult, setSearchResult] = useState<UnsplashImage[] | null>(null);
    const [searchResultLoading,setSearchResultLoading] = useState(false);
    const [searchResultLoadingError,setsearchResultLoadingError] = useState(false);
 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();
        
        try{
            if(query){
            setSearchResult(null);
            setSearchResultLoading(true);
            setsearchResultLoadingError(false);
            const response = await fetch(`api/search?query=`+query);
            const image: UnsplashImage[] = await response.json();
            setSearchResult(image)
        }
        }catch (error){
            console.error(error);
            setsearchResultLoadingError(true);
        }finally{
            setSearchResultLoading(false)
        }    
    }

    return (
        <div>
            <Alert>
                This page fetches data <strong>client-side.</strong> In order to not leak <strong>API credentials</strong>, the request is sent to a NextJS <strong>route handler</strong> that runs on the server. This route handler then fetches the data from the Unsplash API and returns it to the client.
            </Alert>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search.input">
                    <Form.Label>Search query</Form.Label>
                    <Form.Control name="query" placeholder="e.g cats, hotdogs, ..." />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultLoading}>Search</Button>
            </Form>

            <div className="d-flex flex-column align-items-container">
                {searchResultLoading && <Spinner animation="border"/>}
                {searchResultLoadingError && <p>Something went wrong. Please try again later</p>}
                {searchResult?.length === 0 && <p>Nothing found. Try a different query</p>}
            </div>

            {
                searchResult && searchResult.map(result=>(
                    <Image src={result.urls.raw} height={250} width={250} alt={result.description} key={result.urls.raw} className={styles.image}/>
                ))
            }
        </div>
    );
}

export default SearchPage;