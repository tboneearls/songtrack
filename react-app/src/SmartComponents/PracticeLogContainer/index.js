import React, { Component } from 'react';
// import UserContainer from '../UserContainer';
import CreatePracticeLogModal from '../../SmartComponents/CreatePracticeLogModal';
import EditPracticeLogModal from '../../SmartComponents/EditPracticeLogModal';
import PracticeLogView from '../../DumbComponents/PracticeLogView';
import '../../index.css';

class PracticeLogContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditPracticeLog: false,
			showCreatePracticeLog: false
		}
	}
	showCreatePracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showCreatePracticeLog: true,
			showEditPracticeLog: false
		})
	}
	hideCreatePracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showCreatePracticeLog: false,
			showEditPracticeLog: false
		})
	}
	showEditPracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditPracticeLog: true,
			showCreatePracticeLog: false
		})
	}
	hideEditPracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditPracticeLog: false,
			showCreatePracticeLog: false
		})
	}
	editPracticeLog = async (editedPracticeLog, e) => {
	    const id = e.currentTarget.parentNode.id;
	    const practicelog = await fetch('http://localhost:9292/practicelogs/' + id, {
	    	credentials: 'include',
	    	method: 'PUT',
	    	body: JSON.stringify(editedPracticeLog)
	    })
	    const response = await practicelog.json();

	    const editedPracticeLogIndex = this.props.practicelogs.findIndex((practicelog) => {
	    	return Number(practicelog.id) === Number(response.updated_practicelog.id);
	    });
	    this.props.practicelogs[editedPracticeLogIndex] = response.updated_practicelog;
	    this.setState({
	    	editedPracticeLog: `${response.updated_practicelog}`
	    })
	}
	deletePracticeLog = async (e) => {
	    const id = e.currentTarget.parentNode.id;
	    const practicelogs = await fetch ('http://localhost:9292/practicelogs/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	practicelogs: this.props.practicelogs.filter((practicelog) => Number(practicelog.id) !== Number(id))
	    });
	}
	render() {
		return (
			<div>
				{ !this.state.showCreatePracticeLog ?
					<div>
						{ this.state.showEditPracticeLog ? 
							<EditPracticeLogModal editPracticeLog={this.editPracticeLog} hideEditPracticeLogModal={this.hideEditPracticeLogModal} doLogOut={this.props.doLogOut} />
						:   <PracticeLogView practicelogs={this.props.practicelogs} userId={this.props.userId} doLogOut={this.props.doLogOut} hidePracticeLogView={this.props.hidePracticeLogView} showSongView={this.props.showSongView} deletePracticeLog={this.deletePracticeLog} showCreatePracticeLogModal={this.showCreatePracticeLogModal} showEditPracticeLogModal={this.showEditPracticeLogModal} />
						}
					</div>
				:   <CreatePracticeLogModal hideCreatePracticeLogModal={this.hideCreatePracticeLogModal} hidePracticeLogView={this.props.hidePracticeLogView} doLogOut={this.props.doLogOut} />
				}
			</div>
		)
	}
}

export default PracticeLogContainer;