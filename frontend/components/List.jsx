import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { SelectField } from "react-md/lib/SelectFields";
import  { fetchRooms, filterRooms } from "../redux/actions";
import PropTypes from 'prop-types';
import  { DataTable, TableHeader, TableRow, TableBody, TableColumn } from "react-md/lib/DataTables";
import { Route } from 'react-router-dom';


class List extends Component {

    constructor(props) {
        super(props);

        this.filterMenu = [{
            label: 'Все',
            value: 'ALL',
        }, {
            label: 'Свободные',
            value: 'FREE',
        }, {
            label: 'Забронированные',
            value: 'BOOK',
        }]
    }

    componentDidMount() {
        if(!this.props.rooms.length) {
            this.props.fetchRooms();
        }
    }

    render() {

        const { loading, rooms, roomFilter, filterRooms } = this.props;

        return (
            <main>
                <header>
                    <h1>Бронироване комнат</h1>
                    <SelectField
                        id="select-field-2"
                        defaultValue={roomFilter}
                        onChange={(value) => filterRooms(value)}
                        className={'select-field'}
                        dropdownIcon={<svg viewBox="0 0 24 24" id="arrow_drop_down" width="20%" height="100%"><path d="M7 10l5 5 5-5z"></path></svg>}
                        menuItems={this.filterMenu} />
                </header>
                {
                    loading ?
                        <h2>Loading...</h2>
                        :
                        <DataTable plain>
                            <TableHeader>
                                <TableRow>
                                    <TableColumn>Номер комнаты</TableColumn>
                                    <TableColumn>Имя</TableColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {
                                rooms.map((room, i) => <Route key={i} render={({history}) => (
                                        <TableRow  key={i} onClick={() => { history.push(`/room/${room.id}`) }}>
                                            <TableColumn>{room.number}</TableColumn>
                                            <TableColumn>{room.name ? room.name : '-'}</TableColumn>
                                        </TableRow>
                                    )} />
                                )
                            }
                            </TableBody>
                        </DataTable>
                }
            </main>
        );

    }

}

List.propTypes = {
    loading: PropTypes.bool.isRequired,
    rooms: PropTypes.array.isRequired,
    roomFilter: PropTypes.string.isRequired,
    fetchRooms: PropTypes.func.isRequired,
    filterRooms: PropTypes.func.isRequired
};

const getRooms = (rooms, filter) => {
    switch (filter) {
        case 'ALL':
            return rooms;
        case 'FREE':
            return rooms.filter(room => !room.name);
        case 'BOOK':
            return rooms.filter(room => room.name);
        default:
            return rooms
    }
};

const mapStateToProps = state => {
    return {
        loading: state.roomList.loading,
        rooms: getRooms(state.roomList.data, state.roomFilter),
        roomFilter: state.roomFilter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRooms: () => dispatch(fetchRooms()),
        filterRooms: (roomFilter) => dispatch(filterRooms(roomFilter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);