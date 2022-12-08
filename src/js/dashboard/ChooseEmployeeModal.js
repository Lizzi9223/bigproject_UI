import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useCookies } from 'react-cookie';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import '../../css/ChooseEmployeeModal.css';

export default function ChooseEmployeeModal(props) {
  const[cookies, setCookie, removeCookie] = useCookies(["token"]);
  const[employees, setEmployees] = useState([]);
  const[inputText, setInputText] = useState("");

  useEffect(() => {
    getEmployees();               
  }, []);

  useEffect(() => {
    setInputText("");             
  }, [props]);

  const getEmployees = () => {
    axios
    .get("/employee/all")
    .then(response => response.data)
    .then((data) =>{             
        if(data){
            setEmployees(data);            
        }                                   
    })
    .catch((error) => {
      //TODO
    });  
  }

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  const filteredUsers =  Object.values(employees).filter((employee) =>{
    let fullName = (employee.user.name + ' ' + employee.user.surname).toLowerCase();
    if(inputText === ''){
      if(props.assignee != null && props.reporter != null){
        let assigneeFullName = (props.assignee.user.name + ' ' + props.assignee.user.surname).toLowerCase();
        let reporterFullName = (props.reporter.user.name + ' ' + props.reporter.user.surname).toLowerCase();
        return fullName === assigneeFullName || fullName === reporterFullName;
      } else return;
    } else {      
      return fullName.startsWith(inputText);
    }
  });

  return (
    <Modal className='choose-employee-modal'
      {...props}
      centered
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title className='title'>
        <div style={{width:'100%'}}>
          <InputGroup>
            <Form.Control placeholder="Name Surname" aria-label="Name Surname" aria-describedby="basic-addon1" onChange={inputHandler} />
            <InputGroup.Text id="basic-addon1"><i className="bi bi-search"></i></InputGroup.Text>
          </InputGroup>
        </div>     
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>    
        <div>
        {
          filteredUsers.map((employee) => 
            <div className='item  list-group-item' onClick={() => props.submitChange(employee)}> 
              <div className='pretty-select'>
                <div className='pretty-select-container'>
                    <div className="col-lg-3">
                      <img className="photo" src={`data:image/jpeg;base64,${employee.photo}`} style={{width: "65px", height: "65px"}}/>
                    </div>
                    <div className="col-lg-5 name">
                      {employee.user.name+' '+employee.user.surname}
                    </div>
                    <div className="col-lg-4 position">
                      <i className="bi bi-briefcase"></i>&nbsp;{employee.position}
                    </div>                                 
                </div>         
              </div>
              <hr/>
            </div> 
          )
        }
        </div>
      </Modal.Body>
    </Modal>
  );  
}