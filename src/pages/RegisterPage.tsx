import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../store/Store";
import { Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const RegisterPage = observer(() => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.registerPageStore.submit();
    /*
    const errorMessage = await store.authStore.register(
      email,
      username,
      password
    );
    */

    /*
    if (!errorMessage) {
      navigateTo("/");
    }

    setErrorMessage(errorMessage);
    */
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
            <Form.Group className="mb-3" controlId="register.username">
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control
                type="text"
                placeholder="Podaj nazwę użytkownika..."
                value={store.registerPageStore.username}
                onChange={(e) => {
                  store.registerPageStore.username = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register.email">
              <Form.Label>Adres email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Podaj adres email..."
                value={store.registerPageStore.email}
                onChange={(e) => {
                  store.registerPageStore.email = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register.password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Podaj hasło..."
                value={store.registerPageStore.password}
                onChange={(e) => {
                  store.registerPageStore.password = e.target.value;
                }}
                isInvalid={!store.registerPageStore.passwordsMatch}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register.repeatedpassword">
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Powtórz hasło..."
                value={store.registerPageStore.repeatedPassword}
                onChange={(e) => {
                  store.registerPageStore.repeatedPassword = e.target.value;
                }}
                isInvalid={!store.registerPageStore.passwordsMatch}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button type="submit">Zarejestruj się</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default RegisterPage;
