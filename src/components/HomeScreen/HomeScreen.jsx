import React, { useState, useRef, useEffect } from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { marker } from "leaflet";

import InfoCard from "../InfoCard/InfoCard";
import InfoCard2 from "../InfoCard/InfoCard2";
import homeIcon from "../../assets/home-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import educationIcon from "../../assets/education-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";
import pinExclamation from "../../assets/alert-pin-icon.svg";
import HighRiskIcon from "../../assets/high-risk-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import { handleSensorStatus } from "../../services/handleSensorStatus";

const navItems = [
  { id: "home", icon: homeIcon, label: "Home" },
  { id: "search", icon: searchIcon, label: "Search" },
  { id: "education", icon: educationIcon, label: "Education" },
  { id: "profile", icon: profileIcon, label: "Profile" },
];

const dados = {
  data: "05/07/2024",
  sensor: "Sensor Massapé",
  endereco: "Rua do nova, 123",
};

const pinIcon = new L.Icon({
  iconUrl: pinExclamation,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

function HomeScreen() {
  const [marcador, setMarcador] = useState([]);
  useEffect(() => {
    const getSensorStatus = async () => {
      const result = await handleSensorStatus();

      setMarcador(result);
    };
    getSensorStatus();
  }, []);

  const [activeNav, setActiveNav] = useState("home");
  const [infoVisible, setInfoVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState(null);
  const mapRef = useRef(null);

  const handleMarkerClick = (info, position) => {
    setMarkerInfo(info);
    setInfoVisible(true);
    const map = mapRef.current;
    if (map) {
      map.flyTo(position, map.getZoom());
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
          {marcador &&
            marcador.map((marcador) => {
              const [lat, lng] = marcador.markcoord.split(",").map(Number);
              return (
                <Marker
                  position={[lat, lng]}
                  icon={pinIcon}
                  eventHandlers={{
                    click: () =>
                      handleMarkerClick(
                        {
                          humidity: "75%",
                          dangerLevel: "High",
                          otherInfo: "Recent heavy rainfall",
                        },
                        [lat, lng]
                      ),
                  }}
                />
              );
            })}
        </MapContainer>
      </div>
      {infoVisible && markerInfo && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            minHeight: "50%",
            height: "50%",
            width: "100%",
            zIndex: 1000,
            background: "#F7F7F6",
            transition: "transform 0.3s ease-in-out",
            transform: infoVisible ? "translateY(0)" : "translateY(100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "10px",
            overflowY: "auto",
          }}
        >
          <Card
            style={{ border: "none", background: "#F7F7F6", height: "100%" }}
          >
            <Card.Body style={{ overflowY: "auto" }}>
              <div
                className="head"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #E7E7E7",
                  paddingBottom: "10px",
                  marginBottom: "20px",
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
                      gap: "5px",
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
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Alto Risco
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
              <div
                className="info"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Card.Text
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <InfoCard data={dados.data} />
                </Card.Text>
                <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                  Detalhes
                </span>
                <Card.Text
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <InfoCard2 sensor={dados.sensor} endereco={dados.endereco} />
                </Card.Text>
                <Card.Text
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <InfoCard2 data={dados.data} endereco={dados.endereco} />
                </Card.Text>
              </div>
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
              <span
                style={{
                  color: activeNav === item.id ? "blue" : "black",
                  fontWeight: activeNav === item.id ? "500" : "normal",
                  filter:
                    activeNav === item.id
                      ? "invert(35%) sepia(99%) saturate(2810%) hue-rotate(218deg) brightness(100%) contrast(101%)"
                      : "invert(0%)",
                }}
              >
                {item.label}
              </span>
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}

export default HomeScreen;
