import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import Modal from "@cloudscape-design/components/modal";
import TopNavigation from "@cloudscape-design/components/top-navigation";

import logo from '../imgs/book-logo.png';
import { GenerateBooks } from '../utils/generator';

export default function Header(props) {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [visible, setVisible] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (user?.signInUserSession!==null) {
            setVisible(false);
        }
    }, [user]);

    const handleUserProfileAction = (event) => {
        if (event.detail.id === 'signout' && user !== undefined) {
            signOut();
        } else if (event.detail.id === 'signout' && user === undefined) {
            setVisible(true);
        }
    };

    async function generateData(e) {
        e.preventDefault();
        switch (e.detail.id) {
            case 'generate-books':
                props.alertCallback(true, 'info', 'Generating books! Stay on the page while books are added to the library.');
                const response = await GenerateBooks();
                if (response.total === response.success) {
                    props.alertCallback(true, 'success', `${response.success} / ${response.total} added successfully! Refresh the window to see the library.`);
                } else {
                    props.alertCallback(true, 'error', `Some books were not added successfully. ${response.errors} / ${response.total} resulted in errors. Refresh the window to see the library.`);
                }
                break;
            default:
                break;
        };
    };

    return (
        <div id="top-nav">
            <TopNavigation
                identity={{
                    title: "AnyCompany Reads",
                    href: "/",
                    onFollow: function(e) {
                        e.preventDefault();
                        navigate('/');
                    },
                    logo: { 
                        src: logo,
                        alt: 'AnyCompany Reads'
                    }
                }}
                utilities={[
                    {
                        type: 'menu-dropdown', 
                        iconName: 'settings',
                        onItemClick: generateData,
                        items: [
                            {
                                id: "generate-books",
                                text: "Generate books"
                            }
                        ]
                    },
                    {
                        type: "menu-dropdown",
                        text: (user!==undefined) ? user?.username : "Profile",
                        iconName: "user-profile",
                        onItemClick: handleUserProfileAction,
                        items: [
                            { id: "signout", text: (user!==undefined) ? "Sign out" : "Sign in" }
                        ]
                    }
                ]}
                i18nStrings={{
                    overflowMenuTriggerText: "More",
                    overflowMenuTitleText: "All",
                    overflowMenuBackIconAriaLabel: "Back",
                    overflowMenuDismissIconAriaLabel: "Close menu"
                }}
            />
            <Modal
                onDismiss={() => setVisible(false)}      
                visible={visible}      
                closeAriaLabel="Close modal"
                header="Please sign in or create an account"
                modalRoot={document.getElementById('top-nav')}
            >
                <Authenticator variant="modal" signUpAttributes={["email"]} />
            </Modal>
        </div>
    );
};