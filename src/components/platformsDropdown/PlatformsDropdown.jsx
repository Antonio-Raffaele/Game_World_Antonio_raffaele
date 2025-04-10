import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import styles from "./PlatformsDropdown.module.css";

export default function PlatformsDropdown() {
    const initialUrl = `https://api.rawg.io/api/platforms?key=ed7b95eb8af6434283c6c6f7dc948c58`;
    const { data, error, updateUrl } = useFetchSolution(initialUrl);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        updateUrl(initialUrl);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        // DROPDOWN PER MOBILE
        return (
            <div className="mt-3 d-flex justify-content-center">
                <Dropdown>
                    <Dropdown.Toggle className={styles.btnDrop}>Piattaforme</Dropdown.Toggle>

                    <Dropdown.Menu>
                        {data && data.results.length > 0 ? (
                            data.results.map((platform) => (
                                <Dropdown.Item
                                    as={Link}
                                    to={`/platforms/${platform.id}`}
                                    key={platform.id}
                                    className="d-flex align-items-center"
                                >
                                    {platform.name}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <Dropdown.Item disabled>Nessuna piattaforma</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }

    // DROPDOWN DESKTOP
    return (
        <div className="mt-3">
            {error && <p className="text-danger">{error}</p>}
            <ul className={styles.platformList}>
                {data && data.results.length > 0 ? (
                    data.results.map((platform) => (
                        <li key={platform.id} className={styles.platformItem}>
                            <Link to={`/platforms/${platform.id}`} className={styles.platformLink}>
                                {platform.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className={styles.platformItem}>Nessuna piattaforma</li>
                )}
            </ul>
        </div>
    );
}
