import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Card, Table } from "react-bootstrap";
import quotesAPI from "../../api/quotesAPI";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function Quotes() {
    const [quotes, setQuotes] = useState([]);
    const { authToken } = useContext(AuthContext);
    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await quotesAPI.getAllQuotes(authToken);
            setQuotes(data.quotes);
            // console.log(data);
        };

        fetchData();
    }, []);

    const handleDelete = async (quoteID) => {
        try {
            const data = await quotesAPI.deleteQuoteByID(quoteID, authToken);
            if (data.resType === "success") {
                setQuotes((prevQuotes) =>
                    prevQuotes.filter((quote) => quote.id !== quoteID)
                );
            }
            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
        } catch (error) {
            console.error("Error deleting quote:", error);
        }
    };

    return (
        <>
            <Header notification={notification} />
            <Sidebar />
            <main>
                <div className="d-flex justify-content-between my-2 align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Quotes
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-sm btn-success"
                        to={"create-quote"}
                    >
                        Create Quote
                    </Link>
                </div>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Subject</th>
                                    <th>Sales Person</th>
                                    <th>Person</th>
                                    <th>Sub Total</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Adjustment</th>
                                    <th>Grand Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotes?.map((quote, index) => (
                                    <tr key={quote.id}>
                                        <td>{index + 1}</td>
                                        <td>{quote.subject}</td>
                                        <td>{quote.salesperson.name}</td>
                                        <td>{quote.contact.name}</td>
                                        <td>{quote.sub_total}</td>
                                        <td>{quote.total_discount}</td>
                                        <td>{quote.total_tax}</td>
                                        <td>{quote.adjustment}</td>
                                        <td>{quote.grand_total}</td>
                                        <td className="d-flex gap-2">
                                            <Link
                                                to={`update-quote/${quote.id}`}
                                                className="btn btn-sm btn-success"
                                            >
                                                Edit
                                            </Link>
                                            <DeleteConfirmationModal
                                                handleDelete={() =>
                                                    handleDelete(quote.id)
                                                }
                                                notification={notification}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </main>
        </>
    );
}
