import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import { Header, Footer, Books, BookDetail, Homepage } from "./components";

export default function App() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState({
        type: 'success',
        message: "Success!" 
    });

    const dismissHandler = (e) => {
        e.preventDefault();
        setShowAlert(false);
    };

    return (
        <Authenticator.Provider>
            <Router>
                <Header alertCallback={(show, type, msg) => {
                    setShowAlert(show); 
                    setAlertStatus({type: type, message: msg});
                }}/>
                <Routes>
                    <Route path="/" element={<Homepage showAlert={showAlert} alertStatus={alertStatus} handler={dismissHandler}/>} />
                    <Route path="/books" element={<Books showAlert={showAlert} alertStatus={alertStatus} handler={dismissHandler}/>} />
                    <Route path="/books/:id" element={<BookDetail />} />
                </Routes>
                <Footer />
            </Router>
        </Authenticator.Provider>
    );
};
