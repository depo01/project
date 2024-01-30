import { useEffect, useMemo, useRef, useState } from "react";
import { UserCard } from "./UserCard";
import { type User} from "../Model/types";
import "../Style/UserList.styl"
import { useQuery } from "react-query";


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


  // const handlePageChange = (pageNumber: number) => {
  //   SetcurrentPage(pageNumber);
  // };
  // useQuery(
  //   ['users'], 
  //   async () => await fetchUsers(1)
  // )


  //filtramos, el useMemo para evitar renderizados innecesarios
  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.firstName
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
      <h1 className="c-title">Listado de usuarios</h1>
        <div className="c-header">

          <input
            placeholder="Search por nombre"
            className="c-header_input"
            onChange={(e) => {
              setFilterCountry(e.target.value);
            }}
          />
    
          <p className="c-order">Tipos de Ordenamientos</p>
        

            <div className="c-main__button-container_header">
            
            <button
              onClick={toggleSortByCountry}
              className="c-header_btn"
              >
              {sortByCountry ? "No ordenar" : "Departamento"}
            </button>

            <button
              onClick={toggleSortByCountry}
              className="c-header_btn"
              >
              {sortByCountry ? "No ordenar" : "Ciudad"}
            </button>

            <button
              onClick={toggleSortByCountry}
              className="c-header_btn"
              >
              {sortByCountry ? "No ordenar" : "Profesion"}
            </button>
            
          </div>
        </div>
      </header>

      <img src="" alt="" />
      <main className="c-main">
        {loading && <strong>Cargando...</strong>}

        {!loading && error && <p>Error</p>}

        {!loading && !error && users.length === 0 && <p>Error</p>}

        {sortedUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </main>
      <div className="c-main__button-container">

        <ul className="pagination">
          <li><a onClick={() => SetcurrentPage(currentPage - 10)}>«</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a className="active" href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#">6</a></li>
          <li><a href="#">7</a></li>
          <li><a href="#">8</a></li>
          <li><a onClick={() => SetcurrentPage(currentPage + 10)}>»</a></li>
      </ul>
    </div>

    </>
  );
}
