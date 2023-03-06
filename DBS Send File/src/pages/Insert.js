import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Input, TextArea } from '../components'
import { IconFamily, IconBack, IconAccept } from '../assets'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Markup } from 'interweave';

let nextId = 0;

const InserNewUser = () => {

    const navigate = useNavigate();

    const [Familys, setFamilys] = useState([]);
    const [NewFamilys, setNewFamilys] = useState([]);
    
    const [PhoneNumbers, setPhoneNumbers] = useState([]);

    const [FamilysCount, setFamilysCount] = useState(0);
    const [Relationship, setRelationship] = useState("");

    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [KTP, setKTP] = useState("");
    const [Job, setJob] = useState("");
    const [DOB, setDOB] = useState("");
    const [Phone, setPhone] = useState("");

    const [NameMembers, setNameMembers] = useState("");
    const [DOBMembers, setDOBMembers] = useState("");
    const [RelationshipMembers, setRelationshipMembers] = useState("");

    const [ValidationMessage, setValidationMessage] = useState("")
    const [ShowAlert, setShowAlert] = useState(false)

    const [IndexCountFamilyMember, setIndexCountFamilyMember] = useState(0);
    const [IndexCountPhone, setIndexCountPhone] = useState(0);

    const [IndexPhoneNumber, setIndexPhoneNumber] = useState("");
    const [IcAccept, setIcAccept] = useState(false)


    useEffect(() => {
        setFamilysCount(Familys.length)
    }, []);

    const handleClickFamilyMember = () => {
        if (NameMembers == "") {
            setShowAlert(true)
            setValidationMessage("Name Members cannot be null")
            return
        } else if (DOBMembers == "") {
            setShowAlert(true)
            setValidationMessage("DOB Members cannot be null")
            return
        } else if (RelationshipMembers == "") {
            setShowAlert(true)
            setValidationMessage("Relationship Members cannot be null")
            return
        } else {
            Familys.push({
                Name: NameMembers,
                DOB: DOBMembers,
                Relationship: RelationshipMembers,
            })
            setFamilysCount(Familys.length+1)
            setIndexCountFamilyMember(IndexCountFamilyMember+1)
        }
        setNameMembers("")
        setDOBMembers("")
        setRelationshipMembers("")
        console.log("Familys after push : " + JSON.stringify(Familys))
    }

    const handleClickPhoneNumber = () => {
        if (Phone == "") {
            setShowAlert(true)
            setValidationMessage("- Phone cannot be null")
            return
        } else {
            PhoneNumbers.push({
                SubPhoneNumber: Phone
            })
            setIndexCountPhone(IndexCountPhone+1)
        }
        setPhone("")
        console.log("PhoneNumbers after push : " + JSON.stringify(PhoneNumbers))
    }

    const PageHome = () => {
        window.location.href="/"
    }

    const SubmitData = () => {
        let validasiMessage = ""

        if (Name == "") { 
            validasiMessage = validasiMessage + "- Name cannot be null.\n"
        }

        if (Address == "") {
            validasiMessage = validasiMessage + "- Address cannot be null.\n"
        }

        if (KTP == "") {
            validasiMessage = validasiMessage + "- KTP cannot be null.\n"
        } else {
            if (KTP.length != 16) {
                validasiMessage = validasiMessage + "- KTP must be 16 digit.\n"
            }
        }

        if (Job == "") {
            validasiMessage = validasiMessage + "- Job cannot be null.\n"
        }

        if (DOB == "") {
            validasiMessage = validasiMessage + "- DOB cannot be null.\n"
        }

        if (Phone == "") {
            validasiMessage = validasiMessage + "- Phone cannot be null.\n"
        }

        if (validasiMessage != "") {
            setValidationMessage(validasiMessage);
            setShowAlert(true)
            return false;
        } else {
            PhoneNumbers.push({
                SubPhoneNumber: Phone
            })
            console.log("PhoneNumbers after push : " + JSON.stringify(PhoneNumbers))

            Familys.push({
                Name: NameMembers,
                DOB: DOBMembers,
                Relationship: RelationshipMembers,
            })
            console.log("Familys after push : " + JSON.stringify(Familys))

            navigate('/',{
                state: {
                    Message: "Success Create User",
                    name:Name,
                    address:Address,
                    ktp:KTP,
                    job:Job,
                    dob:DOB,
                    familycount: FamilysCount,
                    familymember: Familys,
                    phonenumber: PhoneNumbers
                }
            });
        }
    }
    
    return (
        <div style={{ padding:50 }}>
            
            {ValidationMessage != "" ?
            <SweetAlert
                show={ShowAlert}
                onConfirm={() => {
                    setShowAlert(false)
                    setValidationMessage("")
                }}
                onEscapeKey={() => setShowAlert(false)}
                onOutsideClick={() => setShowAlert(false)}
                btnSize="sm"
                >
                {() => (
                    <div>
                        <p style={{fontSize:'20px', textAlign:'left'}}><Markup content={ValidationMessage}/></p>
                    </div>
                )}
            </SweetAlert>
            :""}
            
            <img src={IconFamily} style={{ width:50 }}></img>
            
            <hr/>

            <div style={{ marginTop:30, marginBottom:30, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontWeight:'bold' }}><img src={IconBack} style={{ width:25, cursor:'pointer' }} onClick={PageHome}></img> Create New User</div>
            </div>

            <div style={{ display:'flex' }}>
                <Table>
                    <Tr>
                        <Td>Name</Td>
                        <Td>&nbsp;</Td>
                        <Td>
                            <Input 
                                type="text"
                                onChange={e => setName(e.target.value)} 
                            />
                        </Td>
                    </Tr>
                    <div style={{ marginBottom:10 }}></div>
                    <Tr>
                        <Td>Address</Td>
                        <Td>&nbsp;</Td>
                        <Td>
                            <TextArea
                                onChange={e => setAddress(e.target.value)} 
                            />
                        </Td>
                    </Tr>
                    <div style={{ marginBottom:10 }}></div>
                    <Tr>
                        <Td>eKTP</Td>
                        <Td>&nbsp;</Td>
                        <Td>
                            <Input 
                                type="text"
                                maxlength={16}
                                onChange={e => setKTP(e.target.value)} 
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                }}
                            />
                        </Td>
                    </Tr>
                    <div style={{ marginBottom:10 }}></div>
                    <Tr>
                        <Td>Job</Td>
                        <Td>&nbsp;</Td>
                        <Td>
                            <Input 
                                type="text" 
                                onChange={e => setJob(e.target.value)} 
                            />
                        </Td>
                    </Tr>
                    <div style={{ marginBottom:10 }}></div>
                    <Tr>
                        <Td>Date of Birth</Td>
                        <Td>&nbsp;</Td>
                        <Td>
                            <Input 
                                type="date" 
                                onChange={e => setDOB(e.target.value)} 
                            />
                        </Td>
                    </Tr>
                </Table>

                <div style={{ marginLeft:50 }}>
                    <Table>
                        <Tr>
                            <Td>Phone</Td>
                            <Td>&nbsp;</Td>
                            <Td>
                                <Input 
                                    type="text"
                                    onChange={e => setPhone(e.target.value)}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                />
                            </Td>
                        </Tr>
                        {IndexCountPhone > 0 && PhoneNumbers.map((item,index) => {
                        return  <Tr>
                                    <Td></Td>
                                    <Td>&nbsp;</Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            onChange={e => setPhone(e.target.value)}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                  event.preventDefault();
                                                }
                                            }}
                                        />
                                    </Td>
                                </Tr>;
                        })}
                        <Tr>
                            <Td></Td>
                            <Td>&nbsp;</Td>
                            <Td>
                                <Button variant="primary" style={{ width:'100%', marginTop:10 }} onClick={handleClickPhoneNumber}>Add Phone</Button>
                            </Td>
                        </Tr>
                    </Table>
                </div>
            </div>

            <div style={{ marginBottom:50 }}></div>

            <div style={{ marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontWeight:'bold' }}>Family Member ({FamilysCount})</div>
            </div>

            <Table cellspacing="0" border={1} cellPadding="7" style={{ width:'100%', borderColor:'#FFFFFF' }}>
                <Thead>
                    <Tr style={{ color:"#FFFFFF",textAlign:'left', backgroundColor:'#1572A1' }}>
                        <Th>Name</Th>
                        <Th>Date of Birth</Th>
                        <Th>Relationship Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr style={{ backgroundColor:'#D7E9F7' }}>
                        <td>
                            <Input 
                                type="text" 
                                onChange={e => setNameMembers(e.target.value)} 
                            />
                        </td>
                        <td>
                            <Input 
                                type="date" 
                                onChange={e => setDOBMembers(e.target.value)} 
                            />
                        </td>
                        <td>
                            <input 
                                type="radio"
                                name="RELATIONSHIP" 
                                value="BROTHER"
                                style={{padding:10}}
                                onChange={e => setRelationshipMembers(e.target.value)}
                            /> Brother
                            &nbsp;
                            &nbsp;
                            <input 
                                type="radio" 
                                name="RELATIONSHIP"
                                value="SISTER"
                                style={{padding:10}}
                                onChange={e => setRelationshipMembers(e.target.value)}
                            /> Sister
                            &nbsp;
                            &nbsp;
                            <input 
                                type="radio"
                                name="RELATIONSHIP"
                                value="PARENT"
                                style={{padding:10}}
                                onChange={e => setRelationshipMembers(e.target.value)}
                            /> Parent
                            &nbsp;
                            &nbsp;
                            <input
                                type="radio"
                                name="RELATIONSHIP" 
                                value="CHILD"
                                style={{padding:10}}
                                onChange={e => setRelationshipMembers(e.target.value)}
                            /> Child
                        </td>
                    </Tr>
                    {IndexCountFamilyMember > 0 && Familys.map(( item,index )=> {
                        return <Tr style={{ backgroundColor:index%2 == 0 ? '#D2DAFF' : '#AAC4FF' }}>
                            <td>
                                <Input 
                                    type="text"
                                    name={"phone_"+index}
                                    onChange={e => setNameMembers(e.target.value)}
                                />
                            </td>
                            <td>
                                <Input 
                                    type="date"
                                    onChange={e => setDOBMembers(e.target.value)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="radio"
                                    name={"RelationshipMembers_"+index}
                                    value="BROTHER"
                                    style={{padding:10}}
                                    onChange={event=>setRelationshipMembers(event.target.value)}
                                /> Brother
                                &nbsp;
                                &nbsp;
                                <input 
                                    type="radio" 
                                    name={"RelationshipMembers_"+index}
                                    value="SISTER"
                                    style={{padding:10}}
                                    onChange={event=>setRelationshipMembers(event.target.value)}
                                /> Sister
                                &nbsp;
                                &nbsp;
                                <input 
                                    type="radio"
                                    name={"RelationshipMembers_"+index}
                                    value="PARENT"
                                    style={{padding:10}}
                                    onChange={event=>setRelationshipMembers(event.target.value)}
                                /> Parent
                                &nbsp;
                                &nbsp;
                                <input
                                    type="radio"
                                    name={"RelationshipMembers_"+index}
                                    value="CHILD"
                                    style={{padding:10}}
                                    onChange={event=>setRelationshipMembers(event.target.value)}
                                /> Child
                            </td>
                        </Tr>;
                    })}
                </Tbody>
            </Table>

            <div style={{ marginBottom:10 }}></div>

            <Button style={{ width:200 }} onClick={handleClickFamilyMember}>Add Family Member</Button>

            <div style={{ marginBottom:10 }}></div>

            <Button style={{ width:200 }} variant="success" onClick={SubmitData}>Submit</Button>
        </div>
    )
}
 
export default InserNewUser