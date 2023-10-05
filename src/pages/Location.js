import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import salespersonAPI from "../api/salesPersonAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

function Location() {
    let { authToken } = useContext(AuthContext);
    const [salesPersons, setsalesPersons] = useState([]);

    useEffect(() => {
        // Fetch salesperson when the component mounts
        salespersonAPI
            .getSalespersonByTeam(authToken)
            .then((data) => {
                setsalesPersons(data);
            })
            .catch((error) => {
                console.error("Error fetching Sales Person:", error);
            });
    }, []);
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="location">
                <div className="header d-flex justify-content-between">
                    <h4>Location</h4>
                </div>
                {/* Location Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Name</h5>
                            </div>
                            <div className="col-6">
                                <h5>View</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {salesPersons?.map((salesPerson) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={salesPerson.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>{salesPerson.name}</h6>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                className="view-link"
                                                to={`/view/location/${salesPerson.id}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMap}
                                                    id="map-icon"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;
