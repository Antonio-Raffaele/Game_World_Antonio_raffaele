import { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import styles from "./GenresDropdown.module.css";

export default function GenresDropdown() {
    
    const initialUrl = `https://api.rawg.io/api/genres?key=ed7b95eb8af6434283c6c6f7dc948c58`;
    
    const { data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, []);

    return (
        <Dropdown className="mainContent">
            <Dropdown.Toggle className={styles.btnDrop} id="dropdown-basic">
                Generi
            </Dropdown.Toggle>
            {error && <p className="text-danger">{error}</p>}

            <Dropdown.Menu>
                {data && data.results.length > 0 ? (
                    data.results.map((genre) => (
                        <Dropdown.Item as={Link} to={`/games/${genre.slug}`} key={genre.id}>
                            {genre.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>Nessun genere disponibile</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}


// import { useEffect } from "react";
// import { Link } from "react-router";
// import useFetchSolution from "../../hook/useFetchSolution";
// import { Nav } from "react-bootstrap";
// import styles from "./GenresList.module.css"

// export default function GenresList() {
    
//     const initialUrl = `https://api.rawg.io/api/genres?key=ed7b95eb8af6434283c6c6f7dc948c58`;
    
//     const { data, error, updateUrl } = useFetchSolution(initialUrl);

//     useEffect(() => {
//         updateUrl(initialUrl);
//     }, []);

//     return (
//         <Nav className="flex-column d-flex justify-content-center align-items-center">
//             <h3>Generi</h3>
//             {error && <p className="text-danger">{error}</p>}
            
//             {data && data.results.length > 0 ? (
//                 data.results.map((genre) => (
//                     <Nav.Item className={styles.navItem} key={genre.id}>
//                         <Nav.Link className={styles.navLink} as={Link} to={`/games/${genre.slug}`}>
//                             {genre.name}
//                         </Nav.Link>
//                     </Nav.Item>
//                 ))
//             ) : (
//                 <Nav.Item className={styles.navItem}>
//                     <Nav.Link className={styles.navLink} disabled>Nessun genere disponibile</Nav.Link>
//                 </Nav.Item>
//             )}
//         </Nav>
//     );
// }
