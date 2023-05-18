import React, { useEffect } from "react";
import Table from "../components/Table";
import UserService from "../services/users.services";
import { User } from "../interfaces/User";

const UsersTable = () =>{

      const userService = new UserService();
      const [users, setUsers] = React.useState<User[]>([]);

      useEffect(() => {
        userService.getUsers().then((response) => {
          const users = response as  User[]; 
          console.log(users);
          setUsers(users);
        })
      }, [])
      
    
  
      const columns = [
        { heading: 'ID', value: 'id' },
        { heading: 'Username', value: 'username' },
        { heading: 'Password', value: 'password' },
        { heading: 'Last Login', value: 'lastLogin' },
      ];

    return(
        <div className="Table" >
            <h1>Users Table</h1>
            <Table data={users} column={columns}></Table>
        </div>
        );
    }


export default UsersTable;