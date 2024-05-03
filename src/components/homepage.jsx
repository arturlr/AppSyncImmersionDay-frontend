import { useRef } from 'react';
import { ContentLayout, Container, TextContent, Grid, SpaceBetween } from "@cloudscape-design/components";

import logo from '../imgs/homepage-logos.png'
import { FullPageHeader } from './common/full-page-header';
import { CustomAppLayout } from './common/common-components';

function Homepage(props) {
    return (
        <ContentLayout
            header={
                <FullPageHeader
                    title={"Welcome to AnyCompany Reads!"}
                    showAlert={props.showAlert}
                    alertStatus={props.alertStatus}
                    handler={props.handler}
                />
            }
        >
            <Container>
                <SpaceBetween size="xxl">
                    <center>
                        <img src={logo} alt={"Homepage"} />
                    </center>
                    <hr style={{ "opacity": "0.3" }} />
                    <Grid
                        gridDefinition={[
                            { colspan: 4 },
                            { colspan: 4 },
                            { colspan: 4 }
                        ]}
                    >
                        <TextContent>
                            <p style={{ "fontSize": "16px" }}>AnyCompany Reads is a fictitious website where users can discover books and authors, explore book reviews by fellow users, and recommend books to friends!</p>
                        </TextContent>
                        <TextContent>
                            <p style={{ "fontSize": "16px" }}>The frontend was built using the React framework and Cloudscape and Amplify user interface (UI) design libraries. The backend is powered by AWS services including AWS AppSync, Amazon Cognito, Amazon DynamoDB, and more!</p>
                        </TextContent>
                        <TextContent>
                            <p style={{ "fontSize": "16px" }}> AWS Amplify Hosting is used to host the website and provides Continuous Integration/Continuous Deployment (CI/CD) capabilities for quickly testing and deploying changes.</p>
                        </TextContent>
                    </Grid>
                    <hr style={{ "opacity": "0.3" }} />
                </SpaceBetween>
            </Container>
        </ContentLayout>
    );
};

export default function HomepageView(props) {
    const appLayout = useRef();
    return (
        <CustomAppLayout
            ref={appLayout}
            activeHref={'/'}
            content={
                <Homepage {...props} />
            }
            contentType="default"
            stickyNotifications={true}
        />
    );
};