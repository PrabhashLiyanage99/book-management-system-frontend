"use client";

import { ApolloClient, InMemoryCache, ApolloCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

export function Providers({ children }: { children: React.ReactNode}) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}