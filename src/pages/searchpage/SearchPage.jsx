import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CardGame from "../../components/CardGame";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=ed7b95eb8af6434283c6c6f7dc948c58&search=${game}`;

    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

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
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center my-4">Risultati per: {game}</h1>
                    {error && <p className="text-danger text-center">{error}</p>}
                </Col>
            </Row>

            <Row className="justify-content-center">
                {data && data.results.map((game) => (
                    <Col
                        key={game.id}
                        xs={12} sm={6} md={4} lg={3}
                        className="mb-4 d-flex justify-content-center"
                    >
                        <CardGame game={game} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

