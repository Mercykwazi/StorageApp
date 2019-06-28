import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import history from "../../history"

class RentedUnites extends React.Component {
    constructor() {
        super()
        this.state = {
            reservedRoomDetails: [],
            errorMessage: "",
            err: false,
        }
        this.reservedDetailsOfRoom = this.reservedDetailsOfRoom.bind(this);
        this.next = this.next.bind(this)
    }

    async reservedDetailsOfRoom() {
        var token = sessionStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(token)
        var decodedEmail = decodedToken.email
        var reservedDetails = await axios.get("http://localhost:3003/reserved/" + decodedEmail)
        var results = reservedDetails.data
        this.setState({ reservedRoomDetails: results })
    }
    componentDidMount() {
        this.reservedDetailsOfRoom()
    }
    next(e) {
        e.preventDefault()
        history.push('/view-location')
    }
    removeUnit(){

    }

    render() {
        return (
            <div>
                <h1 className="storage">your ranted unites </h1>
                <table >
                    <thead>
                        <tr>
                            <th>Physical Address</th>
                            <th>Region/Province</th>
                            <th>Country</th>
                            <th>Name</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Height</th>
                            {/* <th>RemoveOrder</th> */}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservedRoomDetails.map(room => {
                            console.log("what is room",room)
                            return <tr name={`row-${room.id}`} key={this.state.reservedRoomDetails.indexOf(room)}>
                                <td>{room.address1}</td>
                                <td>{room.address2}</td>
                                <td>{room.country}</td>
                                <td>{room.name}</td>
                                <td>{room.length}</td>
                                <td>{room.width}</td>
                                <td>{room.height}</td>
                                {/* <td>{this.removeUnit}</td> */}
                                

                            </tr>
                        })}
                    </tbody>
                </table><br/>
                    {/* <button className="button" onClick={this.removeUnit}>Remove</button><br/> */}
                <button onClick={this.next} className="Done">Done</button>
            </div>
        )
    }
}
export default (RentedUnites)