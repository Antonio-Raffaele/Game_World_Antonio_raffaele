import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CardGame from "../../components/CardGame";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=ed7b95eb8af6434283c6c6f7dc948c58&search=${game}`;

    const {loading, data, error, updateUrl} = useFetchSolution(initialUrl);

    useEffect(() =>{
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    if (loading) {
        return (
            <div className="container text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Sto caricando i dati</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container fluid className="mainContent">
            <h1 className="text-center my-4">Risultati per: {game}</h1>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                {data && data.results.map((game) => (
                    <Col key={game.id} xs={12} sm={6} md={6} lg={4} className="mb-4">
                        <CardGame game={game} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}