import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import "./App.css";
import { useLocation } from "./contexts/location";

interface User {
  name: string;
  following: number; 
  public_repos: number;
  location: any;
} 

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const { latitude, longitude } = useLocation();

  // useEffect(() => {
  //   setTimeout(() => setDarkMode(!darkMode), 1000);
  // }, [darkMode]);

  function getUser(username: string) {
    fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then(data => setUser(data));
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
      <div className={darkMode ? "screen dark" : "screen"}>
        <main>
          <h1>Buscador de GitHub</h1>

          <section>
            <label htmlFor="search"></label>
            <input 
              type="text" 
              name="search" 
              id="search" 
              placeholder="Buscar por username"
              onBlur={(e) => getUser(e.target.value)}
            />

            <ul>
              <li><span className="bold">Nome</span>: {user?.name}</li>
              <li><span className="bold">Repositórios</span>: {user?.public_repos}</li>
              <li><span className="bold">Seguidores</span>: {user?.following}</li>
              <li><span className="bold">Localização</span>: {latitude}, {longitude}</li>
            </ul>

            <Switch.Root className="SwitchRoot" onClick={() => setDarkMode(!darkMode)}>
              <Switch.Thumb className="SwitchThumb"/>
            </Switch.Root>
          </section>
        </main>
      </div>
  )
}
