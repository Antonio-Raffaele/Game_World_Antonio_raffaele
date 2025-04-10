import { Outlet } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/sidebar/Sidebar";

export default function Layout() {
    return (
        <Container fluid className="layout-wrapper" data-bs-theme="dark">

            <Row>
                <Col>
                    <Navbar />
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={3} lg={2}>
                    <Sidebar />
                </Col>
                <Col xs={12} md={9} lg={10}>
                    <Outlet />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </Container>
    );
}



