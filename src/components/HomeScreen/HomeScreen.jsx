import React, { useState } from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import homeIcon from "../../assets/home-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import educationIcon from "../../assets/education-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";

const navItems = [
  { id: "home", icon: homeIcon, label: "Home" },
  { id: "search", icon: searchIcon, label: "Search" },
  { id: "education", icon: educationIcon, label: "Education" },
  { id: "profile", icon: profileIcon, label: "Profile" },
];

function HomeScreen() {
  const [activeNav, setActiveNav] = useState("home");
  const [infoVisible, setInfoVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState(null);

  const handleMarkerClick = (info) => {
    setMarkerInfo(info);
    setInfoVisible(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[51.505, -0.09]}
            onClick={() =>
              handleMarkerClick({
                location: "51.505, -0.09",
                humidity: "75%",
                dangerLevel: "High",
                otherInfo: "Recent heavy rainfall",
              })
            }
          >
            <Popup>Click for more info</Popup>
          </Marker>
        </MapContainer>
      </div>
      {infoVisible && (
        <Card
          style={{
            position: "absolute",
            bottom: "60px",
            width: "100%",
            backgroundColor: "white",
            zIndex: 1000,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Card.Body>
            <Card.Title>Marker Information</Card.Title>
            <Card.Text>
              <strong>Location:</strong> {markerInfo.location}
              <br />
              <strong>Humidity:</strong> {markerInfo.humidity}
              <br />
              <strong>Danger Level:</strong> {markerInfo.dangerLevel}
              <br />
              <strong>Other Info:</strong> {markerInfo.otherInfo}
            </Card.Text>
            <button
              onClick={() => setInfoVisible(false)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Close
            </button>
          </Card.Body>
        </Card>
      )}
      <Navbar bg="light" variant="light" fixed="bottom">
        <Nav className="w-100 d-flex justify-content-around">
          {navItems.map((item) => (
            <Nav.Link
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{
                  width: "24px",
                  height: "24px",
                  fill: activeNav === item.id ? "blue" : "black",
                  filter:
                    activeNav === item.id
                      ? "invert(35%) sepia(99%) saturate(2810%) hue-rotate(218deg) brightness(100%) contrast(101%)"
                      : "invert(0%)",
                }}
              />
              <span>{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}

export default HomeScreen;
