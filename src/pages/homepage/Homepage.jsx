import { Container, Row, Col, Spinner } from "react-bootstrap";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Header from "../../components/header/Header";
import styles from "../homepage/Homepage.module.css";

export default function Homepage() {

    const initialUrl = `https://api.rawg.io/api/games?key=ed7b95eb8af6434283c6c6f7dc948c58&dates=2024-01-01,2024-12-31&page=1`;

    const { data, loading, error } = useFetchSolution(initialUrl);

    if (loading) {
        return (
            <Container fluid className="mainContent mt-5 text-center">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Sto caricando i dati</span>
                    </Spinner>
                    <p className="mt-3">Sto caricando i dati...</p>
                </Col>
            </Row>
        </Container>
        );
    }

    return (
        <Container fluid className="mainContent py-4">
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>

            <Row className="my-4">
                <Col>
                    <h1 className={`text-center ${styles.homeTitle}`}>Libreria dei giochi</h1>
                    {error && <p className="text-danger text-center">{error}</p>}
                </Col>
            </Row>

            <Row className="justify-content-center">
                {data && data.results.map((game) => (
                    <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                        <CardGame game={game} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}