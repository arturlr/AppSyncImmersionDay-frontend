import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom"
import { API } from '@aws-amplify/api';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getBook } from '../graphql/queries';

import { CustomAppLayout } from './common/common-components';
import ContentLayout from "@cloudscape-design/components/content-layout";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import Badge from "@cloudscape-design/components/badge";
import Grid from "@cloudscape-design/components/grid";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";

function BookDetail(props) {
    const { user } = useAuthenticator((context) => [context.user]);
    const [bookData, setBookData] = useState({genres: []});

    useEffect(() => {
        async function getBookDetails(id) {
            const bookData = await API.graphql({
                query: getBook,
                variables: {
                    id: id
                }
            });

            setBookData(bookData.data.getBook);
        };

        getBookDetails(props.id);
    }, [props.id]);

    const ValueWithLabel = ({ label, children }) => (
        <div>
            <Box variant="awsui-key-label">{label}</Box>
            <div>{children}</div>
        </div>
    );

    return (
        <ContentLayout
            header={
                <SpaceBetween size="m">
                    <Header
                        variant="h1"
                        actions={
                            (user !== undefined)
                            ?
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="primary">Recommend</Button>
                                    <Button variant="primary">Review</Button>
                                </SpaceBetween>
                            : null
                        }
                    >{bookData?.title}</Header>
                </SpaceBetween>
            }
        >
            <Container>
                <Grid gridDefinition={[{colspan: 3}, {colspan: 9}]}>
                    <img src={bookData.image} alt={bookData.img} width="80%" heigh="80%"/>
                    <ValueWithLabel label="Description">
                        <p>{bookData?.description}</p>
                    </ValueWithLabel>
                </Grid>
                <ColumnLayout columns={2} variant="text-grid">
                    <SpaceBetween size="l">
                        <ValueWithLabel label="Author ID">{bookData.authorId}</ValueWithLabel>
                        <ValueWithLabel label="Publication Year">{bookData.publicationYear}</ValueWithLabel>
                    </SpaceBetween>
                    <SpaceBetween size="l">
                        <ValueWithLabel label="Publisher ID">{bookData.publisherId}</ValueWithLabel>
                        <ValueWithLabel label="Genres">
                            <SpaceBetween direction="horizontal" size="xs">
                                {bookData.genres?.map(genre => {
                                    return <Badge color="blue" key={`${props.id}-${genre}`}>{genre}</Badge>
                                })}
                            </SpaceBetween>
                        </ValueWithLabel>
                    </SpaceBetween>
                </ColumnLayout>
            </Container>
        </ContentLayout>
    );
}

export default function BookDetailView(props) {
    const appLayout = useRef();
    const { id } = useParams();

    return (
        <CustomAppLayout
            ref={appLayout}
            activeHref={`/books/${id}`}
            content={
                <BookDetail id={id} {...props} />
            }
            stickyNotifications={true}
        />
    );
};