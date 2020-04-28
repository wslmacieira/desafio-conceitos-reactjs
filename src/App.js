import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepository(response.data);
      console.log(response);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    // setRepository([...repositories, `Novo repository ${Date.now()}`]);
    const response = await api.post("repositories", {
      title: `Novo repository ${Date.now()}`,
      url: "http://github.com/wslmacieira",
      techs: ["Node.js", "ReactJS"],
    });

    const newRepository = response.data;

    setRepository([...repositories, newRepository]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    const filterRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepository(filterRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
