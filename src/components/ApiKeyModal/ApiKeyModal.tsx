import {Modal, Button} from 'react-bootstrap';
import {MouseEventHandler} from "react";

interface ApiKeyProps {
    show: boolean,
    onChangeInput: Function,
    handleClose: MouseEventHandler
}

export function ApiKeyModal(props: ApiKeyProps) {
    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Title className="m-2">
            Kérlek add meg az API kulcsodat!
        </Modal.Title>
        <Modal.Body>
            <input type="text" onChange={(c) => props.onChangeInput(c.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={props.handleClose}>Lekérdezés</Button>
        </Modal.Footer>
    </Modal>;
}
