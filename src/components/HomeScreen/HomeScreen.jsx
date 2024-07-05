import React, { useState, useRef } from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import homeIcon from "../../assets/home-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import educationIcon from "../../assets/education-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";
import pinExclamation from "../../assets/alert-pin-icon.svg";
import HighRiskIcon from "../../assets/high-risk-icon.svg";
import closeIcon from "../../assets/close-icon.svg";

const navItems = [
  { id: "home", icon: homeIcon, label: "Home" },
  { id: "search", icon: searchIcon, label: "Search" },
  { id: "education", icon: educationIcon, label: "Education" },
  { id: "profile", icon: profileIcon, label: "Profile" },
];

const pinIcon = new L.Icon({
  iconUrl: pinExclamation,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

function HomeScreen() {
  const [activeNav, setActiveNav] = useState("home");
  const [infoVisible, setInfoVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState(null);
  const mapRef = useRef(null);

  const handleMarkerClick = (info, position) => {
    setMarkerInfo(info);
    setInfoVisible(true);
    const map = mapRef.current;
    if (map) {
      const targetLatLng = L.latLng(position[0], position[1]);
      const targetPoint = map
        .project(targetLatLng)
        .subtract([0, map.getSize().y * 0.25]);
      const newLatLng = map.unproject(targetPoint);
      map.setView(newLatLng, map.getZoom());
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[-8.003836069073893, -34.93713947299929]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[-8.003836069073893, -34.93713947299929]}
            icon={pinIcon}
            eventHandlers={{
              click: () =>
                handleMarkerClick(
                  {
                    location: "51.505, -0.09",
                    humidity: "75%",
                    dangerLevel: "High",
                    otherInfo: "Recent heavy rainfall",
                  },
                  [-8.003836069073893, -34.93713947299929]
                ),
            }}
          >
            <Popup>Click for more info</Popup>
          </Marker>
        </MapContainer>
      </div>
      {infoVisible && markerInfo && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            height: "50%",
            width: "100%",
            zIndex: 1000,
            backgroundColor: "white",
            transition: "transform 0.3s ease-in-out",
            transform: infoVisible ? "translateY(0)" : "translateY(100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <Card style={{ border: "none" }}>
            <Card.Body>
              <div
                className="head"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="titulo-subtitulo">
                  <div
                    className="icone-titulo"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                      gap: "10px",
                    }}
                  >
                    <img src={HighRiskIcon} alt="" />
                    <Card.Title
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        objectFit: "max-content",
                        margin: "0",
                      }}
                    >
                      Informações do sensor
                    </Card.Title>
                  </div>
                  <Card.Subtitle className="mb-2 text-muted">
                    Dois Irmãos
                  </Card.Subtitle>
                </div>
                <button
                  onClick={() => setInfoVisible(false)}
                  style={{
                    background: "#E7E7E7",
                    color: "white",
                    border: "none",
                    alignContent: "center",
                    justifyContent: "center",
                    padding: "10px 15px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    float: "right",
                  }}
                >
                  <img src={closeIcon} alt="" />
                </button>
              </div>

              <Card.Text style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                <strong>Location:</strong> {markerInfo.location}
                <br />
                <strong>Humidity:</strong> {markerInfo.humidity}
                <br />
                <strong>Danger Level:</strong> {markerInfo.dangerLevel}
                <br />
                <strong>Other Info:</strong> {markerInfo.otherInfo}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
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
