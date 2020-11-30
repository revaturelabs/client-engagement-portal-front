import React from 'react';
import { Container, Spinner } from 'reactstrap';
import { NavBar } from '../../components/NavBar/NavBar';

/**
 * @function
 * loading page to display before user is routed to client or admin page
 * @param props 
 */
const LoadingPage: React.FC<any> = (props: any) => {
    return (
        <Container style={{ minHeight: "100vh", maxWidth: "100vw" }}>
            <NavBar></NavBar>
            <div style={{ marginTop: "30px", textAlign: "center", color: "#f26925" }}>
                <Spinner style={{ width: '6rem', height: '6rem' }} />

            </div>
            <div style={{ marginTop: "40px", textAlign: "center", color: "#f26925", fontSize: "large" }} >
                <p>{'Loading...'}</p>
            </div>
        </Container>
    );
}

export default LoadingPage;