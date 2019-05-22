import React from "react";
import "./Homepage.css";

const Homepage = ({ history }) => {
	return (
		<div className="homepage">
			<div className="ui vertical masthead center aligned segment">
				<div className="ui text container">
					<h1 className="ui inverted stackable header">
						<div className="content">Manehabi</div>
					</h1>
					<h2>Do whatever you want to do</h2>
					<div
						onClick={() => history.push("/habits")}
						className="ui huge white inverted button ">
						皆の習慣を見てみる
						<i className="right arrow icon" />
					</div>
					<div
						onClick={() => history.push("/signup")}
						className="ui huge white inverted button">
						会員登録
						<i className="right arrow icon" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
