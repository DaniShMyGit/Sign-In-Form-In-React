import React from "react";

export class userPage extends React.Component {

    render() {
       
        return (
            <div>
                <h2> Welcome {this.props.match.params.fullname}</h2>
            </div>
        );
    }
}

export default userPage;