import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../store/Store";
import { Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.loginPageStore.submit();

    if (store.authStore.isLoggedIn) {
      navigateTo("/");
    }

    setErrorMessage(errorMessage);
  };

  if (store.authStore.isLoggedIn) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <h1>Jesteś już zalogowany</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <div className="border rounded p-4 w-50">
          {errorMessage && (
            <div className="alert alert-danger h-1">{errorMessage}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="login.email">
              <Form.Label>Adres email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Podaj adres email..."
                value={store.loginPageStore.email}
                onChange={(e) => {
                  store.loginPageStore.email = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="login.password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Podaj hasło..."
                value={store.loginPageStore.password}
                onChange={(e) => {
                  store.loginPageStore.password = e.target.value;
                }}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button type="submit">Zaloguj się</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default LoginPage;
