import { useState } from "react";
import {
    FormSchemaLogin,
    ConfirmSchemaLogin,
    getErrors,
    getFieldError,
} from "../lib/validationForm";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import supabase from "../supabase/supabase-client";
import { Link, useNavigate } from "react-router";


export default function LoginForm() {
    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
        } else {
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (error) {
                alert("Login fallito 👎🏻!");
            } else {
                alert("Login avvenuto con successo 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(FormSchemaLogin, property, formState[property]);
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
        <Container fluid className="mainContent py-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    <Form onSubmit={onSubmit} noValidate>
                        <h2 className="text-center mb-4">Accedi</h2>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci email"
                                value={formState.email}
                                onChange={setField("email")}
                                onBlur={onBlur("email")}
                                aria-invalid={isInvalid("email")}
                                required
                            />
                            {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={formState.password}
                                onChange={setField("password")}
                                onBlur={onBlur("password")}
                                aria-invalid={isInvalid("password")}
                                required
                            />
                            {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
                        </Form.Group>

                        <div>
                            <Button variant="primary" type="submit">
                                Accedi
                            </Button>
                        </div>

                        <div className="text-center mt-3">
                            <p>Non sei ancora registrato? <Link to="/register">Registrati</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}



