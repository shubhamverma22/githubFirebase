import React, { useState, useContext } from "react";
import Axios from "axios";

import {
	Row,
	Container,
	Col,
	Input,
	Button,
	InputGroup,
	InputGroupAddon,
} from "reactstrap";

import UserCard from "../components/UserCard";
import Repos from "../components/Repo";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const Home = () => {
	const context = useContext(UserContext);

	const [query, setQuery] = useState("");
	const [user, setUser] = useState(null);

	const fetchdetails = async () => {
		try {
			const { data } = await Axios.get(`https://api.github.com/users/${query}`);
			setUser(data);
		} catch (error) {
			toast("Not able to Locate User", { type: "error" });
		}
	};

	//put Anypage behind Login
	if (!context.user?.uid) {
		return <Redirect to="/signin" />;
	}

	return (
		<Container>
			<Row className=" mt-3">
				<Col md="5">
					<InputGroup>
						<Input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Please provide the username"
						/>
						<InputGroupAddon addonType="append">
							<Button onClick={fetchdetails} color="primary">
								Fetch User
							</Button>
						</InputGroupAddon>
					</InputGroup>
					{user ? <UserCard user={user} /> : null}
				</Col>
				<Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
			</Row>
		</Container>
	);
};

export default Home;
