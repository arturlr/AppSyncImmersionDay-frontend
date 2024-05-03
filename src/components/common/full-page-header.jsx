import { useState } from "react";
import CreateBookForm from '../createBookForm';
import { Header, Alert, Button, Modal, SpaceBetween } from '@cloudscape-design/components';

export function FullPageHeader({
    title = "Books",
    createButtonText,
    selectedItemsCount = 0,
    showAlert = false,
    showActions = false,
    alertStatus = {type: "info", message: "None"},
    ...props
}) {
    const [visible, setVisible] = useState(false);
    const [localShowAlert, setLocalShowAlert] = useState(false);
    const [localAlertStatus, setLocalAlertStatus] = useState({type: "info", message: "None"});
    
    const onSuccessHandler = (apiRes) => {
        setLocalShowAlert(true);
        setVisible(false);
        setLocalAlertStatus({type: "success", message: `${apiRes.title} successfully added!`});
    };

    const onErrorHandler = (errMessage) => {
        setLocalShowAlert(true);
        setVisible(false);
        setLocalAlertStatus({type: "error", message: errMessage});
    };

    const localClose = (e) => {
        e.preventDefault();
        setLocalShowAlert(false);
    };

    return (
        <>
            <SpaceBetween size="m">
                <Header 
                    variant="awsui-h1-sticky"
                    actions={
                            (showActions)
                            ?   <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="primary" onClick={() => setVisible(true)}>{createButtonText}</Button>
                                </SpaceBetween>
                            : null
                        }
                    {...props}
                >
                    {title}
                </Header>
                {showAlert
                ? <Alert type={alertStatus.type} dismissible={true} onDismiss={props.handler}>{alertStatus.message}</Alert>
                : null
                }
                {localShowAlert
                ? <Alert type={localAlertStatus.type} dismissible={true} onDismiss={localClose}>{localAlertStatus.message}</Alert>
                : null
                }
            </SpaceBetween>
            <Modal
                onDismiss={() => setVisible(false)}
                visible={visible}      
                closeAriaLabel="Close modal"
                header={createButtonText}
                modalRoot={document.getElementById('top-nav')}
            >
                <CreateBookForm onSuccess={onSuccessHandler} onError={onErrorHandler} isVisible={visible}/>
            </Modal>
        </>
    );
}