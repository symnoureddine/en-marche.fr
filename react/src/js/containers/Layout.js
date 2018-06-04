import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from './../actions/user';

import Nav from './../components/Nav';
import Header from './../components/Header';

class Layout extends Component {
    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {
        const { children, user } = this.props;
        return (
            <div>
                <Header name={`${user.firstName} ${user.lastName}`} />
                <Nav />
                {children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    committees: state.stats.committees,
    user: state.user.user,
});

export default withRouter(connect(mapStateToProps, actionCreators)(Layout));

Layout.propTypes = {
    name: PropTypes.string,
    children: PropTypes.element.isRequired,
};
