import React from 'react';
import { Link } from 'react-router-dom';

import {
    ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Token, { User } from '../../utils/BackendAPI';
import { AppContext } from './App';

export function UserMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const context = React.useContext(AppContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    User.logout().then(() => {
      Token.authenticated = false;
      window.location.href = "/welcome";
    });
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // React.useEffect(() => {
  //   User.getUser().then((data) => {
  //     if (data.data !== undefined) {
  //       setUser(data.data.nickname);
  //     }
  //   });
  // }, []);

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem style={{ fontWeight: "bold" }}>
                    {context.user.get}
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={"/settings"}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
