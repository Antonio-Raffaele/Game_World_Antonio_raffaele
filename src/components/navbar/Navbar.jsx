import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import Searchbar from '../searchbar/Searchbar';
import styles from "./Navbar.module.css";
import { useContext, useEffect, useState} from 'react';
import supabase from '../../supabase/supabase-client';
import SessionContext from "../../context/SessionContext";
import logo from "../../MEDIA/logo.png"

export default function NavbarScroll() {

    const navigate = useNavigate();
    const {session} = useContext(SessionContext);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert('Signed out')
        navigate('/');
    }


    return (
        <Navbar expand="lg" className={`fixed-top ${isScrolled ? styles.navCustom : ''}`}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                <img src={logo} alt="" style={{ height: '60px', width: '60px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    <div className="d-flex justify-content-center w-100">
                        <Searchbar />
                    </div>


                    {session ? (
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavDropdown title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item >Profilo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/account">
                                    Impostazioni
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={signOut}>
                                    Esci
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/login">Accedi</Nav.Link>
                            <Nav.Link as={Link} to="/register">Registrati</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}










