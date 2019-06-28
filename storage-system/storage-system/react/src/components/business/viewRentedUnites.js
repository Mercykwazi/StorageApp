import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class RentedBusinessUnites extends React.Component {
    constructor() {
        super()
        this.state = {
            reservedRoomDetails: [],
        }
        this.reservedRooms = this.reservedRooms.bind(this);
    }

    async reservedRooms() {
        var token = sessionStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(token)
        var decodedEmail = decodedToken.email
        var reservedDetails = await axios.get("http://localhost:3003/businessReservedRoom/" + decodedEmail)
        var results = reservedDetails.data
        this.setState({ reservedRoomDetails: results })
    }
    componentDidMount() {
        this.reservedRooms()
    }

    render() {
        return (
            <div>
                <h1 className="storage">Reserved Unites </h1>
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
                            <th>Customer EmailAddress</th>


                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservedRoomDetails.map(room => {
                            return <tr name={`row-${room.id}`} key={this.state.reservedRoomDetails.indexOf(room)}>
                                <td>{room.address1}</td>
                                <td>{room.address2}</td>
                                <td>{room.country}</td>
                                <td>{room.name}</td>
                                <td>{room.length}</td>
                                <td>{room.width}</td>
                                <td>{room.height}</td>
                                <td>{room.contact_email}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        )
    }
}
export default (RentedBusinessUnites)