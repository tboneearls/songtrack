import React, { Component } from 'react';
import SongContainer from '../../SmartComponents/SongContainer';
import PracticeLogContainer from '../../SmartComponents/PracticeLogContainer';
import EditUserModal from '../../SmartComponents/EditUserModal';
import UserProfile from '../../DumbComponents/UserProfile';
import '../../index.css';

class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditUser: false,
			viewSongs: false,
			viewPracticeLogs: false
		}
	}
	editUser = async (editedUser) => {
	    const id = this.state.userId;
	    const user = await fetch('http://localhost:9292/users/' + id, {
	    	method: 'PUT',
	    	body: JSON.stringify(editedUser)
	    })
	    const response = await user.json();

	    const editedUserIndex = this.state.users.findIndex((user) => {
	    	return user.id == response.updated_users.id;
	    });
	    this.state.employees[editedUserIndex] = response.updated_user;
	    this.setState({
	    	editedUser: `${response.updated_user}`
	    })
	}
	deleteUser = async (e) => {
	    const id = e.currentTarget.parentNode.parentNode.id;
	    console.log(id, " this is the id of the employee we're trying to delete");
	    const users = await fetch ('http://localhost:9292/users/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	users: this.state.users.filter((user) => user.id != id)
	    });
	}
	showSongView = (e) => {
		e.preventDefault();
		this.setState({
			viewSongs: true
		})
	}
	hideSongView = (e) => {
		e.preventDefault();
		this.setState({
			viewSongs: false
		})
	}
	showPracticeLogView = (e) => {
		e.preventDefault();
		this.setState({
			viewPracticeLogs: true
		})
	}
	hidePracticeLogView = (e) => {
		e.preventDefault();
		this.setState({
			viewPracticeLogs: true
		})
	}
	render() {
		return(
			<div>
				{ !this.state.viewPracticeLogs ?
					<div>
				    { !this.state.viewSongs ? 
						<div>
							{ this.state.showEditUser ?
								<EditUserModal />
							:	<UserProfile users={this.props.users} userId={this.props.userId} doLogOut={this.props.doLogOut} deleteUser={this.deleteUser} showSongView={this.showSongView} showPracticeLogView={this.showPracticeLogView} />	
							}
						</div>
					: <SongContainer songs={this.props.songs} userId={this.props.userId} doLogOut={this.props.doLogOut} />
					}
					</div>
				:   <PracticeLogContainer practicelogs={this.props.practicelogs} userId={this.props.userId} doLogOut={this.props.doLogOut} />
				}
			</div>
		);
	}
}

export default UserContainer;