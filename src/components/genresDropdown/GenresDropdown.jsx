import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router"; 
import useFetchSolution from "../../hook/useFetchSolution";
import styles from "./GenresDropdown.module.css";

export default function GenresDropdown() {

    const initialUrl = `https://api.rawg.io/api/genres?key=ed7b95eb8af6434283c6c6f7dc948c58`;

    const { data, error, updateUrl } = useFetchSolution(initialUrl);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        updateUrl(initialUrl);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        // DROPDOWN PER MOBILE
        return (
            <div className=" mt-3 d-flex justify-content-center">
                <Dropdown>
                    <Dropdown.Toggle className={styles.btnDrop} id="dropdown-basic">
                        Generi
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {data && data.results.length > 0 ? (
                            data.results.map((genre) => (
                                <Dropdown.Item
                                    as={Link}
                                    to={`/games/${genre.slug}`}
                                    key={genre.id}
                                    className="d-flex align-items-center"
                                >
                                    <img
                                        src={genre.image_background}
                                        alt={genre.name}
                                        style={{ width: '24px', height: '24px', marginRight: '10px' }}
                                    />
                                    {genre.name}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <Dropdown.Item disabled>Nessun genere disponibile</Dropdown.Item>
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
            <ul className={styles.genreList}>
                {data && data.results.length > 0 ? (
                    data.results.map((genre) => (
                        <li key={genre.id} className={styles.genreItem}>
                            <Link to={`/games/${genre.slug}`} className={styles.genreLink}>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={genre.image_background}
                                        alt={genre.name}
                                        style={{ width: '24px', height: '24px', marginRight: '10px' }}
                                    />
                                    {genre.name}
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className={styles.genreItem}>Nessun genere disponibile</li>
                )}
            </ul>
        </div>
    );
}