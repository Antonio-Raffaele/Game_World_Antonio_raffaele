import { Col, Container, Row } from "react-bootstrap";
import GenresDropdown from "../genresDropdown/GenresDropdown";
import styles from "./Sidebar.module.css";
import PlatformsDropdown from "../platformsDropdown/PlatformsDropdown";

export default function Sidebar() {
    return (
        <Container fluid className={` ${styles.sidebarWrapper}`}>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <h5>Categorie</h5>
                </Col>

                <Col xs={12}>
                    <GenresDropdown />
                </Col>

                <Col xs={12} className="d-flex mt-5 justify-content-center">
                    <h5>Piattaforme</h5>
                </Col>

                <Col xs={12} className="flex-column sidebar-wrapper p-3">
                    <PlatformsDropdown />
                </Col>
            </Row>
        </Container>
    )
}

