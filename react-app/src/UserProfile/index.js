import React from 'react';
import './style.css';

const UserProfile = ({users, userId}) => {
	const currentUser = users.filter(user => user.id === userId);
	const shownUser = currentUser[0];
	const listUserAttributes = () => {
		return (
			<div>
				<li><b>Email:</b> {shownUser.email}</li>
				<li><b>Name:</b> {shownUser.name}</li>
				<li><b>School:</b> {shownUser.school}</li>
				<li><b>Grade:</b> {shownUser.grade}</li>
				<li><b>Student Phone:</b> {shownUser.student_phone}</li>
				<li><b>Student Text Enabled:</b> { shownUser.text_student ? "Yes" : "No" } </li>
				<li><b>Parent Phone:</b> {shownUser.parent_phone}</li>
				<li><b>Parent Text Enabled:</b> { shownUser.text_parent ? "Yes" : "No" } </li>
				<li><b>Lesson Location:</b> {shownUser.lesson_location}</li>
				<li><b>Lesson Day:</b> {shownUser.lesson_day}</li>
				<li><b>Lesson Time:</b> {shownUser.lesson_time}</li>
				<li><b>Additional Information:</b> {shownUser.additional_info}</li>
			</div>
		)
	}
	return (
		<ul>
			{listUserAttributes()}
		</ul>
	);
}

export default UserProfile;