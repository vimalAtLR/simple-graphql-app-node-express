import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Events() {
  const navigate = useNavigate();
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  async function getEvents() {
    try {
      const requestBody = {
        query: `
          query {
            events {
              _id,
              title,
              description
            }
          }
        `
      }

      const auth = JSON.parse(localStorage.getItem('auth'));
      
      if (!auth || !auth.token) {
        navigate("/");
      }
      
      let response = await fetch("http://localhost:7000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      });
      response = await response.json();

      if (!response.errors && response.data) {
        setEvents(response.data.events);
      } else {
        alert(response.errors[0].message)
      }
    } catch (err) {
      console.log('err in get events : ', err);
    }
  }

  return (
    <div>
      {events.length === 0 ? (
        <div>Events not exist</div>
      ) : (
        <div style={{ 'margin': '70px'}}>
          {events.map((eve) => {
            return (
              <div key={eve._id}>
                <h3>{eve.title}</h3>
                <p>Description : {eve.description}</p>
                <p>Price : {eve.price}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Events
