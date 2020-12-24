import React from "react";
import { Container } from "reactstrap";

export default function Footer() {
	return (
		<div>
			<Container
				fluid
				tag="footer"
				className="text-center bg-info text-white fixed-bottom p-3"
			>
				Developed By devshubham.js
			</Container>
		</div>
	);
}
