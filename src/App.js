import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [techName, setTech] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((value) => setRepositories(value.data));
  });

  async function handleAddRepository() {
    await api.post("repositories", { title, techs }).then((response) => {
      setTechs([]);
      setTech("");
      setTitle("");
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
  }

  function handleAddTech(tech) {
    setTechs([...techs, tech]);
    setTech("");
  }

  function handleRemoveTech(tech) {
    setTechs(techs.filter((item) => item !== tech));
  }

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
    },
    addTechButton: {
      background: "#09af00",
    },
    liItem: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "baseline",
      width: "250px",
      fontSize: "16px",
    },
    removeLiItem: {
      color: "red",
      background: "none",
    },
  };

  return (
    <div>
      <form style={styles.form}>
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Tecnologias</label>
        <input value={techName} onChange={(e) => setTech(e.target.value)} />
        {techName.length > 2 && (
          <button
            style={styles.addTechButton}
            type="button"
            onClick={(e) => handleAddTech(techName)}
          >
            Adicionar tecnologia
          </button>
        )}

        {techs.map((tech) => (
          <ul>
            <div style={styles.liItem}>
              <h1>{tech}</h1>
              <button
                onClick={(e) => handleRemoveTech(tech)}
                style={styles.removeLiItem}
              >
                Remover
              </button>
            </div>
          </ul>
        ))}
      </form>

      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.uid)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
