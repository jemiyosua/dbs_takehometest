import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Col, Modal, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { IconFamily, IconAddUser } from '../assets'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Markup } from 'interweave'

const FamilyList = () => {

    const location = useLocation();

    const [Familys, setFamilys] = useState("");
    const [DetailFamily, setDetailFamily] = useState("");

    const [DetailFamilyTemp, setDetailFamilyTemp] = useState("");

    const [ModalFamily, setModalFamily] = useState(false)
    const [IdFamily, setIdFamily] = useState("")
    const [ParentFamily, setParentFamily] = useState("")

    const [SuccessMessage, setSuccessMessage] = useState("")
    const [ShowAlert, setShowAlert] = useState(false)

    const [Method, setMethod] = useState("")

    useEffect(() => {

        var Familys = [
            {Id: 1, Name: 'Andy', EKTP: '1231231231123123', Address: 'Jl. Taman Raya', Job: 'Karyawan', DOB: '1-Jan-1990', PhoneNumber: [{SubPhoneNumber: '082118009042'},{SubPhoneNumber:'1234567890'}], FamilyCount: 3},
            {Id: 2, Name: 'Budi', EKTP: '1234567890123456', Address: 'Jl. Palmerah Raya', Job: 'IT', DOB: '1-Des-1998', PhoneNumber: [{SubPhoneNumber:'0123456789'}], FamilyCount: 2}
        ]

        setFamilys(Familys)

        if (location.state == null) {
            setSuccessMessage("");
            setShowAlert(false);
        } else {

            var DOB = location.state.dob
            var DOBSplit = DOB.split("-")
            var TahunFix = DOBSplit[0]
            var Bulan = DOBSplit[1]
            var BulanFix = ""
            if (Bulan == "O1") {
                BulanFix = "Jan"
            } else if (Bulan == "02") {
                BulanFix = "Feb"
            } else if (Bulan == "03") {
                BulanFix = "Mar"
            } else if (Bulan == "04") {
                BulanFix = "Apr"
            } else if (Bulan == "05") {
                BulanFix = "Mei"
            } else if (Bulan == "06") {
                BulanFix = "Jun"
            } else if (Bulan == "07") {
                BulanFix = "Jul"
            } else if (Bulan == "08") {
                BulanFix = "Aug"
            } else if (Bulan == "09") {
                BulanFix = "Sept"
            } else if (Bulan == "10") {
                BulanFix = "Okt"
            } else if (Bulan == "11") {
                BulanFix = "Nov"
            } else {
                BulanFix = "Des"
            }

            var Tanggal = DOBSplit[2]
            var TanggalFix = ""
            if (Tanggal == "01") {
                TanggalFix = "1"
            } else if (Tanggal == "02") {
                TanggalFix = "2"
            } else if (Tanggal == "03") {
                TanggalFix = "3"
            } else if (Tanggal == "04") {
                TanggalFix = "4"
            } else if (Tanggal == "05") {
                TanggalFix = "5"
            } else if (Tanggal == "06") {
                TanggalFix = "6"
            } else if (Tanggal == "07") {
                TanggalFix = "7"
            } else if (Tanggal == "08") {
                TanggalFix = "8"
            } else if (Tanggal == "09") {
                TanggalFix = "9"
            } else {
                TanggalFix = Tanggal
            }
            var DOBFix = TanggalFix + "-" + BulanFix + "-" + TahunFix

            setFamilys([...Familys, {
                Id: 3, 
                Name: location.state.name, 
                EKTP: location.state.ktp, 
                Address: location.state.address, 
                Job: location.state.job, 
                DOB: DOBFix, 
                PhoneNumber: location.state.phonenumber, 
                FamilyCount: location.state.familycount,
            }])

            setDetailFamilyTemp(location.state.familymember)
            setSuccessMessage(location.state.Message);
            setShowAlert(true);
        }

      }, []);

    const PageInsert = () => {
        window.location.href="insert"
    }

    const handleModalDetailFamily = (Id, Name) => {
        var DetailFamilyFirst = [
            {IdDetail: 1, Name: 'Stuart', DOB: '1-Jan-2005', Relationship: 'Brother'},
            {IdDetail: 2, Name: 'Angel', DOB: '1-Mar-2006', Relationship: 'Sister'},
            {Iddetail: 3, Name: 'Kim', DOB: '1-Des-2007', Relationship: 'Sister'}
        ]

        var DetailFamilySecond = [
            {IdDetail: 1, Name: 'Chris', DOB: '1-Jan-2005', Relationship: 'Brother'},
            {IdDetail: 2, Name: 'Anna', DOB: '1-Mar-2006', Relationship: 'Child'}
        ]

        if (Id == 1) {
            setDetailFamily(DetailFamilyFirst)
        } else if (Id == 2) {
            setDetailFamily(DetailFamilySecond)
        } else {
            setDetailFamily(DetailFamilyTemp)
        }
        
        setParentFamily(Name)
        setModalFamily(true)
    }

    return (
        <div style={{ padding:50 }}>
            
            {SuccessMessage != "" ?
            <SweetAlert 
                success 
                show={ShowAlert}
                onConfirm={() => {
                    setShowAlert(false)
                    setSuccessMessage("")
                    window.history.replaceState({}, document.title)
                }}
                btnSize="sm">
                {SuccessMessage}
            </SweetAlert>
            :""}      
            
            <img src={IconFamily} style={{ width:50 }}></img>
            
            <hr/>

            <div style={{ marginTop:30, marginBottom:30, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h3 style={{ fontWeight:'bold' }}>List Users</h3>
                <Button variant="primary" onClick={PageInsert}>Create New User</Button>
            </div>

            <Table cellspacing="0" border={1} cellpadding="7" style={{ width:'100%', borderColor:'#FFFFFF' }}>
                <Thead>
                    <Tr style={{ color:"#FFFFFF",textAlign:'left', backgroundColor:'#1572A1' }}>
                        <Th>Name</Th>
                        <Th>eKTP</Th>
                        <Th>Address</Th>
                        <Th>Job</Th>
                        <Th>Date of Birth</Th>
                        <Th>Phone Number</Th>
                        <Th>Family</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Familys.length > 0 && Familys.map(( item,index )=> {
                        return <Tr style={{ backgroundColor:index%2==0?'#D2DAFF':'#AAC4FF' }}>
                            <td>{item.Name}</td>
                            <td>{item.EKTP}</td>
                            <td>{item.Address}</td>
                            <td>{item.Job}</td>
                            <td>{item.DOB}</td>
                            <td>
                                {/* {item.PhoneNumber.includes(",") ? <Markup content={item.PhoneNumber.replace(",", "\n")}/> : item.PhoneNumber} */}
                                {item.PhoneNumber.map(( item,index ) => {
                                    return item.SubPhoneNumber + ","
                                    
                                })}
                            </td>
                            <td>
                                {item.FamilyCount != 0 ? <Button variant="info btn-sm" onClick={() => handleModalDetailFamily(item.Id, item.Name)}>Show ({item.FamilyCount})</Button> : ""}
                                {/* <button style={{ padding:5, borderTopLeftRadius:5, borderTopRightRadius:5, borderBottomRightRadius:5, borderBottomLeftRadius:5, color:'#FFFFFF', backgroundColor:'#1572A1', cursor:'pointer' }} onClick={() => ></button> */}
                            </td>
                        </Tr>;
                    })}
                </Tbody>
            </Table>

            <Modal
                show={ModalFamily}
                // onHide={() => setModalAddNew(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ borderRadius:10 }}
                >
                <Modal.Body>

                    <div style={{ fontWeight:'bold' }}>List Detail Family of {ParentFamily}</div>

                    <hr/>

                    <div>
                        <Table cellspacing="0" border={1} cellpadding="7" style={{ width:'100%', borderColor:'#FFFFFF' }}>
                            <Thead>
                                <Tr style={{ color:"#FFFFFF",textAlign:'left', backgroundColor:'#1572A1' }}>
                                    <Th>Name</Th>
                                    <Th>Date of Birth</Th>
                                    <Th>Relationship Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                { DetailFamily.length > 0 && DetailFamily.map(( item,index ) => {
                                    return <Tr style={{ backgroundColor:index%2==0?'#D2DAFF':'#AAC4FF' }}>
                                        <td>{item.Name}</td>
                                        <td>{item.DOB}</td>
                                        <td>{item.Relationship}</td>
                                    </Tr>;
                                })}
                            </Tbody>
                        </Table>
                    </div>

                </Modal.Body>
                
                <div style={{ display:'flex', justifyContent:'flex-end', padding:15, alignItems:'center' }}>
                    <div style={{ backgroundColor:'#3A379F', borderTopLeftRadius:8, borderTopRightRadius:8, borderBottomLeftRadius:8, borderBottomRightRadius:8, padding:10, width:150 }}>
                        <div style={{ color:'#FFFFFF', textAlign:'center', fontWeight:'bold', cursor:'pointer' }} onClick ={() => setModalFamily(false)}>Close</div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}
 
export default FamilyList