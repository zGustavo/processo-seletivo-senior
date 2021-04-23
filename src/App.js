import React from "react";
import "./App.css";


let registros = [];
let years = [];
let filmesAnos = [];
let filtro;
let contador = 0;
let nomeFilme = '';




const App = () => {
  const [nome, setNome] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    nomeFilme = {nome};
    getContent();

  }




  async function getContent() {
    try {
      const filme = nomeFilme.nome;
      const response = await fetch(
        'https://jsonmock.hackerrank.com/api/movies/search?Title=' + filme);
      const data = await response.json();

      let totalPages = 0;

      totalPages = data.total_pages;

      // Conta o total de páginas com parte do titulo na pesquisa.
      for (let i = 1; i <= totalPages; i++) {
        const response = await fetch(
          "https://jsonmock.hackerrank.com/api/movies/search?Title=" +
            filme +
            "&page=" +
            i
        );
        const data = await response.json();
        registros.push(...data.data);
        console.log(registros);
      }

      getYears(registros);
      getByMoviesOrderByYear();
    } catch (error) {
      console.log(error);
    }
  }


  // Função que pega os anos
  function getYears(data) {
    data.forEach((e) => {
      if (!years.some((year) => e.Year === year)) {
        years.push(e.Year);
      }
    });
    console.log(years);
    return years;
  }

  // Função que mostra os filmes com base nos anos
  function getByMoviesOrderByYear() {
    years.forEach((year) => {
      filtro = registros.filter((movie) => movie.Year === year);
      filmesAnos.push({
        year: year,
        movies: filtro.length,
      });
      contador = contador + filtro.length;
    });
    filmesAnos.push({
      total: contador,
    });
    let apiResposta = {
      moviesByYear: [...filmesAnos],
    };
    console.log(apiResposta);
  }






  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Que filme você procura?</label>
        <input
          placeholder="Digite o nome do filme"
          id="nome"
          type="text"
          name="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

      </form>
      

    </>
  );
};
export default App;
