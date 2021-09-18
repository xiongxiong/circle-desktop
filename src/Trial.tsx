import styled from "styled-components";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from "react";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export const Trial = () => {

    const [showDialog, setShowDialog] = useState(false);

    const renderFooter = () => (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setShowDialog(false)} autoFocus />
        </div>
    );

    return (
        <Container>
            <Button label="Show" icon="pi pi-external-link" onClick={() => setShowDialog(true)} />
            <Dialog header="Header To" visible={showDialog} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowDialog(false)}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Dialog>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`