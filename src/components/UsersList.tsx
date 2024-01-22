import { useEffect, useMemo, useRef, useState } from "react";
import { UserCard } from "./UserCard";
import { type User } from "../types.d";


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
      <header className="sticky top-0 z-10 bg-gray-200 p-4">
        <div className="flex items-center ">
          <button
            onClick={toggleSortByCountry}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {sortByCountry ? "No ordenar" : "Ordenar por departamento"}
          </button>
          <input
            placeholder="Filtra"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setFilterCountry(e.target.value);
            }}
          />
        </div>
      </header>

      <main className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
        {loading && <strong>Cargando...</strong>}

        {!loading && error && <p>Error</p>}

        {!loading && !error && users.length === 0 && <p>Error</p>}

        {sortedUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </main>
      <div className="flex items-center p-2">
        {!loading && !error && (
          <button
            className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2"
            onClick={() => SetcurrentPage(currentPage - 10)}
          >
            Regresar a los anteriores
          </button>
        )}
        <div className="w-full text-base font-medium text-black bg-white px-4 py-2 border-b-4 ">
          Página {currentPage} de {totalPages}
        </div>
        {!loading && !error && (
          <button
            className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2"
            onClick={() => SetcurrentPage(currentPage + 10)}
          >
            Cargar mas registros
          </button>
        )}
      </div>
  
    </>
  );
}
