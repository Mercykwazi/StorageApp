import React from 'react';
import axios from 'axios';

class availableUnits extends React.Component {
    constructor() {
        super()
        this.state = {
            storage: []
        }
        this.viewStorage = this.viewStorage.bind(this);
    }

    async  viewStorage() {
        var storageDetails = await axios.get('http://localhost:3003/available-units')
        var finalStorageDetails = storageDetails.data.rows
        this.setState({ storage: finalStorageDetails })
    }
    componentDidMount() {
        this.viewStorage()
    }
    render() {
        return (
            <div>
                <h1>Available units</h1>
                <table >
                    <thead>
                        <tr>
                            <th>unit Name:</th>
                            <th>physical address</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.storage.map(room => {
                            return <tr name={`row-${room.id}`} key={this.state.storage.indexOf(room)}>
                                <td>{room.name}</td>
                                <td>{room.address1}</td>
                                <td>{room.country}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
             
            </div>

        )
    }
}
export default (availableUnits)