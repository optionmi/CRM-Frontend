import React, {useContext} from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Card, Form, Button} from 'react-bootstrap';
import expenseAPI from '../../api/expenseAPI';
import AuthContext from '../../context/AuthContext';
import {useNavigate } from 'react-router-dom';

function CreateExpense() {

    let {authToken} = useContext(AuthContext)

    const navigate = useNavigate()

    const date= new Date().toISOString().split('T')[0];

    const handleCreateExpense = (e) => {
      e.preventDefault()
      const expenseData = {
        expense_description: e.target.expense_description.value,
        amount: e.target.amount.value
      }

      expenseAPI.createExpense(expenseData, authToken)
      .then(() => {
        console.log('Created !!!')
        // navigate('/attendance')
      }).catch((error) => {
        console.error('Error creating Expense:', error);
      });

    };

  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="publisher">
          <h4>Create Expense</h4>
          <Card className="create-publisher-card shadow-sm" style={{'background': 'white', 'height': 'fit-content'}} >
            <Card.Body className='create-publisher-card-body'>
              <Form className='create-publisher-form' onSubmit={handleCreateExpense}>
                <div className="row">

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="date" className='create-publisher-form-group'>
                      <Form.Label>Date</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      value={date}
                      name='date'
                      disabled
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="expense-description" className='create-publisher-form-group'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Description"
                      name='expense_description'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="amount" className='create-publisher-form-group'>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control className='form-contol'
                      type="number"
                      placeholder="Amount"
                      name='amount'
                      required
                      />
                    </Form.Group>
                  </div>

                </div>

                <div className='create-form-btn'>
                  <Button variant="primary" type="submit" className="w-100 create-publisher-form-group create-publisher-button" >
                    Create Expense
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
    </div>
  );
}

export default CreateExpense