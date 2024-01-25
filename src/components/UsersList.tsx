import { useEffect, useMemo, useRef, useState } from "react";
import { UserCard } from "./UserCard";
import { type User} from "../Model/types";

import "../Style/UserList.styl"

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortByCountry, setSortByCountry] = useState(false); //este se puede cambiar para hacerlo por departamento, region o  cargo, etc...
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, SetcurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const originalUsers = useRef<User[]>([]);

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState); //por medio a un callback recuperamos el valor anterior y actualizamos
  };

  

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/users?limit=10&skip=${currentPage}`)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.users);
        originalUsers.current = res.users;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  //filtramos, el useMemo para evitar renderizados innecesarios
  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.company.name
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const totalPages = Math.ceil(users.length);
  //ordenamos
  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted((a, b) =>
          a.company.department.localeCompare(b.company.department)
        )
      : filteredUsers;
  }, [filteredUsers, sortByCountry]);

  // const sortedUsers = sortByCountry
  // ? [...users].sort((a, b) => a.location.country.localeCompare(b.location.country))
  // : users;
  return (
    <>
      <header className="c-header_container">
      <h1>Listado de usuarios</h1>
        <div className="c-header">
          <button
            onClick={toggleSortByCountry}
            className="c-header_btn"
          >
            {sortByCountry ? "No ordenar" : "Ordenar por departamento"}
          </button>
          <input
            placeholder="Filtra"
            className="c-header_input"
            onChange={(e) => {
              setFilterCountry(e.target.value);
            }}
          />
        </div>
      </header>

      <main className="c-main">
        {loading && <strong>Cargando...</strong>}

        {!loading && error && <p>Error</p>}

        {!loading && !error && users.length === 0 && <p>Error</p>}

        {sortedUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </main>
      <div className="c-main__button-container">
        {!loading && !error && (
          <button
            className="c-main_button"
            onClick={() => SetcurrentPage(currentPage - 10)}
          >
            Regresar a los anteriores
          </button>
        )}
        <p className="c-main__text_paginacion">
          Página {currentPage} de {totalPages}
        </p>
        {!loading && !error && (
          <button
            className="c-main_button"
            onClick={() => SetcurrentPage(currentPage + 10)}
          >
            Cargar mas registros
          </button>
        )}
      </div>
  
    </>
  );
}
