import React, { useState, useEffect } from "react";
import Add from "./Add";
import Find from "./Find";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';




function Dashboard(props) {
  const [ads, cAds] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const refreshList = () => {
    props.client.getAds().then((response) => cAds(response.data));
  };

  const removeAdvert = (id) => {
    props.client.removeAd(id).then(() => refreshList());
  };

  const updateAdvert = (ad) => {
    cCurrent(ad);
    setShow(!show);
  };
  const querySearch = (searchParams) => {
    props.client.queryResult(searchParams).then((response) => cAds(response.data))
  }

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return ads.map((current) => {
      return (
        <tr key={current._id}>
          <td><div className="event">{current.event}</div></td>
          <td><div className="location">{current.location}</div></td>
          <td><div className="summary">{current.summary}</div></td>
          <td><div className="date">{current.date}</div></td>
          <td><div className="time">{current.time}</div></td>
          <td>
            <Button className="buttonRemove" onClick={() => removeAdvert(current._id)}> remove</Button>
            <Button className="buttonUpdate" onClick={() => updateAdvert(current)}> update</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <><main>
      <Container className="mx-auto text-center mt-2 contentContainer">
        <Row className="headerRow">
          <h1 className="header-title">Event App Dashboard</h1>
          <h5 className="header-body">To add a new Post click add post button</h5>
          <h5 className="header-body">To search for an Event click Find Event button</h5>
        </Row>
      <br />
        <Row className="bodyRow">
          <Col xs={6}>
          {show ?
            <>
              <Add
                client={props.client}
                refreshList={() => {
                  refreshList();
                  cCurrent(undefined);
                }}
                currentAd={current}
              />
              <a class="see-less-btn" onClick={() => setShow(!show)}>See less</a>
            </>
            : <a class="buttonShowAdd" onClick={() => setShow(!show)}>Add a post</a>}
          </Col>
           <Col xs={6}>
          {show2 ?
            <>
              <Find
                client={props.client}
                querySearch = {querySearch}
                currentAd={current}
              />
              <a class="see-less-btn" onClick={() => setShow2(!show2)}>See less</a>
              <a class="see-less-btn" onClick={() => refreshList()}>Clear Filtered List</a>
            </>
            : <a class="buttonShowAdd" onClick={() => setShow2(!show2)}>Find Event</a>}
          </Col>
        </Row>
        <Row className="tableRow">
          <table>
            <thead>
              <tr >
                <th>Event</th>
                <th>Location</th>
                <th>Summary</th>
                <th>Date</th>
                <th>Time</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>{buildrows()}</tbody>
          </table>
        </Row>
      <br />
      <br />
        <Row className="formRow">
        </Row>
      </Container>
    </main>
    </>
  );
}

export default Dashboard;
