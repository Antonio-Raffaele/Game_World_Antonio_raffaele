import { Container } from "react-bootstrap";
import { Link } from "react-router";
import styles from "../error/Error.module.css";

export default function ErrorPage() {
    return (
        <Container fluid className={styles.errorPageContainer}>
            <div>
                <h1 className={styles.errorTitle}>Ops...</h1>
                <p className={styles.errorText}>
                    Sembra che qualcosa sia andato storto. Torna alla homepage o prova più tardi.
                </p>
                <Link to="/" className={styles.homeLink}>
                    Torna alla Home
                </Link>
            </div>
        </Container>
    )
}

