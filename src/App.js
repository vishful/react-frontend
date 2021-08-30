import React, { useState, useEffect } from "react";

    function App() {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);
        const [q, setQ] = useState("");

        const [searchParam] = useState(["provider", "childSubject"]);
    

        useEffect(() => {
            fetch("https://courses-backend-api.herokuapp.com/getAll")
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        }, []);
        
        function search(items) {
          return items.filter((item) => {
              return searchParam.some((newItem) => {
                  return (
                      item[newItem]
                          .toString()
                          .toLowerCase()
                          .indexOf(q.toLowerCase()) > -1
                  );
              });
          });
      }
  

        if (error) {
          return <>{error.message}</>;
      } else if (!isLoaded) {
          return <>loading...</>;
      } else {
          return (
<div className="wrapper">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <span className="sr-only">Search Courses Here Based On Next Session Date Or Child Subject Or Provider .</span>
                    </label>
                </div>
                <h1>Number Of Courses : </h1>
                <h1>{search(items).length}</h1> 
                  <ul className="card-grid">
                  {search(items).map((item) => (
                          <li>
                              <article className="card" key={item.courseId}>
                                  <div className="card-image">
                                    <img src='https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'alt="picture"/>
                                  </div>
                                  <div className="card-content">
                                      <h2 className="card-name">{item.courseName}</h2>
                                      <ol className="card-list">
                                          <li>
                                              Provider:{" "}
                                              <span>{item.provider}</span>
                                          </li>
                                          <li>
                                              Parent Subject: <span>{item.parentSubject}</span>
                                          </li>
                                          <li>
                                              Child Subject: <span>{item.childSubject}</span>
                                          </li>
                                          <li>
                                              Next Sessio Date: <span>{item.nextSession}</span>
                                          </li>
                                          <li>
                                              Length: <span>{item.length}</span>
                                          </li>
                                          <li>
                                              Access Course <a href={item.url}>Here</a>
                                          </li>
                                          <li>
                                            Access Video Tutorial <a href={item.videoUrl}>Here</a>
                                          </li>
                                      </ol>
                                  </div>
                              </article>
                          </li>
                      ))}
                  </ul>
                  </div>
              
              
          );
                      }
                    }

  export default App;