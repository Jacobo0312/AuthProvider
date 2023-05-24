import React, { useEffect } from "react";
import Table from "../components/Table";
import UserService from "../services/users.services";
import { User } from "../interfaces/User";

const UsersTable = () =>{

      const userService = new UserService();
      const [users, setUsers] = React.useState<User[]>([]);

      const handleDelete = (item:any) => {
        userService.deleteUser(item.username).then((response) => {
    
        if(response.status===204){
          alert("User deleted");
          window.location.reload();
        }
      })
    
      }

      useEffect(() => {
        userService.getUsers().then((response) => {
          const users = response as  User[]; 
          console.log(users);
          setUsers(users);
        })
      }, [])
      
    
  
      const columns = [
        { heading: 'Username', value: 'username' },
        { heading: 'Password', value: 'password' },
        { heading: 'Last Login', value: 'lastLogin' },
      ];

    return(
        <div className="Table" >
            <h1 className="Table-title">Users Table</h1>
            <Table data={users} column={columns} handleDelete={handleDelete}></Table>
        </div>
        );
    }


export default UsersTable;