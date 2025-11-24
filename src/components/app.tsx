import { Header } from "./layout/header";
import { RepositoryDisplay } from "./display";

export const App = () => {
  return (
    <>
      <Header />

      <main className="container pt-4">
        <RepositoryDisplay />
      </main>
    </>
  );
};
