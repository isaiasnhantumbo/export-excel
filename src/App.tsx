import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import * as xlsx from "xlsx";

interface IGameProps {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

function App() {
  const [games, setGames] = useState<IGameProps[]>([]);
  const inputTable = useRef(null);

  function handleExportTableToExcelFile() {
    let book = xlsx.utils.book_new();
    const data = xlsx.utils.table_to_sheet(inputTable.current);
    xlsx.utils.book_append_sheet(book, data, "Games");
    xlsx.writeFile(book, "Games.xlsx");
  }
  
  async function getGamesData() {
    const response = await axios.get<IGameProps[]>(
      "https://www.freetogame.com/api/games?category=sports"
    );
    setGames(response.data);
  }
  useEffect(() => {
    getGamesData();
  }, []);
  return (
    <div className="App">
      <div style={{ marginBottom: "12px" }}>
        <button onClick={handleExportTableToExcelFile}>Exportar</button>
      </div>
      <table border={1} align="left" ref={inputTable}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Genero</th>
            <th>Plataforma</th>
            <th>Produtora</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.genre}</td>
              <td>{game.platform}</td>
              <td>{game.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
