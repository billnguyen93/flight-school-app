import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Header from "./Header";
import Favorites from "./Favorites";
import NewForm from "./NewForm";
import About from "./About";


function App() {
    const [jordans, setJordans] = useState([]);
    const [favorites, setFavorites] =  useState([]);

    useEffect(() => {
        fetch("http://localhost:3004/jordans")
            .then(resp => resp.json())
            .then((data) => setJordans(data))   
    }, [])

   

    function updateJordan(updatedJordan) {
      const newJordans = jordans.map(jordan => {
          if(updatedJordan.id === jordan.id) {
              return updatedJordan
          } else {
              return jordan
          }
      })
      setJordans(newJordans)
  }

    const handleFavoriteJordan = (jordan) => {
      if(!favorites.includes(jordan)) {
        const updatedFavorites = [...favorites, jordan]
        setFavorites(updatedFavorites)
      } else {
        alert("Already Added!")
      }
    }

    function addNewJordan(newJordan) {
      setJordans((jordans) => [...jordans, newJordan])
      
    }

    function handleRemoveFavorite(id) {
      const updatedFavorites = favorites.filter((favorite) => favorite.id !== id)
      setFavorites(updatedFavorites)
    }

    function handleDeleteJordan(id) {
      const updatedJordanArray = jordans.filter((jordan) => jordan.id !== id)
      setJordans(updatedJordanArray)
    }

  return (
    <div className="app" style={{
      backgroundImage: `url(https://images.alphacoders.com/683/683741.jpg)`,
      backgroundSize: "auto"
  }}>
      <NavBar />
      <Header />
      <Switch>
        <Route path="/favorites">
          <Favorites favorites={favorites} onRemoveFavorite={handleRemoveFavorite}/>
        </Route>
        <Route path="/new">
          <NewForm addNewJordan={addNewJordan}/>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home jordans={jordans} updateJordan={updateJordan} onFavoriteJordan={handleFavoriteJordan} favorites={favorites} onDeleteJordan={handleDeleteJordan}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

