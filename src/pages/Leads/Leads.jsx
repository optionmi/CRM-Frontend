import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import leadsAPI from "../../api/leadsAPI";
import AuthContext from "../../context/AuthContext";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Leads() {
    const [leads, setLeads] = useState([]);
    const [stage1Leads, setStage1Leads] = useState([]);
    const [stage2Leads, setStage2Leads] = useState([]);
    const [stage3Leads, setStage3Leads] = useState([]);
    const [stage4Leads, setStage4Leads] = useState([]);
    const [stage5Leads, setStage5Leads] = useState([]);
    const [stage6Leads, setStage6Leads] = useState([]);

    const { authToken } = useContext(AuthContext);
    // setLeads(.());
    // console.log(leads);

    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    useEffect(() => {
        leadsAPI
            .getAllLeads(authToken)
            .then((data) => {
                setLeads(data.leads);
                // console.log(data.leads);
            })
            .catch((error) => {
                console.error("Error fetching leads:", error);
                setNotification({
                    type: "danger",
                    message: error.message,
                    show: true,
                });
            });
    }, []);

    useEffect(() => {
        const stage1Leads = leads?.filter((lead) => lead.stage === "NEW");
        const stage2Leads = leads?.filter((lead) => lead.stage === "FOLLOW_UP");
        const stage3Leads = leads?.filter((lead) => lead.stage === "VISIT");
        const stage4Leads = leads?.filter(
            (lead) => lead.stage === "NEGOTIATION"
        );
        const stage5Leads = leads?.filter((lead) => lead.stage === "WON");
        const stage6Leads = leads?.filter((lead) => lead.stage === "LOST");

        const stage1TotalAmount = stage1Leads?.reduce(
            (total, lead) => total + lead.total_amount,
            0
        );
        const stage2TotalAmount = stage2Leads?.reduce(
            (total, lead) => total + lead.total_amount,
            0
        );
        const stage3TotalAmount = stage3Leads?.reduce(
            (total, lead) => total + lead.total_amount,
            0
        );
        const stage4TotalAmount = stage4Leads?.reduce(
            (total, lead) => total + lead.total_amount,
            0
        );
        const stage5TotalAmount = stage5Leads?.reduce(
            (total, lead) => total + lead.total_amount,
            0
        );
        const stage6TotalAmount = stage6Leads?.reduce(
            (total, lead) => total + lead.total_amount,
            0
        );

        const stage1LeadsDetails = {
            leads: stage1Leads,
            totalAmount: stage1TotalAmount,
        };
        const stage2LeadsDetails = {
            leads: stage2Leads,
            totalAmount: stage2TotalAmount,
        };
        const stage3LeadsDetails = {
            leads: stage3Leads,
            totalAmount: stage3TotalAmount,
        };
        const stage4LeadsDetails = {
            leads: stage4Leads,
            totalAmount: stage4TotalAmount,
        };
        const stage5LeadsDetails = {
            leads: stage5Leads,
            totalAmount: stage5TotalAmount,
        };
        const stage6LeadsDetails = {
            leads: stage6Leads,
            totalAmount: stage6TotalAmount,
        };

        setStage1Leads(stage1LeadsDetails);
        setStage2Leads(stage2LeadsDetails);
        setStage3Leads(stage3LeadsDetails);
        setStage4Leads(stage4LeadsDetails);
        setStage5Leads(stage5LeadsDetails);
        setStage6Leads(stage6LeadsDetails);
        // console.log(`s1:`, stage1Leads);
    }, [leads]);

    // Box
    const Box = ({ leadsDetails, stageID, stage }) => (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{stage}</h5>
                    <h5 className="lead-price">
                        &#8377; {leadsDetails.totalAmount?.toFixed(2)}
                    </h5>
                </div>
                <Link
                    to={`/leads/create/${stageID}`}
                    className="btn btn-sm btn-primary"
                >
                    Create Lead
                </Link>
            </Card.Header>
            <Card.Body className="overflow-y-auto">
                {leadsDetails.leads?.map((lead) => (
                    <ListGroup key={lead.id}>
                        <ListGroupItem>
                            <div className="d-flex justify-content-between">
                                <strong className="fs-6">
                                    {lead.client_name}
                                </strong>
                                <Link to={`/leads/view/${lead.id}`}>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        id="eye-icon"
                                    />
                                </Link>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faUser} width={9} />
                                <span>{lead.salesperson.name}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <strong>₹</strong>
                                <span>{lead.total_amount}</span>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                ))}
            </Card.Body>
        </Card>
    );

    return (
        <div>
            <Header notification={notification} />
            <Sidebar />
            <div className="leads">
                <div className="d-flex justify-content-between align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Leads
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-sm btn-primary"
                        to="/leads/create/1"
                    >
                        Create Lead
                    </Link>
                </div>

                <div className="card-list">
                    <Box leadsDetails={stage1Leads} stageID={1} stage={"New"} />
                    <Box
                        leadsDetails={stage2Leads}
                        stageID={2}
                        stage={"Follow-Up"}
                    />
                    <Box
                        leadsDetails={stage3Leads}
                        stageID={3}
                        stage={"Visit"}
                    />
                    <Box
                        leadsDetails={stage4Leads}
                        stageID={4}
                        stage={"Negotiation"}
                    />
                    <Box leadsDetails={stage5Leads} stageID={5} stage={"Won"} />
                    <Box
                        leadsDetails={stage6Leads}
                        stageID={6}
                        stage={"Lost"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Leads;
