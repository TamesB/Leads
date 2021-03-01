import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react'
  
export class HeaderMenu extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
  
    state = {}

    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { activeItem } = this.state

        const authLinks = (
          <Fragment>
              <Menu.Item
                as={ Link } to="/"
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              >
                Home
              </Menu.Item>
            <Menu.Item
                position="right"
                name='logout'
                active={activeItem === 'logout'}
                onClick={() => {this.handleItemClick; this.props.logout()}}
              >
                Logout
              </Menu.Item>
          </Fragment>

        );
        
        const guestLinks = (
          <Fragment>
              <Menu.Item                
                as={ Link } to="/login"
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              >
                Login
              </Menu.Item>
              <Menu.Item
                position="right"
                as={ Link } to="/register"
                name='register'
                active={activeItem === 'register'}
                onClick={this.handleItemClick}
              >
                Register
              </Menu.Item>
          </Fragment>
        );

        return (
            <Menu style={{margin: '0 0 2vh 0'}}>
              <Menu.Item>
                <img src='https://react.semantic-ui.com/logo.png' />
              </Menu.Item>
              { isAuthenticated ? authLinks : guestLinks}
            </Menu>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(HeaderMenu)
