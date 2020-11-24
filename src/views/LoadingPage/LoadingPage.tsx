import React from 'react';
import { Container, Spinner } from 'reactstrap';
import { NavBar } from '../../components/NavBar/NavBar';

/**
 * @function
 * loading page to display before user is routed to client or admin page
 * @param props 
 */
const LoadingPage:React.FC<any> = (props:any) => {
    return(
        <Container style={{minHeight: "100vh", maxWidth: "100vw"}}>
            <NavBar></NavBar>
            <div style={{ marginTop: "30px",textAlign: "center" }}>
                <Spinner color="primary"/>
            </div>
        </Container>
    );
}

export default LoadingPage;