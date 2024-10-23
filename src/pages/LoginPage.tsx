import { useNavigate } from "react-router-dom";
import { store } from "../store/Store";
import { Button, Form, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.loginPageStore.login();

    if (store.authStore.isLoggedIn) {
      navigateTo("/");
    }
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
          {store.loginPageStore.errorMessage && (
            <div className="alert alert-danger h-1">
              {store.loginPageStore.errorMessage}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
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

            <div className="mb-2">
              Nie pamiętasz hasła?{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  (store.loginPageStore.isResetPasswordModalShown = true)
                }
              >
                Zresetuj haslo
              </span>
            </div>

            <div className="d-flex justify-content-center">
              <Button type="submit">Zaloguj się</Button>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        show={store.loginPageStore.isResetPasswordModalShown}
        centered
        onHide={() => {
          store.loginPageStore.isResetPasswordModalShown = false;
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Zreseruj hasło</Modal.Title>
        </Modal.Header>

        <Form.Group className="mx-2 pb-2">
          <Form.Control
            className="mt-2"
            type="text"
            placeholder="Podaj email..."
            value={store.loginPageStore.resetEmail}
            onChange={(e) => {
              store.loginPageStore.resetEmail = e.target.value;
            }}
          />
        </Form.Group>
        <div className="my-2 d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={() => store.loginPageStore.sendPasswordResetRequest()}
          >
            Wyślij prośbę
          </Button>
        </div>
      </Modal>
    </div>
  );
});

export default LoginPage;
