import React from "react";
import Table from "../components/Table";

class UsersTable extends React.Component{
    render(){
        
    
    const data = [
        { name: 'John', age: 25, address: { city: 'New York', country: 'USA' } },
        { name: 'Alice', age: 30, address: { city: 'London', country: 'UK' } },
        { name: 'Bob', age: 35, address: { city: 'Paris', country: 'France' } },
      ];
  
      const columns = [
        { heading: 'Name', value: 'name' },
        { heading: 'Age', value: 'age' },
        { heading: 'City', value: 'address.city' },
      ];

    return(
        <div className="Table" >
            <h1>Users Table</h1>
            <Table data={data} column={columns}></Table>
        </div>
        );
    }
}

export default UsersTable;