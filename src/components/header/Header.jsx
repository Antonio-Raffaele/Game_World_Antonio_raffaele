import { Col, Container, Row } from "react-bootstrap";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={`w-100 ${styles.imgHeader}`}>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <h1 className={`${styles.colorSec} ${styles.title}`}>Benvenuto Gamer</h1>
                        <h3 className={`${styles.colorSec} ${styles.title}`}>Esplora tutte le nostre novità</h3>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}