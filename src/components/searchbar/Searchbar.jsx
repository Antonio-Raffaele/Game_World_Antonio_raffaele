import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
        } else {
            setAriaInvalid(true)
        }
    };

    return (
        <Form onSubmit={handleSearch} className="d-flex w-75">
            <Form.Control
                type="text"
                name="search"
                placeholder={"Cerca"}
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
                className="me-2"

            />
            <Button type="submit" className={styles.btnNav}>Cerca</Button>
        </Form>
    )
}