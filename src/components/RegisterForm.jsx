import { useState } from "react";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from "../lib/validationForm";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import supabase from "../supabase/supabase-client";
import { Link, useNavigate } from "react-router";


export default function RegisterForm() {
    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
        } else {
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username
                    }
                }
            });
            if (error) {
                alert("Registrazione fallita 👎🏻!");
            } else {
                alert("Registrazione avvenuta con successo 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return (

        <Container fluid>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    <Form className="mainContent" onSubmit={onSubmit} noValidate>
                    <h2 className="text-center mb-4">Registrati</h2>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Inserisci email" value={formState.email} onChange={setField("email")} onBlur={onBlur("email")} aria-invalid={isInvalid("email")} required />
                            {formErrors.email && <small>{formErrors.email}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome" value={formState.firstName} onChange={setField("firstName")} onBlur={onBlur("firstName")}
                                aria-invalid={isInvalid("firstName")} required />
                            {formErrors.firstName && <small>{formErrors.firstName}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder="Cognome" value={formState.lastName}
                                onChange={setField("lastName")} onBlur={onBlur("lastName")} aria-invalid={isInvalid("lastName")} required />
                            {formErrors.lastName && <small>{formErrors.lastName}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={formState.username}
                                onChange={setField("username")} onBlur={onBlur("username")} aria-invalid={isInvalid("username")} required />
                            {formErrors.username && <small>{formErrors.username}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={formState.password} onChange={setField("password")} onBlur={onBlur("password")} aria-invalid={isInvalid("password")} required />
                            {formErrors.password && <small>{formErrors.password}</small>}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Registrati
                        </Button>

                        <div className="text-center mt-3">
                            <p>Sei già registrato? <Link to="/login">Registrati</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}



