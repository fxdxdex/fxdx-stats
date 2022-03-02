import React, {useState, useEffect} from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import {motion, AnimatePresence} from "framer-motion";
import cx from "classnames";
import Bsc from './Bsc';
import Arbitrum from './Arbitrum';
import Avalanche from './Avalanche';
import Trading from './Trading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogoIcon from './img/logo.png';
import {FaSun, FaMoon, FaTimes} from "react-icons/fa";
import {FiX} from "react-icons/fi";
import {RiMenuLine} from 'react-icons/ri';

// eslint-disable-next-line react/prop-types
function AppHeaderLinks({mode, small, clickCloseIcon}) {
  return (
    <div className="App-header-links">
      {small &&
      <div className="App-header-links-header">
        <div className="App-header-menu-icon-block" onClick={() => clickCloseIcon()}>
          <FiX className="App-header-menu-icon"/>
        </div>
        <div>
          <div className='p-3'>
            <NavLink exact activeClassName="active" className="App-header-link-main" to="/">
              <img src={LogoIcon} alt="FXDX Logo" className="w-100 h-100"  style={{filter: mode === 'dark' ? 'invert(0)' : 'invert(1)'}}/>
            </NavLink>
          </div>
        </div>
      </div>
      }
      <div className="App-header-link-container">
        <NavLink to="/" exact className="nav-link" activeClassName="active">BSC</NavLink>
      </div>
      <div className="App-header-link-container">
        <NavLink to="/avalanche" className="nav-link">Algorand</NavLink>
      </div>
    </div>
  )
}

const App = () => {
  const [mode, setMode] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(undefined);

  const slideVariants = {
    hidden: {x: "-100%"},
    visible: {x: 0}
  }

  const fadeVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
  }

  useEffect(() => {
    const savedMode = window.localStorage.getItem('mode');
    const targetMode = savedMode == 'light' ? 'light' : 'dark';
    document.querySelector('body').style.backgroundColor = targetMode == 'dark' ? '#101124' : '#f6f9ff';
    setMode(targetMode);
  }, [])

  const switchMode = () => {
    const targetMode = mode == 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('mode', targetMode);
    document.querySelector('body').style.backgroundColor = targetMode == 'dark' ? '#101124' : '#f6f9ff';
    setMode(targetMode)
  }

  return (
    <Switch>
      {
        mode && <div className={cx("App", mode)}>
          {isDrawerVisible &&
          <AnimatePresence>
            {isDrawerVisible &&
            <motion.div className="App-header-backdrop"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadeVariants}
                        transition={{duration: 0.2}}
                        onClick={() => setIsDrawerVisible(!isDrawerVisible)}
            >
            </motion.div>
            }
          </AnimatePresence>
          }
          <div className="nav">
            <div className="nav-left">
              <div className="App-header-menu-icon-block" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                {!isDrawerVisible && <RiMenuLine className="App-header-menu-icon"/>}
                {isDrawerVisible && <FaTimes className="App-header-menu-icon"/>}
              </div>
              <a href="https://gmx.io" target="_blank" className="nav-logo" rel="noreferrer">
                <img src={LogoIcon} style={{filter: mode === 'dark' ? 'invert(0)' : 'invert(1)'}} className="w-100 h-100" />
              </a>
              <NavLink to="/" exact className="nav-link" activeClassName="active">BSC</NavLink>
              <NavLink to="/avalanche" className="nav-link">Algorand</NavLink>
            </div>
            <div className="nav-right">
              <a href="https://fxdx.exchange" target="_blank" className="nav-link" rel="noreferrer">GOTO FXDX</a>
              <div className='modeselect' onClick={() => switchMode()}>
                {mode === 'dark' ? <FaSun/> : <FaMoon/>}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isDrawerVisible &&
            <motion.div
              onClick={() => setIsDrawerVisible(false)}
              className="App-header-links-container App-header-drawer"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={slideVariants}
              transition={{duration: 0.2}}
            >
              <AppHeaderLinks mode={mode} small clickCloseIcon={() => setIsDrawerVisible(false)}/>
            </motion.div>
            }
          </AnimatePresence>
          <div className="content">
            <Route exact path="/" render={(props) => (
              <Arbitrum {...props} mode={mode}/>
            )}/>
            <Route exact path="/bsc" component={Bsc}/>
            <Route exact path="/avalanche" render={(props) => (
              <Avalanche {...props} mode={mode}/>
            )}/>
            <Route exact path="/trading" component={Trading}/>
          </div>
        </div>
      }
    </Switch>
  )
};

export default App;
