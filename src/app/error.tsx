"use client"

import Link from "next/link";

const Error = () => {
    return (
        <div>
            <h1>Error</h1>
            <p>Something went wrong</p>
            return to <Link href="/">Home</Link>
        </div>
    );
}

export default Error;