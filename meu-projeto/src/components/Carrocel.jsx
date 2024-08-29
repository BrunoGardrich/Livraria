import React, { useState, useEffect } from "react";
import axios from "axios";

function Carrocel() {
  const [livros, setLivros] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);

  const [nome, setNome] = useState("");
  const [biografia, setBiografia] = useState("");
  const [imagem, setImagem] = useState("");
  const [tituloLivro, setTituloLivro] = useState("");
  const [isbnLivro, setIsbnLivro] = useState("");

  const handleNomeChange = (event) => setNome(event.target.value);
  const handleBiografiaChange = (event) => setBiografia(event.target.value);
  const handleImagemChange = (event) => setImagem(event.target.value);
  const handleTituloLivroChange = (event) => setTituloLivro(event.target.value);
  const handleIsbnLivroChange = (event) => setIsbnLivro(event.target.value);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Author/")
      .then((response) => {
        setLivros(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar os livros:", error);
      });
  }, []);

  const proximoLivro = () => {
    setIndexAtual((indexAtual + 1) % livros.length);
  };

  const livroAnterior = () => {
    setIndexAtual((indexAtual - 1 + livros.length) % livros.length);
  };

  const selecionarLivro = (index) => {
    setIndexAtual(index);
  };

  const adicionarLivro = (novoLivro) => {
    axios
      .post("http://localhost:8080/api/Author/addAuthor", novoLivro)
      .then((response) => {
        setLivros([...livros, response.data]);
      })
      .catch((error) => {
        console.error("Erro ao adicionar o livro:", error);
      });
  };

  const editarLivro = (id, livroEditado) => {
    axios
      .put(`http://localhost:8080/api/Author/updateAuthor/${id}`, livroEditado)
      .then((response) => {
        setLivros(
          livros.map((livro) => (livro.id === id ? response.data : livro))
        );
      })
      .catch((error) => {
        console.error("Erro ao editar o livro:", error);
      });
  };

  const removerLivro = (id) => {
    axios
      .delete(`http://localhost:8080/api/Author/deleteAuthor/${id}`)
      .then(() => {
        setLivros(livros.filter((livro) => livro.id !== id));
        setIndexAtual(0); // Reseta o índice para o primeiro livro
      })
      .catch((error) => {
        console.error("Erro ao remover o livro:", error);
      });
  };

  return (
    <div>
      <div className="carrocel">
        {livros.length > 0 && livros[indexAtual - 1] && (
          <>
            <img
              src={livros[indexAtual - 1].image}
              alt={livros[indexAtual - 1].titulo}
              style={{
                opacity: "0.5",
                width: "175px",
                height: "275px",
              }}
            />
            <h2>{livros[indexAtual].titulo}</h2>
          </>
        )}

        {livros.length > 0 && (
          <>
            <img
              src={livros[indexAtual].image}
              alt={livros[indexAtual].titulo}
            />
            <h2>{livros[indexAtual].titulo}</h2>
          </>
        )}
        {livros.length > 0 && livros[indexAtual + 1] && (
          <>
            <img
              src={livros[indexAtual + 1].image}
              alt={livros[indexAtual + 1].titulo}
              style={{
                opacity: "0.5",
                width: "175px",
                height: "275px",
                transition: "10",
              }}
            />
            <h2>{livros[indexAtual].titulo}</h2>
          </>
        )}
      </div>
      <div className="controles">
        <button onClick={livroAnterior}>Anterior</button>
        {livros.map((livro, index) => (
          <button key={livro.id} onClick={() => selecionarLivro(index)}>
            {index + 1}
          </button>
        ))}
        <button onClick={proximoLivro}>Próximo</button>
      </div>

      <div className="crud-controles">
        <button
          onClick={() =>
            adicionarLivro({
              name: nome,
              biography: biografia,
              image: imagem,
              book: [
                {
                  title: tituloLivro,
                  isbn: isbnLivro,
                },
              ],
            })
          }
        >
          Adicionar Livro
        </button>
        <button
          onClick={() =>
            editarLivro(
               livros[indexAtual].id
            , {
                name: nome,
                biography: biografia,
                image: imagem,
                book: [
                  {
                    title: tituloLivro,
                    isbn: isbnLivro,
                  },
                ],
            })
          }
        >
          Editar Livro 1
        </button>
        <button onClick={() => removerLivro(livros[indexAtual].id)}>
          Remover Livro 1
        </button>
      </div>
      <div className="ipt_addBook">
        <input
          type="text"
          placeholder="name"
          id="ipt_name"
          value={nome}
          onChange={handleNomeChange}
        />
        <input
          type="text"
          placeholder="biography"
          id="ipt_biography"
          value={biografia}
          onChange={handleBiografiaChange}
        />
        <input
          type="text"
          placeholder="imagem"
          id="ipt_image"
          value={imagem}
          onChange={handleImagemChange}
        />
        <input
          type="text"
          placeholder="Title"
          value={tituloLivro}
          onChange={handleTituloLivroChange}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbnLivro}
          onChange={handleIsbnLivroChange}
        />
      </div>
    </div>
  );
}

export default Carrocel;
